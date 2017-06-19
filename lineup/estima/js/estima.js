$(function() {


  var userAgent = window.navigator.userAgent.toLowerCase();
  var appVersion = window.navigator.appVersion.toLowerCase();

  var title        = ".item-title-area";
  var titleItem    = ".item-title-main img";
  var subTitle     = ".item-title-sub";
  var subTitleMask = ".title-mask";
  var item         = ".item-inner";
  var maskItem     = ".mask-item";
  var itemTitleBlack = ".item-title-black";
  var itemText     = ".item-text";
  var baseDuration = 0.5;

  var itemDelay    = "-=0.1";
  var itemObj      = {opacity:1,ease:Linear.easeNone};

  var maskDelay    = "-=0.4";
  var staggerDelay = 0.1;

  var maskObj = {x:"100%",ease:Cubic.easeOut,onComplete:function(){  }};
  var maskDuration = 0.6;

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

  if (isMobile) {
    window.location.href = "./estima/sp/" + window.location.search;
  }

  //isLegacyIE = true;
  if (isLegacyIE) {
    $(".btn-movie").css("visibility", "hidden");
  }


  /* =========================================================

   slideshow

  ========================================================= */
  var slideshow = function() {

    var $list = $('#slider .content li'),
      $status = $('#slider .status li'),
      listCount = $list.length,
      index = 0,
      isAnimated = false;

    var INTERVAL_TIME = 5000,
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
        prev = index;
        index = ++index % listCount;
        current = index;
      }
      $status.eq(prev).removeClass('current');
      $status.eq(current).addClass('current');

      $list.eq(prev).css({
        zIndex: 1
      });
      $list.eq(current).css({
        zIndex: 2
      }).animate({
        opacity: 1
      }, DURATION, function() {
        isAnimated = false;
        $list.eq(prev).css({
          opacity: 0
        });
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
      items = ['#exterior', '#interior', '#hospitality', '#safety', '#performance','#grade', '#plan'];

    var PAGE_SPEED = 800,
      ROLL_SPEED = 300,
      NAV_HEIGT = 136,
      NAV_MAIN_HEIGHT = 70;

    $('#nav_container a[href^=#]').on('click', function() {
      var href = $(this).attr('href'),
        position = Math.floor($(href).offset().top - NAV_HEIGT);

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

      var _h = $(window).height();
      var _active_item = "";
      $.each(items, function(_i, _v) {
        if ($(_v).offset().top < winPos + _h) _active_item = _v;
      });
      //      console.log(winPos+" "+_h+" "+_active_item);
      $.each(items, function(_i, _v) {
        if (_active_item.indexOf(_v) >= 0) setActiveButton(_i, _v);
        else setNonActiveButton(_i, _v);
      });
    };
    var setActiveButton = function(_i, _v) {
      if (!$(navList[_i]).hasClass("active")) {
        $(navList[_i]).addClass("active");
        $(navList[_i]).find(".line").stop(false, true).animate({
          top: 107,
          opacity: 1
        }, {
          duration: 300,
          easing: "easeOutSine"
        });
        $(navList[_i]).find(".arrow").stop(false, true).animate({
          top: 122,
          opacity: 0
        }, {
          duration: 200,
          easing: "linear"
        });
      }
    }
    var setNonActiveButton = function(_i, _v) {
      if ($(navList[_i]).hasClass("active")) {
        $(navList[_i]).removeClass("active");
        $(navList[_i]).find(".line").stop(false, true).animate({
          top: 122,
          opacity: 0
        }, {
          duration: 200,
          easing: "easeOutSine"
        });
        $(navList[_i]).find(".arrow").stop(false, true).animate({
          top: 100,
          opacity: 1
        }, {
          duration: 200,
          easing: "easeOutSine"
        });
      }
    }

    scrollInit();
    scrollEvent();
    $(window).on('scroll', scrollEvent);
    $(window).on('resize orientationchange', scrollInit);

  };

  navigation();

  /* navi hover */
  $("#main_nav ul li").hover(function() {
    $(this).find(".nav-bg").stop(false, true).animate({
      height: "100%"
    }, {
      duration: 250,
      easing: "easeOutCirc"
    });
    $(this).find(".arrow").stop(false, true).animate({
      top: 105
    }, {
      duration: 200,
      easing: "easeOutCirc"
    });
    $(this).find(".arrow img").css("bottom", 0);
  }, function() {
    $(this).find(".nav-bg").stop(false, true).animate({
      height: "0%"
    }, {
      duration: 400,
      easing: "easeInOutSine"
    });
    $(this).find(".arrow").stop(false, true).animate({
      top: 100
    }, {
      duration: 200,
      easing: "easeOutCirc"
    });
    $(this).find(".arrow img").css("bottom", "auto");
  });

  /* INTERIOR DESIGN image selector */
  var _z_list = [0, 1, 2, 3,4];
  var _last_el;
  var _last_el2;
  $("#exterior .viewer-button-list li").click(function() {
    if ($(this).hasClass('selected')) {
      return;
    } else {
      setExteriorViewer(this);
    }
  });

  $("#interior .viewer-button-list li").click(function() {
    if ($(this).hasClass('selected')) {
      return;
    } else {
      setInteriorViewer(this);
    }
  });

  function setExteriorViewer(_target) {
    var index = $("#exterior .viewer-button-list li").index(_target);
    if (_z_list[index] != _z_list.length - 1) {
      var _li = $("#exterior .viewer-list li");
      var _old_z = _z_list[index];
      for (var i = 0; i < _z_list.length; i++) {
        if (i == index) {
          _z_list[i] = _z_list.length - 1;
          $(_li[i]).fadeTo(0, 0).fadeTo(500, 1);
        } else if (_z_list[i] >= _old_z) {
          _z_list[i]--;
        }
        $(_li[i]).css("z-index", _z_list[i]);
      }
    }
    $(_target).addClass("selected").find(".selected-box").stop(false, true).show().animate({
      top: 10,
      left: 10,
      width: 225,
      height: 104,
      opacity: 0
    }, 0).
    animate({
      top: 0,
      left: 0,
      width: 245,
      height: 124,
      opacity: 1
    }, 300);

    if (_last_el) {
      _last_el.removeClass("selected").find(".selected-box").stop(false, true).fadeTo(600, 0, function() {
        $(this).hide();
      })
    }
    _last_el = $(_target);
  }
  setExteriorViewer($("#exterior .viewer-button-list li")[0]);
  setInteriorViewer($("#interior .viewer-button-list li")[0]);


  function setInteriorViewer(_target) {
    var index = $("#interior .viewer-button-list li").index(_target);
    if (_z_list[index] != _z_list.length - 1) {
      var _li = $("#interior .viewer-list li");
      var _old_z = _z_list[index];
      for (var i = 0; i < _z_list.length; i++) {
        if (i == index) {
          _z_list[i] = _z_list.length - 1;
          $(_li[i]).fadeTo(0, 0).fadeTo(500, 1);
        } else if (_z_list[i] >= _old_z) {
          _z_list[i]--;
        }
        $(_li[i]).css("z-index", _z_list[i]);
      }
    }
    $(_target).addClass("selected").find(".selected-box").stop(false, true).show().animate({
      top: 10,
      left: 10,
      width: 225,
      height: 104,
      opacity: 0
    }, 0).
    animate({
      top: 0,
      left: 0,
      width: 245,
      height: 124,
      opacity: 1
    }, 300);

    if (_last_el2) {
      _last_el2.removeClass("selected").find(".selected-box").stop(false, true).fadeTo(600, 0, function() {
        $(this).hide();
      })
    }
    _last_el2 = $(_target);
  }


  var colorSlider = new ColorSlider($(".color-variation-item"));

  function onClickColorThumbnail(){
    $(".color-variation-thumbnail-list li").click(handleClickColorThumbnail);
  }

  function handleClickColorThumbnail(e){
    var $this = $(this);
    e.preventDefault();

    if(colorSlider.gotoSlide(parseInt($this.attr("data-target")))){
       $(".color-variation-thumbnail-list li").removeClass("selected");
       $this.addClass("selected");
    }

    return false;
  }

  function preloadExteriorBannerModalImages()
  {
    $(".exterior-banner-list-item").each(function(){
      $("<img>").attr("src", "http://toyota-dealers.jp/99015/recruit/resources/img/exterior/"+$(this).attr("data-img") );
    });
  }

  function onClickExteriorBanner(){
    $(".exterior-banner-list-item").click(function(){
      openExteriorModal($(this).attr("data-img"));
      return false;
    });
  }

  function openExteriorModal(img) {
    var exteriorModalHtml  = "";
    exteriorModalHtml += '<div class="sub-block-box-modal-wrapper" style="display: block;">';
    exteriorModalHtml += '<img class="button-close" src="http://toyota-dealers.jp/99015/recruit/resources/img/icn-button-close.png">';
    exteriorModalHtml += '<div class="sub-block-box-modal-inner"><img src="http://toyota-dealers.jp/99015/recruit/resources/img/exterior/' + img+'"></div>';
    exteriorModalHtml += '</div>'

    $("#wrapper").append("<div class='modal-wrapper'><div class='modal-bg'></div>" + exteriorModalHtml + "</div>");

    setTimeout(function(){
      $("#wrapper").fadeTo(300, 1);
    },10)
    $(".modal-wrapper .button-close,.modal-bg").click(function() {
      $(".modal-wrapper .sub-block-box-modal-wrapper").remove();
      $("#wrapper .modal-bg").fadeTo(200, 0, function() {
        $(".modal-wrapper").remove();

      });
    });
  }

  function setWhiteBox()
  {
    $("#contents .conversion-btn , #sub_nav ul li, #contents .button2,.color-variation-thumbnail-list a").hover(function(){
        $(this).find("span").stop(false,true).animate({right:10}, {duration:100, easing:"easeOutSine"});
        $(this).find(".whitebox").stop(false,true).fadeTo(0,0.8).fadeTo(900,0);
    }, function(){
        $(this).find("span").stop(false,true).animate({right:20}, {duration:300, easing:"easeOutCirc"});
    });

    $(".exterior-banner-list-item").hover(function(){
        $(this).find(".whitebox").stop(false,true).fadeTo(0,0.8).fadeTo(900,0);
    }, function(){
    });

    $("#contents .conversion-btn , #sub_nav ul li,.exterior-banner-list-item").each(function(){
      $(this).find("a").append("<div class='whitebox' style='background-color:white;width:100%;height:100%;position:absolute;top:0px;left:0px;'></div>");
      $(this).find(".whitebox").fadeTo(0,0);
    });

    $("#contents .button2,.color-variation-thumbnail-list a").each(function(){
      $(this).append("<div class='whitebox' style='background-color:white;width:100%;height:100%;position:absolute;top:0px;left:0px;'></div>");
      $(this).find(".whitebox").fadeTo(0,0);
    });
  }

  function replaceImageUrlOnLocal()
  {
    if(location.href.indexOf("r.nakamura") != -1)
    {
      $("img").each(function(){
        $(this).attr("src",$(this).attr("src").replace("http://toyota-dealers.jp/99015/recruit","/base/full/"))
      });
    }
  }

  replaceImageUrlOnLocal();

  function setPresentArea()
  {
    var $present = $("#present");
    if(!$present.find("img").size() || $present.find("img").width() === 1){
      $present.find("img").remove();
      $present.css("paddingTop",$("#nav_container").height());
      $present.css("paddingBottom",0);
    }
  }

  function setViewlistThumbnail()
  {
    var $viewItem = $(".viewer-button-item");
    $viewItem.each(function(){
      $(this).append('<div class="viewer-button-item-inner" />');
    });
  }
  function setTitleAnimation(_target, _delay_base) {
    var _el = $(_target);

    TweenMax.set(title,{height:0});

    var scrollMain = function() {
      var _st = $(window).scrollTop();
      var _h = $(window).height();
      if (_st + _h > _el.offset().top && !_el.hasClass("animated")) {
        startTitleAnimation(_el, _delay_base);

      }
    }
    $(window).bind("scroll", function() {
      scrollMain();
    });
    scrollMain();
  }

  function startTitleAnimation(_target, _delay_base) {
    var tm = new TimelineMax({delay:0});
    _target.addClass("animated");
    tm.fromTo("#"+_target.attr("id")+" "+title,0.7,{height:0},{height: 240,ease:Power4.easeInOut},"+=0.0");
    tm.staggerFromTo("#"+_target.attr("id")+" "+titleItem,1,{rotationY:360, opacity:0},{opacity:1,x:0,rotationY:0,ease:Quart.easeOut},0.07,"-=0.6");
    tm.fromTo("#"+_target.attr("id")+" "+subTitle,0.4,{opacity:0},{opacity:1,ease:Linear.easeNone},"-=0.6");
    tm.fromTo("#"+_target.attr("id")+" "+item,1,{opacity:0,},itemObj,itemDelay);
  }

  function hoverMainNav() {
    var tm = new TimelineMax();
    // $(".main_nav_item a").each(function() {
    //   $(this).on("mouseenter",function() {

    //     var $this = $(this);

    //     if($(this).hasClass("hovering")) return false;

    //     $(this).addClass("hovering");
    //     tm = new TimelineMax();
    //     tm.set($(this).find(".main_nav_item_inner_on img"), {
    //       opacity: 0
    //     });
    //     tm.set($(this).find(".main_nav_item_inner_on"), {
    //       top: -185
    //     });

    //     tm.to($(this).find(".main_nav_item_inner_on"), 0.35, {
    //       top: 0,
    //       ease: Power2.easeOut
    //     });
    //   });

    //   $(this).on("mouseleave",function() {
    //     tm.clear();
    //     tm = new TimelineMax();
    //     $(this).removeClass("hovering");
    //      tm.set($(this).find(".main_nav_item_inner_on img"), {
    //       opacity: 1
    //     });
    //     tm.to($(this).find(".main_nav_item_inner_on"), 0.2, {
    //       top: 28,
    //       ease: Power3.easeOut
    //     });
    //   });

    // });
  }

  hoverMainNav();

  $(window).on('load', function() {
    /* button hover */
    // $("#contents .button1 , #sub_nav ul li, #contents .button2").hover(function(){
    //     $(this).find("span").stop(false,true).animate({right:10}, {duration:100, easing:"easeOutSine"});
    //     $(this).find(".whitebox").stop(false,true).fadeTo(0,0.8).fadeTo(900,0);
    // }, function(){
    //     $(this).find("span").stop(false,true).animate({right:20}, {duration:300, easing:"easeOutCirc"});
    // });
    // $("#contents .button1 , #sub_nav ul li").each(function(){
    //   $(this).find("a").append("<div class='whitebox' style='background-color:white;width:100%;height:100%;position:absolute;top:0px;left:0px;'></div>");
    //   $(this).find(".whitebox").fadeTo(0,0);
    // });
    // $("#contents .button2").each(function(){
    //   $(this).append("<div class='whitebox' style='background-color:white;width:100%;height:100%;position:absolute;top:0px;left:0px;'></div>");
    //   $(this).find(".whitebox").fadeTo(0,0);
    // });

    preloadExteriorBannerModalImages();
    onClickExteriorBanner();
    onClickColorThumbnail();
    setPresentArea();
    setWhiteBox();
    setViewlistThumbnail();

    $("#contents .item").each(function() {
      setTitleAnimation(this, 100);
    });

  });


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
});
