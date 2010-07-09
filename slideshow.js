var showSlides = true;
var slideSpeed = 2000;

$(document).ready(function() {
  slideShow(window.slideshow_speed ? window.slideshow_speed : 2000);
});

function checkImg(){
  var imgCounter=0;
  $('ul.slideshow li img').each(function(){
    if(this.complete==true) imgCounter++;
  });
  if(imgCounter>50) gallery();
  else setTimeout(checkImg,1000);
}

function slideShow(speed) {
  //show first LI
  $('ul.slideshow li:first').addClass('show');

  //append a LI item to the UL list for displaying caption
  $('ul.slideshow').append('<li id="slideshowCaption"><div><h3></h3><p></p></div></li>');
  $('ul.slideshow').append('<li id="slideshowButton"><a></a><p></p></li>');

  //Set the opacity of all images to 0
  $('ul.slideshow li').css({opacity: 0.0});

  //Get the first image and display it (set it to full opacity)
  $('ul.slideshow li:first').css({opacity: 1.0});

  //Get the caption of the first image from REL attribute and display it
  $('#slideshowCaption h3').html($('ul.slideshow a:first').find('img').attr('title'));
  $('#slideshowCaption p').html($('ul.slideshow a:first').find('img').attr('alt'));
  $('#slideshowButton a').html($('ul.slideshow a:first').attr('title'));
  $('#slideshowButton a').attr('href',$('ul.slideshow a:first').attr('href'));

  //Display the caption
  $('#slideshowCaption').css({opacity: 0.7, bottom:0});

  //Display the button
  $('#slideshowButton').css({opacity: 1.0, bottom:0});

  //Call the gallery function to run the slideshow
  //var timer = setInterval('gallery()',speed);

  //pause the slideshow on mouse over
  $('ul.slideshow').hover(
    function () {
      //clearInterval(timer);
      showSlides = false;
    },
    function () {
      //timer = setInterval('gallery()',speed);
      showSlides = true;
      gallery();
    }
  );
  slideSpeed = speed;
  checkImg();
  //gallery();
}

function gallery() {

  if(!showSlides) return;

  //if no IMGs have the show class, grab the first image
  var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

  //Get next image, if it reached the end of the slideshow, rotate it back to the first image
  var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshowCaption')? $('ul.slideshow li:first') :current.next()) : $('ul.slideshow li:first'));

  //Get next image caption
  var title = next.find('img').attr('title');
  var desc = next.find('img').attr('alt');
  var button = next.find('a').attr('title');
  var href = next.find('a').attr('href');

  var curTitle = current.find('img').attr('title');
  var curDesc = current.find('img').attr('alt');
  var curButton = current.find('a').attr('title');

  //Set the fade in effect for the next image, show class has higher z-index
  next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);

  if (curButton!=button)
    //$('#slideshowButton span').animate({opacity: 0.0}, 300);
    $('#slideshowButton a').animate({opacity: 0.0}, 300);

  if (curDesc!=desc)
    $('#slideshowCaption p').animate({opacity: 0.0}, 300);

  if (curTitle!=title)
    $('#slideshowCaption h3').animate({opacity: 0.0}, 300);

  $('#slideshowButton p').animate({opacity: 0.0}, 300, function () {
    //Display the content
    $('#slideshowCaption h3').html(title);
    $('#slideshowCaption p').html(desc);
    $('#slideshowButton a').html(button);
    $('#slideshowButton a').attr('href',href);
    $('#slideshowCaption p').animate({opacity: 1.0}, 500);
    $('#slideshowCaption h3').animate({opacity: 1.0}, 500);
    $('#slideshowButton a').animate({opacity: 1.0}, 500);
    $('#slideshowButton p').animate({opacity: 1.0}, 500);
  });

  //Hide the current image
  current.animate({opacity: 0.0}, 1000).removeClass('show');
  
  setTimeout(gallery,slideSpeed);
}