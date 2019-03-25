$(document).on('click', '.gallery .item:not(.item-uploader)', function () {
  var $form, checkbox, checked, count, gallery
  gallery = $(this).parents('.gallery')
  if (gallery.data('multiselect') !== void 0) {
    $(this).toggleClass('selected')
    checkbox = $(this).find('input:checkbox')
    checkbox.prop("checked", !checkbox.prop("checked"))
    $form = $(this).closest('form')
    count = $form.find('.item.selected').size()
    if (count > 0) {
      return $form.find('.gallery-select-counter').text("(" + count + ")")
    } else {
      return $form.find('.gallery-select-counter').text("")
    }
  } else {
    checked = $(this).find('input').prop('checked')
    gallery.find('.item').removeClass('selected')
    gallery.find('.item input').prop('checked', false)
    if (!checked) {
      $(this).addClass('selected')
    }
    $(this).find('input').prop('checked', !checked)
    return $(this).closest('form').submit()
  }
})
