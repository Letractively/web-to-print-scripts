var alphaPath    = '/common/slideshow/fade/';  // path to fade images

var slideSpeed   = 0;                          // delay time
var slideWidth   = 0;                          // slide width
var slideHeight  = 0;                          // slide height
var alphaImgs    = [];                         // fade images
var iCurrStep    = 0;                          // step of fading
var slideCount   = 0;                          // count of slides
var showSlides   = false;

function slideShow(delay,widthSlide,heightSlide){
  $(document).ready(function() {
    slideSpeed  = delay;
    slideWidth  = widthSlide;
    slideHeight = heightSlide;
    startShow();
  });
}

// check images load
function checkImg(fadeNext){
  var imgCounter=0;
  $('ul#slideshow li img').each(function(){
    if(this.complete==true && this.width>0) imgCounter++;
  });
  if(imgCounter>=slideCount){
    $('#slideshowFade img').attr('src',alphaImgs[0].src);
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

function startShow() {
  // load fade images
  alphaImgs[0] = new Image();
  alphaImgs[1] = new Image();
  alphaImgs[2] = new Image();
  alphaImgs[3] = new Image();
  alphaImgs[4] = new Image();
  alphaImgs[5] = new Image();
  alphaImgs[0].src = alphaPath + 'fade_0.png';
  alphaImgs[1].src = alphaPath + 'fade_10.png';
  alphaImgs[2].src = alphaPath + 'fade_20.png';
  alphaImgs[3].src = alphaPath + 'fade_35.png';
  alphaImgs[4].src = alphaPath + 'fade_50.png';
  alphaImgs[5].src = alphaPath + 'fade_100.png';
  
  // get count of slides
  var slideCount = $('ul#slideshow').children().size();
  
  //show first LI
  var current = $('ul#slideshow li:first');
  current.addClass('show');
  
  //append a LI item to the UL list for displaying caption
  $('ul#slideshow').append('<li id="slideshowCaption"><div><h3></h3><p></p></div></li>');
  $('ul#slideshow').append('<li id="slideshowButton"><a></a><p></p></li>');
  $('ul#slideshow').append('<li id="slideshowFade"><a><img src="'+alphaImgs[5].src+'" width="'+slideWidth+'" height="'+slideHeight+'" border="0" /></a></li>');
  $('ul#slideshow').show();

  //Get the caption of the first image from REL attribute and display it
  $('#slideshowCaption h3').html($('ul#slideshow a:first').find('img').attr('title'));
  $('#slideshowCaption p').html($('ul#slideshow a:first').find('img').attr('alt'));
  $('#slideshowButton a').html($('ul#slideshow a:first').attr('title'));
  $('#slideshowButton a').attr('href',$('ul#slideshow a:first').attr('href'));
  $('#slideshowFade a').attr('href',$('ul#slideshow a:first').attr('href'));

  //Display the caption
  $('#slideshowCaption').css({opacity: 0.7, bottom:0});
  //Display the button
  $('#slideshowButton').css({opacity: 1.0, bottom:0});

  var href = current.find('a').attr('href');
  if(current.next().attr('id') == 'slideshowCaption'){
    var next = $('ul#slideshow li:first');
  }else{
    var next = current.next();
  }
  var nextHref = next.find('a').attr('href');

  //pause the slideshow on mouse over
  $('ul#slideshow').hover(
    function () {
      showSlides = false;
    },
    function () {
      showSlides = true;
    }
  );
  checkImg(href!=nextHref ? true : false);
}

function gallery() {
  if(showSlides==false){
    setTimeout('gallery()',slideSpeed);
    return;
  }
  //if no IMGs have the show class, grab the first image
  var current = ($('ul#slideshow li.show')?  $('ul#slideshow li.show') : $('ul#slideshow li:first'));
  if(current.next().attr('id') == 'slideshowCaption'){
    var next = $('ul#slideshow li:first');
  }else{
    var next = current.next();
  }
  //Get next image caption
  var title = next.find('img').attr('title');
  var desc = next.find('img').attr('alt');
  var button = next.find('a').attr('title');
  var href = next.find('a').attr('href');

  if(next.next().attr('id') == 'slideshowCaption'){
    var nextnext = $('ul#slideshow li:first');
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