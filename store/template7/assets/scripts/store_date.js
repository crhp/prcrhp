$(function() {

  var storeDateContainer = $("#store-date-container");
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

    var alignFixItems = $(storeDateContainer).find(".fixitem");
    for (var ii=0; ii < alignFixItems.length; ii+=2) {
      if (alignFixItems[ii+1] && $(alignFixItems[ii]).offset().top == $(alignFixItems[ii+1]).offset().top) {
        var fixItem = $(alignFixItems[ii]);
        var nextFixItem = $(alignFixItems[ii+1]);
        if (fixItem.height() <= nextFixItem.height()) {
          fixItem.height( nextFixItem.height() );
        } else {
          nextFixItem.height(fixItem.height());
        }
      }
    }
  }

});