// API
const API_URL = 'https://api.redarm.red/redarm/';

// Regions arr
var regions = [];

// Modal row
var rmModal = new Modal();

$(document).ready(function(e) {
  var form = $('#form'),
      legalFormItem = $('.legal-form-option').children('ul').children('li');
 
  // !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
  // $('.form__tel').mask("+7(999)999-99-99");
  
  //Получает список регионов
  $.ajax({
    type: 'GET',
    url: API_URL + 'api/v1/regions/3',
    success: function(data) {
      regions = data.map(function(item) {
        return item.title;
      })
      pushRegionsList();
    },
  })


  //Заполняет селект списком регионов
  function pushRegionsList() {
    for(var i = 0; i < regions.length; i++) {
      $('.regions-list').append('<li>' + regions[i] + '</li>')
    }
    //Создаются обработчики событий на селекты, когда регионы получены
    var legalAddressItem = $('.legal-address-option').children('ul').children('li');
    var actualAddressItem = $('.actual-address-option').children('ul').children('li');

    legalAddressItem.click(setItem);
    actualAddressItem.click(setItem);
  }


  /*
    При закрытии и восстановлении страницы в браузере, значения в инпутах сохраняются.
    Данная функция проверяет инпуты и навешивает на них классы, если инпуты не пустые
  */
  if (form && form.length) {
    setClassesRediscovery();
  }

  function setClassesRediscovery() {
    var NUMBER_INPUTES = 39,
        input = $(':input');

    for(var i = 0; i <= NUMBER_INPUTES; i++) {
      if (input[i].value !== '') {
        $(input[i]).addClass('input-fill');
      }
    }
  }


  /* 
      Показ/скрытие селектов. При открытие/скрытии одного селекта, происходит 
    добавление/удаление классов для поведения подсказки и нижней красной плашки.
      Также удаляются классы у другого селекта. 
      Добавление класса input-fill-select происходит при выборе элемента из списка,
    чтобы зафиксировать подсказку и плашку.
  */
  $('.legal-form').click(function(e) {
    $('.legal-region-input, .legal-region-input').removeClass('input-fill-select');
    $('.legal-address-arrow, .actual-address-arrow').hide();
    $('.legal-address-option, .actual-address-option').hide();
    $('.legal-form-input').toggleClass('input-fill-select');
    $('.legal-form-arrow').toggle();
    $('.legal-form-option').toggle();
  })

  $('.legal-region').click(function(e) {
    $('.legal-form-input, .actual-region-input').removeClass('input-fill-select');
    $('.legal-form-arrow, .actual-address-arrow').hide();
    $('.legal-form-option, .actual-address-option').hide();
    $('.legal-region-input').toggleClass('input-fill-select');
    $('.legal-address-arrow').toggle();
    $('.legal-address-option').toggle();
  })

  $('.actual-region').click(function(e) {
    $('.legal-form-input, .legal-region-input').removeClass('input-fill-select');
    $('.legal-form-arrow, .legal-address-arrow').hide();
    $('.legal-form-option, .legal-address-option').hide();
    $('.actual-region-input').toggleClass('input-fill-select');
    $('.actual-address-arrow').toggle();
    $('.actual-address-option').toggle();
  })


  //Установка значения в селект
  legalFormItem.click(setItem);

  function setItem(e) {
    var selectItemValue = this.innerHTML;

    $(this).parent().parent().parent().children('input').addClass('input-fill').val(selectItemValue)
  }


  //Делают инпуты активными
  $(':input').change(inputFill)

  function inputFill(e) {
    if (e.target.value) {
      $(this).addClass('input-fill')
    }
    else {
      $(this).removeClass('input-fill')
    }
  }


  //Вызывают функцию, разрешающую ввод только чисел
  $('.form__kpp').on('keypress', setValue);
  $('.form__index').on('keypress', setValue);
  $('.form__city-code').on('keypress', setValue);
  $('.form__city-tel').on('keypress', setValue);

  function setValue(e) {
    if (e.which < 48 || e.which > 57) return false;
  }


  //Блокирует/разблокирует кнопку  при нажатии чекбокса пользовательского соглашения
  $('#agreement').change(unblocked);
  $('#send-info').change(unblocked);
  $('#send-partner').change(unblocked);
  $('#subscribe').change(unblockedWhite);

  function unblocked(e) {
    if($(this).prop('checked')) {
      $('.btn-submit-' + this.id).removeClass('btn--blocked');
    } else {
      $('.btn-submit-' + this.id).addClass('btn--blocked');
    }
  }

  function unblockedWhite(e) {
    if($(this).prop('checked')) {
      $('.btn-submit-' + this.id).removeClass('btn--blocked-white');
    } else {
      $('.btn-submit-' + this.id).addClass('btn--blocked-white');
    }
  }

  $(':input[type=email]').on('keyup change', function() {
    $(this).val($(this).val().toLowerCase())
  })

})
