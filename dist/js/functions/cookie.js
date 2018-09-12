function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}


// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

(function() {
  if (getCookie('cookieNotification') == undefined) {
    setCookie('cookieNotification', true, {
      // expires: 10,
      expires: 3600 * 24,
    })
  }
}());



$(document).ready(function(e) {
  //Создает блок, предупреждающий об использовагии куки
  function createCookieBlock() {

    var cookieBlock = document.createElement('div');
      cookieBlockContent = document.createElement('div');
      cookieBlockText = document.createElement('div');
      cookieBlockBtn = document.createElement('div');
      cookieBlockFirstParagraph = document.createElement('p');
      cookieBlockLastParagraph = document.createElement('p');
      cookieBlockButton = document.createElement('button');

    $(cookieBlock).addClass('cookie-notification');
    $(cookieBlockContent).addClass('main__content cookie-notification__content');
    $(cookieBlockText).addClass('cookie-notification__text');
    $(cookieBlockBtn).addClass('cookie-notification__btn');
    $(cookieBlockButton).addClass('cookie-ok btn--white');

    $(cookieBlockFirstParagraph).html(' ООО «РэдАрм» использует <a href="user-agreement.html">cookie</a> ' +
    '(файлы с данными о прошлых посещениях сайта) для персонализации сервисов и удобства пользователей. ' +
    'Вы можете запретить сохранение cookie в настройках своего браузера.');
    $(cookieBlockLastParagraph).html('ООО «РэдАрм» серьезно относится к защите персональных данных — ознакомьтесь ' +
    'с <a href="privacy-policy.html">условиями и принципами их обработки</a>.');
    $(cookieBlockButton).text('понятно');

    $(cookieBlockText).append(cookieBlockFirstParagraph).append(cookieBlockLastParagraph);
    $(cookieBlockBtn).append(cookieBlockButton);
    $(cookieBlockContent).append(cookieBlockText).append(cookieBlockBtn);
    $(cookieBlock).append(cookieBlockContent);

    return cookieBlock;
  }


  //Показывает блок о использовании куки и скрывает его на сутки
  if (getCookie('cookieNotification') == 'true') {
    // $('.cookie-notification').removeClass('display_none');
    $('.wrapper').append(createCookieBlock())
  }

  $('.cookie-ok').click(function() {
    // $('.cookie-notification').addClass('display_none');
    $('div.cookie-notification').remove();
    setCookie('cookieNotification', false, {
      // expires: 10,
      expires: 3600 * 24,
    })
  })
})


