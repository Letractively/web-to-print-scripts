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
var imageEditorPath = '/java/dev'; /* path to image editor JS file, not trailing slash */
/******************/

jQuery(document).ready(function ($) {

  function imageEditorAssignFancybox() {
    if($('.middle a').length > 0) { /* My Images page */
      $('div#imageList > div[id]').each(function(){ /* find all <div> in <div id="imageList"> */
        id = $(this).attr('id'); /* get ImageID */
        /* replace image listener */
        x = $(this).find('.middle a');
        x.attr('name',id);
        x.click(function () {
          $(this).attr('href', imageEditorPath + '/imageEditor.html?imageId=' + this.name + '?iframe');
        });
        x.attr('href', imageEditorPath + '/imageEditor.html?iframe');
        x.fancybox( {
          'padding': 0,
          'hideOnOverlayClick': false,
          'hideOnContentClick': false,
          'centerOnScroll': false,
          'type': 'iframe',
          'titleShow': false
        });
        /* replace Edit button listener */
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
    }else if($(".image-content input:radio").length > 0) { /* Preview page */
      $("a[id^='img-']").each(function(){ /* find all tags <a id="img-..."> */
        $(this).click(function(){
          $(this).attr('href',imageEditorPath + '/imageEditor.html?imageId=' + $(this).attr('name') + '?iframe');
        });
        $(this).attr('href', imageEditorPath + '/imageEditor.html?iframe');
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
  }

  /* don't load scripts if IE6 */
  if(!($.browser.msie && $.browser.version == 6)){
    /* loading fancybox */
    includeCSS(imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.css'); /* css first */
    $.getScript(imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.pack.js', function () {
      imageEditorAssignFancybox();
    });
  }else{
    $('div#imageList > div[id] ul[id]').remove(); /* find native image-editor menu */
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
