var slides       = [];
var preload      = [];
var alphaPath    = '/common/slideshow/fade/';  // path to fade images
var alphaImgs    = [];                         // fade images
var slideSpeed   = 0;                          // delay time
var iCurrStep    = 0;                          // step of fading
var iCurrSlide   = 0;                          // step of fading
var slideCount   = 0;                          // count of slides
var showSlides   = false;


function slideShow(delay,widthSlide,heightSlide){
  if(delay < 1000) delay = 1000;
  $(document).ready(function() {
    prepareSlideShow(delay,widthSlide,heightSlide);
  });
}

function prepareSlideShow(delay,widthSlide,heightSlide) {
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
  slideCount = $('ul#slideshow').children().size();
  
  $('ul#slideshow').css("width",widthSlide);
  $('ul#slideshow').css("height",heightSlide);
  
  $('ul#slideshow li').each(function(){
    _src    = $(this).find('img').attr('src');
    _descr  = $(this).find('img').attr('alt');
    _title  = $(this).find('img').attr('title');
    _button = $(this).find('a').attr('title');
    _href   = $(this).find('a').attr('href');
    slides.push({'src': _src, 'href': _href, 'title': _title, 'descr': _descr, 'button': _button});
  });
  $('ul#slideshow li').remove();
  
  // load fade images
  n = (slideCount>5 ? 5 : slideCount);
  for(i=0; i<n; i++){
    preload[i] = new Image();
    preload[i].src = slides[i].src;
  }

  slideSpeed = delay;
  
  //append a LI item to the UL list for displaying caption
  $('ul#slideshow').append('<li id="slideshowCaption" style="width:'+widthSlide+'px;"><div><h3></h3><p></p></div></li>');
  $('ul#slideshow').append('<li id="slideshowButton"><a></a></li>');
  $('ul#slideshow').append('<li id="slideshowFade"><a><img src="'+alphaImgs[0].src+'" width="'+widthSlide+'" height="'+heightSlide+'" border="0" /></a></li>');
  $('ul#slideshow').append('<li id="slideshowSlide"><img src="'+slides[0].src+'" width="'+widthSlide+'" height="'+heightSlide+'" border="0" /></li>');
  $('ul#slideshow').show();

  //Get the caption of the first image from REL attribute and display it
  $('#slideshowCaption h3').html(slides[0].title);
  $('#slideshowCaption p').html(slides[0].descr);
  $('#slideshowButton a').html(slides[0].button);
  $('#slideshowButton a').attr('href',slides[0].href);
  $('#slideshowFade a').attr('href',slides[0].href);

  //Display the caption
  //$('#slideshowCaption').css({opacity: 0.7, bottom:0});
  //Display the button
  //$('#slideshowButton').css({opacity: 1.0, bottom:0});

  var href = slides[0].href;
  var nextHref = slides[1].href;

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

// check images load
function checkImg(fadeNext){
  var imgCounter=0;
  for(i=0; i<6; i++){
    if(alphaImgs[i].complete==true && alphaImgs[i].width>0) imgCounter++;
  }
  for(i=0; i<preload.length; i++){
    if(preload[i].complete==true && preload[i].width>0) imgCounter++;
  }
  n = (slideCount>5 ? 5 : slideCount);
  if(imgCounter-6>=n){
    $('#slideshowSlide').addClass('show');
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
    gallery();
  }else{
    $('#slideshowFade img').attr('src',alphaImgs[iCurrStep].src);
    setTimeout('fade()',100);
  }
}

function gallery() {
  if(showSlides==false){
    setTimeout('gallery()',slideSpeed);
    return;
  }

  iCurrSlide++;
  if(iCurrSlide>=slideCount) iCurrSlide = 0;
  //Get next image caption
  var title = slides[iCurrSlide].title;
  var desc = slides[iCurrSlide].descr;
  var button = slides[iCurrSlide].button;
  var href = slides[iCurrSlide].href;
  var src = slides[iCurrSlide].src;

  var next = iCurrSlide + 1;
  if(next>=slideCount) next = 0;
  var nextLink = slides[next].href;

  $('#slideshowCaption h3').html(title);
  $('#slideshowCaption p').html(desc);
  $('#slideshowButton a').html(button);
  $('#slideshowButton a').attr('href',href);
  $('#slideshowFade a').attr('href',href);
  $('#slideshowSlide img').attr('src',src);

  if(preload.length<slideCount){
    preload[iCurrSlide+4] = new Image();
    preload[iCurrSlide+4] = slides[iCurrSlide+4].src;
  }
  
  setTimeout('fade_wait('+(nextLink==href)+')',50);
}

function fade_wait(flag){
  $('#slideshowFade img').attr('src',alphaImgs[0].src);
  if(flag==false)
    setTimeout('fade()',slideSpeed);
  else
    setTimeout('gallery()',slideSpeed);
}