$(function() {
    blogBtnTransition();
    storeImgSlide();

});


function storeImgSlide() {
    $('.thumb-item').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.thumb-item-nav'
    });
    $('.thumb-item-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.thumb-item',
        centerMode: false,
        focusOnSelect: true
    });
}

function blogBtnTransition() {
    var $blogBtn = $("#blog-fixed-btn");
    $blogBtn.delay(1000).animate({ "right": "0px", "opacity": "1" }, 600, "easeOutCirc");
}
