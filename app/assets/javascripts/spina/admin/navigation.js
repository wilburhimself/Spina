var delay, navigationTimer, ready

ready = function () {
  if ($('nav#primary ul li ul li.active').length > 0) {
    $('nav#primary > ul > li').removeClass('active')
    return $('nav#primary ul li ul li.active').parents('li').addClass('active')
  }
}

$(document).on('turbolinks:load', ready)

$(document).on('click', 'nav#primary a.back-to-main-menu', function (e) {
  $('nav#primary').addClass('animated')
  $('nav#primary').removeClass('transformed')
  return e.preventDefault()
})

$(document).on('click', 'nav#primary a:not(.back-to-main-menu)', function (e) {
  $('nav#primary ul li ul li').removeClass('active')
  $(this).parent().addClass('active')
  return clearTimeout(navigationTimer)
})

$(document).on('click', 'nav#primary > ul > li > a', function (e) {
  if ($(this).parent().find('ul').length > 0) {
    e.preventDefault()
    $(this).parent().siblings().removeClass('active')
    return $(this).parent().addClass('active')
  }
})

$(document).on('click', 'nav#primary:not(.transformed) > ul > li > a', function (e) {
  return $('nav#primary').addClass('animated').addClass('transformed')
})

$(document).on('click', 'nav#primary.transformed > ul > li > a', function (e) {
  $('nav#primary').removeClass('animated')
  $('nav#primary ul li ul li').removeClass('active')
  return $(this).parent().find('ul li:first-child').addClass('active')
})

delay = 200

navigationTimer = null

$(document).on('mouseenter', 'nav#primary.transformed > ul > li:not(.active) > a', function (e) {
  return navigationTimer = setTimeout(function () {
    $('nav#primary').addClass('animated')
    return $('nav#primary').removeClass('transformed')
  }, delay)
})

$(document).on('mouseleave', 'nav#primary.transformed > ul > li:not(.active) > a', function (e) {
  return clearTimeout(navigationTimer)
})
