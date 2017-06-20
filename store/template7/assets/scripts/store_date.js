$(function() {

  var storeDateContainer = $('#store-date-container');
  var fixItem = $('.fixitem');
  var dateItemTimer = false;

  fixDateItems();
  
  $(window).resize(function() {
    if(dateItemTimer != false) {
      clearTimeout(dateItemTimer);
    }

    dateItemTimer = setTimeout(function() {
      fixDateItems();
    }, 200);
  });

    function fixDateItems () {
        $(storeDateContainer).each(function() {
          var maxHeight = 0;
          $(storeDateContainer).find(fixItem).each(function() {
            $(this).height("auto");
            if($(this).height() > maxHeight) {
              maxHeight = $(this).height();
            }
          });
          $(storeDateContainer).find(fixItem).height(maxHeight);
        });
    }
});