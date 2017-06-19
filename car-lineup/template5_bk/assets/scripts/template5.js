jQuery(document).ready(function($) {
    tabSwitchContents();


    crhp.BoxHeightAlign.init({
       isAll:false
   });

    $(window).on("resize", function(event) {
        crhp.BoxHeightAlign.update();
    });


});


/**
 * tab-area
 */
var tabSwitchContents = function() {
    $("#tab-area .tab-item").on("click", function() {
        var $this = $(this);
        var index = $("#tab-area .tab-item").index(this);
        var type = $this.attr("data-type");
        selectTab(type);

        function selectTab(type) {
            $("#lineup-contents .carlist-name").css("display", "none");
            $("#lineup-contents .carlist-body").css("display", "none");
            $("#lineup-contents #carlist-" + type).css("display", "block");
            $("#tab-area .tab-item").removeClass('active');
            $("#tab-area .tab-item-" + type).addClass('active');
crhp.BoxHeightAlign.update();
        }

    });

};
