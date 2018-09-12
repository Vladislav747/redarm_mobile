var arrayFiles = [];

$(document).ready(function(e) {
  var counter = 0;

	$('#btn').change(loadFiles);
  $('.select-files').on('dragenter', handleDragEnter).on('dragover', handleDragOver).on('dragleave', handleDragLeave).on('drop', dropFiles);

	function loadFiles(e) {
    fileSelect(this.files)
  }

	//Загружает файлы через кнопку или drop
	function fileSelect(files) {
    var countFiles = files.length,
        exceededMaxSize = false,
        invalidExtension = false,
        maxSizeFiles = 4194304;//байт (4мб)
        // maxSizeFiles = 26214400;//25мб

    if (countFiles === 0) return;

    //Проверяет, превышает ли хоть один файл, максимально допустимый размер (25мБ)
    for (var i = 0; i < countFiles; i++) {
      if (files[i].size > maxSizeFiles) {
        exceededMaxSize = true;
        break;
      }
    }

    //Проверяет допустимые расширения файлов
    for (var i = 0; i <countFiles; i++ ) {
      var parseNameFiles = files[i].name.split('.'),
          typeFiles = parseNameFiles[parseNameFiles.length - 1].toLowerCase();

      if (typeFiles == 'pdf' || typeFiles == 'doc' || typeFiles == 'docx' || typeFiles == 'xls' || 
          typeFiles == 'xlsx' || typeFiles == 'jpg' || typeFiles == 'jpeg' ||typeFiles == 'png') continue;
          // typeFiles == 'tif' || typeFiles == 'tiff')
      else {  
        invalidExtension = true;
        break
      }
    }

    if (exceededMaxSize) {
      rmModal.show({
        type: 'attention',
        title: 'Внимание',
        content: '<span class="rm-red-text">Превышен допустимый размер файла (4мБ)</span>',
        closeBtn: 'Ок',
      });

      if (!arrayFiles.length) resetDragAndDrop();
      return
    }

    if (invalidExtension) {
      rmModal.show({
        type: 'attention',
        title: 'Внимание',
        content: '<span class="rm-red-text">Неверный формат файла</span>',
        closeBtn: 'Ок',
      });
      if (!arrayFiles.length) resetDragAndDrop();
      return
    }

    function resetDragAndDrop() {
      $('.select-files-value').hide();
      $('.select-files-load').show();
      $('.form__files').removeClass('form__files--drop')
      $('.files-img--drop').hide();
      $('.files-img').show();
    }

    //Заполняет список и массив прикрепляемыми файлами для отправки
		for (var i = 0; i < countFiles; i++) {
      files[i].id = counterFiles();
			arrayFiles.push(files[i]);
      $('#ul').append('<li index="' + files[i].id + '">' + files[i].name + '<div class="delete-files"></div></li>');
		}
    $('.select-files-load').hide();
    $('.select-files-value').show();
    $('.form__files').addClass('form__files--drop');
		$('.files-count').text('Файлов загружено: ' + arrayFiles.length)
    $('.select-files-check').text('Файлы загружены')
    //Обновляем input type='file'
    $('#btn').val('')

    $('.delete-files').click(deleteFiles);
  }

	function dropFiles(e) {
		e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    fileSelect(files)
  }
  
  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  //Меняет поле, когда перетаскиваемый элемент находится в его области
  function handleDragEnter() {
    if (arrayFiles.length) return
    counter++
    $('.form__files').addClass('form__files--drop')
    $('.files-img').hide();
    $('.files-img--drop').show();
  }

  // TODO костыль
  var getCounterFiles = function() {
    var count = 0;

    return function() {
      return count++;
    }
  }

  var counterFiles = getCounterFiles();

  //Удаляет файлы из массива, и очищает список
  function deleteFiles() {
    var deleteFile = $(this).parent().attr('index'),
      newArrayFiles;

    newArrayFiles = arrayFiles.filter(function(item) {
      return item.id != deleteFile
    })
    arrayFiles = newArrayFiles
    $(this).parent().remove();
    $('.files-count').text('Файлов загружено: ' + arrayFiles.length)
    if (arrayFiles.length === 0) {
      resetFiles()
    }
  }

  //Меняет поле когда перетаскиваемый элемент покадает его область
  function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();    
    
    if (arrayFiles.length) return
    counter--;
    if (counter === 0) {
      $('.form__files').removeClass('form__files--drop')
      $('.files-img--drop').hide();
      $('.files-img').show();
    }
  }
})
