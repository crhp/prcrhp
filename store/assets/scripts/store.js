$(function(){
    //初期セット
    if($(".tab-change-btn li.tab-map").hasClass('active')){
      $(".wrap-change-area .map").css({"display":"block"});

      $(".wrap-change-area #store-list-container").css({"display":"none"});
    }

    spCalendarTogglePanel();
    pcTelCancel();
    mouseHover();
	setCalendar();


	function mouseHover(){
	    $('.hover').hover(
	    function(){
	      $(this).stop().fadeTo('fast', 0.8);
	    },
	    function(){
	      $(this).stop().fadeTo('fast', 1);
	    }
	    );
	}


	function spCalendarTogglePanel(){
	  $(".sp-next-calendar").on("click", function() {

	    var $this = $(this);
	    $this
	    .prev().find("li.second-month").slideToggle(300)
	    .parent().parent().next().toggleClass("open");

	    $(function(){
	      if($(".sp-next-calendar").hasClass('open')){
	        $(".sp-next-calendar").find("img").attr({"src":"/img/top/section-calendar-arrow-close.png"});
	      }else{
	        $(".sp-next-calendar").find("img").attr({"src":"/img/top/section-calendar-arrow-open.png"});
	      }
	    });
	    return false;
	  });
	}

	function pcTelCancel(){
	  var ua = navigator.userAgent;
	  if(ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0){
	    $('.telhref span').each(function(){
	      $(this).unwrap();
	    });
	  }
	}

	function setCalendar(){
		var _dt = new Date();
		var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
		_dt.setDate(1);
		_dt.setMonth(_dt.getMonth()+1);
		var _next = _dt.getFullYear()*100 + _dt.getMonth()+1;
		$(".calendar-inner .left-wrap ul li").each(function(){
			if(parseInt($(this).data("date"),10) == _now){
				$(this).addClass("first-month");
				$(this).addClass("show");
				$(this).removeClass("hide");
				$(this).addClass("show-all");
			}else if(parseInt($(this).data("date"),10) == _next){
				$(this).addClass("second-month");
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("show-all");
			}else{
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("hide-all");
			}
		});

		$(".btn-prev-month").click(function(){
		  $(this).removeClass("show").addClass("hide");
		  $(".btn-next-month").addClass("show");

			var _dt = new Date();
			$(".calendar-inner .left-wrap ul li").each(function(){
				var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
				if(parseInt($(this).data("date"),10) == _now){
					$(this).addClass("show");
					$(this).removeClass("hide");
				}else{
					$(this).addClass("hide");
					$(this).removeClass("show");
				}
			});

		  return false;
		});

		$(".btn-next-month").click(function(){
		  $(this).removeClass("show").addClass("hide");
		  $(".btn-prev-month").addClass("show");

			var _dt = new Date();
			_dt.setDate(1);
			_dt.setMonth(_dt.getMonth()+1);
			$(".calendar-inner .left-wrap ul li").each(function(){
				var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
				if(parseInt($(this).data("date"),10) == _now){
					$(this).addClass("show");
					$(this).removeClass("hide");
				}else{
					$(this).addClass("hide");
					$(this).removeClass("show");
				}
			});

		  return false;
		});
	}
	function setCalendar(){
		var _dt = new Date();
		var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
		_dt.setDate(1);
		_dt.setMonth(_dt.getMonth()+1);
		var _next = _dt.getFullYear()*100 + _dt.getMonth()+1;
		$(".calendar-inner .left-wrap ul li").each(function(){

			if(parseInt($(this).data("date"),10) == _now){
				$(this).addClass("first-month");
				$(this).addClass("show");
				$(this).removeClass("hide");
				$(this).addClass("show-all");
			}else if(parseInt($(this).data("date"),10) == _next){
				$(this).addClass("second-month");
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("show-all");
			}else{
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("hide-all");
			}
		});

		$(".btn-prev-month").click(function(){
		  $(this).removeClass("show").addClass("hide");
		  $(".btn-next-month").addClass("show");

			var _dt = new Date();
			$(".calendar-inner .left-wrap ul li").each(function(){
				var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
				if(parseInt($(this).data("date"),10) == _now){
					$(this).addClass("show");
					$(this).removeClass("hide");
				}else{
					$(this).addClass("hide");
					$(this).removeClass("show");
				}
			});

		  return false;
		});

		$(".btn-next-month").click(function(){
		  $(this).removeClass("show").addClass("hide");
		  $(".btn-prev-month").addClass("show");

			var _dt = new Date();
			_dt.setDate(1);
			_dt.setMonth(_dt.getMonth()+1);
			$(".calendar-inner .left-wrap ul li").each(function(){
				var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
				if(parseInt($(this).data("date"),10) == _now){
					$(this).addClass("show");
					$(this).removeClass("hide");
				}else{
					$(this).addClass("hide");
					$(this).removeClass("show");
				}
			});

		  return false;
		});
	}

	function checkAndSetDummyPanel(){
		$("#store_list_container .store-dummy-box").remove();

		var _panel_list = $("#store_list_container li.store-box");
		
		if(_panel_list.length > 0){
			/*
			var _check_y = $(_panel_list[0]).position().top;
			var _check_cnt = 0;
			
			for(var i=0;i<_panel_list.length;i++){
				if(_check_y == $(_panel_list[i]).position().top){
					_check_cnt++;
				}else{
					break;
				}
			}
			
			var _dummy_panel_num = _check_cnt - 1
			*/
			var _dummy_panel_num = 3;

			var _html = "";
			for(var i=0;i<_dummy_panel_num;i++){
				_html += '<li class="store-dummy-box boxheight-align-item"><div class="inner"><img src="/store/assets/images/img-dummy-logo.png" /></div></li>';
			}
		
			$("#store_list_container").append(_html);
		}
	}
	function checkAndChangeDisplayDummyPanel(){
		var _panel_list = $("#store_list_container li.store-box");
		
		if(_panel_list.length > 0){
			var _check_y = $(_panel_list[0]).position().top;
			var _check_cnt = 0;
			
			for(var i=0;i<_panel_list.length;i++){
				if(_check_y == $(_panel_list[i]).position().top){
					_check_cnt++;
				}else{
					break;
				}
			}
			var _dummy_panel_list = $("#store_list_container li.store-dummy-box");
			var _dummy_panel_num =  (_panel_list.length % _check_cnt);
			if(_dummy_panel_num == 0) _dummy_panel_num = 3;
			for(var i=0;i<_dummy_panel_list.length;i++){
				if(i < _dummy_panel_num){
					$(_dummy_panel_list[i]).hide();
				}else{
					$(_dummy_panel_list[i]).show();
				}
			}
		}
	}
	

	jQuery(document).ready(function($) {
		crhp.BoxHeightAlign.init({isAll:true});

		$(window).on("resize", function(event) {
			crhp.BoxHeightAlign.update();
		});
		crhp.BoxHeightAlign.update();
	});

	
	$(".service-block li label").click(function(){
		if($(this).find("input").is(":checked")){
			$(this).parent().addClass("checked");
		}else{
			$(this).parent().removeClass("checked");
		}
	});
	/*
	$(".btn-search-area").click(function(){
		if($(this).hasClass("selected_distance")){
			$(this).find("p").html("現在地から最寄りの店舗を探す");
			$(this).removeClass("selected_distance");
			clearGeolocation();
		}else{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition( 
				function(position ){
					$(".btn-search-area").addClass("selected_distance").find("p").html("最寄りの店舗検索を解除する");
					checkAndSortGeolocation(position.coords);
				} , 
				function(error){
					var err_msg = "";
					switch(error.code)
					{
					case 1:
					err_msg = "位置情報の利用が許可されていません";
					break;
					case 2:
					err_msg = "デバイスの位置が判定できません";
					break;
					case 3:
					err_msg = "タイムアウトしました";
					break;
					}
					alert(err_msg);
				}
				 , {} ) ;
			 }else{
			 	alert("位置情報の利用が許可されていません");
			 }
		 }
	});
	*/

	var boxHeightAlign = new crhp.BoxHeightAlign($(".right-wrap"),{
    isAll:false
  });

	boxHeightAlign.init();

	$(window).resize(function(event) {
		boxHeightAlign.update();
	});

});
