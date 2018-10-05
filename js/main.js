//// saerch-menu section

$(document).ready(function () {
  var searchBlock = $('.search-header__hidden');
  $(document).on('click', '.search-header', function () {
    searchBlock.slideToggle();
    return false;
  });
});
