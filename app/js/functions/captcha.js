// gRecaptcha
var formCaptcha,
    partnerInfoCaptcha,
    subscribeNewsCaptcha,
    sendPresentationCaptcha;

// Колбек функции которые вызывает капча
var onloadReCaptchaInvisible = function() {

  // Анкета
  if ($('.form').is(':visible')) {
    formCaptcha = grecaptcha.render('gRecaptcha_form', {
      "sitekey":"6LcD1GkUAAAAABmo-PTRsPvQ9CnssWCVoe5WkCQq",
      "callback": "onSubmitForm",
      "size":"invisible"
    });
  };

  // Информация о партнере
  if ($('.partner-info').is(':visible')) {
    partnerInfoCaptcha = grecaptcha.render('idPartnerInfo', {
      "sitekey":"6LcD1GkUAAAAABmo-PTRsPvQ9CnssWCVoe5WkCQq",
      "callback": "onSubmitPartnerInfo",
      "size":"invisible"
    });
  };

  // Отправить презентацию
  if ($('.send-presentation').is(':visible')) {
    sendPresentationCaptcha = grecaptcha.render('idSendPresentation', {
      "sitekey":"6LcD1GkUAAAAABmo-PTRsPvQ9CnssWCVoe5WkCQq",
      "callback": "onSubmitSendPresentation",
      "size":"invisible"
    });
  };

  // Подписка на новости
  if ($('.subscribe-news').is(':visible')) {
    subscribeNewsCaptcha = grecaptcha.render('idSubscribeNews', {
      "sitekey":"6LcD1GkUAAAAABmo-PTRsPvQ9CnssWCVoe5WkCQq",
      "callback": "onSubmitSubscribeNews",
      "size":"invisible"
    });
  };  
}


// Анкета
function onSubmitForm(token) {
  $.ajax({
    type: 'GET',
    url: API_URL + '/api/v1/captcha',
    data: { userToken: token },
    success: function(flag) {
      if (flag) {
        if (arrayFiles instanceof Array && arrayFiles.length) {
          postFormData(formsData.content);
        }
        else {
          modalShow(formsData.content, confirm);          
        }
      }
    }
  })
};


// Информация о партнере
function onSubmitPartnerInfo(token) {
  $.ajax({
    type: 'GET',
    url: API_URL + '/api/v1/captcha',
    data: { userToken: token },
    success: function(flag) {
      if (flag) {
        postPartnerInfo(formsData.content);
      }
    }
  })
};


// Отправить презентацию
function onSubmitSendPresentation(token) {
  $.ajax({
    type: 'GET',
    url: API_URL + '/api/v1/captcha',
    data: { userToken: token },
    success: function(flag) {
      if (flag) {
        postPresentation(formsData.content);
      }
    }
  })
};


// Подписка на новости
function onSubmitSubscribeNews(token) {
  $.ajax({
    type: 'GET',
    url: API_URL + '/api/v1/captcha',
    data: { userToken: token }, 
    success: function(flag) {
      if (flag) {
        postSubscribeNews(formsData.content);
      }
    }
  })
};
