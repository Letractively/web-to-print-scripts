/*
 * WIKI page
 * http://code.google.com/p/web-to-print-scripts/wiki/Image_editor
 *
 * fileUpload.js dependencies
 *   imageEditor.html
 *   fancybox/*
 *   image-edit/*
 */

/*
 * Global variables
 */
var imageEditorHost = window.location.href.match(/(http:\/\/[^\/]*)/).pop(); /* http host */
var imageEditorPath = '/java/dev';                                           /* path to image editor JS file, not trailing slash */
/******************/

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

  /* don't load scripts if IE6 */
  if(!($.browser.msie && $.browser.version == 6)){
    /* loading fancybox */
    includeCSS(imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.css'); /* css first */
    $.getScript(imageEditorHost + imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.pack.js', function () {
      imageEditorAssignFancybox();
    });
  }
});

/* loading css file */
function includeCSS (p_file) {
  var v_css = document.createElement('link');
  v_css.rel = 'stylesheet'
  v_css.type = 'text/css';
  v_css.href = p_file;
  document.getElementsByTagName('head')[0].appendChild(v_css);
}

/* rewrite existing function if IE6 */
if($.browser.msie && $.browser.version == 6){
  BeginEditImage = function(id, origH, origW){
    alert("Sorry, but image editor don't works in IE6");
    return;
  }
}
