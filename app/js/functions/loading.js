function loadingElement() {
  var wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'loading-wrapper');

  var loading = document.createElement('div');
  loading.setAttribute('class', 'loading');

  wrapper.appendChild(loading);

  return wrapper;
}


function Loading(action) {

  var body = $('body');

  if (action) {

    if (!body.hasClass('blur')) {
      body.addClass('blur');
    }

    if (!body.hasClass('overflow-hidden')) {
      body.addClass('overflow-hidden');
    }

    if (!$('.loading-wrapper').is(':visible')) {
      body.append(loadingElement());
    }
  }
  
  if (!action) {
    if (body.hasClass('blur')) {
      body.removeClass('blur');
    }

    if (body.hasClass('overflow-hidden')) {
      body.removeClass('overflow-hidden');
    }

    if ($('.loading-wrapper').is(':visible')) {
      $('.loading-wrapper').remove();
    }
  }
}
