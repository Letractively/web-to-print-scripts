var imageEditorHost = window.location.href.match(/(http:\/\/[^\/]*)/).pop();
var imageEditorPath = '/java/dev';

jQuery(document).ready(function ($) {
  function imageEditorAssignFancybox() {
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
    else
      if($(".image-content input:radio").length > 0) {
        $(".image-content input:radio").parent().find('a').has('img').click(function () {
          $(this).attr('href', imageEditorHost + imageEditorPath + '/imageEditor.html?imageId=' + $(this).parents().find('input:radio').first().attr('value') + '?iframe');
        });
        $(".image-content input:radio").parent().find('a').has('img').attr('href', imageEditorHost+imageEditorPath + '/imageEditor.html?iframe');
        $(".image-content input:radio").parent().find('a').has('img').fancybox( {
          'padding': 0,
          'hideOnOverlayClick': false,
          'hideOnContentClick': false,
          'centerOnScroll': false,
          'type': 'iframe',
          'titleShow': false
        });
      }
  }

  function scroll_strip (panel, currentCheckedImage) {
    $(panel).find('img:first').load(function () {
      $(panel).scrollLeft(0);
      var position = $('input[value=' + currentCheckedImage + ']',panel).parent('td').position();
      if (position)
        $(panel).scrollLeft(position.left - 100);
    });
    return true;
  }

  //loading fancybox
  //css first
  includeCSS(imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.css');
  $.getScript(imageEditorHost + imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.pack.js', function () {
    imageEditorAssignFancybox();
  });
  //if upload file found
  if ($('.file').length > 0) {
    $.getScript(imageEditorHost + imageEditorPath + '/ajaxupload.js', function () {
      var uploadStripCounter = 1;
      while ($('#divImgStripUpload'+uploadStripCounter).length > 0) {
        //for each upload strip create own upload function
        $('#divImgStripUpload' + uploadStripCounter).find('.tab-img-u').html('<input name="" id="inputUploadFile' + uploadStripCounter + '" disabled=true/><span id="spanUploadButton' + uploadStripCounter+'" class="spanUploadButton">Upload</span>  <span id="spanUploadProgress' + uploadStripCounter + '" style="display:none" class="spanUploadProgress">Uploading... please wait</span>');
        new AjaxUpload('spanUploadButton' + uploadStripCounter, {
          action: '?page=img-new',
          data: {
            Xml: '1'
          },
          autoSubmit: true,
          onChange: function(file, extension) {
            $(this._button).prev().val(file);
            $(this._button).next().show('slow');
            $('input:submit').attr('disabled', 'true');
          },
          onComplete: function(file, response) {
            $(this._button).prev().val('');
            $(this._button).next().hide();
            $('input:submit').removeAttr('disabled');
            var currentStripCounter = $(this._button).prev().attr('id').substring($(this._button).prev().attr('id').length - 1);
            var src = imageEditorHost + '/photothumbs/' + response.match(/thumb="([^"]*?)"/i).pop();
            src = src.replace(/\.(jpg)/i, "_0x100.jpg");
            var imageid = response.match(/imageid="([^"]*?)"/i).pop();
            var td = '<td nowrap="nowrap"><input type="radio" value="' + imageid + '" name="#Logo"><span>#1</span><div><a href="" target="_blank"><img height="100px" src="' + src + '"/></a></div></td>';
            $("div[id*=divImgStripLibrary]").each(function () {
              var currentStrip = $(this).parent();
              var pos = $(currentStrip).scrollLeft();
              $(td).insertBefore($(this).find('td:eq(1)'));
              if ($(this).attr('id') != "divImgStripLibrary" + currentStripCounter) {
                $('img', td).load(function () {
                  $(currentStrip).scrollLeft(pos + $('img', td).attr('width') + 10);
                });
              }
            });
            imageEditorAssignFancybox();
            $('#divImgStripLibrary' + currentStripCounter).find('input[value*=-]:radio').first().attr('checked', 'true');
            tabToggleTabbedMenuBlockImg('liTabImgLibrary' + currentStripCounter, 'divImgStripLibrary' + currentStripCounter);
          }
        });
        uploadStripCounter++;
      }
    });
  }
});

function includeCSS (p_file) {
  var v_css = document.createElement('link');
  v_css.rel = 'stylesheet'
  v_css.type = 'text/css';
  v_css.href = p_file;
  document.getElementsByTagName('head')[0].appendChild(v_css);
}