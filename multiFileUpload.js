/*
<li class="uploadQueue">filename <span class="cancelUpload">X</span> <span class="queueUploading">Uploading...</span></li>
*/
//Global variables
//array of Queue id's
var uploadQueue = new Array();
var uploadInProgress = false;

$(document).ready(function() {
  //assign onclick event to submit button
  $('#newFileFormForm .submit').click(function(){
    addToQueue($(this).parents('#newFileFormForm'));
    //do not submit form
    return false;
  });

  function addToQueue(e) {
    randomFormId=Math.floor(Math.random()*1000001);
    //add file name to list
    $('#newFileFormInfo .list').append('<li class="uploadQueue" id="uploadQueue'+randomFormId+'">Queue: '+$('.file',e).val()+' <span class="cancelUpload" id="cancelUpload'+randomFormId+'">X</span></li>');
    //cancel handler
    $('#cancelUpload'+randomFormId).click(function(){
      var currentNr=$(this).attr('id');
      var Nr = parseInt(currentNr.replace('cancelUpload',''));
      uploadQueue=removeArrayElement(uploadQueue,Nr);
      $('#uploadQueue'+Nr).remove();
      $('iframe[name=hiddenFileUploadIframe'+Nr+']').attr('src','about:blank');
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

    if ($.browser.msie) {
    //msie bug workaround
    var real=$('.file',e);
    var cloned = real.clone(true);
    cloned.insertAfter(real);
    real.appendTo($(newForm));
    }

    $(newForm).css('position','absolute');
    $(newForm).css('left','-100000');
    $(newForm).attr('target','hiddenFileUploadIframe'+randomFormId);
    $('body').append($(newForm));

    //creating iframe
    $('body').append('<iframe name="hiddenFileUploadIframe'+randomFormId+'" style="display:none"></iframe>');
    addCss();
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
        
        uploadInProgress = false;

        //start next file upload
        startUpload();
      }
    });
  }

  //function removes el from array arr
  function removeArrayElement(arr,el){
    var r = new Array();
    for (var i = 0; i<arr.length;i++) {
      if(!(arr[i]==el))
        r.push(arr[i]);
    }
  return r;
  }

  function startUpload() {
    if (!uploadInProgress&&uploadQueue.length>0) {
      $('.uploadQueue').first().append(' <span class="queueUploading">Uploading...</span>');
      addCss();
      $('#hiddenFileUpload'+uploadQueue[0]).submit();
      }
  }

  function addCss() {
  /*css stuff*/
  $('.cancelUpload').css({'color':'red','font-weight':'bold'});
  $('.queueUploading').css({'font-style':'italic','font-weight':'bold'});
  }

});

function SubmitNewFile() {
document.getElementById('newFileFormForm').reset();
}