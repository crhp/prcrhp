(function($) {
	$.fn.css3Transition = function(options) {

		var _elm = this;
		var _$elm = $(this);
		var defaults = {
			css: {},
			duration: 1300,
			easing:"",
			success: function() { }
		};
		var settings = $.extend({}, defaults, options);

		$.support.transition = typeof $("body").css("transitionProperty") === "string";

		if ($.support.transition) {
			var listenEvents = [
				'webkitTransitionEnd', // webkit(Chrome1.0, Safari3.2)
				'oTransitionEnd', // Opera10.5
				'otransitionend', // Opera12
				'transitionend' // IE10, Fx4以降, 12.10以降
				];
				_$elm.css(settings.css).on(listenEvents.join(' '),settings.success);

			} else {
				_$elm.stop().animate(settings.css, settings.duration, settings.easing,settings.success);
			}

			return this;
		};


		var tabChange1;
		var tabChange2;

		jQuery(function($){
			tabChange1 = new fielderhv.TabChange($('#tab_change_1'));
			tabChange2 = new fielderhv.TabChange($('#tab_change_2'));
			tabChange1.init();
			tabChange2.init();

			$(tabChange2).bind(fielderhv.TabChange.CHANGE,function(event,id){
			//console.log(id);
			if(id==0){
				$('.xurban_only').css('display','block');
				$('.original_only').css('display','none');
			}else{
				$('.xurban_only').css('display','none');
				$('.original_only').css('display','block');

			}

		});

			var _cl = ["img01","img02","img03","img04","img05"];
			if(location.href.indexOf("link=original") > 0){
				/* original */
				tabChange1.change(1);
				tabChange2.change(1);
				$('.xurban_only').css('display','none');
				$('.original_only').css('display','block');
				_cl = ["img01","img02","img03","img04","img05"];
				var _html = [
				"<li class='img01 current'>",
				"<a href='#wbBnr'><img src='/lineup/corollafielder/img/slide/mainimg_01.jpg' alt='' width='100%'></a></li>",
				"<li class='img02'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_02.jpg' alt='' width='100%'></li>",
				"<li class='img03'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_03.jpg' alt='' width='100%'></li>",
				"<li class='img04'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_04.jpg' alt='' width='100%'></li>",
				"<li class='img05'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_05.jpg' alt='' width='100%'></li>"
				].join("");

			}else{
				tabChange1.change(0);
				tabChange2.change(0);
				$('.xurban_only').css('display','block');
				$('.original_only').css('display','none');
				var _html = [
				"<li class='img01 current'>",
				"<a href='#wbBnr'><img src='/lineup/corollafielder/img/slide/mainimg_01.jpg' alt='' width='100%'></a></li>",
				"<li class='img02'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_02.jpg' alt='' width='100%' ></li>",
				"<li class='img03'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_03.jpg' alt='' width='100%'></li>",
				"<li class='img04'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_04.jpg' alt='' width='100%'></li>",
				"<li class='img05'>",
				"<img src='/lineup/corollafielder/img/slide/mainimg_05.jpg' alt='' width='100%'></li>"
				].join("");
			}


			$("#main_img_container #slider_main").append(_html);
			var slide_car = new fielderhv.Slideshow("#slider_main", {
				type: 0,
				nav: "#main_img_slider_thumb .navs ul",
				autoSlide:true,
				waitDuration:5000,
				changeList:_cl
			});

		});
})(jQuery);


function startContents(){

}


