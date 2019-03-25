var ready

$(document).on('direct-uploads:start', 'form', function (e) {
  return $(this).find('.customfile').addClass('loading')
})

$(document).on('direct-uploads:end', 'form', function (e) {
  return $(this).find('.customfile').removeClass('loading')
})

$(document).on('direct-upload:progress', 'input', function (e) {
  return console.log(e.detail.progress)
})

$(document).on('change', 'input[type="file"]', function (e) {
  var $form
  $form = $(this).parents('form')
  return $form.find('input[type="submit"]').click()
})

$(document).on('click', '.organize-switch', function (e) {
  var $items, disabled
  $items = $('.gallery .infinite-scroll .item')
  disabled = $items.draggable('option', 'disabled')
  if (disabled) {
    $(this).addClass('button-success')
    $(this).text($(this).attr('data-done-organizing'))
    $(this).prepend('<i class="icon icon-random"></i>')
  } else {
    $(this).removeClass('button-success')
    $(this).text($(this).attr('data-organize-images'))
    $(this).prepend('<i class="icon icon-random"></i>')
  }
  $items.draggable('option', 'disabled', !disabled)
  return e.preventDefault()
})

ready = function () {
  $('.media-folder').droppable({
    drop: function (event, ui) {
      var image_id, url
      url = $(this).attr('data-add-to-media-folder-url')
      image_id = $(ui.draggable).find('input[type="radio"]').val()
      return $.ajax({
        url: url,
        type: 'PUT',
        data: {
          image_id: image_id
        },
        dataType: 'json',
        success: (function (_this) {
          return function (result) {
            var imageCount, imgSrc
            $(ui.draggable).addClass('dropped').fadeOut()
            imageCount = parseInt($(_this).find('.media-folder-thumbnail').attr('data-badge'))
            imgSrc = $(ui.draggable).find('img').attr('src')
            $(_this).removeClass('dropping')
            $(_this).find('.media-folder-thumbnail').attr('data-badge', imageCount + 1)
            return $(_this).find('.media-folder-thumbnail img').attr('src', imgSrc)
          }
        })(this)
      })
    },
    over: function (event, ui) {
      $(ui.draggable).addClass('dropping')
      return $(this).addClass('dropping')
    },
    out: function (event, ui) {
      $(ui.draggable).removeClass('dropping')
      return $(this).removeClass('dropping')
    }
  })
  return $('.gallery .infinite-scroll .item').draggable({
    revert: 'invalid',
    disabled: true
  })
}

$(document).on('turbolinks:load', ready)
