var jQueryScriptOutputted = false;
var imageEditorHost = 'http://realestate.zetaprints.com';
var imageEditorPath = '/java/dev';

function initJQuery() {

  //if the jQuery object isn't available
  if (typeof(jQuery) == 'undefined') {


    if (! jQueryScriptOutputted) {
      //only output the script once..
      jQueryScriptOutputted = true;

      //output the script (load it from google api)
      document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js\"></scr" + "ipt>");
    }
    setTimeout("initJQuery()", 500);
  } else {

    $(function()
      {

        function imageEditorAssignFancybox() {
          if ($('.middle a').length>0) {
            $('.middle a').click(function()
              {
                $.cookie('imageEditorId', $(this).children().attr('id').substring(3));
              }
            );
            $('.middle a').attr('href', imageEditorHost+imageEditorPath+'/imageEditor.html?iframe');
            $('.middle a').fancybox(
              {
              'padding': 0,
              'hideOnOverlayClick': false,
              'hideOnContentClick': false,
              'centerOnScroll': false,
              'type': 'iframe',
              'titleShow': false
              }
            );
          }else
            if($(".image-content input:radio").length>0) {
            $(".image-content input:radio").next().next().find('a').has('img').click(function()
              {
                $.cookie('imageEditorId', $(this).parents().find('input:radio').first().attr('value'), {path: '/'});
              }
            );
            $(".image-content input:radio").next().next().find('a').has('img').attr('href', imageEditorHost+imageEditorPath+'/imageEditor.html?iframe');
            $(".image-content input:radio").next().next().find('a').has('img').fancybox(
              {
              'padding': 0,
              'hideOnOverlayClick': false,
              'hideOnContentClick': false,
              'centerOnScroll': false,
              'type': 'iframe',
              'titleShow': false
              }
            );

          }
        }

        //loading cookie plugin to pass variables to iframe
        $.getScript(imageEditorHost+imageEditorPath+'/jquery.cookie.js');
        //loading fancybox
        //css first
        includeCSS(imageEditorHost+imageEditorPath+'/fancybox/jquery.fancybox-1.3.1.css');
        $.getScript(imageEditorHost+imageEditorPath+'/fancybox/jquery.fancybox-1.3.1.pack.js', function()
          {
            imageEditorAssignFancybox();
          }
        );
        //if upload file found
        if ($('.file').length>0) {
          $.getScript(imageEditorHost+imageEditorPath+'/ajaxupload.js', function()
            {

              var uploadStripCounter = 1;
              while ($('#divImgStripUpload'+uploadStripCounter).length>0) {
                //for each upload strip create own upload function
                $('#divImgStripUpload'+uploadStripCounter).find('.tab-img-u').html('<input name="" id="inputUploadFile'+uploadStripCounter+'" disabled=true/><span id="spanUploadButton'+uploadStripCounter+'" class="spanUploadButton">Upload</span>  <span id="spanUploadProgress'+uploadStripCounter+'" style="display:none" class="spanUploadProgress">Uploading... please wait</span>');
                new AjaxUpload('spanUploadButton'+uploadStripCounter,
                  {
                  action: '?page=img-new',
                  data: {
                    Xml: '1'
                    },
                  autoSubmit: true,
                  onChange: function(file, extension) {
                      $(this._button).prev().val(file);
                      $(this._button).next().show('slow');
                      $('input:submit').attr('disabled','true');
                    },
                  onComplete: function(file, response) {
                      $(this._button).prev().val('');
                      $(this._button).next().hide();
                      $('input:submit').removeAttr('disabled');
                      var currentStripCounter = $(this._button).prev().attr('id').substring($(this._button).prev().attr('id').length-1);
                      $.ajax(
                        {
                        url: window.location.href,
                        type: 'GET',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert('Can\'t load page:' + ' ' + textStatus);
                          },
                        success: function (data, textStatus) {
                            tmp = $(data);
                            var i = 1;
                            while ($('#divImgStripLibrary'+i).length>0) {
                              currentCheckedImage=$('#divImgStripLibrary'+i).find('input:checked').val();
                              $('#divImgStripLibrary'+i).html(tmp.find('#divImgStripLibrary'+i).html());
                              $('#divImgStripLibrary'+i).find('input[value='+currentCheckedImage+']').attr('checked','true');
                              i++;
                            }
                            imageEditorAssignFancybox();
/*
                            //if image strip doesn't exists, overwrite whole form from ajax
                            if ($('#divImgStripLibrary'+currentStripCounter).length==0){
                            $('#formPreviewUpdate').html(tmp.find('#formPreviewUpdate').html());
                            alert(tmp.find('.image-field').html());
                            }
*/
                            $('#divImgStripLibrary'+currentStripCounter).find('input[value*=-]:radio').first().attr('checked', 'true');
                            tabToggleTabbedMenuBlockImg('liTabImgLibrary'+currentStripCounter, 'divImgStripLibrary'+currentStripCounter);
                          }
                        }
                      );

                    }
                  }
                );
                uploadStripCounter++;
              }

            }
          );


        }
      }
    );
  }

}
initJQuery();
function includeCSS(p_file) {
  var v_css = document.createElement('link');
  v_css.rel = 'stylesheet'
  v_css.type = 'text/css';
  v_css.href = p_file;
  document.getElementsByTagName('head')[0].appendChild(v_css);
}