function initContents(){
	// setSlideInteraction();

	//Smooth Scroll
	$('a[href^=#]').click(function() {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({
			scrollTop: position - $("#nav_container_inner").height()
		}, speed, "swing");
		return false;
	});


	// function setSlideInteraction(){
 //    	$('#viewer04 .change_btn .nav_cover').css({
	// 			width: $('#viewer04 .change_btn li.active').outerWidth()-10,
	// 			left: $('#viewer04 .change_btn li.active').position().left
	// 		});
	// 		// クリックでアニメーション
	// 		$('#viewer04 .change_btn li a').click(function(){
	// 			$('#viewer04 .change_btn .nav_cover').stop().animate({
	// 				width: $(this).outerWidth()-10,
	// 				left: $(this).position().left}
	// 			,'fast');
	// 		});
 //    }







 function setMainHeight() {
 	var height = $("#main_img_container .slide .current img").height();
 	if (height != 0) {
 		$("#main_img_container").height(height);
 		$("#header_container").height(height + $("#header").height() + 16);
 	}
 }

 $("#main_img_container .slide .img01 img").attr("src", $("#main_img_container .slide .img01 img").attr("src") + "?rand=" + parseInt(Math.random() * 100));
 $("#main_img_container .slide .current img").bind("load", function() {

 	setMainHeight();

 	var wayCount = 0;

 	for (var length = $("#contents_list ol > li").size(), i = 1; i <= length; i++) {
 		$("#contents_list #index0" + i).waypoint(function(direction) {
 			if(direction == "down"){
 				var _id = $(this).attr("id");
 				$("#main_nav li span").removeClass("stay");
 				$("#main_nav li a[href *=" + _id + "]").find("span").addClass("stay");
 			}

 		}, {
 			offset: 200
 		}).waypoint(function(direction){
 			if(direction == "up"){
 				var _id = $(this).attr("id");
 				$("#main_nav li span").removeClass("stay");
 				$("#main_nav li a[href *=" + _id + "]").find("span").addClass("stay");
 			}
 		},{offset:0});
 	}

 	if (navigator.userAgent.indexOf('Android') > 0) {
 		$("#fuel_cost .counter").attr("class","counter_android");
 	}
 	$('#contents').waypoint(function(direction) {
 		if (direction.indexOf("down") != -1) {
				//console.log("down");
				$("#nav_container_inner").addClass("fixed");
				$("#contents_list").css({
					"padding-top": 150 + "px"
				});
			} else {
				//console.log("up");
				$("#nav_container_inner").removeClass("fixed");
				$("#contents_list").css({
					"padding-top": 0 + "px"
				});
				//var _id ="index01";

				//$("#main_nav li a[href *=" + _id + "]").find("span").addClass("stay");
			}



		});

 	$('#main_img_container').waypoint(function(direction) {
 		if (direction.indexOf("down") != -1) {

 		} else {
 			$("#main_nav li span").removeClass("stay");
 		}
 	});

 	$("#contents_list .fade").each(function() {
 		$(this).waypoint(function(direction) {

 			$(this).css3Transition({
 				css: {
 					opacity: 1
 				}
 			});

 			if ($(this).parent().parent().attr("id").indexOf("index01") > -1) {
 				setTimeout(function() {
 					new fielderhv.Counter(".counter .num_03 img", {
 						height: 94,
 						loopCount: 3,
 						targetCount: 10,
 						resetCount: 10,
 						duration: 400
 					});
 					new fielderhv.Counter(".counter .num_02 img", {
 						height: 94,
 						loopCount: 1,
 						targetCount: 7,
 						resetCount: 10,
 						duration: 800
 					});
 					new fielderhv.Counter(".counter .num_01 img", {
 						height: 94,
 						loopCount: 0,
 						targetCount: 3,
 						resetCount: 10,
 						duration: 1239
 					});
 				},500)

 			}

 			wayCount += 1;

 		}, {
 			offset: $(window).height(),
 			triggerOnce: true
 		});
 	});



 });


$(window).resize(function() {
	setDisplaySize();
	setMainHeight();
});
}

$(function() {
	headerInit();
});

function headerInit(){
	setLoading();
	initContents();
	setDisplaySize();

}

jQuery.event.add(window, "load", fielderhvLoadComplete);

var loadingInstance;
function setLoading(){
	// var fade = $('<div id="fadeobject"><div id="loading"></div></div>');

	// $('body').append(fade);

	loadingInstance = new fielderhv.Loading($('#loading'),15,24);
	loadingInstance.start();
	// jQuery.event.add(window, "load", fielderhvLoadComplete);
}




function fielderhvLoadComplete(){
	// console.log("loadloadload");
	// initContents();
	$('#loading').delay(250).animate({
		opacity: 0},
		200,"linear" ,function() {
			/* stuff to do after animation is complete */
		});
	$("#fadeobject").delay(500).animate({
		opacity: 0},
		500,"linear", function() {
			loadingInstance.stop();

			$(this).remove();
		});
}

