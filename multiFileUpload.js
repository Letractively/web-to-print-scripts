  var queueCounter=0;
  var fileUploadVals = new Array();
  var currentUpload = 0;

$(document).ready(function() {
  //assign onclick event to submit button
  $('#newFileFormForm .submit').click(function(){
    addToQueue($(this).parents('#newFileFormForm'));
    //do not submit form
    return false;
  });

  function addToQueue(e) {

    $('#newFileFormInfo .list').append('<li class="uploadQueue">Queue: '+$('.file',e).val()+'</li>');

    //creating hidden form
    var newForm = $(e).clone(true);
    $(newForm).attr('id','hiddenFileUpload'+queueCounter);
    //$(newForm).append('<input type="hidden" name="Xml" value="1">');
    if ($.browser.msie) {
    //msie bug workaround
    var real=$('.file',e);
    var cloned = real.clone(true);
    cloned.insertAfter(real);
    real.appendTo($(newForm));
    }
    $(newForm).css('position','absolute');
    $(newForm).css('left','-100000');
    $(newForm).attr('target','hiddenFileUploadIframe'+queueCounter);
    $('body').append($(newForm));
    //creating iframe
    $('body').append('<iframe name="hiddenFileUploadIframe'+queueCounter+'" style="display:none"></iframe>');
    //iframe onload event
    $('iframe[name=hiddenFileUploadIframe'+queueCounter+']').load(function(){
      //only when we got content
      var doc = this.contentDocument ? this.contentDocument : window.frames[this.id].document;
      if (doc.XMLDocument) {
        response = doc.XMLDocument;
      } else if (doc.body) {
        response = doc.body.innerHTML;
      }
      if (response.length>0)
        $('.uploadQueue').first().remove();
    });

    //fist file, add upload button
    if (queueCounter==0) {
      $('#newFileFormInfo').append('<span id="startFileUpload"><input type="button" name="Start Upload" value="Start Upload"></span>');
      $('#startFileUpload').click(beginFileUpload);
    }
    queueCounter++;
  }

  function beginFileUpload() {
    while($('#hiddenFileUpload'+currentUpload).length>0) {
      $('#hiddenFileUpload'+currentUpload).submit();
      $('#hiddenFileUpload'+currentUpload).remove();
      currentUpload++;
    }

    queueCounter=0;
    currentUpload=0;
    $('#startFileUpload').remove();
  }
});




function SubmitNewFile() {
document.getElementById('newFileFormForm').reset();
}