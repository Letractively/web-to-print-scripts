var jQueryScriptOutputted = false;

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

        //if upload file found
        if ($('.file').length>0) {

          var uploadDiv = $('.file').parent();
          //clear whole parent container
          uploadDiv.html('');
          //and add custom form
          uploadDiv.html('<div id="newFileFormForm"><input type="file" name="$new-file" class="file"><input type="submit" value="Upload new file" class="submit"></div><div id="newFileUploading" style="display: none;">Uploading ...</div><iframe id="newFileFrame" name="newFileFrame" style="display: none;"></iframe>');
          var tmp = '';
          $('#formPreviewUpdate').submit(function()
            {
              if ($('.file').val().length>0&&tmp=='') {
                //handle file upload
                $('#formPreviewUpdate').attr('action', '?page=img-new');
                $('#formPreviewUpdate').attr('target', 'newFileFrame');
                $('#formPreviewUpdate').append('<input type="hidden" name="Xml" value="1">');
                $('#newFileFormForm').hide();
                $('#newFileUploading').show();
                tmp = '1';

                $('#formPreviewUpdate').submit();
                //do the trick. load itself by ajax and replace imagestrip
                $('#newFileFrame').load(function()
                  {
                    $.ajax(
                      {
                      url: window.location,
                      type: 'GET',
                      error: function (XMLHttpRequest, textStatus, errorThrown) {
                          alert('Can\'t load page:' + ' ' + textStatus);
                        },
                      success: function (data, textStatus) {
                          tmp = $(data);
                          var i = 1;
                          while ($('#divImgStripLibrary'+i).length>0) {
                            $('#divImgStripLibrary'+i).html(tmp.find('#divImgStripLibrary1').html());
                            i++;
                          }
                          $('#newFileUploading').hide();
                          $('#newFileFormForm').show();

                        }
                      }
                    );
                  }
                );

                return false;
              }
              return true;
            }
          );

        }

      }
    );
  }
}

initJQuery();