function get_url_vars() {
	var vars = new Object,
	params;
	var temp_params = window.location.search.substring(1).split('&');
	for (var i = 0; i < temp_params.length; i++) {
		params = temp_params[i].split('=');
		if (params[0]) {
			vars[decodeURIComponent(params[0])] = decodeURIComponent((params[1] || "").replace("+", " "));
		}
	}
	return vars;
}

function setDisplaySize() {
	$("#main_img_container .slide li").width($(window).width());
}

var fielderhv = fielderhv || {};



fielderhv.Counter = (function() {
	var Counter = function(elm, props) {

		var _counter = this,
		_targetCount = 0,
		_elm,
		_$elm,
		_props,
		_easing,
		_animProperty = "";

		/* ///////////////////////////////////
		// Private Method
		///////////////////////////////////*/

		var _init = function(elm, props) {
			_elm = elm;
			_$elm = $(elm);
			_props = props || {};
			_props.countFunc = _props.countFunc || function(){};
			_counter.count = 0;

			// _counter.countStart();
		};

		var _countAnimation = function(target,easing,jqueryEasing,func){

			var pos = _$elm.css("top").replace("px", "");
			var plusY = parseInt(pos) - (parseInt(props.height) * target);

			_$elm.css({
				transition: "all " + _props.duration + "ms "+ easing
			});

			_$elm.css3Transition({
				css: {
					top: plusY + "px"
				},
				duration:_props.duration,
				easing:jqueryEasing,
				success: function() {
					_counter.count += 1;
					func();
				}
			});
		};

		this.countupToTarget = function(target,easing){
			_countAnimation(target,easing,"linear",function(){});
		};

		_init(elm, props);

	};

	return Counter;

})();

// classes
fielderhv.TabChange = function($tabRoot){
	var _that = this;

	fielderhv.TabChange.CHANGE = "changeTab";

	var _$nav = $('.tab_change_bt a',$tabRoot);
	_$nav.each(function(index, el) {
		$(el).attr('data-nav',index);
	});

	var _$contents = $('.tab_change_contents',$tabRoot);

	_that.init = function(){
		_$nav.click(function(event) {
			var id = $(this).attr('data-nav');
			_that.change(id)
			return false;
		});
	};

	_that.change = function(id){
		_$contents.css('display','none');
		_$nav.removeClass('current');
		var displayContents = $(_$contents[id]);
		$(_$nav[id]).addClass('current');
		displayContents.css('display','block');
		$(_that).trigger(fielderhv.TabChange.CHANGE,[id]);
	};
};

fielderhv.Loading = function($loadingObj,frames,frameRate){
	var count = 0;
	var timer = "";
	var that = this;
	var duration = 1000/frameRate;
	var width = $loadingObj.width();
	var height = $loadingObj.height();
	this.start = function(){
		timer = setInterval(that.loop,duration);
	};

	this.loop = function(){
		//console.log("load");
		var pos = -height * count;
		$loadingObj.css('background-position','0 '+pos+'px');
		count++;
		if(count>=frames){
			count = 0;
		}
	};

	this.stop = function(){
		clearInterval(timer);
	};
}


