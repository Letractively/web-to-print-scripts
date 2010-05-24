var imageEditorHost = window.location.href.match(/(http:\/\/[^\/]*)/).pop();
//path to image editor JS file, no trailing slash
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

  //loading fancybox
  //css first
  includeCSS(imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.css');
  $.getScript(imageEditorHost + imageEditorPath + '/fancybox/jquery.fancybox-1.3.1.pack.js', function () {
    imageEditorAssignFancybox();
  });
});

function includeCSS (p_file) {
  var v_css = document.createElement('link');
  v_css.rel = 'stylesheet'
  v_css.type = 'text/css';
  v_css.href = p_file;
  document.getElementsByTagName('head')[0].appendChild(v_css);
}