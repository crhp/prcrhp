$(document).ready(function() {
    $('.lightbox').colorbox({
        onComplete: function() {
            window.resizeTo(640, 480);
            $.colorbox.position(0);
        }
    });
});

$(function(){
    var colorChanger = function(){
        var btn = $(".color-changer-elem li");
        var img = $(".color-changer-elem li img");
        
        btn.on("click",function(){
            //ボタンの色替え
            var color = $(this).attr("class");
            var src = $("img",this).attr("src");
            img.each(function(){
                var thissrc = $(this).attr("src");
                $(this).attr("src",thissrc.replace("_on","_off"));
            });
            $(this).find("img").attr("src",src.replace("_off","_on"));

            //車の画像変更
            var index = $(this).closest(".color-changer-elem").find("li").index(this);
            var carimg = $(this).closest(".color-changer-elem").siblings(".color-changer-img").find("div");
            
			carimg.fadeOut(300);
			carimg.eq(index).fadeIn(500);
        });
    }
    colorChanger();
    
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
	    	$(".car_inner").toggleClass("active");
	    	$(".car_inner").fadeToggle();
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
        $('#slider').height($('#slider').width() * (760/640));
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

        /* 
	        var $nav = $('#sub_nav'),
            $contents = $('#contents'),
            navHeight = $nav.outerHeight(),
        */
        var positionTop, scrolled = false;

        var scrollEvent = function() {
	        var $nav = $('#sub_nav'),
	            $contents = $('#contents'),
	            navHeight = $nav.outerHeight();

	        
            if (!scrolled && $(window).scrollTop() > 40) {
                positionTop = $nav.offset().top;
                scrolled = true;
            }

            if (!$nav.hasClass('fixed') && $(window).scrollTop() >= positionTop) {
                $nav.addClass('fixed');

            } else if ($nav.hasClass('fixed') && $(window).scrollTop() <= positionTop) {
                $nav.removeClass('fixed');
                $(".sub_nav_wrap").css({ paddingTop: 0 });
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
		var elseThumb = $this.siblings("li");
		
		elseThumb.removeClass("active");
		$this.addClass("active");

        var img = $(".car-thumb-img li img");
        var src = $("img",this).attr("src");
            img.each(function(){
                var thissrc = $(this).attr("src");
                $(this).attr("src",thissrc.replace("_on","_off"));
            });
            $(this).find("img").attr("src",src.replace("_off","_on"));
		
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
  
  $('a[href^="#"]').click(function() {
	var headerH = $('#sub_nav').outerHeight();
	var speed = 500;
	var href = $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top - headerH;
	$('body,html').animate({scrollTop:position}, speed, 'swing');
	return false;
  });

  	
  	
  	//slick modal
  	$("div.strage_gallery .slick-slide").each(function(){
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
	    exteriorModalHtml += '<img class="button-close" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/sp/img/icn-button-close_2.png">';
	    exteriorModalHtml += '<img class="button-prev" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/sp/img/icn-button-prev.png">';
	    exteriorModalHtml += '<img class="button-next" src="http://toyota-dealers.jp/99015/lp1/roomy/resources/sp/img/icn-button-next.png">';
	    exteriorModalHtml += '<div class="sub-block-box-modal-inner"><img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/sp/img/' + img+'"></div>';
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
			var nextImg = $("div.strage_gallery div.slick-slide[data-num="+nextNum+"]").attr("data-image");	
			$("div.sub-block-box-modal-inner").html('<img src="http://toyota-dealers.jp/99015/lp1/roomy/resources/sp/img/'+nextImg+'">');
			imgNumber = nextNum;
		}
	}

});
