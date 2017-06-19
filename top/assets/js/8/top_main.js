$(document).ready(function() {

	function setContents(_first_flag){
	  var $window = $(window);
	  var $responsiveProp = $("#responsive-property");
	  var contentType = $responsiveProp.css("font-family").replace(/[\'\"]/g,"");

	  if(contentType != $responsiveProp.data("mode") || _first_flag){

	    setContentPosition(contentType);
	    $responsiveProp.data("mode",contentType);

	  }

	  if(!window.slide){
			window.slide = new Slideshow();
			window.slide.prepareDom();
			window.slide.addEventListeners();

			setTimeout(function(){
			window.slide.slideSetting();
			},500);
	  }
	}



	function setContentPosition(type){
	  var $leftSections  = $(".main");
	  var $rightSections = $(".right_column");
	  var $sections      = $(".section");
	  var sectionsHtml   = {};
	  var sectionsPosition = {
	    "pc": {
	      right : ["section-calendar","section-contact","section-shoplist"],
	      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service","section-links","section-lineup"]
	    },
	    "pc2": {
	      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
	      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
	    },
	    "tab": {
	      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
	      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
	    },
	    "tab2": {
	      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
	      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
	    },
	    "sp": {
	      right : ["section-lineup","section-links"],
	      left  : ["section-shoplist","section-calendar","section-contact","slideshow","section-unique","section-contents-bg","section-news","section-service"]
	    }
	  };


	  $sections.each(function(){
	    var $this = $(this);
	    sectionsHtml[$this.attr("id")] = $this.get(0).outerHTML;
	  });


	  $leftSections.empty();
	  $rightSections.empty();

	  for(var i = 0,len = sectionsPosition[type].left.length; i < len; i++){
	    $leftSections.append(sectionsHtml[sectionsPosition[type].left[i]]);
	  }

	  for(var i = 0,len = sectionsPosition[type].right.length; i < len; i++){
	    $rightSections.append(sectionsHtml[sectionsPosition[type].right[i]]);
	  }

	  google.maps.event.addDomListener(window, 'resize', initialize);

	$ga_send = $("a.ga_send").off("click");
	gaSending();

	}


	  setContents(true);

	  $(window).resize(function(){
	    setContents();
	  });




	$(function(){
	   // heightLine.js
	   $(".unique .text-area").heightLine({
	    maxWidth:1023,
	    minWidth:320,
	    fontSizeCheck:true
	  });
	 });

	$( window ).resize(function(){
	  // heightLine.js
	  $(".unique .text-area").heightLine({
	    maxWidth:1023,
	    minWidth:320,
	    fontSizeCheck:true
	  });
	});


	$(window).on('load resize', function(){
	/*
	  var contentsWidth = $("#contents").width();
	  $("#contents .movie-area").css({'width':contentsWidth});
	  $(".movie-image").css({'width':contentsWidth});
	  var topSlideHeight = $(".movie-image img").height();
	  var _y = $(".movie-image").offset().top;
	  $(".movie-image").css({'height':topSlideHeight});
	  $(".main-wrap").css({'top':topSlideHeight -  _y});
	  $("#contents.tab_sideway .main-wrap").css({'top':topSlideHeight-30});
	  $("#footer").css({'margin-top':topSlideHeight});
	  */

	});


	$(function(){
	  $('.unique ul li:odd').addClass('right');




	});

	//PC tel cancel
	$(function(){
	  var ua = navigator.userAgent;
	  if(ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0){
	    $('.telhref span').each(function(){
	      $(this).unwrap();
	    });
	  }
	});


	//random coverPic
	// $(function() {
	//   var array = [
	//   "/img/top/movie-image_1.jpg",
	//   "/img/top/movie-image_2.jpg",
	//   "/img/top/movie-image_3.jpg",
	//   "/img/top/movie-image_4.jpg"
	//   ];

	//   var l = array.length;
	//   var r = Math.floor(Math.random()*l);
	//   var imgurl = array[r];
	//   $("img#randomimg").attr({"src":imgurl});
	// });







	// tab,sp movie
	$(function(){
	  var agent = navigator.userAgent;

	  if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){

	    $("#container").addClass('tab_sideway');
	    $(".movie-area").addClass('movie-hide');
	  }else{
	   $(".youtube-link-icon").css({'display':'none'});
	   // $("#contents").addClass('tab_sideway');
	 }
	});

			//  setMovie();
			  noMovieSlide();


			//movie-area
			var movie;
			var alert_box_h;
			var movie_base_y;
			var _nav_h;
			var _header_h;

			var _set_scroll_value = function(){
				movie = $(".movie-area").offset().top;
				alert_box_h = 0;
				if($("#alert-box").width() > 0){
//					alert_box_h = $("#alert-box").outerHeight() + $("#alert-box").position().top;
					alert_box_h = $("#alert-box").outerHeight()+4;
				}

				movie_base_y = alert_box_h + $("#container").offset().top;
				_nav_h = 0;
				if($("header .gnav-outer").css("display").indexOf("none") < 0 && $("header .hum-menu").css("display").indexOf("none") >= 0 && $("header").css("position").indexOf("fixed") < 0){
					_nav_h = $("header .gnav-outer").height();
				}
				_header_h = 0;
				if($("header").css("position").indexOf("fixed") < 0){
					_header_h = $("header .header-inner").height();
				}
				movie_base_y = alert_box_h + _header_h +_nav_h + $(".loading-label").height();
			}

			_set_scroll_value();
			$(".movie-area").css("top", movie_base_y);

			_scrollMovie = function(){
				_set_scroll_value();
				var _y =  movie_base_y - $(window).scrollTop();
/*
				if(_y < -$("#container").offset().top) {
					_y = -$("#container").offset().top;
				}else{
					
				}
				}*/
				if(_y < 0) {
					_y = 0;
				}else{
					
				}
				$(".movie-area").css("top", _y);

				if($("#section-contents-bg").offset().top < $(window).scrollTop()){
					$(".movie-area").css("visibility","hidden");
				}else{
					$(".movie-area").css("visibility","visible");
				}
			}
			$(window).scroll(function() {
				_scrollMovie();
			});
			_scrollMovie();
			$(window).on('resize', function(){
				_scrollMovie();
			});

			var contentsWidth = $("#container").width();
			//$("#container .movie-area").css({'width':contentsWidth});


			//sp-calendar
			$(function(){
			  $(".sp-next-calendar").on("click", function() {
			    $(function(){
			      if($(".sp-next-calendar").hasClass('open')){
			        $(".sp-next-calendar").find("img").attr({"src":"/top/assets/images/8/top/section-calendar-arrow-open.png"});
						var _dt = new Date();
						$(".top-calendar-list li").each(function(){
							var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
							if(parseInt($(this).data("date"),10) == _now){
								$(this).addClass("show");
								$(this).removeClass("hide");
							}else{
								$(this).addClass("hide");
								$(this).removeClass("show");
							}
						});
			      }else{
			        $(".sp-next-calendar").find("img").attr({"src":"/top/assets/images/8/top/section-calendar-arrow-close.png"});

						var _dt1 = new Date();
						_dt1.setDate(1);
						var _dt = new Date();
						_dt.setDate(1);
						_dt.setMonth(_dt.getMonth()+1);
						$(".top-calendar-list li").each(function(){
							var _now1 = _dt1.getFullYear()*100 + _dt1.getMonth()+1;
							var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
							if(parseInt($(this).data("date"),10) == _now || parseInt($(this).data("date"),10) == _now1){
								$(this).addClass("show");
								$(this).removeClass("hide");
							}else{
								$(this).addClass("hide");
								$(this).removeClass("show");
							}
						});
			      }
		      	$(".sp-next-calendar").toggleClass("open");
			    });
			    return false;
			  });
			});

			//mouseOver-picchange
			$(function(){
			  $('#section-service a img').mouseover(function(){
			    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
			  });
			  $('#section-service a img').mouseout(function(){
			    $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
			  });
			});


			$(function(){
			  $('.car-pic li').hover(
			    function(){
			      $(this).stop().fadeTo('fast', 0.7);
			    },
			    function(){
			      $(this).stop().fadeTo('fast', 1);
			    }
			    );
			});


	$("#section-contents-bg").css("height", $(window).height() );
	var _w = $("#section-contents-bg").width();
	if(_w < $(window).width()){
		$("#section-contents-bg").css("width", $(window).width());
		$("#section-contents-bg").css("left", (_w - $(window).width())/2);
	}


	function noMovieSlide(){
	  var setImg = '.movie-image';
	  var fadeSpeed = 2500;
	  var switchDelay = 5000;

	  $(setImg).children('img').css({opacity:'0'});
	  $(setImg + ' img:first').stop().animate({opacity:'1',zIndex:'20'},fadeSpeed);

	  setInterval(function(){
	    $(setImg + ' :first-child').animate({opacity:'0'},fadeSpeed).next('img').animate({opacity:'1'},fadeSpeed).end().appendTo(setImg);
	  },switchDelay);
	}


});