fielderhv.Slideshow = (function() {


	var Slideshow = function(elm, props) {

		var _imgCount = 0,
		_imgWidth = 0,
		_elm = "",
		_$elm = "",
		_$nav = "",
		_arrowNav = "",
		_$arrowNav = "",
		_props = {},
		_timer = "",
		_slideFlg = false,
		scope = this,
		_wt_du = 3000;


		/* ///////////////////////////////////
	// Private Method
	///////////////////////////////////*/

	var _init = function(elm, props) {
		_elm = elm;
		_$elm = $(elm);
		_props = props || {};

		if (props.nav) {
			_$nav = $(props.nav);
			_setClickNav();
		}

		if (props.arrowNav) {
			_arrowNav = props.arrowNav;
			_$arrowNav = $(props.arrowNav);
			_setClickArrowNav();
		}

		if (_props.type) {
			_setImgDisplaySlide();
		} else {
			_setImgDisplayFade();
		}
		if(_props.waitDuration) _wt_du = _props.waitDuration;

		scope.startSlide();

	};

		//fadeのスライド用画像をセット
		var _setImgDisplayFade = function() {

			_$elm.addClass("slideFade")
			.find("li")
			.first()
			.css({
				opacity:1
			})
			.addClass("current");

			_$elm.find("li")
			.not(":first")
			.css({
				opacity:0
			});
		};

		//横スライド用画像セット
		var _setImgDisplaySlide = function() {
			var $li = _$elm.find("li");
			_imgWidth = $li.find("img").width();

			_imgCount = $li.size();

			_$elm.css({
				width: (_imgCount + 1) * _imgWidth + "px",
				left: 0
			});

			$li.first()
			.clone()
			.appendTo(_elm);

			$li = _$elm.find("li");

			$li.each(function() {

				var $this = $(this);
				var imgNo = $this.css({
					"position": "absolute"
				})
				.index();

				$this.css({
					"left": imgNo * _imgWidth + "px",
					"display": "block"
				});


			});


		};

		var _setClickNav = function() {
			_$nav.find("li a")
			.click(function(e) {
				var currentIndex = $(this).parent().index();
				_changeImg(currentIndex);

				e.preventDefault();
			});
		};

		var _setClickArrowNav = function() {
			var count = 1;
			$(document).on('click', _arrowNav + " li a",function(e) {
				if ($(this).parent().hasClass("on")) {
					var _$current = _$elm.find(".current");
					if ($(this).parent().hasClass("prev")) {
						count = -1;
					} else {
						count = 1;
					}

					_changeImg(_$current.index() + count);
				}
				e.preventDefault();
			});

		};


		var _changeImg = function(target) {

			if (target !== 0 && !target) {
				var target = target || "";
			}


			if (_props.change) {
				_props.change();
			}
			if (_props.type) {
				_chageImgSlide(target);
			} else {
				_changeImgFade(target);
			}

			scope.setNavCurrent();
			scope.startSlide();
			if (_props.changed) {
				_props.changed();
			}
		};

		//画像切り替えFade
		var _changeImgFade = function(target) {
			var _$current = _$elm.find(".current");
			_$current.css3Transition({css:{
				opacity:0
			}})
			.removeClass("current");

			if (_$elm.find("li").last().index() != _$current.index() || (target || target === 0)) {
				if (!target && target !== 0) {
					_$current.next()
					.css3Transition({css:{
						opacity:1
					}})
					.addClass("current");
				} else {

					currentNav = target;

					_$elm.find("li")
					.eq(currentNav)
					.css3Transition({css:{
						opacity:1
					}})
					.addClass("current");
				}

			}　
			else {
				_$elm.find("li")
				.first()
				.css3Transition({css:{
					opacity:1
				}})
				.addClass("current");
			}

		};

		//画像切り替えSlide
		var _chageImgSlide = function() {
			var linecount = (parseInt(_$elm.css("left")) / -_imgWidth);
			// 最後の画像（一つ目のコピ－）だったら
			if (linecount == _imgCount) {
				// 現在動いてるアニメーションを止めて
				_$elm.stop();
				// 一番左に戻す（一つ目なので見た目には表示が変わらない）
				_$elm.css("left", "0px");
			}
			// 一つ右のものをスライドして表示するアニメーションを開始する
			_$elm.animate({
				"left": "-=" + _imgWidth + "px"
			}, "slow");
		};

		//Slide Animation Start
		this.startSlide = function() {
			if (_props.autoSlide) {
				this.stopSlide();
				_timer = setInterval(function() {
					_changeImg();
				}, _wt_du);
			}
		};

		//Slide Animation Stop
		this.stopSlide = function() {
			clearInterval(_timer);
		};

		this.setNavCurrent = function() {
			var _$current = _$elm.find(".current");
			var index = _$current.index();
			if (_$nav) {

				_$nav.find("li")
				.removeClass("current");
				_$nav.find("li")
				.eq(index)
				.addClass("current");
			}

			if (_$arrowNav) {

				var $next = _$arrowNav.find(".next");
				var $prev = _$arrowNav.find(".prev");
				if (_$elm.find("li").last().index() == _$current.index()) {
					$next.removeClass("on")
					.addClass("off");
				}else {
					$next.removeClass("off").addClass("on");				}

					if(_$current.index() == 0){
						$prev.addClass("off")
						.removeClass("on");
					} else {
						$prev.removeClass("off").addClass("on");
					}
				}
			};


			_init(elm, props);

		};


		return Slideshow;

	})();








	$(function(){
//2つのタブによる画像切替
//index01

    // section01 ChangePanel
    $('#viewer01 .img_box img').each(function(i){
    	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
    	$('#viewer01 .img_box img:first').css({opacity:'1',zIndex:'99'});
    });

    $('#viewer01 ul li').click(function(){
    	var connectCont = $('#viewer01 .change_btn li').index(this);
    	var showCont = connectCont+1;

    	$('#viewer01 .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
    	$('#viewer01 .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    });

    $('#viewer01 .change_btn li:not(.active)').hover(function(){
    	$(this).stop().animate({opacity:'0.8'},200);
    },function(){
    	$(this).stop().animate({opacity:'0.7'},200);
    });

    $('#viewer01 .change_btn li').css({opacity:'0.7'});
    $('#viewer01 .change_btn li:first').addClass('active');




    // section02 ChangePanel
    $('#viewer02 .img_box img').each(function(i){
    	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
    	$('#viewer02 .img_box img:eq(0)').css({opacity:'1',zIndex:'99'});
    });

    $('#viewer02 ul li').click(function(){
    	var connectCont = $('#viewer02 .change_btn li').index(this);
    	var showCont = connectCont+1;

    	$('#viewer02 .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
    	$('#viewer02 .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    });

    $('#viewer02 .change_btn li:not(.active)').hover(function(){
    	$(this).stop().animate({opacity:'1'},200);
    },function(){
    	$(this).stop().animate({opacity:'0.7'},200);
    });

    $('#viewer02 .change_btn li').css({opacity:'0.7'});
    $('#viewer02 .change_btn li:eq(0)').addClass('active');








    // section03 cahge_tab
    $("#section03 .change_tab li").click(function() {
    	var num = $("#section03 .change_tab li").index(this);
    	$("#section03 .content_wrap").addClass('disnon');
    	$("#section03 .content_wrap").eq(num).removeClass('disnon');
    	$("#section03 .change_tab li").removeClass('select').css({opacity:'0.4'});
    	$(this).addClass('select').css({opacity:'1.0'});
    });




    // section03 viewer04 ChangePanel
    $('#viewer04 .img_box img').each(function(i){
    	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
    	$('#viewer04 .img_box img:first').css({opacity:'1',zIndex:'99'});
    });

    $('#viewer04 ul li').click(function(){
    	var connectCont = $('#viewer04 .change_btn li').index(this);
    	var showCont = connectCont+1;

    	$('#viewer04 .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
    	$('#viewer04 .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    });

    $('#viewer04 .change_btn li:not(.active)').hover(function(){
    	$(this).stop().animate({opacity:'1'},200);
    },function(){
    	$(this).stop().animate({opacity:'0.7'},200);
    });

    $('#viewer04 .change_btn li').css({opacity:'0.7'});
    $('#viewer04 .change_btn li:first').addClass('active');



////////////////////////////////////

    // section03 viewer05 ChangePanel
    $('#viewer05 .img_box img').each(function(i){
    	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
    	$('#viewer05 .img_box img:first').css({opacity:'1',zIndex:'99'});
    });

    $('#viewer05 ul li').click(function(){
    	var connectCont = $('#viewer05 .change_btn li').index(this);
    	var showCont = connectCont+1;

    	$('#viewer05 .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
    	$('#viewer05 .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    });

    $('#viewer05 .change_btn li:not(.active)').hover(function(){
    	$(this).stop().animate({opacity:'1'},200);
    },function(){
    	$(this).stop().animate({opacity:'0.7'},200);
    });

    $('#viewer05 .change_btn li').css({opacity:'0.7'});
    $('#viewer05 .change_btn li:first').addClass('active');



  });


jQuery(document).ready(function($) {

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