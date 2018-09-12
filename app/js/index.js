// Inicialize Wow js
new WOW().init();

// TODO: это костыль, нужно делать корректную адаптацию 
// и убирать эту функцию
$(document).ready(function() {

  if($(window).width() < 800) {
    $('.wow').attr('data-wow-offset', '-200');
  }

  if($(window).width() < 600) {
    $('.wow').attr('data-wow-offset', '-500');
  }

  if($(window).width() < 500) {
    $('.wow').attr('data-wow-offset', '-1000');
  }
});

