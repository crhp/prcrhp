$(function(){
   var boxHeightAlign = new crhp.BoxHeightAlign($("#top-service-list"),{
    isAll:false
  });
   var boxHeightAlign2 = new crhp.BoxHeightAlign($(".top-news-container"),{
    isAll:false
  });


	var _terms = $("[data-term]");
	for(var i=0;i<_terms.length;i++){
		var _json = $(_terms[i]).data("term");
		if(_json && _json.length > 1){
			if(parseInt(_json["day"][0], 10) == _date.getDay()){
				$(_terms[i]).fadeTo(0, 0.5);
			}
			if(_json["color"].length == 7){
				$(_terms[i]).find(".top-dial-icon").css("background-color",_json["color"]);
			}
		}
	}
   boxHeightAlign.init();
   boxHeightAlign2.init();


    $(window).resize(function(event) {
       boxHeightAlign.update();
       boxHeightAlign2.update();
       blankBoxHeightSet();
       blankBoxNumSet();
    });


	var Base64 = {
	    encode: function(str) {
	        return btoa(unescape(encodeURIComponent(str)));
	    },
	    decode: function(str) {
	        return decodeURIComponent(escape(atob(str)));
	    }
	};
	var _date = new Date();
//_date.setDate(15);
	var _comp = _date.getFullYear()+"-"+("00"+(_date.getMonth()+1)).substr(-2)+"-"+("00"+_date.getDate()).substr(-2)+" "+("00"+_date.getHours()).substr(-2)+":"+("00"+_date.getMinutes()).substr(-2)+":"+("00"+_date.getSeconds()).substr(-2);
	var checkAndDecode = function(){
		if(!$(this).is(":visible")){
			var _mydate = Base64.decode($(this).find(".top-news-date").data("time"));
			if(_mydate <= _comp){
				$(this).show();
				$(this).find(".top-news-date").append(Base64.decode($(this).find(".top-news-date").data("text")));
				$(this).find(".top-news-text").append(Base64.decode($(this).find(".top-news-text").data("text")));
			}

		}
	}
	$("#top-news-container .top-news-information .top-news-list li.top-news-item").each(checkAndDecode);
	$("#top-news-container .top-news-whatsnew .top-news-list li.top-news-item").each(checkAndDecode);

	CRHP.playYoutube();

	$(window).ready(function() {
	    blankBoxNumSet();
		blankBoxHeightSet();
	});

	function blankBoxHeightSet(){
    	var itemBlankHeight = $('.top-servicemenu-item').get(0).getBoundingClientRect().height;
    	var setItemBlankHeight = itemBlankHeight + 'px';
    	var setBorderBottomColor = $('.top-servicemenu-item').css('border-bottom');
    	var setBorderRightColor = $('.top-servicemenu-item').css('border-right');
    	$('.top-servicemenu-item-blank').css({'height':setItemBlankHeight,'border-bottom':setBorderBottomColor});
    	$('.top-servicemenu-item-blank li:last-child').css({'border-right':0});
  	}

  	function blankBoxNumSet(){
	  	//Device Check
	  	var SizeDetect = CRHP.SizeDetect.size;
	  	var categorylistNum = 3;//カテゴリ数
	  	var PCLiMaxNum = 5;//PCのLiの横最大数
	  	var SPLiMaxNum = 3;//SPのLiの横最大数

	  	//For SP
	    if(SizeDetect.indexOf("sp-large") != -1 || SizeDetect.indexOf("sp") != -1){
	    	//カテゴリ分LOOP
	    	for(var i=1; i <= categorylistNum; i++){
		    	var listName = '#servicemenuList-' + i;
			    var cnt = $(listName + ' li').length;

			    //li Add
			    if(cnt == PCLiMaxNum){
			    	$(listName).append('<li class="top-servicemenu-item-blank"></li>');
			    	blankBoxHeightSet();
			    }

			    var size = $(listName + ' li.top-servicemenu-item').length;
			    var num = $(listName + ' li').length;

			    //SP３つ表示の時は余計なのを削除 
			    if(cnt > SPLiMaxNum){
				    if(size <= SPLiMaxNum ){
				    	if($(listName + ' li.top-servicemenu-item-blank').eq(2).length){
				    		$(listName + ' li.top-servicemenu-item-blank').eq(2).remove();
				    	}
				    	if($(listName + ' li.top-servicemenu-item-blank').eq(1).length){
				    		$(listName + ' li.top-servicemenu-item-blank').eq(1).remove();
				    	}
				    	if($(listName + ' li.top-servicemenu-item-blank').eq(0).length){
					    	$(listName + ' li.top-servicemenu-item-blank').eq(0).remove();
				    	}
		    		}
			    }
			}

		//For PC
	    }else if(SizeDetect.indexOf("tablet") != -1 || SizeDetect.indexOf("pc-min") != -1 || SizeDetect.indexOf("pc-large") != -1){
	    	for(var i=1;i <=categorylistNum;i++){
	    		var listName = '#servicemenuList-' + i;
				var cnt = $(listName + ' li').length;

				if(cnt > PCLiMaxNum){
	    			$(listName + ' li').eq(5).remove();
	    		}
	    	 	else if (cnt >= 2 && cnt < 5) {
	    			$(listName).append('<li class="top-servicemenu-item-blank"></li>');
	    			$(listName).append('<li class="top-servicemenu-item-blank"></li>');
			    	blankBoxHeightSet();
	    		}
	    	}
	    }

	    //最後のBoxの1px調整
	    if(SizeDetect.indexOf("pc-large") != -1){
	    	var itemBoxHeight = $('.top-servicemenu-item').get(0).getBoundingClientRect().height;
    		var setItemBoxHeight = itemBoxHeight + 'px';
	    	$('.top-servicemenu-item').css({'height':setItemBoxHeight});
	    }
	function moveYearMonth(_i){
		_c_month+=_i;
		if(_c_month > 12){
			_c_year++;
			_c_month -= 12;
		}
		if(_c_month < 1){
			_c_year--;
			_c_month += 12;
		}
		
	}
	function getYearMonth(_y, _m, _i){
		_m+=_i;
		if(_m > 12){
			_y++;
			_m -= 12;
		}
		if(_m < 1){
			_y--;
			_m += 12;
		}
		return _y * 100 + _m;
	}
	function setCalendarList(){
		var _now = getYearMonth(_c_year, _c_month, 0);
		var _next = getYearMonth(_c_year, _c_month, 1);
		$(".top-calendar-list li").each(function(){
			if(parseInt($(this).data("date"),10) == _now || parseInt($(this).data("date"),10) == _next){
				$(this).addClass("show").removeClass("hide");
			}else{
				$(this).addClass("hide").removeClass("show");
			}
		});
	}

	var _li_list= $(".top-calendar-list li");
	var _low_date = $(_li_list[0]).data("date");
	var _high_date = $(_li_list[_li_list.length-1]).data("date");
	var _dt = new Date();
	var _c_month = _dt.getMonth()+1;
	var _c_year = _dt.getFullYear();

	var _now = getYearMonth(_c_year, _c_month , 0);
	var _next = getYearMonth(_c_year, _c_month , 1);
	$(".top-calendar-list li").each(function(){
		if(parseInt($(this).data("date"),10) == _now || parseInt($(this).data("date"),10) == _next){
			$(this).addClass("show").removeClass("hide");
		}else{
			$(this).addClass("hide").removeClass("show");
		}
	});

    $(".top-calendar-nav-prev").click(function(){
    	if(getYearMonth(_c_year, _c_month, 0) > _low_date){
	      	moveYearMonth(-1);
			setCalendarList();
			setDisplayCalendar();
		}
		return false;
	});
    $(".top-calendar-nav-next").click(function(){
    	if(getYearMonth(_c_year, _c_month, 1) < _high_date || 
    	   (checkSp() && getYearMonth(_c_year, _c_month, 1) <= _high_date) ){
			moveYearMonth(1);
			setCalendarList();
			setDisplayCalendar();
		}
		return false;
    });
    function checkSp(){
		var _st = $(".top-calendar-column").css("display");
		var _ret = false;
		if(_st.indexOf("none") < 0){
			_ret = true;
		}
		return _ret;
    }
	function setDisplayCalendar(){
		var _l = $(".top-calendar-list li.show");
		if(checkSp()){
			$(_l[1]).removeClass("show").addClass("hide");
		}else if(_l.length <= 1){
			setCalendarList();
		}
	}
	setDisplayCalendar();

	}
});
