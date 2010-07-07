/*
 * WIKI page
 * http://code.google.com/p/web-to-print-scripts/wiki/ImageUpload
 *
 * multiFileUpload.js dependencies
 *   imageEditor.js
 */

/*
 * Global variables
 */
var uploadQueue = new Array(); /* array of Queue id's */
var uploadInProgress = false;
/******************/

$(document).ready(function() {
	
  //assign onclick event to submit button
  $('#newFileFormForm .submit').click(function(){
    if($.browser.msie && $.browser.version == 6){
      return true; // If IE6 submit with standart ZP code
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

  /* Creates hidden form with custom id */
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

        frm = $("div[id='asyncFrame']",'<div>'+response+'</div>').html();
        //$('#imageFramesAndForms').append(frm);
        x = $("div:first",'<div>'+response+'</div>');
        imageEditorAssignFancybox(x.attr('id'));

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

  function imageEditorAssignFancybox(id) {
    replaceOldImageEditor(id);
  }

});

function replaceOldImageEditor(id){
  $("div#imageList > div[id='"+id+"']").each(function(){
    if($.browser.msie && $.browser.version == 6){
      $("div#imageList > div[id='"+id+"'] ul[id]").remove(); /* find native image-editor menu */
      $("div#imageList > div[id='"+id+"'] input:text").attr('disabled','disabled'); /* find native image-editor menu */
      return;
    }
    x = $(this).find('.middle a');
    x.attr('name',id);
    x.click(function () {
      $(this).attr('href', imageEditorPath + '/imageEditor.html?imageId=' + this.name + '?iframe');
    });
    x.attr('href', imageEditorPath + '/imageEditor.html?iframe');
    x.attr('title', "Click to edit");
    x.fancybox( {
      'padding': 0,
      'hideOnOverlayClick': false,
      'hideOnContentClick': false,
      'centerOnScroll': false,
      'type': 'iframe',
      'titleShow': false
    });
    x = $(this).find("ul[id]"); /* find native image-editor menu */
    y = x.find('li:first span');
    if(x.attr('id').substring(0,3)=='mul'){ /* if editable image */
      y.html('<a name="'+id+'" href="' + imageEditorPath + '/imageEditor.html?iframe'+'">Edit</a>');
    }else{ 
      y.html('<a name="'+id+'" href="' + imageEditorPath + '/imageEditor.html?iframe'+'">Delete</a>');
    }
    x.find('li:first').removeAttr("onclick"); /* remove onclick listener */
    y = y.find('a');
    y.click(function () {
      $(this).attr('href', imageEditorPath + '/imageEditor.html?imageId=' + this.name + '?iframe');
    });
    y.fancybox( {
      'padding': 0,
      'hideOnOverlayClick': false,
      'hideOnContentClick': false,
      'centerOnScroll': false,
      'type': 'iframe',
      'titleShow': false
    });
  });
}
//overwrite existing functions
function SubmitNewFile() {
  if($.browser.msie && $.browser.version == 6){
    FileSubmitFormHide(); // If IE6, use standart ZP upload
  }else{
    document.getElementById('newFileFormForm').reset();
  }
}

function ReplaceElementHTML(id, newHTML, origH, origW){
  var elem = document.getElementById(id);
  if (elem) {
    elem.innerHTML=newHTML;
    if($.browser.msie && $.browser.version == 6){
      if (origH) BeginEditImage(id, origH, origW)
    }else{
      replaceOldImageEditor(id);
    }
  }
}
function InsertElementHTML(newID, insertBeforeID, newHTML, newHTMLframe){
  //create new FORM and IFRAME
  var newFormFrameDiv=document.getElementById('imageFramesAndForms');
  var div=document.createElement("DIV");
  div.innerHTML=newHTMLframe;
  newFormFrameDiv.appendChild(div);
  //create the new div 
  div=document.createElement("DIV");
  div.id=newID;
  div.innerHTML=newHTML;
  var parent=document.getElementById('imageList');
  var oldDiv=document.getElementById(insertBeforeID);
  if (oldDiv){
    parent.insertBefore(div,oldDiv); //insert before the old one
  }else{
    //insert at the beginning
    var fc=parent.firstChild;
    if (fc){
      parent.insertBefore(div, parent.firstChild);
    }else{
      parent.appendChild(div);
    }
  }
  if(!($.browser.msie && $.browser.version == 6)){
    replaceOldImageEditor(newID);
  }
  FileSubmitFormShow();
}