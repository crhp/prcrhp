$(function() {




    /**
     * 位置・高さ等の初期化
     */
    var setPosition = function() {
        $('#slider').height($('#slider').width() * 1.1875);
        $('.passo .lineup').height($('.passo .lineup').width() * 0.586206896);
        $('.passo_moda .lineup').height($('.passo_moda .lineup').width() * 0.586206896);
    };

    setPosition();

    $(window).on('orientationchange load resize', setPosition);

    $(".change-btn li").on("click", function() {
        if ($(this).hasClass('select')) {
            return;
        }
        var lineupHeight1 = $(".passo_moda .img_box img").height();
        var lineupHeight2 = $(".passo .img_box img").height();

        $('.passo_moda .img_box').height(lineupHeight2);
        $('.passo .img_box').height(lineupHeight1);
    });


    function getURLParam() {
        var arg = new Object;
        var pair = location.search.substring(1).split('&');
        for (var i = 0; pair[i]; i++) {
            var kv = pair[i].split('=');
            arg[kv[0]] = kv[1];
        }
        return arg;
    }
    var getMode = function() {
        var param = getURLParam();

        if (param.link) {
            return param.link;
        }
        return undefined;
    }

    mode = getMode();



    /**
     * スライドショー
     */
    var slideshow = function() {

        var $list = $('#slider .content li'),
            $status = $('#slider .status img'),
            listCount = $list.length,
            statusImgNormal = $status.eq(1).attr('src'),
            statusImgCurrent = $status.eq(0).attr('src'),
            index = 0,
            isAnimated = false;

        var INTERVAL_TIME = 3000,
            DURATION = 800;

        var animation = function(target) {
            var current, prev;

            if (isAnimated || index === target) {
                return;
            }

            isAnimated = true;

            if (!isNaN(target)) {
                prev = index;
                current = index = target;
            } else {
                prev = index % listCount;
                index = ++index % listCount;
                current = index;
            }

            $status.eq(prev).attr('src', statusImgNormal);
            $status.eq(current).attr('src', statusImgCurrent);
            $list.eq(prev).css({ zIndex: 1 });
            $list.eq(current).css({ zIndex: 2 }).animate({ opacity: 1 }, DURATION, function() {
                isAnimated = false;
                $list.eq(prev).css({ opacity: 0 });
            });
        };

        var intervalId = setInterval(animation, INTERVAL_TIME);

        if (mode == "moda") {
            animation(1);

            // $(".change-btn .passo").removeClass('select');
            // $(".change-btn .passo_moda").addClass('select');
        }

        $status.on('click', function() {
            clearInterval(intervalId);
            var target = $status.index(this);

            animation(target);
            intervalId = setInterval(animation, INTERVAL_TIME);
        });

    };

    slideshow();

    /**
     * サブナビゲーション固定
     */
    var subNavigation = function() {

        var $nav = $('#sub_nav'),
            $contents = $('#contents'),
            navHeight = $nav.height(),
            positionTop, scrolled = false;

        var scrollEvent = function() {
            if (!scrolled && $(window).scrollTop() > 40) {
                positionTop = $nav.offset().top;
                scrolled = true;
            }

            if (!$nav.hasClass('fixed') && $(window).scrollTop() >= positionTop) {
                $nav.addClass('fixed');
                $contents.css({ paddingTop: navHeight });
            } else if ($nav.hasClass('fixed') && $(window).scrollTop() <= positionTop) {
                $nav.removeClass('fixed');
                $contents.css({ paddingTop: 0 });
            }
        };

        $(window).on('scroll', scrollEvent);

    };

    subNavigation();

    var tabChange = function() {


        if (mode == "moda") {
            $(".change-btn .passo").removeClass('select');
            $(".change-btn .passo_moda").addClass('select');
            $(".wrap-change-panel .passo").css({ "display": "none" });
            $(".wrap-change-panel .passo_moda").css({ "display": "block" });
            $(".change-btn .passo").find("img").attr("src", $(".change-btn .passo").find("img").attr("src").replace("-on", "-off"));
            $(".change-btn .passo_moda").find("img").attr("src", $(".change-btn .passo_moda").find("img").attr("src").replace("-off", "-on"));
        }


        $('.change-btn li').click(function() {
            var index = $('.change-btn li').index(this);
            $('.wrap-change-panel .mode').css('display', 'none');
            $('.wrap-change-panel .mode').removeClass('select');
            $('.wrap-change-panel .mode').eq(index).css('display', 'block');
            $('.wrap-change-panel .mode').eq(index).addClass('select');
            $('.change-btn li').removeClass('select');
            $(this).addClass('select');


            var tabPasso = $(".change-btn .passo");
            var tabPassomoda = $(".change-btn .passo_moda");
            if (tabPasso.hasClass('select')) {
                tabPasso.find("img").attr("src", tabPasso.find("img").attr("src").replace("-off", "-on"));
            } else {
                tabPasso.find("img").attr("src", tabPasso.find("img").attr("src").replace("-on", "-off"));
            }
            if (tabPassomoda.hasClass('select')) {
                tabPassomoda.find("img").attr("src", tabPassomoda.find("img").attr("src").replace("-off", "-on"));
            } else {
                tabPassomoda.find("img").attr("src", tabPassomoda.find("img").attr("src").replace("-on", "-off"));
            }


        });
    };
    tabChange();


    var openBanner = function() {
        $(".bnr-more").hide();
        var bnr = $(".bnr-open");

        bnr.on("click", function() {
            var $this = $(this);
            bnr.hide();
            $(".bnr-more").show();
        });
    };
    openBanner();

    var moreFunction = function() {
        $(".more-fucniton").hide();
        var bnr = $(".more-function-btn");

        bnr.on("click", function() {
            var $this = $(this);
            bnr.hide();
            $(".more-fucniton").show();
        });
    };
    moreFunction();

    var changePanel = function() {
        $('.passo .img_box img').each(function(i) {
            $(this).css({ opacity: '0' }).attr('id', 'view' + (i + 1).toString());
            $('.passo .img_box img:first').css({ opacity: '1', zIndex: '99' });
        });

        $('.passo .color li').click(function() {
            var connectCont = $('.passo .color li').index(this);
            var showCont = connectCont + 1;

            $('.passo .img_box img#view' + (showCont)).siblings().stop().animate({ opacity: '0' }, 1000);
            $('.passo .img_box img#view' + (showCont)).stop().animate({ opacity: '1' }, 1000);

            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });


        $('.passo .color li:not(.active)').hover(function() {
            $(this).stop().animate({ opacity: '1' }, 200);
        }, function() {
            $(this).stop().animate({ opacity: '0.8' }, 200);
        });

        $('.passo .color li').css({ opacity: '0.8' });
        $('.passo .color li:first').addClass('active');
    };
    changePanel();

    var changePanel2 = function() {
        $('.passo_moda .img_box img').each(function(i) {
            $(this).css({ opacity: '0' }).attr('id', 'view' + (i + 1).toString());
            $('.passo_moda .img_box img:first').css({ opacity: '1', zIndex: '99' });
        });

        $('.passo_moda .color li').click(function() {
            var connectCont = $('.passo_moda .color li').index(this);
            var showCont = connectCont + 1;

            $('.passo_moda .img_box img#view' + (showCont)).siblings().stop().animate({ opacity: '0' }, 1000);
            $('.passo_moda .img_box img#view' + (showCont)).stop().animate({ opacity: '1' }, 1000);

            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
        $('.passo_moda .color li:not(.active)').hover(function() {
            $(this).stop().animate({ opacity: '1' }, 200);
        }, function() {
            $(this).stop().animate({ opacity: '0.8' }, 200);
        });

        $('.passo_moda .color li').css({ opacity: '0.8' });
        $('.passo_moda .color li:first').addClass('active');

    };
    changePanel2();


});
