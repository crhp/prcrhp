$(function() {

    function fixedNavDisp() {
        var bottomNav = $("#fixed-nav.bottom");
        var bottomNavHeight = bottomNav.height();
        bottomNav.css({ "bottom": -bottomNavHeight });
        bottomNav.delay(400).animate({ "bottom": "0" }, 800, "easeOutQuart");
    }
    fixedNavDisp();


    function fixedNav() {
        var nav = $('#fixed-nav');
        var initWidth = $(".content").width();
        var offset;
        nav.css({ "width": initWidth });

        $(window).on('load resize', function() {
            var navW = $("#content").width();
            offset = $("#header-contents").height();
            nav.css({ "width": navW });
        });

        if (nav.hasClass('bottom')) {

            return;
        } else {
            $(window).on('load scroll', function() {
                if ($(window).scrollTop() > offset) {
                    nav.addClass('fixed');
                } else {
                    nav.removeClass('fixed');
                }
            });
        }
    }

    fixedNav();

    function navControl() {
        var triggerNode = $(".footer-sitemap");
        var fixed_nav_height = $("#fixed-nav").height();
        var triggerNodePosition = $(triggerNode).offset().top;

        $(window).on("scroll resize", function() {


            if ($(window).scrollTop() + $(window).height() - fixed_nav_height > triggerNodePosition) {
                $("#fixed-nav").addClass('static');
            } else {
                $("#fixed-nav").removeClass('static');
            }
        });
    }
    navControl();


    function fixedBtnCount() {
        var btnCount = $("#fixed-nav ul li").length;
        $("#fixed-nav ul").addClass('btn_count_' + btnCount)
    }
    fixedBtnCount();

});
