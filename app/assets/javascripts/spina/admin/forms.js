$(document).on('click', '.structure-form-menu ul li a', function (e) {
  var $structureForm
  $structureForm = $(this).parents('.structure-form')
  $(this).parent('li').siblings().removeClass('active')
  $(this).parent('li').addClass('active')
  $structureForm.find('.structure-form-pane').removeClass('active')
  $($(this).attr('href')).addClass('active')
  return e.preventDefault()
})
