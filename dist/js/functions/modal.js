function Modal() {

  this.mainBlock = $('.rm-modal');
  this.contentBlock = $('.rm-modal-content__body');
  this.controls = $('.rm-modal-controls');
  this.closeButton = $('.rm-modal-controls__close');
  this.confirmButton = $('.rm-modal-controls__confirm');

  const that = this;

  // Показываем модалку и запихаваем в неё контент
  this.show = function(args) {

    // @args params:
    // type (required): attention || confirm
    // title (required): header title
    // content (required): если это type attention то шлем просто строку
    // если confirm то шлём файлик с разметкой для ajax
    // closeBtn (required): Надпись на кнопке закрытия
    // confirmBtn: Надпись на кнопке подтвердить РАБОТАЕТ ТОЛЬКО С ТИПОМ confirm
    // handleConfirm: функция которую запустить РАБОТАЕТ ТОЛЬКО С ТИПОМ confirm

    if (this.mainBlock.hasClass('rm-modal-hide')) {
      this.mainBlock.removeClass('rm-modal-hide');
    }

    if (this.mainBlock.hasClass('rm-modal-confirm') && args.type !== 'confirm') {
      this.mainBlock.removeClass('rm-modal-confirm')
    }

    if (!$('body').hasClass('overflow-hidden')) {
      $('body').addClass('overflow-hidden');
    }

    if (!$('.wrapper').hasClass('blur')) {
      $('.wrapper').addClass('blur');
    }
  
    $('.rm-modal-content__header-title').html(args.title);
    this.closeButton.html(args.closeBtn);

    if (args.type === 'attention') {
      this.contentBlock.html(args.content);
    }
    
    if (args.type === 'confirm') {
      this.mainBlock.addClass('rm-modal-confirm');
      this.contentBlock.load(args.content);
      this.confirmButton.show();
      this.confirmButton.html(args.confirmBtn);

      this.confirmButton.off().one('click', function() {
        args.handleConfirm();
        closeModal();
      });
    }

    this.closeButton.off().one('click', function() {
      closeModal();
    })
  };

  // Скрываем модалку при клике вне
  $(document).mouseup(function(e) {
    var elem = $('.rm-modal-content');
    if (!elem.is(e.target)
        && elem.has(e.target).length === 0
        && elem.is(':visible')) {
      closeModal();
    }
  })

  // Закрытие модального окна
  function closeModal() {
    if (!that.mainBlock.hasClass('rm-modal-hide')) {
      that.mainBlock.addClass('rm-modal-hide');
    }

    if (that.confirmButton) {
      that.confirmButton.hide();
    }

    if ($('body').hasClass('overflow-hidden')) {
      $('body').removeClass('overflow-hidden');
    }

    if ($('.wrapper').hasClass('blur')) {
      $('.wrapper').removeClass('blur');
    }
  }
}
