$(function() {

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

        $(window).on('load scroll', function() {
            if ($(window).scrollTop() > offset) {
                nav.addClass('fixed');
            } else {
                nav.removeClass('fixed');
            }
        });
    }
    fixedNav();


    function imageSlide(slideNum) {
        var mainPic = slideNum.find(".thumb-item");
        var thumbNavPic = slideNum.find(".thumb-item-nav");

        mainPic.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: thumbNavPic
        });
        thumbNavPic.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: mainPic,
            centerMode: false,
            focusOnSelect: true
        });
    }
    imageSlide($("#slide-wrap01"));
    imageSlide($("#slide-wrap02"));
    imageSlide($("#slide-wrap03"));


    function fixedBtnCount() {
        var btnCount = $("#fixed-nav ul li").length;
        $("#fixed-nav ul").addClass('btn_count_' + btnCount)
    }
    fixedBtnCount();


});
