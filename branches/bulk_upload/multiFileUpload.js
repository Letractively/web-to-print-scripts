/*
<li class="uploadQueue"><span class="uploadStatus">Waiting: </span>filename <span class="cancelUpload">Cancel</span></li>
*/
//Global variables
//array of Queue id's
var uploadQueue = new Array();
var uploadInProgress = false;

// Update by 14.06.2010 - if true messagebox has been showed
var alertFlag = false;

$(document).ready(function() {
	
  //assign onclick event to submit button
  $('#newFileFormForm .submit').click(function(){
    if($.browser.msie && $.browser.version == 6){
      return false; // If IE6 exit without post
    }
    if ($('#newFileFormForm .file').val().length>0){
      addToQueue($(this).parents('#newFileFormForm'));
	}
    //do not submit form
    return false;
  });

  function addToQueue(e) {
    if (uploadQueue.length == 0 && $('#uploadInfobox').length ==0) {
      $('#newFileFormInfo').append('<div id="uploadInfobox"><strong>You can select another image now.</strong></div>');
    } else if (uploadQueue.length == 0) {
      $('#uploadInfobox').show();
    }
    randomFormId=Math.floor(Math.random()*1000001);
    //add file name to list
    $('#newFileFormInfo .list').append('<li class="uploadQueue" id="uploadQueue'+randomFormId+'"><span class="uploadStatus" id="uploadStatus'+randomFormId+'">Waiting: </span>'+$('.file',e).val()+' <span class="cancelUpload" id="cancelUpload'+randomFormId+'">Cancel</span></li>');
    //cancel handler
    $('#cancelUpload'+randomFormId).click(function(){
      var currentNr=$(this).attr('id');
      var Nr = parseInt(currentNr.replace('cancelUpload',''));
      uploadQueue=removeArrayElement(uploadQueue,Nr);
      $('#uploadQueue'+Nr).remove();
      //remove infobox on last upload only
      if(!uploadQueue.length)
        $('#uploadInfobox').fadeOut(1000);
      $('iframe[name=hiddenFileUploadIframe'+Nr+']').attr('src','about:blank');
      //upload not in progress anymore
      uploadInProgress = false;
      //start next upload
      startUpload();
    });
    cloneUploadForm(e,randomFormId);
    startUpload();
    uploadInProgress = true;
  }

  /*Creates hidden form with custom id*/
  function cloneUploadForm(e,randomFormId) {

    //creating hidden form
    var newForm = $(e).clone(true);
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
    createIframeOnload(randomFormId);
    //adding randomFormId to array of forms
    uploadQueue.push(randomFormId);
    //clear main form
    SubmitNewFile();
    return true;
  }

  function createIframeOnload(iframeId) {
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
        $('.uploadQueue').first().hide('slow',function(){
          $(this).remove();
        });
        //remove infobox on last upload only
        if(!uploadQueue.length)
          $('#uploadInfobox').fadeOut(1000);
        
        uploadInProgress = false;

        imageEditorAssignFancybox();

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
      $('#uploadStatus'+uploadQueue[0]).html("Uploading: ");
      $('#hiddenFileUpload'+uploadQueue[0]).submit();
    }
  }

  function imageEditorAssignFancybox() {
    if (typeof(imageEditorHost)=="undefined")
      return false;
    if ($('.middle a').length > 0) {
      $('.middle a').click(function () {
        $(this).attr('href', imageEditorHost + imageEditorPath + '/imageEditor.html?imageId=' + $(this).children().attr('id').substring(3) + '?iframe');
      });
      $('.middle a').attr('href', imageEditorHost + imageEditorPath + '/imageEditor.html?iframe');
      $('.middle a').fancybox( {
        'padding': 0,
        'hideOnOverlayClick': false,
        'hideOnContentClick': false,
        'centerOnScroll': false,
        'type': 'iframe',
        'titleShow': false
      });
    }
  }

});

//overwrite existing function
function SubmitNewFile() {
document.getElementById('newFileFormForm').reset();
}