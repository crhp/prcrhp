var collora = collora || {};
var isEOH = false;



$(function() {
  var doc = document;
  var _ua = window.navigator.userAgent.toLowerCase(),
      _IE, _IEver,
      _Chrome, _ChromeVer,
      _FireFox, _FireFoxVer,
      _Safari, _SafariVer,
      _Opera, _OperaVer,
      _Mac, _iPhone, _iPad, _iPod, _iOSver,
      _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
      _WindowsPhone,
      _bot;

  // ブラウザ判定
  if (_ua.indexOf("msie") != -1) {
      _IE = true;
      _ua.match(/msie (\d+\.\d)/);
      _IEver = parseFloat(RegExp.$1);

  } else if (_ua.indexOf("chrome") != -1) {
      _Chrome = true;
      _ua.match(/chrome[\/ ]?(\d+\.\d+)/);
      _ChromeVer = parseFloat(RegExp.$1);

  } else if (_ua.indexOf("firefox") != -1) {
      _FireFox = true;
      _ua.match(/firefox[\/ ]?(\d+\.\d+)/);
      _FireFoxVer = parseFloat(RegExp.$1);

  } else if (_ua.indexOf("opera") != -1) {
      _Opera = true;
      _ua.match(/opera[\/ ]?(\d+\.\d+)/);
      _OperaVer = parseFloat(RegExp.$1);

  } else if (_ua.indexOf("safari") != -1) {
      _Safari = true;
      _ua.match(/version[\/ ]?(\d+\.\d+)/);
      _SafariVer = parseFloat(RegExp.$1);
  }

  // 携帯端末
  if (_ua.indexOf("iphone") != -1) {
      _iPhone = true;
      _ua.match(/iphone os (\d+)_(\d+)/);
      _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

  } else if (_ua.indexOf("ipad") != -1) {
      _iPad = true;
      _ua.match(/cpu os (\d+)_(\d+)/);
      _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

  } else if (_ua.indexOf("ipod") != -1) {
      _iPod = true;
      _ua.match(/os (\d+)_(\d+)/);
      _iOSver = RegExp.$1 * 1 + RegExp.$2 * 0.1;

  } else if (_ua.indexOf("android") != -1) {
      _Android = true;
      _ua.match(/android (\d+\.\d)/);
      _AndroidVer = parseFloat(RegExp.$1);

      if (_ua.indexOf('mobile') != -1) {
          _AndroidMobile = true;
      } else {
          _AndroidTablet = true;
      }
  } else if (_ua.indexOf("windows phone") != -1) {
      _WindowsPhone = true;
  }
  if (_ua.indexOf('mac os') != -1) {
      _Mac = true;
  }

  // クローラー系
  if (_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1) {
      _bot = true;
  }

  var ua = {
      isIE: (_IE),
      isIE6: (_IEver == 6.0),
      isIE7: (_IEver == 7.0),
      isIE8: (_IEver == 8.0),
      isIE9: (_IEver == 9.0),
      isIE10: (_IEver == 10.0),
      isIEgt6: (_IEver > 6),
      isIEgt7: (_IEver > 7),
      isIEgt8: (_IEver > 8),
      isIEgt9: (_IEver > 9),
      isIEgt10: (_IEver > 10),
      isIElt6: (_IE && _IEver < 6),
      isIElt7: (_IE && _IEver < 7),
      isIElt8: (_IE && _IEver < 8),
      isIElt9: (_IE && _IEver < 9),
      isIElt10: (_IE && _IEver < 10),

      isiPhone: _iPhone,
      isiPad: _iPad,
      isiPod: _iPod,
      isiOS: (_iPhone || _iPad || _iPod),
      isAndroid: _Android,
      isAndroidMobile: _AndroidMobile,
      isAndroidTablet: _AndroidTablet,
      isWindowsPhone: _WindowsPhone,
      isSmartPhone: (_iPhone || _iPad || _iPod || _Android || _WindowsPhone),

      isMobile: (_iPhone || _iPod || _AndroidMobile || _WindowsPhone),
      isTablet: (_iPad || _AndroidTablet),

      isSafari: _Safari,
      isChrome: _Chrome,
      isOpera: _Opera,
      isFireFox: _FireFox,
      isMac: _Mac,

      verIE: _IEver,
      verFireFox: _FireFoxVer,
      verChrome: _ChromeVer,
      verSafari: _SafariVer,
      verOpera: _OperaVer,
      verAndroid: _AndroidVer,
      veriOS: _iOSver,

      isBot: _bot
  };

  if(ua.isMobile){
    window.location.href = "./sp/"+window.location.search;
  }

  if(ua.isIElt9){
    initIe8();
  }

  if(isEOH){
    initEOH();
  }

  function initIe8(){
    $("html").addClass('ltie9');
  }

  function initEOH(){
   $("html").addClass('eoh'); 
  }


  var mode = undefined;
  var Animation = undefined;

  /**
   * 位置・高さ等の初期化
   */
  var setPosition = function() {

    $('#slider').height($(window).width() * 0.336);
    $('#contents .head .c2 span').width($(window).width());
  };
  
  setPosition();
  $(window).on('orientationchange resize', setPosition);
  

  function getURLParam(){
      var arg = new Object;
      var pair=location.search.substring(1).split('&');
      for(var i=0;pair[i];i++) {
          var kv = pair[i].split('=');
          arg[kv[0]]=kv[1];
      }
      return arg;
  }

  var contensAnimDelay = 1.1;


  var setAnim = function(){
    var param = getURLParam();
    Animation = collora.Animation1;
  }

  if(!ua.isIElt9 ||  isEOH){
    setAnim();
  }
  // setAnim();
  // console.log(Animation)

  var getMode = function(){
    var param = getURLParam();
    
    if(param.link){
      return param.link;
    }
    return undefined;
  }

  mode = getMode();

  /* =========================================================
  
   slideshow
   
  ========================================================= */
  var slideshow = function() {
    
    var $list = $('#slider .content li'),
        $status = $('#slider .status img'),
        listCount = $list.length,
        statusImgNormal = $status.eq(1).attr('src'),
        statusImgCurrent = $status.eq(0).attr('src'),
        index = 0, isAnimated = false;
    
    var INTERVAL_TIME = 5000,
        DURATION = 800;
    
    var animation = function(target,type) {
      var current, prev;
      var useDuration = type == "noAnim" ? 0 : DURATION;
      if (isAnimated || index === target) {
        return;
      }
      
      isAnimated = true;
      
      if (!isNaN(target)) {
        prev  = index;
        current = index = target;
      } else {
        prev = index;
        index = ++index % listCount;
        current = index;
      }
      
      $status.eq(prev).attr('src', statusImgNormal);
      $status.eq(current).attr('src', statusImgCurrent);
      $list.eq(prev).css({zIndex: 1});
      $list.eq(current).css({zIndex: 2}).animate({opacity: 1}, useDuration, function() {
        isAnimated = false;
        $list.eq(prev).css({opacity: 0});
      });
    };
    
    var intervalId = setInterval(animation, INTERVAL_TIME);
    

    if(mode == "moda"){
      animation(1,"noAnim");
    }

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
        $contents = $('#contents'),
        items = ['#design', '#drive', '#seat', '#safe', '#plan'],
        itemPositions = [], navPosition, animating = false;
    
    var PAGE_SPEED = 800,
        ROLL_SPEED = 300,
        NAV_HEIGT = 152,
        NAV_MAIN_HEIGHT = 80;
    
    $('#nav_container a[href^=#]').on('click', function() {
      var href = $(this).attr('href'),
          position = Math.floor($(href).offset().top - NAV_HEIGT);
      
      $('html,body').animate({scrollTop: position}, PAGE_SPEED, scrollEvent);
      return false;
    });

    if(!ua.isIElt9 && !isEOH){
      $('#nav_container a').on("mouseenter",function(){
        if($(this).hasClass('current')) return;
        var icoPoint = $(this).find(".ico_num");
        var txt = $(this).find(".nav_txt");
        var imgTxt = txt.find("img");
        var arw = $(this).find(".arw");

        TweenMax.to(icoPoint,0,{rotation:130,scale:0.2,onComplete:function(){
          TweenMax.to(icoPoint,0.4,{rotation:0,scale:1.0,ease:Back.easeOut});
        }});
        TweenMax.to(imgTxt,0,{y:-txt.height()});
        TweenMax.to(imgTxt,0.3,{y:0,ease:Power2.easeOut});

        TweenMax.to(arw,0.2,{delay:0.1,y:5,ease:Power2.easeOut,onComplete:function(){
          TweenMax.to(arw,0.3,{y:0})
        }});
      });
     
    }
    
    var scrollTimer = undefined; 
    var scrollInit = function() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function(){
        navPosition = $contents.offset().top;
        for (var i = 0; i < items.length; i++) {
          itemPositions[i] = Math.floor($(items[i]).offset().top);
        };
      },30);
      
      
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
      
      for (currentItem = itemPositions.length - 1; currentItem >= 0 && itemPositions[currentItem] > winPos + NAV_HEIGT; currentItem--) {}
      if (currentItem >= 0) {

        $navMiniLink.removeClass('current').eq(currentItem).addClass('current');
      } else {
        $navMiniLink.removeClass('current');
      }
      
    };
    
    scrollInit();
    scrollEvent();
    $(window).on('scroll', scrollEvent);
    $(window).on('resize orientationchange', scrollInit);
    
  };
  
  navigation();
  
  /* =========================================================
  
   colors
   
  ========================================================= */
  var colors = function(target) {
    
    var $lineup = target.find('.lineup li'),
        $color = target.find('.color li');
    
    $color.on('click', function() {
      if($(this).hasClass("current")) return;
      var index = $color.index(this),
          prev = $color.index($color.filter('.current'));
      
      $color.removeClass('current').eq(index).addClass('current');
      $lineup.eq(prev).css({zIndex: 1});
      $lineup.eq(index).css({zIndex: 2}).animate({opacity: 1}, 500, function() {
        $lineup.removeClass('current').eq(index).addClass('current');
        $lineup.eq(prev).css({opacity: 0});
      });
    });
    
  };
  
  colors($("#colors_normal"));
  colors($("#colors_moda"));

 
  /* =========================================================
  
   tab
   
  ========================================================= */
  var tab = function(defaultType) {
    
    selectTab(defaultType);

    $("#color_area .tab_item").on("click",function(){
      var type = $(this).attr("data-type");

      selectTab(type);
    });


    function selectTab(type){
      $(".color_select").css("display","none");
      $("#color_select_"+type).css("display","block");
      $(".tab_item").removeClass('current');
      $("#tab_"+type).addClass('current');
    }
    
    
  };
  
  
  if(mode == "moda"){
    tab("moda");  
  }else{
    tab("normal");
  }
  


  /* =========================================================
  
   modal
   
  ========================================================= */
  var quizModal = function() {
    
    var duration = 500;
    var modalId = undefined;
    $('.check a').on('click', function() {
      var $target = $($(this).attr("data-target"));
      modalId = $target.attr("id");
      
      $target.css({display: 'block', opacity: 0});

      var margin = ($(window).height() - $target.find('.content').height()) / 2 - 25;

      if (margin < 20) {
        margin = 20;
      }
      
      if ($(window).height() - $target.find('.content').height() - margin * 2 < 0) {
        $target.find('.content').height($(window).height() - margin * 2 - 50);
      }

      $target.css({paddingTop: margin}).animate({opacity: 1}, duration,function(){
        normalMoviePlay(false);
        if(modalId == "modal2"){
          modalMoviePlay(true);
        }
      });
    });

    $('.modal .close a, .modal .alpha').on('click', function() {
      modalMoviePlay(false);
      $(this).parentsUntil('.item').filter('.modal').fadeOut(duration / 2,function(){
        normalMoviePlay(true);
      });
    });
    
  };
  
  quizModal();
  
  
  var init = function(){
    $("#color_area").css("opacity",0);
  }


  /* =========================================================
  
   movie
   
  ========================================================= */
  function normalMoviePlay(isPlay){
    if(ua.isIElt9) return;
    $(".movie_normal").each(function(index, el) {
      if(isPlay){
        el.play();
      }else{
        el.pause();
      }
    });
  }

  function modalMoviePlay(isPlay){
    if(ua.isIElt9) return;
    $(".movie_modal").each(function(index, el) {
      if(isPlay){
        el.play();
      }else{
        el.pause();
      }
    });
  }
  modalMoviePlay(false);
  
  var init = function(){
    $("#color_area").css("opacity",0);
  }
  
  
  /* =========================================================
  
   animation
   
  ========================================================= */

  

  var animation1 = function(){
    
    point1.anim();
    TweenMax.to($("#design .item_contents"),contensAnimDuration,{delay:contensAnimDelay,opacity:1});
    
  }

  var animation2 = function(){
    
    point2.anim();
    TweenMax.to($("#drive .item_contents"),contensAnimDuration,{delay:contensAnimDelay,opacity:1});
    
  }

  var animation3 = function(){
    
    point3.anim();
    TweenMax.to($("#seat .item_contents"),contensAnimDuration,{delay:contensAnimDelay,opacity:1});
    
  }

    var animation4 = function(){
    
    point4.anim();
    TweenMax.to($("#safe .item_contents"),contensAnimDuration,{delay:contensAnimDelay,opacity:1});
    
  }

    var animation5 = function(){
    
    point5.anim();
    TweenMax.to($("#plan .item_contents"),contensAnimDuration,{delay:contensAnimDelay,opacity:1});
    
  }

  var setAnimation = function(targetElement,animateFunction){
    var animation = function(event) {
      var pos = targetElement.offset().top - $(window).height() * 0.70;
   
      if ($(window).scrollTop() > pos) {
        if (event) {
          $(window).off('scroll', event.data.func);
        }

        /* animation
        ......................................................... */
        animateFunction();
      }
    };
    
    animation();
    $(window).on('scroll', {func: animation}, animation);
  }


  if(!ua.isIElt9 && !isEOH){
      var point1 = new Animation($("#point1"));
    var point2 = new Animation($("#point2")); 
    var point3 = new Animation($("#point3"));
    var point4 = new Animation($("#point4"));
    var point5 = new Animation($("#point5"));
    var contensAnimDuration = 0.3;

    $(".item_contents").css("opacity",0);
    setAnimation($("#design"),animation1);
    setAnimation($("#drive"),animation2);
    setAnimation($("#seat"),animation3);
    setAnimation($("#safe"),animation4);
    setAnimation($("#plan"),animation5);
  }

  
  
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
