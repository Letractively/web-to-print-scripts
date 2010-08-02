var alphaPath = '/common/slideshow/fade/'; // path to fade images

var slideSpeed = 2000;                     // delay time (default:2 sec)
var alphaImgs = [];                        // fade images
var iCurrStep = 0;                         // step of fading
var slideCount = 0;                        // count of slides
var showSlides = false;

$(document).ready(function() {
  slideShow(window.slideshow_speed ? window.slideshow_speed : 3000);
});

// check images load
function checkImg(fadeNext){
  var imgCounter=0;
  $('ul.slideshow li img').each(function(){
    if(this.complete==true && this.width>0) imgCounter++;
  });
  if(imgCounter>=slideCount){
    showSlides = true;
    if(fadeNext==true)
      setTimeout('fade()',slideSpeed);
    else
      setTimeout('gallery()',slideSpeed);
  }else
    timer = setTimeout('checkImg('+fadeNext+')',500);
}
// fade image
function fade(){
  if(showSlides==false){
    setTimeout('fade()',100);
    return;
  }
  iCurrStep++;
  if(iCurrStep>4){
    iCurrStep = 0;
    $('#slideshowFade img').attr('src',alphaImgs[iCurrStep].src);
    gallery();
  }else{
    $('#slideshowFade img').attr('src',alphaImgs[iCurrStep].src);
    setTimeout('fade()',100);
  }
}

function slideShow(speed) {
  // load fade images
  alphaImgs[0] = new Image();
  alphaImgs[1] = new Image();
  alphaImgs[2] = new Image();
  alphaImgs[3] = new Image();
  alphaImgs[4] = new Image();
  alphaImgs[0].src = alphaPath + 'fade_0.png';
  alphaImgs[1].src = alphaPath + 'fade_10.png';
  alphaImgs[2].src = alphaPath + 'fade_20.png';
  alphaImgs[3].src = alphaPath + 'fade_35.png';
  alphaImgs[4].src = alphaPath + 'fade_50.png';
  
  // get count of slides
  var slideCount = $('ul.slideshow').children().size();
  
  //show first LI
  var current = $('ul.slideshow li:first');
  current.addClass('show');
  
  //append a LI item to the UL list for displaying caption
  $('ul.slideshow').append('<li id="slideshowCaption"><div><h3></h3><p></p></div></li>');
  $('ul.slideshow').append('<li id="slideshowButton"><a></a><p></p></li>');
  $('ul.slideshow').append('<li id="slideshowFade"><a><img src="'+alphaImgs[0].src+'" /></a></li>');
  $('ul.slideshow').show();

  //Get the caption of the first image from REL attribute and display it
  $('#slideshowCaption h3').html($('ul.slideshow a:first').find('img').attr('title'));
  $('#slideshowCaption p').html($('ul.slideshow a:first').find('img').attr('alt'));
  $('#slideshowButton a').html($('ul.slideshow a:first').attr('title'));
  $('#slideshowButton a').attr('href',$('ul.slideshow a:first').attr('href'));
  $('#slideshowFade a').attr('href',$('ul.slideshow a:first').attr('href'));

  //Display the caption
  $('#slideshowCaption').css({opacity: 0.7, bottom:0});
  //Display the button
  $('#slideshowButton').css({opacity: 1.0, bottom:0});

  var href = current.find('a').attr('href');
  if(current.next().attr('id') == 'slideshowCaption'){
    var next = $('ul.slideshow li:first');
  }else{
    var next = current.next();
  }
  var nextHref = next.find('a').attr('href');

  //pause the slideshow on mouse over
  $('ul.slideshow').hover(
    function () {
      showSlides = false;
    },
    function () {
      showSlides = true;
    }
  );
  slideSpeed = speed;
  checkImg(href!=nextHref ? true : false);
}

function gallery() {
  if(showSlides==false){
    setTimeout('gallery()',slideSpeed);
    return;
  }
  //if no IMGs have the show class, grab the first image
  var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('ul.slideshow li:first'));
  if(current.next().attr('id') == 'slideshowCaption'){
    var next = $('ul.slideshow li:first');
  }else{
    var next = current.next();
  }
  //Get next image caption
  var title = next.find('img').attr('title');
  var desc = next.find('img').attr('alt');
  var button = next.find('a').attr('title');
  var href = next.find('a').attr('href');

  if(next.next().attr('id') == 'slideshowCaption'){
    var nextnext = $('ul.slideshow li:first');
  }else{
    var nextnext = next.next();
  }
  var nextLink = nextnext.find('a').attr('href');

  $('#slideshowCaption h3').html(title);
  $('#slideshowCaption p').html(desc);
  $('#slideshowButton a').html(button);
  $('#slideshowButton a').attr('href',href);
  $('#slideshowFade a').attr('href',href);

  current.removeClass('show');
  next.addClass('show');

  if(nextLink!=href)
    setTimeout('fade()',slideSpeed);
  else
    setTimeout('gallery()',slideSpeed);
}