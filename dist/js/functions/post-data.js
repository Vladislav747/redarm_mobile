//Отправляет информацию о партнере
function postPartnerInfo(obj) {
  $.ajax({
    type: 'POST',
    url: API_URL + 'api/v1/partnerinfo',
    data: obj,
    success: function() {
      rmModal.show({
        type: 'attention',
        title: 'Отправлено',
        content: '<span class="rm-red-text">Информация успешно отправлена</span>',
        closeBtn: 'Ок',
      });
      $('.partner-info')[0].reset();

      // Сбрасываем каптчу
      grecaptcha.reset(partnerInfoCaptcha);
    },
  })
}

//Отправляет e-mail для презентаци 
function postPresentation(obj) {
  $.ajax({
    type: 'POST',
    url: API_URL + 'api/v1/sendpresentation',
    data: obj,
    success: function() {
      rmModal.show({
        type: 'attention',
        title: 'Отправлено',
        content: '<span class="rm-red-text">Презентация успешно отправленна по указанному адресу</span>',
        closeBtn: 'Ок',
      });
      $('.send-presentation')[0].reset();

      // Сбрасываем каптчу
      grecaptcha.reset(sendPresentationCaptcha);
    },
  })
}

//Отправляет e-mail для подписки на новости 
function postSubscribeNews(obj) {
  $.ajax({
    type: 'GET',
    url: API_URL + 'api/v1/newsletter/activate?email=' + obj.email,
    success: function(response) {
      if (response) {
        rmModal.show({
          type: 'attention',
          title: 'Подписка',
          content: '<span class="rm-red-text">Подписка на новости прошла успешно</span>',
          closeBtn: 'Ок',
        });
        $('.subscribe-news')[0].reset();
      }
      else {
        rmModal.show({
          type: 'attention',
          title: 'Внимание',
          content: '<span class="rm-red-text">Для данного E-mail адреса уже оформлена подписка на новости.</span>',
          closeBtn: 'Ок',
        });
      }
      // Сбрасываем каптчу
      grecaptcha.reset(subscribeNewsCaptcha);
    },
  })
}

//Отправляет на сервер данные анкеты. Если есть приклепленные файлы, то вызывает postFiles()
function postFormData(obj) {
  $.ajax({
    type: 'POST',
    url: API_URL + 'api/v1/questionnaire',
    data: obj,
    success: function(contextId) { 
      if (arrayFiles instanceof Array && arrayFiles.length) {
        postFiles(contextId);
      }
      else {
        modalShow();
        postDataToMail(contextId);
      }
      $('.form')[0].reset();
      $(':input').removeClass('input-fill');

      // Сбрасываем каптчу
      grecaptcha.reset(formCaptcha);
    },
  });
}

//Отправляет файл или массив файлов на сервер
function postFiles(contextId) {
  Loading(true);
  var formData = new FormData();
  
  arrayFiles.forEach(function(item) {
    formData.set('file', item)
    $.ajax({
      type: 'POST',
      url: API_URL + 'api/v1/attachment/anyone?contextId=' + contextId + '&type=QuestionnaireAttach',
      data: formData,
      processData: false,
      contentType: false,
      success: function() {
        Loading(false);
        setTimeout(function() {        
          modalShow();
          resetFiles();
        }, 1000);
        postDataToMail(contextId);
      }
    })
  })
}

//Отправляет уведомление на почту
function postDataToMail(contextId) {
  $.ajax({
    type: 'GET',
    url: API_URL + 'api/v1/questionnaire/mail?questId=' + contextId,
  })
}

//Выводит модальное окно, подтвреждающее отправку анкеты
function modalShow(obj, confirm) {

  if (confirm) {
    rmModal.show({
      type: 'confirm',
      title: 'Внимание',
      content: 'modal-confirm.html',
      closeBtn: 'Вернуться и прикрепить файлы',
      confirmBtn: 'Отправить без вложений',
      handleConfirm: function() {
        postFormData(obj)
      }
    });
  }
  else {
    rmModal.show({
      type: 'attention',
      title: 'Внимание',
      content: '<span class="rm-red-text">Визитная карточка компании успешно отправлена на предварительную регистрацию</span>',
      closeBtn: 'Ок',
    });
  }
}

 //Сбрасывает файлы и приводит drag&drop в начальное состояние
 function resetFiles() {
  arrayFiles = [];
  $('.select-files-value').hide();
  $('.select-files-load').show();
  $('.form__files').removeClass('form__files--drop')
  $('#ul').children().remove();
  $('.files-img--drop').hide();
  $('.files-img').show();
}
