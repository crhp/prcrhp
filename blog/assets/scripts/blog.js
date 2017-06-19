$(document).ready(function(){

	var _num_shop;
	var _now_page;
	var _news_ary = [];
	var _max_list = 5;
	
	
	function setNewsArray(){
		_news_ary = $("article .unit-blog");
		_now_page = 0;
		_num_shop = _news_ary.length;
		
		if(_num_shop <= _max_list){
			$("#shop_pager").css("visibility", "hidden");
		}
	}

	function setList(){
		var _html = "";
		var _n = _now_page * _max_list;
		var _n2 = _num_shop - _n;
		var _n3 = _max_list;
		if(_n2 < _max_list){
			_n3 = _n2;
		}

		for(var i = 0;i<_num_shop;i++){
			$(_news_ary[i]).hide();
		}
		for(var i = _n ;i<_n+_n3;i++){
			$(_news_ary[i]).show();
		}
		
		 $('html,body').animate({scrollTop: 0}, 300, 'swing');
	}

	function setEvent(){

		var scope = this;
		
		$("#shop_pager_back").click(
			function(){
				if(_now_page > 0){
					_now_page--;
					if(_now_page < 0) _now_page = 0;

					setPager();
					setList();
					
				}
			});
		$("#shop_pager_next").click(
			function(){
				var _n = Math.ceil(_num_shop/_max_list);
				if(_now_page < _n-1){
					_now_page++;

					setPager();
					setList();
				}
			});

	}


	function setPager(){

		var _html="";
		var _max_p = Math.floor((_num_shop-1) / _max_list);

		var _i1 = 0;
		var _i2 = _max_p;
		var _r_flag = false;
		var _l_flag = false;
		if(_i2 - _i1 >= 19){
			_i2 = 19;
		}
		var _c2 = Math.floor((_i2 - _i1)/2);
		if(_now_page > _c2){
			_i1 = _now_page - 9;
			_i2 = _now_page + _max_list;
		}
		if(_i2 > _max_p){
			_i2 = _max_p;
			_i1 = _i2 - 19;
			if(_i1 < 0) _i1 = 0;
		}
		if(_i1 > 1){
			_html+="<div class='shop_pager_page_list_one'>"+"…"+"</div>";
		}
		for(var i=_i1;i<=_i2;i++){
			var _n = i+1;
			if(i == _now_page){
				_html+="<div class='shop_pager_page_list_one'>"+_n+"</div>";
			}else{
				_html+="<div class='shop_pager_page_list_one shop_pager_page_list_one_active'>"+_n+"</div>";
			}
		}
		if(_i2 < _max_p){
			_html+="<div class='shop_pager_page_list_one'>"+"…"+"</div>";
		}


		$("#shop_pager_page_list").empty();
		$("#shop_pager_page_list").append(_html);

		$(".shop_pager_page_list_one_active").click(
			function(){
				var _wk = $(this).text();
				_now_page = parseInt(_wk,10)-1;

				setPager();
				setList();
			});

	}
	
	setNewsArray();
	setList();
	setPager();
	setEvent();

});


