var closeDropdown, forceRedraw, listen

listen = function (el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler)
  } else {
    el.attachEvent('on' + event, function () {
      return handler.call(el)
    })
  }
  return closeDropdown()
}

$(document).on('click', '[data-trigger="dropdown"]', function () {
  var body, dropdown, trigger
  trigger = $(this)
  dropdown = $(trigger.attr('data-target'))
  body = $('body')
  if (body.hasClass('dropdown')) {
    trigger.removeClass('button-active')
    body.removeClass('dropdown')
    dropdown.removeClass('animated fadeInDown')
  } else {
    dropdown.removeClass('no-animation')
    trigger.addClass('button-active')
    body.addClass('dropdown')
    dropdown.addClass('animated fadeInDown')
  }
  return false
})

$(document).on('click', '[data-dropdown] ul, [data-dropdown] .sliding-dropdown', function (e) {
  return e.stopPropagation()
})

$(document).on('click', '.slide-controls .previous, .slide-controls .next', function (e) {
  var active_title, next, previous, sliding_dropdown, target
  e.preventDefault()
  sliding_dropdown = $(this).parents('.sliding-dropdown')
  active_title = sliding_dropdown.find('.slide-title.active')
  previous = active_title.prev('.slide-title')
  next = active_title.next('.slide-title')
  if ($(this).hasClass('previous') && previous.length > 0) {
    sliding_dropdown.find('.slide-title').removeClass('active')
    previous.addClass('active')
    target = previous.data('target')
    sliding_dropdown.find('.slide').removeClass('active')
    $(target).addClass('active')
  } else if ($(this).hasClass('next') && next.length > 0) {
    sliding_dropdown.find('.slide-title').removeClass('active')
    next.addClass('active')
    target = next.data('target')
    sliding_dropdown.find('.slide').removeClass('active')
    $(target).addClass('active')
  }
  if (sliding_dropdown.find('.slide-title.active').next('.slide-title').length > 0) {
    sliding_dropdown.find('.next').removeClass('muted')
  } else {
    sliding_dropdown.find('.next').addClass('muted')
  }
  if (sliding_dropdown.find('.slide-title.active').prev('.slide-title').length > 0) {
    sliding_dropdown.find('.previous').removeClass('muted')
  } else {
    sliding_dropdown.find('.previous').addClass('muted')
  }
  sliding_dropdown.addClass('no-animation')
  return forceRedraw(sliding_dropdown[0])
})

closeDropdown = function () {
  $('body').removeClass('dropdown')
  $('[data-dropdown] ul, [data-dropdown] .sliding-dropdown').removeClass('animated fadeInDown')
  $('[data-trigger="dropdown"]').removeClass('button-active')
  return false
}

forceRedraw = function (element) {
  var disp, trick
  disp = element.style.display
  element.style.display = 'none'
  trick = element.offsetHeight
  return element.style.display = disp
}