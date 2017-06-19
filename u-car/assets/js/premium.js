jQuery(document).ready(function($) {
  
    var BoxHeightAlign = crhp.BoxHeightAlign;


    var boxalignItem = new BoxHeightAlign($('.premium-about .premium-box-item-continer'));
    boxalignItem.init();

    $(window).on("resize", function(event) {
        boxalignItem.update();
    });
});
