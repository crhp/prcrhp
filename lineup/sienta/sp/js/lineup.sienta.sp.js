var sienta = sienta || {};

;(function($) {
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
	})(jQuery);

	sienta.main = (function(){
		var tabChange1;
		var tabChange2;

		var that = this;

		var _setImgHeight  = function(){
			var $mainImgContainer = $("#main_img_container"),
			$slide = $mainImgContainer.find("#slide"),
			$img = $mainImgContainer.find("img").first(),
			$modePics = $(".mode_pics"),
			$modePicsImg = $modePics.find("img").first(),
			height = $img.height();

			$slide.height(height);
			$modePics.each(function(){
			//console.log($(this).find("img"));
			$(this).height($(this).find("li").height());
		});
		};

	//解析タグ生成
	function shopSearchClick(evt, tag1, tag2, targetEl) {
		if(location.href.indexOf("link=original") > 0){
			/* original */
			tag1 = "original_"+tag1;
			tag2 = tag2+"(original)";


		}
		//console.log('sienta',tag1,tag2);
		_gaq.push(
			// コールバック
			[
			'_set', {
				hitCallback: function() {
					document.location.href = targetEl.href;
						//console.log("href:"+targetEl.href);
					}
				}
				],
			// イベントトラッキング
			[
			'_trackEvent',
			'sienta',
			tag1,
			tag2
			]
			);

		evt.preventDefault();
		evt.stopPropagation();
		if (evt.returnValue) {
			evt.returnValue = false
		}; // IE用
	}

	//スライドショー開始
	var _setSlide = function(){
		//メイン画像
		new sienta.Slideshow("#slide", {
			type: 0,
			nav: "#slide_status ul",
			changed: function() {
				var $slideStatusImg = $("#slide_status  img"),
				$currentImg = $("#slide_status .current img");


				$slideStatusImg.attr("src",$slideStatusImg.attr("src").replace("current","normal"));
				$currentImg.attr("src",$currentImg.attr("src").replace("normal","current"));
			},
			autoSlide:true
		});

		var changeCarHybrid1 = new sienta.Slideshow("#hybrid_car_slide_cars .cars", {
			type: 0,
			nav: "#hybrid_car_slide_nav .navs",
			changed: function() {
				$("#hybrid_car_slide_nav .stay_nav").css({
					left: $("#hybrid_car_slide_nav .navs .current").position().left + "px",
					top: $("#hybrid_car_slide_nav .navs .current").position().top-2 + "px"
				});

			}
		});

		var changeCarHybrid2 = new sienta.Slideshow("#hybrid_car_slide_cars2 .cars", {
			type: 0,
			nav: "#hybrid_car_slide_nav2 .navs",
			changed: function() {
				$("#hybrid_car_slide_nav2 .stay_nav").css({
					left: $("#hybrid_car_slide_nav2 .navs .current").position().left + "px",
					top: $("#hybrid_car_slide_nav2 .navs .current").position().top-2 + "px"
				});

			}
		});

		var changeInterior = new sienta.Slideshow("#interior_slide_cars .cars", {
			type: 0,
			nav: "#interior_slide_nav .navs",
			changed: function() {
				$("#interior_slide_nav .stay_nav").css({
					left: $("#interior_slide_nav .navs .current").position().left-2 + "px",
					top: $("#interior_slide_nav .navs .current").position().top + "px"
				});

			}
		});
		var changeInterior2 = new sienta.Slideshow("#interior_slide_cars2 .cars", {
			type: 0,
			nav: "#interior_slide_nav2 .navs",
			changed: function() {
				$("#interior_slide_nav2 .stay_nav").css({
					left: $("#interior_slide_nav2 .navs .current").position().left-2 + "px",
					top: $("#interior_slide_nav2 .navs .current").position().top + "px"
				});

			}
		});

	};

	var _setChangeMode = function(){
		$(".mode_selector a").click(function(){
			var $this = $(this).parent(),
			$modeSelector = $this.parent().parent(),
			$selector = $modeSelector.find(".selector"),
			$next = $modeSelector.next(),
			currentClass = $this.attr("class"),
			hideCssStyle = "display:none",
			showCssStyle = "display:block";

			$next.find("> ul > li").attr("style",hideCssStyle);
			$next.find("."+currentClass).attr("style",showCssStyle);

			if($this.hasClass("mode_hana")){
				$selector.addClass("selector_hana");
			} else {
				$selector.removeClass("selector_hana");
			}

			return false;
		});
	};

	var _setResize = function(){
		$(window).resize(function(){
			_setImgHeight();
		});
	}

	var _setHanaImages = function(){
		$(".hana img").each(function(){
			var $this = $(this),
			imgName = $this.attr("src");

			imgName = imgName.replace(/\.([j|p])/g,"_hana.$1");

			$this.attr("src",imgName);
		});
	};

	var _setHanaClass = function(){
		$("body").addClass("req_hana");
	};


	that.init  =function( ){
		_setSubnav();
		$(window).scroll(function(){
			_setSubnav();
		});
		$('.sienta_pagetop a').bind('click',function(){
			jQuery('body,html').stop().animate({
				scrollTop: 0
			}, 500,'swing');
			return false;
		});
		_setMeritSmoothScroll();
		_setMeritSmoothScroll2();
		_tabChangeInit();
		_changeState();
		_setImgHeight();
		_setSlide();
		_setChangeMode();
		_setResize();
		_setTag();
	};

	var _setSubnav= function(){

		var initPos = $("#title_container").offset().top +$("#title_container").height();
		//console.log(initPos);
		if($(window).scrollTop() >= initPos && !$("#sub_nav").hasClass("fixed")){

			$("#index01").css({
				paddingTop:70
			});
			$("#sub_nav").addClass("fixed");
		} else if($(window).scrollTop() < initPos && $("#sub_nav").hasClass("fixed")){
			$("#sub_nav").removeClass("fixed");
			$("#index01").css({
				paddingTop:0
			});
		}
	};

	var _setMeritSmoothScroll = function(){
		$('#title_container .btn_merit a').bind("click",function() {
			var speed = 400;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? "html" : href);
			var position = target.offset().top - 170;

			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	};
	var _setMeritSmoothScroll2 = function(){
		$('#index02 .anc_btn a').bind("click",function() {
			var speed = 400;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? "html" : href);
			var position = target.offset().top - 40;

			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	};



	var _changeState = function(){
		if(location.href.indexOf("link=original") > 0){
			/* original */
			tabChange1.change(1);
			tabChange2.change(1);
			$('.xurban_only').css('display','none');
			$('.original_only').css('display','block');
			_cl = ["img01","img02","img03","img04","img05"];
			var _html = [
			"<li class='img01 current'>",
			"<img src='/img/lineup/sienta_sp/slide/mainimg_01.jpg' alt='' width='100%'></li>",
			"<li class='img02'>",
			"<img src='/img/lineup/sienta_sp/slide/mainimg_02.jpg'  alt='' width='100%' ></li>",
			"<li class='img03'>",
			"<img src='/img/lineup/sienta_sp/slide/mainimg_03.jpg'  alt='' width='100%' ></li>"
			].join("");

		}else{
			tabChange1.change(0);
			tabChange2.change(0);
			$('.xurban_only').css('display','block');
			$('.original_only').css('display','none');
			var _html = [
			"<li class='img01 current'>",
			"<img src='/lineup/sienta/sp/img/slide/mainimg_01.jpg' alt='' width='100%'></li>",
			"<li class='img02'>",
			"<img src='/lineup/sienta/sp/img/slide/mainimg_02.jpg'  alt='' width='100%' ></li>",
			"<li class='img03'>",
			"<img src='/lineup/sienta/sp/img/slide/mainimg_03.jpg'  alt='' width='100%' ></li>"
			].join("");
		}


		$("#main_img_container #slide ul").html(_html);
	};

	var _tabChangeInit = function(){
		tabChange1 = new sienta.TabChange($('#tab_change_1'));
		tabChange2 = new sienta.TabChange($('#tab_change_2'));
		tabChange1.init();
		tabChange2.init();
		$(tabChange2).bind(sienta.TabChange.CHANGE,function(event,id){
			//console.log(id);
			if(id==0){
				$('.xurban_only').css('display','block');
				$('.original_only').css('display','none');
			}else{
				$('.xurban_only').css('display','none');
				$('.original_only').css('display','block');

			}

		});
	}

	var _setTag = function(){

		$("#sub_nav .nav01 a").click(function(e) {
			shopSearchClick(e, "sp_header_store", "スマホ版 ヘッダーリンク 取り扱い店舗一覧", this);

		});

		$("#sub_nav .nav02 a").click(function(e) {
			shopSearchClick(e, "sp_header_catalog", "スマホ版 ヘッダーリンク カタログ", this);

		});

		$("#sub_nav .nav03 a").click(function(e) {
			shopSearchClick(e, "sp_header_online", "スマホ版 ヘッダーリンク オンライン見積もり", this);

		});

		$("#sienta_search_store a").click(function(e) {
			shopSearchClick(e, "sp_footer_store", "スマホ版 フッターリンク 取り扱い店舗一覧", this);

		});

	};

	that.initHana = function(){
		var hideStyle = "display:none;",
		showStyle = "display:block";

		$(".mode_pics li,.cars_lists .mode_sienta").attr("style",hideStyle);
		$(".mode_pics .mode_hana,.cars_lists .mode_hana").attr("style",showStyle);
		$(".mode_selector .selector").addClass("selector_hana");
		$(".btn_merit a,.btn_merit_footer a").attr("href","06.html?link=+hana");
		$(".btn_back a,.btn_back_footer a").attr("href","index.html?link=+hana");

		_setHanaImages();
		_setHanaClass();
	};

	return that;
})();

$(window).load(function(){
	sienta.main.init();

	if(location.href.indexOf("link=+hana") != -1){
		//sienta.main.initHana();
	}
});


// classes
sienta.TabChange = function($tabRoot){
	var _that = this;

	sienta.TabChange.CHANGE = "changeTab";

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
		$(_that).trigger(sienta.TabChange.CHANGE,[id]);
	};
};

sienta.Slideshow = (function() {
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


// #color-change-panel
$('#color-change-panel .img_box img').each(function(i){
	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
	$('#color-change-panel .img_box img:eq(0)').css({opacity:'1',zIndex:'99'});
});

$('#color-change-panel ul li').click(function(){
	var connectCont = $('#color-change-panel .change_btn li').index(this);
	var showCont = connectCont+1;

	$('#color-change-panel .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
	$('#color-change-panel .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

	$(this).addClass('active');
	$(this).siblings().removeClass('active');

	$(this).parent().parent().addClass('show');
	$(this).parent().parent().siblings().removeClass('show');


});

$('#color-change-panel .change_btn li:not(.active)').hover(function(){
	$(this).stop().animate({opacity:'0.7'},200);
},function(){
	$(this).stop().animate({opacity:'1.0'},200);
});

$('#color-change-panel .change_btn li').css({opacity:'1.0'});
$('#color-change-panel .change_btn li:eq(0)').addClass('active');






// change-seat-panel
$('#change-seat-panel .img_box img').each(function(i){
	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
	$('#change-seat-panel .img_box img:first').css({opacity:'1',zIndex:'99'});
});

$('#change-seat-panel ul li').click(function(){
	var connectCont = $('#change-seat-panel .change_btn li').index(this);
	var showCont = connectCont+1;

	$('#change-seat-panel .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
	$('#change-seat-panel .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

	$(this).addClass('active');
	$(this).siblings().removeClass('active');
});

$('#change-seat-panel .change_btn li:not(.active)').hover(function(){
	$(this).stop().animate({opacity:'0.9'},200);
},function(){
	$(this).stop().animate({opacity:'1.0'},200);
});

$('#change-seat-panel .change_btn li').css({opacity:'1.0'});
$('#change-seat-panel .change_btn li:first').addClass('active');





// #change-receipt-panel
$('#change-receipt-panel .img_box img').each(function(i){
	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
	$('#change-receipt-panel .img_box img:first').css({opacity:'1',zIndex:'99'});
});

$('#change-receipt-panel ul li').click(function(){
	var connectCont = $('#change-receipt-panel .change_btn li').index(this);
	var showCont = connectCont+1;

	$('#change-receipt-panel .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
	$('#change-receipt-panel .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

	$(this).addClass('active');
	$(this).siblings().removeClass('active');
});

$('#change-receipt-panel .change_btn li:not(.active)').hover(function(){
	$(this).stop().animate({opacity:'1.0'},200);
},function(){
	$(this).stop().animate({opacity:'0.8'},200);
});

$('#change-receipt-panel .change_btn li').css({opacity:'0.8'});
$('#change-receipt-panel .change_btn li:first').addClass('active');




// #change-interior-panel
$('#change-interior-panel .img_box img').each(function(i){
	$(this).css({opacity:'0'}).attr('id','view' + (i + 1).toString());
	$('#change-interior-panel .img_box img:first').css({opacity:'1',zIndex:'99'});
});

$('#change-interior-panel ul li').click(function(){
	var connectCont = $('#change-interior-panel .change_btn li').index(this);
	var showCont = connectCont+1;

	$('#change-interior-panel .img_box img#view' + (showCont)).siblings().stop().animate({opacity:'0'},1000);
	$('#change-interior-panel .img_box img#view' + (showCont)).stop().animate({opacity:'1'},1000);

	$(this).addClass('active');
	$(this).siblings().removeClass("active");
});

$('#change-interior-panel .change_btn li:not(.active)').hover(function(){
	$(this).stop().animate({opacity:'1'},200);
},function(){
	$(this).stop().animate({opacity:'0.7'},200);
});

$('#change-interior-panel .change_btn li').css({opacity:'0.7'});
$('#change-interior-panel .change_btn li:eq(0)').addClass('active');





});