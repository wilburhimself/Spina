$(document).on("click", ".notification [data-close-notification]", function(e) {
  var $notification
  $notification = $(this).parents(".notification")
  $notification.removeClass("fadeInRight").addClass("fadeOutRight")
  setTimeout(function() {
    return $notification.remove()
  }, 400)
  return e.preventDefault()
})
