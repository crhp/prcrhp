jQuery(document).ready(function($) {
    crhp.BoxHeightAlign.init({
    	isAll:true
    });

    $(window).on("resize", function(event) {
        crhp.BoxHeightAlign.update();
    });
});
