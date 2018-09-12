var requiredField = 'Обязательное поле',
    correctEmail = 'Некорректный E-mail',
    correctTel = 'Некорректный номер',
    form = $('.form'),
    partnerInfo = $('.partner-info'),
    sendPresentation = $('.send-presentation'),
    subscribeNews = $('.subscribe-news');


// Обьект что бы перебрасывать данные в функцию колбека каптчи
var formsData = {
  content: null,
};

//Валидация для номера телефона https://habr.com/post/110731/
$.validator.methods.phone = function( value, element ) { 
  return this.optional( element ) || /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,17}$/.test( value );
}
//Валидация email
$.validator.methods.email = function( value, element ) {
  return this.optional( element ) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test( value );
}

// Анкета
form.validate({
  rules: {
    cityCompanyMobile: {
      phone: true,
    },
    emailCompany: {
      email: true,
    },
    phoneCompanyMobile: {
      phone: true,
    },
    commDirEmail: {
      email: true,
    },
    marketingDirEmail: {
      email: true,
    },
    purchaseDirEmail: {
      email: true,
    },
    salesDirEmail: {
      email: true,
    },
    authorFullName: {
      required: true,
    },
    authorPhone: {
      required: true,
      phone: true,
    },
    authorEmail: {
      required: true,
      email: true,
    },
  },

  messages: {
    inn: {
      minlength: 'введите не менее 10-ти символов',
    },
    cityCode: {
      minlength: 'неверный код'
    },
    cityCompanyMobile: {
      phone: correctTel,
    },
    phoneCompanyMobile: {
      phone: correctTel,
    },
    emailCompany: {
      email: correctEmail,
    },
    commDirEmail: {
      email: correctEmail,
    },
    marketingDirEmail: {
      email: correctEmail,
    },
    purchaseDirEmail: {
      email: correctEmail,
    },
    salesDirEmail: {
      email: correctEmail,
    },
    authorFullName: {
      required: requiredField,
    },
    authorPhone: {
      required: requiredField,
      phone: correctTel,
    },
    authorEmail: {
      required: requiredField,
      email: correctEmail,
    },
    salesDirEmail: {
      email: correctEmail,
    },
  },

  submitHandler: function(form, event) {
    $(event.currentTarget).serializeObject('form');
  },
});

// Информация о партнере
partnerInfo.validate({
  rules: {
    authorPhone: { phone: true },
    authorEmail: { email: true },
    partnerPhone: { phone: true },
    partnerEmail: { email: true },
  },

  messages: {
    authorPhone: { phone: '' },
    authorEmail: { email: '' },
    partnerPhone: { phone: '' },
    partnerEmail: { email: '' },
  },
  
  invalidHandler: function(form, event) {
    rmModal.show({
      type: 'attention',
      title: 'Внимание',
      content: '<span class="rm-red-text">Указаны неверные контактные данные</span>',
      closeBtn: 'Ок',
    });
  },

  submitHandler: function(form, event) {
    $(event.currentTarget).serializeObject('partnerInfo');
  },
});

// Отправить презентацию
sendPresentation.validate({
  rules: {
    partnerEmail: {
      email: true,
    },
  },

  messages: {
    partnerEmail: {
      email: '',
    }
  },

  invalidHandler: function(form, event) {
    rmModal.show({
      type: 'attention',
      title: 'Внимание',
      content: '<span class="rm-red-text">Вы ввели неверный email</span>',
      closeBtn: 'Ок',
    });
  },

  submitHandler: function(form, event) {
    $(event.currentTarget).serializeObject('sendPresentation');
  },
});

// Подписка на новости
subscribeNews.validate({
  rules: {
    email: {
      email: true,
    },
  },

  messages: {
    email: {
      email: '',
    }
  },

  invalidHandler: function(form, event) {
    rmModal.show({
      type: 'attention',
      title: 'Внимание',
      content: '<span class="rm-red-text">Вы ввели неверный email</span>',
      closeBtn: 'Ок',
    });
  },

  submitHandler: function(form, event) {
    $(event.currentTarget).serializeObject('subscribeNews');
  },
});

// Создает обьект для отправки данных формы на сервер
// и вызывает колбек каптчи из captcha.js
$.fn.serializeObject = function(type) {
  var obj = {},
      arr = this.serializeArray();

  arr.forEach(function(item, index) {
    if (item.value === '') return; 
    if (obj[item.name] === undefined) {
        obj[item.name] = item.value || '';
    } 
    else {
      if (!obj[item.name].push) {
        obj[item.name] = [obj[item.name]];
      }
      obj[item.name].push(item.value || '');
    }
  });

  switch(type) {
    case 'form':
      // Записывает свойство obj в глобальный обьект
      // для передачи в колбек каптчи
      formsData.content = obj;

      // Если пользователь выбрал прикрепить файлы в модалке
      // сбрасываем каптчу 
      if (grecaptcha.getResponse(formCaptcha)) {
        grecaptcha.reset(formCaptcha);
      }

      // Запускаем колбек каптчи для проверки и 
      // дальнейшей работы
      grecaptcha.execute(formCaptcha);
      break;

    case 'partnerInfo':
      if (obj.hasOwnProperty('authorFullName') && (obj.hasOwnProperty('authorPhone') || obj.hasOwnProperty('authorEmail')) 
          && (obj.hasOwnProperty('partnerPhone') || obj.hasOwnProperty('partnerEmail'))) {
          // Записывает свойство obj в глобальный обьект
          // для передачи в колбек каптчи
          formsData.content = obj;

          // Обработка ошибок
          if (grecaptcha.getResponse(partnerInfoCaptcha)) {
            grecaptcha.reset(partnerInfoCaptcha);
          }

          // Запускаем колбек каптчи для проверки и 
          // дальнейшей работы
          grecaptcha.execute(partnerInfoCaptcha);
      }
      else {
        rmModal.show({
          type: 'attention',
          title: 'Внимание',
          content: '<span class="rm-red-text">Вы заполнили не все данные формы</span>',
          closeBtn: 'Ок',
        });
      };
      break;

    case 'sendPresentation':
      if (obj.hasOwnProperty('partnerEmail')) {
          // Записывает свойство obj в глобальный обьект
          // для передачи в колбек каптчи
          formsData.content = obj;

          // Обработка ошибок
          if (grecaptcha.getResponse(sendPresentationCaptcha)) {
            grecaptcha.reset(sendPresentationCaptcha);
          }

          // Запускаем колбек каптчи для проверки и 
          // дальнейшей работы
          grecaptcha.execute(sendPresentationCaptcha);
      }
      else {
        rmModal.show({
          type: 'attention',
          title: 'Внимание',
          content: '<span class="rm-red-text">Вы не указали E-mail</span>',
          closeBtn: 'Ок',
        });
      };
      break;

    case 'subscribeNews':     
      if (obj.hasOwnProperty('email')) {
        // Записывает свойство obj в глобальный обьект
        // для передачи в колбек каптчи
        formsData.content = obj;

        // Обработка ошибок
        if (grecaptcha.getResponse(subscribeNewsCaptcha)) {
          grecaptcha.reset(subscribeNewsCaptcha);
        }
        
        // Запускаем колбек каптчи для проверки и 
        // дальнейшей работы
        grecaptcha.execute(subscribeNewsCaptcha);
      }
      else {
        rmModal.show({
          type: 'attention',
          title: 'Внимание',
          content: '<span class="rm-red-text">Вы не указали E-mail</span>',
          closeBtn: 'Ок',
        });
      };
      break;
  }
};
