jQuery(document).ready(function($) {
    crhp.BoxHeightAlign.init();

    $(window).on("resize", function(event) {
        crhp.BoxHeightAlign.update();
    });
});