$(document).ready(function(e) {
  
  var width = screen.width,
      height = screen.height;
  
  if ((width == 320 && height == 568) || (width == 375 && height == 667) || (width == 414 && height == 736)) { 
    $('.wrapper-menu').css({
      'height' : '1420px'
    }) 
  } 
  if (width == 375 && height == 812) { 
    $('.wrapper-menu').css({
      'height' : '1694px'
    })  
  } 
  if (width == 320 && height == 480) { 
    $('.wrapper-menu').css({
      'height' : '1056px'
    }) 
  } 
  if (width == 768 && height == 1024) { 
    $('.wrapper-menu').css({
      'height' : '1160px'
    }) 
  } 
  if (width == 1024 && height == 1366) { 
    $('.wrapper-menu').css({
      'height' : '1246px'
    }) 
  } 
})