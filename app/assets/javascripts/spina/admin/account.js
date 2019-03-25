var ready, show_layout_parts

ready = function () {
  var layout_parts
  if ($('.account-theme').length > 0) {
    layout_parts = $('.account-theme').data('layout-parts')
    return show_layout_parts(layout_parts)
  }
};

$(document).on('turbolinks:load', ready)

$(document).on('change', '.account-theme select', function () {
  var layout_parts
  layout_parts = $(this).find('option:selected').data('layout-parts').split(" ")
  return show_layout_parts(layout_parts)
});

show_layout_parts = function (layout_parts) {
  var i, layout_part, len, results
  $('tr.layout-part').hide()
  results = []
  for (i = 0, len = layout_parts.length; i < len; i++) {
    layout_part = layout_parts[i]
    if (layout_part) {
      results.push($('tr.layout-part[data-name=' + layout_part + ']').show())
    } else {
      results.push(void 0)
    }
  }
  return results
}
