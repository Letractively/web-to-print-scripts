slideCSS=document.createElement("link");
slideCSS.setAttribute("rel", "stylesheet");
slideCSS.setAttribute("type", "text/css");
slideCSS.setAttribute("href", '/common/slide/css/main.css');
document.getElementsByTagName("head")[0].appendChild(slideCSS)

$.noConflict();
jQuery(document).ready(function($) {
  var maxContentHeight=0;

  //image preload
  var imagePreload = [];
  $('.slideScreenSrc').each(function(){
    var cacheImage = document.createElement('img');
    cacheImage.src = $(this).attr('src');
    imagePreload.push(cacheImage);
  });

  //click hook
  $('#slideMenuText li').click(function(){
    applyContent($(this));
  });

  //content max height
  $('.slideDescriptionSrc').each(function(){
    if ($(this).height()>maxContentHeight) {
      maxContentHeight=$(this).height();
      $('#slideDescriptionText').height(maxContentHeight);
    }
  });

  function applyContent(e) {
    //make li active
    $('#slideMenuText li').removeClass('slideCaptionSelected');
    $(e).addClass('slideCaptionSelected');

    //apply caption text
    $('#slideCaptionText').hide();
    $('#slideCaptionText').html($('h2',e).html());
    $('#slideCaptionText').fadeIn('fast');

    //apply description text
    $('#slideDescriptionText').hide();
    $('#slideDescriptionText').html($('.slideDescriptionSrc',e).html());
    $('#slideDescriptionText').fadeIn('fast');
    if ($.browser.msie)
      $('#slideDescriptionText').show();

    //apply screen
    $('.slideScreen img').hide();
    $('.slideScreen img').attr('src',$('.slideScreenSrc',e).attr('src'));

    //read more link
    $('#slideReadMore').attr('href',$('.slideReadMoreSrc',e).html());
  }

  //apply image fading on load
  $('.slideScreen img').load(function() {
    $(this).fadeIn('slow');
  });

  //first load
  applyContent($('#slideMenuText li').first());

});