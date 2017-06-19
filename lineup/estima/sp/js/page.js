$(document).ready(function() {
    $('.lightbox').colorbox({
        onComplete: function() {
            window.resizeTo(640, 480);
            $.colorbox.position(0);
        }
    });
});


$(function() {
    $('.lightbox').colorbox({
        width:"90%",
        close:"",
        transition:"none"
    });


    /**
     * 位置・高さ等の初期化
     */
    var setPosition = function() {
        $('#slider').height($('#slider').width() * (530/640));
        $('#color_val .lineup').height($('#color_val .lineup').width() * (350/600));
        $("#interior_slide .lineup").height($("#interior_slide .lineup").width()*(322/580));
    };

    setPosition();

    $(window).on('orientationchange load resize', setPosition);

    $(".change-btn li").on("click", function() {
        if ($(this).hasClass('select')) {
            return;
        }
        var lineupHeight2 = $("#color_val .img_box img").height();

        $('#color_val .img_box').height(lineupHeight1);
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
            $status = $('#slider .status .btn_status'),
            $statusImg = $('#slider .status .btn_status img'),
            listCount = $list.length,
            statusImgNormal = $statusImg.eq(1).attr('src'),
            statusImgCurrent = $statusImg.eq(0).attr('src'),
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

            $statusImg.eq(prev).attr('src', statusImgNormal);
            $statusImg.eq(current).attr('src', statusImgCurrent);
            $list.eq(prev).css({ zIndex: 1 });
            $list.eq(current).css({ zIndex: 2 }).animate({ opacity: 1 }, DURATION, function() {
                isAnimated = false;
                $list.eq(prev).css({ opacity: 0 });
            });
        };

        var intervalId = setInterval(animation, INTERVAL_TIME);

     
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


    var setImageChange = function(container){
        $('.img_box img',container).each(function(i) {
            $(this).css({ opacity: '0' }).attr('id', 'view' + (i + 1).toString());
            $('.img_box img:first',container).css({ opacity: '1', zIndex: '99' });
        });

        $('.color li',container).click(function() {
            var connectCont = $('.color li',container).index(this);
            var showCont = connectCont + 1;

            $('.img_box img#view' + (showCont)).siblings().stop().animate({ opacity: '0' }, 1000);
            $('.img_box img#view' + (showCont)).stop().animate({ opacity: '1' }, 1000);

            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });


        $('#color_val .color li:not(.active)',container).hover(function() {
            $(this).stop().animate({ opacity: '1' }, 200);
        }, function() {
            $(this).stop().animate({ opacity: '0.8' }, 200);
        });

        $('#color_val .color li',container).css({ opacity: '0.8' });
        $('#color_val .color li:first',container).addClass('active');
    }
  
    var changeColor = function() {
        setImageChange($("#color_val"));
    };
    changeColor();

    var changeInterior = function() {
        setImageChange($("#interior_slide"));
    };
    changeInterior();



    var carsousel = function(section) {
    var $thumb = section.find($(".car-thumb-img")).find("li"),
        $main = section.find($(".car-main-img")).find("img"),
        $frame = section.find($(".car-thumb-img")).find(".frame");

    $main.css({
        "position": "absolute",
        "opacity": 0
    });

    $main.eq(0).css({
        "position": "absolute",
        "opacity": 1
    });

    $thumb.click(function() {
        $this = $(this);
        index = $thumb.index(this);

        $frame.css({
            "left": 20.25 * index + "%"
        })

        for (var i = 0; i < $main.length; i++) {
            if (i == index) {
                $main.eq(i).fadeTo(300, 1);
            } else {
                $main.eq(i).fadeTo(500, 0);
            }
        }
    });
    }

    carsousel($("#section_01"));
    carsousel($("#section_02"));

     /* =========================================================
  
   ga
   
  ========================================================= */
  var clickEvent = function() {

    function gaSend(eventName,label,url,target){
      var trackInfo = undefined;
      var agc = gaUtil.mode != "" ? gaUtil.mode+"_" : "";
      var adType = gaUtil.adType != "" ?  gaUtil.adType+"_" : "";
      for (var i = 0; i < gaUtil.trackingItem.length; i++) {
        trackInfo = gaUtil.trackingItem[i];
          ga(trackInfo.name+'.send', 'event',gaUtil.trackCategory,eventName,agc+adType+label,{
           'transport': 'beacon',
           'hitCallback': function(){
              if(target=="_blank") return;
              document.location = url;
            }
         });
      };       
    }


    $('.gaEvent').on('click', function(event) {
      var eventName = $(this).attr('data-gaevent').split(",")[0];
      var label = $(this).attr('data-gaevent').split(",")[1];
      var url = $(this).attr('href');
      var target = $(this).attr('target');
      gaSend(eventName,label,url,target);
    });
    
  };
  
  clickEvent();

  function setPresentArea()
  {
    var $present = $("#section_present");
    if($present.find("img")[0].naturalWidth === 1){
        $present.find("img").remove();
      $present.css("margin-top","-50px");
    }
  }

  setPresentArea();
});
