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
    } else if (appVersion.indexOf("msie 10.") != -1) {
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

  // if (isMobile) {
  //   window.location.href = "/lineup/roomy/sp/" + window.location.search;
  // }

  //isLegacyIE = true;
  if (isLegacyIE) {
    $(".btn-movie").css("visibility", "hidden");
  }

  if(isLegacyIE){

    var legacyIEhtml = '<div class="ie-wrap">';
    legacyIEhtml += '<div class="ie-head"><img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/IE/logo.jpg" class="ie-logo" alt="" /></div>';
    legacyIEhtml += '<div class="ie-main"><img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/IE/img.jpg" alt="" /></div>';
    legacyIEhtml += '<div class="ie-footer"></div>';
    legacyIEhtml += '</div>';

    $("#wrapper").hide();
    $("body").prepend(legacyIEhtml);

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
      NAV_HEIGT = 196,
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
    
    
	$(window).on("load",function(){
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

      // var _h = $(window).height();
      // var _active_item = "";
      // $.each(items, function(_i, _v) {
      //   if ($(_v).offset().top < winPos + _h) _active_item = _v;
      // });
      // //      console.log(winPos+" "+_h+" "+_active_item);
      // $.each(items, function(_i, _v) {
      //   if (_active_item.indexOf(_v) >= 0) setActiveButton(_i, _v);
      //   else setNonActiveButton(_i, _v);
      // });
    };
    // var setActiveButton = function(_i, _v) {
    //   if (!$(navList[_i]).hasClass("active")) {
    //     $(navList[_i]).addClass("active");
    //     $(navList[_i]).find(".line").stop(false, true).animate({
    //       top: 107,
    //       opacity: 1
    //     }, {
    //       duration: 300,
    //       easing: "easeOutSine"
    //     });
    //     $(navList[_i]).find(".arrow").stop(false, true).animate({
    //       top: 122,
    //       opacity: 0
    //     }, {
    //       duration: 200,
    //       easing: "linear"
    //     });
    //   }
    // }
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
    $(".modal").each(function(){
      $("<img>").attr("src", "http://toyota-dealers.jp/99015/lp1/roomy/resources/img/"+$(this).attr("data-img") );
    });
  }

  function onClickExteriorBanner(){
    $(".modal").click(function(){
      openExteriorModal($(this).attr("data-img"));
      return false;
    });
  }

  function openExteriorModal(img) {
    var exteriorModalHtml  = "";
    exteriorModalHtml += '<div class="sub-block-box-modal-wrapper" style="display: block;">';
    exteriorModalHtml += '<img class="button-close" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/icn-button-close.png">';
    exteriorModalHtml += '<div class="sub-block-box-modal-inner"><img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/' + img+'"></div>';
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
    $("#contents .conversion-btn , #sub_nav ul li, #contents .button2,.color-variation-thumbnail-list a,.color-changer-elem li").hover(function(){
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

    $("#contents .button2,.color-variation-thumbnail-list a,.color-changer-elem li").each(function(){
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
      $present.css("paddingTop",0);
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
  }

  hoverMainNav();

  $(window).on('load', function() {

    preloadExteriorBannerModalImages();
    onClickExteriorBanner();
    onClickColorThumbnail();
    setPresentArea();
    setWhiteBox();
    setViewlistThumbnail();

    $("#contents .item").each(function() {
      setTitleAnimation(this, 100);
    });
    
	var ncbtn = $("div.btnwrap div");
        ncbtn.on("click",function(){
	        if($(this).hasClass("active")){	       
		        return false;
	    	} else{
	    		var thissrc = $("img",this).attr("src");
	    		var elseimg = $(this).siblings("div").find("img");
	    		var elsesrc = elseimg.attr("src");
	    		
	    		//切り替え
	    		$("img",this).attr("src",thissrc.replace("_off", "_on"));
	    		elseimg.attr("src",elsesrc.replace("_on", "_off"));
	    		ncbtn.removeClass("active");
				$(this).addClass("active");
				$("div.car_inner").toggleClass("active");
		    	$("div.car_inner").fadeToggle();
	    	} 
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


$(function(){

  //scroll 
  $(window).on("load",function(){
    setTimeout(function(){
      var item = $(".main_nav_item");
      var reqpos = $("div.reqpos");
        var reqposArray = new Array;
          
        reqpos.each(function(){
        var top = $(this).offset().top + 214;    
        reqposArray.push(top);
        });
        
        scrollAction();
        $(window).on("scroll",function(){
        scrollAction();
      });
      
      function scrollAction(){
        //スクロールに応じてナビのカレント変更
        var y = $(window).scrollTop() + $(window).height() - 214;  
        if(y < reqposArray[0]){
           item.removeClass("active");
        } else{
           $.each(reqposArray, function(i){
              if(this<y){
               item.removeClass("active");
               item.eq(i).addClass("active"); 
              }
          });
        }
        
        if($("li.main_nav_item_2").hasClass("active")){
          //slick自動再生
          $('.slider-nav,.slider-for').slick('slickPlay');
        } else if($("li.main_nav_item_6").hasClass("active")){
          //動画オート再生
          var video = $('video');
          video.attr("autoplay","");
        } else{
          return false;
        }
      }
    },100);
  });
	

	
	//seat tabchange
	var seat = $(".seat");
	var seatbtn = $(".seat_switch div");
	seatbtn.on("click",function(){
		seatbtn.removeClass("active");
		$(this).addClass("active");
		seat.fadeOut(300);
		seat.eq($(this).index()).fadeIn(500);
	});
	
	//navbtn hover-red
	var navbtn = $("#sub_nav li");
	navbtn.hover(function(){
		var img = $("img",this);
		var src = img.attr("src");
		img.attr("src",src.replace("_off","_hover"));
	},function(){
		var img = $("img",this);
		var src = img.attr("src");
		img.attr("src",src.replace("_hover","_off"));
	})
	
	//nomal custome tabchange
	var ncbtn = $(".btn_switch div");
    ncbtn.on("click",function(){
        if($(this).hasClass("active")){	       
	        return false;
    	} else{
	    	ncbtn.removeClass("active");
    		$(this).addClass("active");
    		
    		//切り替え
	    	$(".car_inner").fadeToggle();
    	} 
    });
    
    //slick
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.variable-width'
	});
	$('.variable-width').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 2,
		centerMode: true,
		variableWidth: true,
		asNavFor: '.slider-for',
		focusOnSelect: true,
	});
	$('.strage_gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var slickTrack = $(".strage_gallery .frame");
		if(nextSlide == 12){
			slickTrack.addClass("dftM");
		} else{
			slickTrack.removeClass("dftM");
		}
		
		$("div.strage_gallery .slick-slide").removeClass("opl");
	});    
	$('.slider-nav,.slider-for').slick('slickPause');
	  
	$('.slider-nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var slickTrack = $(".slick_btn_wrap");
		if(nextSlide == 12){
			slickTrack.addClass("dftM");
		} else{
			slickTrack.removeClass("dftM");
		}	
	});
	$("div.strage_gallery .viewer-button-item").each(function(){
      $("<img>").attr("src", "http://toyota-dealers.jp/99015/lp1/roomy/resources/img/"+$(this).attr("data-img") );
    });

	var $redframe = $("#redframe_slick");
	$redframe.hover(
		function(){
			var $currentElem = $("div.strage_gallery .slick-current");
			$currentElem.toggleClass("opl");
		},function(){
			var $currentElem = $("div.strage_gallery .slick-current");
			$currentElem.toggleClass("opl");
		}
	);
	
	$redframe.on("click",function(){
		var $currentElem = $("div.strage_gallery .slick-current");
		slickModal($currentElem.attr("data-image"),$currentElem.attr("data-num"));		
	});
	
	
	
	//function slick-modal
	function slickModal(img,dataNum){
		var exteriorModalHtml  = "";
	    exteriorModalHtml += '<div class="sub-block-box-modal-wrapper" style="display: block;">';
	    exteriorModalHtml += '<img class="button-close" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/icn-button-close_2.png">';
	    exteriorModalHtml += '<img class="button-prev" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/icn-button-prev.png">';
	    exteriorModalHtml += '<img class="button-next" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/icn-button-next.png">';
	    exteriorModalHtml += '<div class="sub-block-box-modal-inner"><img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/' + img+'"></div>';
	    exteriorModalHtml += '</div>'
	    $("#wrapper").append("<div class='modal-wrapper'><div class='modal-bg'></div>" + exteriorModalHtml + "</div>");
	
	    setTimeout(function(){
	    	$("#wrapper").fadeTo(300, 1);
	    },10);
	    
	    $(".modal-wrapper .button-close,.modal-bg").click(function() {
	    	$(".modal-wrapper .sub-block-box-modal-wrapper").remove();
			$("#wrapper .modal-bg").fadeTo(200, 0, function() {
	        	$(".modal-wrapper").remove();
	    	});
	    });
	    
	    var imgNumber = Number(dataNum);
	    $("img.button-next").on("click",function(){    
			if(imgNumber == 13){
				var nextNum = 0;
				imgModalChange(nextNum);
			}else{
				var nextNum = imgNumber+1;
				imgModalChange(nextNum);
			}
	    });	
	     $("img.button-prev").on("click",function(){    
			if(imgNumber == 0){
				var nextNum = 13;
				imgModalChange(nextNum);
			}else{
				var nextNum = imgNumber-1;
				imgModalChange(nextNum);
			}
	    });		
    	
    	function imgModalChange(nextNum){
			var nextImg = $("li.viewer-button-item[data-num="+nextNum+"]").attr("data-image");	
			$("div.sub-block-box-modal-inner").html('<img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/img/'+nextImg+'">');
			imgNumber = nextNum;
		}
	}
	
	
	
	//color change	    	
    var colorChanger = function(){
        var btn = $(".color-changer-elem li");
        
        btn.on("click",function(){
            //ボタンの色替え
			btn.removeClass("selected");
			$(this).addClass("selected");

            //車の画像変更
            var index = $(this).closest(".color-changer-elem").find("li").index(this);
            var carimg = $(this).closest(".color-changer-elem").siblings(".color-changer-img").find("div");
            
			carimg.fadeOut(300);
			carimg.eq(index).fadeIn(500);
        });
    }
    colorChanger();
});

$(function(){
	$("#mov1").on("inview",function(){
		var t=$("#mov1").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov2").on("inview",function(){
		var t=$("#mov2").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov3").on("inview",function(){
		var t=$("#mov3").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov4").on("inview",function(){
		var t=$("#mov4").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov5").on("inview",function(){
		var t=$("#mov5").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov6").on("inview",function(){
		var t=$("#mov6").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov7").on("inview",function(){
		var t=$("#mov7").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov8").on("inview",function(){
		var t=$("#mov8").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)}),
	$("#mov9").on("inview",function(){
		var t=$("#mov9").get(0);var _id = setInterval(function(){
			if(t){
				t.play()
				clearInterval(_id);
			}
		},300)});
});