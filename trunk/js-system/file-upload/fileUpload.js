/*
 * WIKI page
 * http://code.google.com/p/web-to-print-scripts/wiki/ImageUpload
 *
 * fileUpload.js dependencies
 *   imageEditor.js
 */

/*
 * Global variables
 */
var thumbPath = '/photothumbs/';            /* path to uploaded files */
var ajaxLoaderImg = 'img/ajax-loader.gif';  /* path to background image */
var uploadQueue = new Array();              /* array of Queue id's */
var uploadInProgress = false;
/******************/

$(document).ready(function() {

  $('.tab-img-u').each(function(){
    if($.browser.msie && $.browser.version == 6){
      return; /* exit if IE6 */
    }

    var Nr = parseInt($(this).parent().attr('id').replace('divImgStripUpload',''));
    var radioID = $('.file',this).attr('name');
    $(this).html('<div id="newFileFormForm' + Nr + '">\n'
    +'  <input type="file" name="$new-file" class="file" \/>\n'
    +'  <div id="newFileFormInfo' + Nr + '">\n'
    +'    <ul class="list"><\/ul>\n'
    +'  <\/div>\n'
    +'  <span id="radioID" style="display:none">' + radioID + '<\/span>\n'
    +'<\/div>');
    $('.file',this).change(function() {
      addToQueue(Nr);
    });
  });

  /* assign onclick event to submit button */
  $('#newFileFormForm .submit').click(function(){
    if ($('#newFileFormForm .file').val().length>0){
      if($.browser.msie && $.browser.version == 6){
        // Remove double slash at the next line to show messagebox
        //alert("Sorry, but you can't to use AJAX uploading in IE 6.");
        return true; /* If IE6 submit with standart ZP code */
      }
      addToQueue($(this).parents('#newFileFormForm'));
    }
    return false; /* do not submit form */
  });

  function addToQueue(id) {
    var e=$('#newFileFormForm' + id);
    randomFormId=Math.floor(Math.random()*1000001);
    /* add file name to list */
    $('.list',e).append('<li class="uploadQueue uploadQueueId'+randomFormId+'"><span class="uploadStatus uploadStatusId'+randomFormId+'">Waiting: </span>'+$('.file',e).val()+' <span class="cancelUpload" id="cancelUpload'+randomFormId+'">Cancel</span></li>');
    /* cancel handler */
    $('#cancelUpload'+randomFormId).click(function(){
      var currentNr=$(this).attr('id');
      var Nr = parseInt(currentNr.replace('cancelUpload',''));
      uploadQueue=removeArrayElement(uploadQueue,Nr);
      $('.uploadQueueId'+Nr).remove();
      $('iframe[name=hiddenFileUploadIframe'+Nr+']').attr('src','about:blank');
      uploadInProgress = false; /* upload not in progress anymore */
      /* enable form */
      $('.file',e).removeAttr('disabled');
      $('.file',e).val('');
      startUpload(); /* start next upload */
    });
    cloneUploadForm(e,randomFormId,id);
    startUpload();
    uploadInProgress = true;
  }

  /* Creates hidden form with custom id */
  function cloneUploadForm(e,randomFormId,id) {
    var newForm = $('<form action="?page=img-new" enctype="multipart/form-data" method="post"><input type="hidden" name="Xml" value="1"></form>');
    $(newForm).attr('id','hiddenFileUpload'+randomFormId);
    var real=$('.file',e);
    var cloned = real.clone(true);
    cloned.insertAfter(real);
    real.appendTo($(newForm));
    $(newForm).css('display','none');
    $(newForm).attr('target','hiddenFileUploadIframe'+randomFormId);
    $('body').append($(newForm));
    //creating iframe
    $('body').append('<iframe name="hiddenFileUploadIframe'+randomFormId+'" style="display:none"></iframe>');
    //add iframe onload event handler
    createIframeOnload(randomFormId,e,id);
    //adding randomFormId to array of forms
    uploadQueue.push(randomFormId);
    //clear main form
    $('.file',e).attr('disabled','true');
    $('.file',e).val('');
    return true;
  }

  function createIframeOnload(iframeId,e,currentStripCounter) {
    $('iframe[name=hiddenFileUploadIframe'+iframeId+']').load(function(){
      //only when we got content
      var doc = this.contentDocument ? this.contentDocument : window.frames['hiddenFileUploadIframe'+iframeId].document;
      if (doc.XMLDocument) {
        response = doc.XMLDocument;
      } else if (doc.body) {
        response = doc.body.innerHTML;
      }

      if (response.length>0) {
        //image uploaded, remove it from queue
        uploadQueue=removeArrayElement(uploadQueue,iframeId);
        //remove file name from list
        $('.uploadQueueId'+iframeId).hide('slow',function() {
          $(this).remove();
          $('.file',e).removeAttr('disabled');
          $('.file',e).val('');
        });
        uploadInProgress = false;

        var libLength = $("div[id=divImgStripLibrary1] table td").length - 1; /* get count images in the first scroll*/
        var src = thumbPath + response.match(/thumb="([^"]*?)"/i).pop();
        src = src.replace(/\.(jpg)/i, "_0x100.jpg");
        var imageid = response.match(/imageid="([^"]*?)"/i).pop();
        var radioGroupName = ''; // create group name variable, it is easier to track what is used this way
        if ($("div[id*=divImgStripLibrary]").length==0) {
          //1st time upload, need to create image container first
          var currentStripCounter1 = 0;
          $("div[id*=divImageContentContainer]").each(function () {
            currentStripCounter1=$(this).attr('id').substring($(this).attr('id').length - 1);
            radioGroupName = $('#radioID', '#divImgStripUpload' + currentStripCounter1).html(); // give value to option group name
            //creating blank image container
            var bl = '<div id="divImgStripLibrary' + currentStripCounter1 + '" class="tab3-content" style="display:none">'; // having all code in one line is very hard to read
            bl += '<table><tbody><tr><td nowrap="nowrap" class="blank-img-l">';                                             // so span it across lines
            bl += '<div><span class="info"><a href="?page=images" title="Manage my image library" class="calm-padded">Manage images<\/a><\/span><\/div>';
            bl += '<\/td><\/tr><\/tbody><\/table><\/div>';
            // IE has great troubles with adding form elements using DOM, so we need to add the element using innerHTML instead
            // so first we create element html string, it is MANDATORY to have name assigned to the input upon inserting it
            // if we first insert the element and then set its name, it will not work in IE at all.
            var blank = '<input class="blank-option" type="radio" name="' + radioGroupName + '" value=""><strong>BLANK <\/strong>';
            // appned its container html to document
            $(this).append(bl); // add thumb contaner
            // find immidiate input parent
            var cell = $(this).find('td.blank-img-l').first();
            // add option input to innerHTML
            cell.html(blank);
            //creating my images tab (only if upload tab exists)
            $('#liTabImgLibrary' + currentStripCounter1).show();
            //make upload tab class active
            if (currentStripCounter1 != currentStripCounter)
              $('#liTabImgUpload' + currentStripCounter1).addClass('active');
            });
          $('#liTabImgLibrary' + currentStripCounter).addClass('active');
        }
        var td = '<td nowrap="nowrap"></td>'; // create empty TD element so that we can simply set its inner html not worriing about overwriting stuff
        $("div[id*=divImgStripLibrary]").each(function () {
          var currentStrip = $(this).parent();
          var pos = $(currentStrip).scrollLeft();
          var t = $(td).insertAfter($(this).find('td:eq(0)')); // add our empty cell after first cell
          radioGroupName = $('#radioID', currentStrip).html(); // find corresponding option group name
          var td_input = '<input type="radio" value="' + imageid + '" name="' + radioGroupName + '">'; // create option input html, see blank option input about details
          td_input += '  <span>#' + libLength + '</span>'; // add label (by the way label numbering is not making much sence here), and other elements needed
          td_input += '  <div style="background-image:url('+ajaxLoaderImg+'); background-position:center center; background-repeat:no-repeat;display:block;height:100px;min-width:100px;">';
          td_input += '   <a href="" name="'+imageid+'" target="_blank"><img height="100px" style="display:block" src="' + src + '"/></a>';
          td_input += '  </div>';
          t.html(td_input); // set empty cell innerHTML
          // no further changes made regarding IE7 issue
          // -------------------------------------------          
          if ($(this).attr('id') != "divImgStripLibrary" + currentStripCounter) {
            $('img', td).load(function () {
              $(currentStrip).scrollLeft($(currentStrip).scrollLeft() + $('input[value='+imageid+']').parent().outerWidth());
            });
          }
        });
        imageEditorAssignFancybox(imageid, libLength); /* find by ImageID */
        var first = $('#divImgStripLibrary' + currentStripCounter).find('input[value*=-]:radio').first();
        if(first){
          first.attr('checked', 'true');
        }
        tabToggleTabbedMenuBlockImg('liTabImgLibrary' + currentStripCounter, 'divImgStripLibrary' + currentStripCounter);
        //start next file upload
        startUpload();
      }
    });
  }

  //function removes el from array arr
  function removeArrayElement(arr,el) {
    var r = new Array();
    for (var i = 0; i<arr.length;i++) {
      if(!(arr[i]==el))
        r.push(arr[i]);
    }
    return r;
  }

  function startUpload() {
    if (!uploadInProgress&&uploadQueue.length>0) {
      $('.uploadStatusId'+uploadQueue[0]).each(function() {
        $(this).html("Uploading: ");
      });
      $('input[type=submit]').attr('disabled', 'disabled');
      $('#hiddenFileUpload'+uploadQueue[0]).submit();
    }
    if (!uploadInProgress&&uploadQueue.length==0) {
      $('input[type=submit]').removeAttr('disabled');
    }
  }

  function imageEditorAssignFancybox(id,libNum) {
    $("a[name='"+id+"']").each(function(i){
      $(this).click(function(){
        $("div#divImgStripLibrary"+(i + 1)+" input:radio[value='" + $(this).attr('name') + "']").attr('checked','checked');
        $(this).attr('href',imageEditorPath + '/imageEditor.html?imageId=' + $(this).attr('name') + '?iframe');
      });
      $(this).attr('href', imageEditorPath + '/imageEditor.html?iframe');
      $(this).attr('id', 'img-l-' + (i + 1) + '-' + libNum);
      $(this).fancybox( {
        'padding': 0,
        'hideOnOverlayClick': false,
        'hideOnContentClick': false,
        'centerOnScroll': false,
        'type': 'iframe',
        'titleShow': false
      });
    });
  }
});

