$(function() {


    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();


    var isLegacyIE = false;
    if (userAgent.indexOf("msie") != -1) {
        if (appVersion.indexOf("msie 6.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 7.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 8.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 9.") != -1) {
            isLegacyIE = true;
        }
    }
    var _ua = window.navigator.userAgent.toLowerCase();

    var isMobile = false;
    if (_ua.indexOf("iphone") != -1) {
        isMobile = true;
    } else if (_ua.indexOf("ipad") != -1) {
        isMobile = true;
    } else if (_ua.indexOf("ipod") != -1) {
        isMobile = true;
    } else if (_ua.indexOf("android") != -1) {
        isMobile = true;
    } else if (_ua.indexOf("windows phone") != -1) {
        isMobile = true;
    }


    if (isLegacyIE) {
        var legacyIEhtml = '<div class="ie-wrap">';
        legacyIEhtml += '<div class="ie-main"><img src="../resources/images/ie/img.jpg" alt="" /></div>';
        legacyIEhtml += '</div>';

        $("#wrapper").hide();
        $("body").prepend(legacyIEhtml);
    }

    //SP時 gaイベント取得
    if (isMobile) {
        $('#sub_nav li').each(function() {
            var txt = $(this).html();
            $(this).html(txt.replace(/pc_ヘッダーリンク /g, 'SP_ヘッダーリンク'));
        });
    }


    /* =========================================================

   top-main__slide

  ========================================================= */
    function topSlide() {
        var top_slide = $("#top-main__slide");

        top_slide.slick({
            dots: true,
            speed: 1200,
            fade: false,
            cssEase: 'ease',
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000
        });
    }
    topSlide();

    /* =========================================================
   modal
  ========================================================= */
    function modal() {
        // スクロールバーの横幅を取得
        $('html').append('<div class="scrollbar" style="overflow:scroll;"></div>');
        var scrollsize = window.innerWidth - $('.scrollbar').prop('clientWidth');
        $('.scrollbar').hide();

        var modal_inner = $(".plan-box-modal").html();

        // 「.modal-open」をクリック
        $('.modal-open').click(function() {
            var scroll = $(window).scrollTop();
            // console.log(scroll)
            $('body').addClass('lock');
            $('body').css({ "top": -scroll, "position": "fixed" });


            $('body').append('<div class="modal-overlay"></div>');
            $('.modal-overlay').fadeIn('slow');
            var modal = '#' + $(this).attr('data-target');
            $(modal).wrap("<div class='modal-wrap'></div>");

            $(".modal-wrap .plan-box").append(modal_inner);

            $('.modal-wrap').show();

            $(modal).fadeIn('slow');

            $(modal).click(function(e) {
                e.stopPropagation();
            });
            modalResize();

            $('.modal-wrap, .modal-close').off().click(function() {

                $(modal).fadeOut('slow');
                $('.modal-overlay').fadeOut('slow', function() {

                    $('body').removeClass('lock');
                    $('.modal-wrap .plan-box').empty();
                    $('.modal-overlay').remove();

                    $(modal).unwrap("<div class='modal-wrap'></div>");
                });

                $('body').css({ "position": "", "top": "" });
                $(window).scrollTop(scroll);

            });

            $(window).on('resize', function() {
                modalResize();
            });

            function modalResize() {
                var w = $(window).width();
                var h = $(window).height();

                var mw = $(modal).outerWidth(true);
                var mh = $(modal).outerHeight(true);

                if ((mh > h) && (mw > w)) {
                    $(modal).css({ 'left': 0 + 'px', 'top': 0 + 'px' });
                } else if ((mh > h) && (mw < w)) {
                    var x = (w - scrollsize - mw) / 2;
                    $(modal).css({ 'left': x + 'px', 'top': 80 + 'px' });
                } else if ((mh < h) && (mw > w)) {
                    var y = (h - scrollsize - mh) / 2;
                    $(modal).css({ 'left': 0 + 'px', 'top': y + 'px' });
                } else {
                    var x = (w - mw) / 2;
                    var y = (h - mh) / 2;
                    $(modal).css({ 'left': x + 'px', 'top': y + 'px' });
                }
            }

        });

    }
    // modal();


    /* =========================================================

   navigation

  ========================================================= */
    var navigation = function() {

        var $nav = $('#nav_container'),
            $navMain = $nav.find('.main-inner'),
            $navMiniLink = $('#main_nav a'),
            navList = $("#main_nav ul li"),
            $contents = $('#contents'),
            navPosition, animating = false,
            items = ['#exterior', '#interior', '#hospitality', '#safety', '#performance', '#grade', '#plan'];


        // var NAV_HEIGT = $("#nav_container").height() - 2;
        //         console.log(NAV_HEIGT)


        $(window).on('load resize', function() {
            NAV_HEIGT = $("#nav_container").height() - 10;

            // console.log(NAV_HEIGT)

        });


        var PAGE_SPEED = 800,
            ROLL_SPEED = 300,
            NAV_MAIN_HEIGHT = 214;


        $('#nav_container a[href^=#]').on('click', function() {
            var href = $(this).attr('href'),
                position = Math.floor($(href).offset().top - NAV_HEIGT);

            /*$(this).closest("ul").find("li").removeClass("active");
            $(this).closest("li").addClass("active");*/

            $('html,body').stop(false, true).animate({
                scrollTop: position
            }, PAGE_SPEED, scrollEvent);
            return false;
        });


        var scrollTimer = undefined;
        var scrollInit = function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                navPosition = $contents.offset().top;
            }, 30);

        };


        $(window).on("load", function() {
            scrollEvent();
        });

        var scrollEvent = function() {
            scrollInit();
            var winPos = $(window).scrollTop();
            var pos = navPosition - winPos;
            var currentItem = null;

            if (!$nav.hasClass('fixed') && !animating && pos < 0) {
                $nav.addClass('fixed');
                animating = true;
                animating = false;
            } else if ($nav.hasClass('fixed') && !animating && pos > 0) {
                $nav.removeClass('fixed');
                animating = true;
                animating = false;
            }

        };


        scrollInit();
        scrollEvent();
        $(window).on('scroll', scrollEvent);
        $(window).on('resize orientationchange', scrollInit);

    };

    navigation();

    function subNavCount() {
        var snav_list = $("#sub_nav li");
        var counter = 0;
        snav_list.each(function() {
            counter++;
        });
        // console.log(counter)
        $("#sub_nav").addClass("snav_list" + counter);

    }
    subNavCount();


    /********
    ************************
    section-3
    ************************
    *********/


    function exteriorChange() {

        var $pic = $('#carousel-exterior .carousel-exterior__item li'),
            $caption = $('#carousel-exterior .carousel-exterior__notes li'),
            $thumb = $('#carousel-exterior .carousel-exterior__thumb li');
        // $selector = $("#carousel-exterior .selector");


        $(window).on('load resize', function() {
            var $picH = $pic.height();
            var $thumbH = $thumb.height();
            $(".carousel-exterior__item").css({ "height": $picH });
            $(".carousel-exterior__thumb").css({ "height": $thumbH });

        });


        $thumb.on('click', function() {
            var $this = $(this);

            var leftPos = $this.position().left;

            var index = $thumb.index(this),
                prev = $thumb.index($thumb.filter('.current'));
            if ($this.hasClass('current')) {
                return;
            } else {
                // $selector.animate({ "left": leftPos }, { duration: "first", easing: 'swing', });
            }

            $thumb.removeClass('current').eq(index).addClass('current');

            $pic.eq(prev).css({ zIndex: 1 });
            $pic.eq(index).css({ zIndex: 2 }).animate({ opacity: 1 }, 200, function() {
                $pic.removeClass('current').eq(index).addClass('current');
                $pic.eq(prev).css({ opacity: 0 });
            });

            $caption.eq(prev).css({ zIndex: 1 });
            $caption.eq(prev).css({ opacity: 0 });
            $caption.eq(index).css({ zIndex: 2 }).animate({ opacity: 1 }, 200, function() {
                $caption.removeClass('current').eq(index).addClass('current');
            });


        });

    }
    exteriorChange();

    /********
    ************************
    section-4
    ************************
    *********/


    function interiorChange() {

        var $pic = $('#carousel-interior .carousel-interior__item li'),
            $caption = $('#carousel-interior .carousel-interior__notes li'),
            $thumb = $('#carousel-interior .carousel-interior__thumb li');

        // $selector = $("#carousel-interior .selector");


        $(window).on('load resize', function() {
            var $picH = $pic.height();
            var $thumbH = $thumb.height();
            $(".carousel-interior__item").css({ "height": $picH });
            $(".carousel-interior__thumb").css({ "height": $thumbH });

        });


        $thumb.on('click', function() {
            var $this = $(this);

            // var leftPos = $this.position().left;

            var index = $thumb.index(this),
                prev = $thumb.index($thumb.filter('.current'));
            if ($this.hasClass('current')) {
                return;
            } else {
                // $selector.animate({ "left": leftPos }, { duration: "first", easing: 'swing', });
            }

            $thumb.removeClass('current').eq(index).addClass('current');

            $pic.eq(prev).css({ zIndex: 1 });
            $pic.eq(index).css({ zIndex: 2 }).animate({ opacity: 1 }, 200, function() {
                $pic.removeClass('current').eq(index).addClass('current');
                $pic.eq(prev).css({ opacity: 0 });
            });

            $caption.eq(prev).css({ zIndex: 1 });
            $caption.eq(prev).css({ opacity: 0 });
            $caption.eq(index).css({ zIndex: 2 }).animate({ opacity: 1 }, 200, function() {
                $caption.removeClass('current').eq(index).addClass('current');
            });


        });

    }
    interiorChange();

    // main_nav addClass
    function changeNav() {

        var margin;

        var sectionTop = new Array, //sectionのTop位置格納用
            current = -1; //現在のカレント位置

        //(1)各sectionの縦位置を取得
        $(window).on("load resize", function() {
            margin = $("#nav_container").height();
            // console.log(margin)
            $('.sectionPos').each(function(i) {
                sectionTop[i] = $(this).offset().top;
            });
        });
        //init
        changeNavCurrent(-1);

        //スクロールした時の処理
        $(window).on("scroll resize", function() {
            scrollY = $(window).scrollTop();
            //(2)各セクションの位置とスクロール位置を比較して、条件にあったらchangeNavCurrentを実行
            for (var i = sectionTop.length - 1; i >= 0; i--) {
                if (scrollY > sectionTop[i] - margin) {
                    changeNavCurrent(i);
                    break;
                }
                if (scrollY < sectionTop[0] - margin) {
                    changeNavCurrent(-1);
                    break;
                }
            };
        });
        //(3)ナビの処理
        function changeNavCurrent(curNum) {
            if (curNum != current) {
                current = curNum;
                curNum2 = curNum + 1; //HTML順序用
                $('#main_nav .main_nav_item').removeClass('active');
                $('#main_nav .main_nav_item:nth-child(' + curNum2 + ')').addClass('active');

                //textのアニメーション用
                // $('#contents .section .text').removeClass('show');
                // $('#contents .section:nth-child(' + curNum2 + ') .text').addClass('show');
            }
        };
    }
    changeNav();


    function topPriceHeightCheck() {
        $(window).on("load resize", function() {
            setTimeout(function() {
                var mainImgHeight = $("#top-main__slide").height();
                $("#top-mileage").css({ "height": mainImgHeight });
                // $("#top-price").css({ "height": mainImgHeight * .4 });
            }, 50);
            // $("#top-main__slide").delay(100).animate({ "opacity": 1 }, 400);
            $(".top-main__textwrap").delay(200).animate({ "opacity": 1 }, 600);
        });
    }
    topPriceHeightCheck();


    function priceAnkScroll() {
        $('.top-price__link a[href^=#]').click(function() {
            var speed = 800;
            var NAV_HEIGT = $("#nav_container").height();
            var href = $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top - NAV_HEIGT + 10;
            $('body,html').animate({ scrollTop: position }, speed);
            return false;
        });
    }
    priceAnkScroll();



});
