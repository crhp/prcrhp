$(function(){
var tire_pos = [
{x:0,y:0},
{x:-27,y:0},
{x:-54,y:0},
{x:-81,y:0},
{x:-108,y:0},
{x:-135,y:0},
{x:-162,y:0},
{x:0,y:-27},
{x:-27,y:-27},
{x:-54,y:-27},
{x:-81,y:-27},
{x:-108,y:-27},
{x:-135,y:-27},
{x:-162,y:-27},
{x:0,y:-54},
{x:-27,y:-54},
{x:-54,y:-54},
{x:-81,y:-54},
{x:-108,y:-54},
{x:-135,y:-54},
{x:-162,y:-54},
{x:0,y:-81},
{x:-27,y:-81},
{x:-54,y:-81},
{x:-81,y:-81},
{x:-108,y:-81},
{x:-135,y:-81},
{x:-162,y:-81},
{x:0,y:-108},
{x:-27,y:-108},
{x:-54,y:-108},
{x:-81,y:-108},
{x:-108,y:-108},
{x:-135,y:-108},
{x:-162,y:-108},
{x:0,y:-135},
{x:-27,y:-135},
{x:-54,y:-135},
{x:-81,y:-135},
{x:-108,y:-135},
{x:-135,y:-135},
{x:-162,y:-135},
{x:0,y:-162},
{x:-27,y:-162},
{x:-54,y:-162},
{x:-81,y:-162},
{x:-108,y:-162},
{x:-135,y:-162},
{x:-162,y:-162},
{x:-189,y:0},
{x:-189,y:-27},
{x:-189,y:-54},
{x:-189,y:-81},
{x:-189,y:-108},
{x:-189,y:-135},
{x:-189,y:-162},
{x:0,y:-189},
{x:-27,y:-189},
{x:-54,y:-189},
{x:-81,y:-189}
];

	var car_r = [
	];
	var tire_pos_n = [
	]

	function start(){
		var ret = checkBrowser();
		for(var i=1;i<=7;i++){
			car_r[i] = [];
			tire_pos_n[i] = [];
			setAnimation(i, i % 2);
			
		}
		if(!(ret.type.indexOf("ie")>=0 && ret.ver <= 8) || true){
			setInterval(function(){
				animationMain();
			},33);
		}else{
			$(window).resize(function() {
				for(var i=1;i<=7;i++){
					car_r[i] = [];
					tire_pos_n[i] = [];
					setAnimation(i, i % 2);
					
				}
			});
		}
	}

	function setAnimation(i, flag){
		var _w = $(window).width();
		var _wx = (_w - 8*200)/2;

		var _el = "#index0"+i+" .animation-car .car-move-box";
		var _car_list = $(_el);
		var _car_x;
		for(var j=0;j<_car_list.length;j++){
			car_r[i][j] = 0;
			if(flag == 0){
				_car_x = j*200+_wx;
			}else{
				_car_x = _w - _wx - j*200 - 171;
			}
			tire_pos_n[i][j] = 0;
			$(_car_list[j]).css("left",_car_x);
		}
		
	}


	function animationMain(){
		var _y = $(window).scrollTop();
		var _h = $(window).height();
		var _w = $(window).width();
		
		for(var i=1;i<=7;i++){
			var _el = $("#index0"+i+" .animation-car .car-move-box");
			if(_el.offset()){
				var _ely = _el.offset().top;
				if(_ely-_h <= _y  &&  _y <= _ely+71){
					moveCars(i, _w, i % 2);
					break;
				}
			}
		}
	}

	function moveCars(i, _w, flag){
		var _wx = (_w - 980)/2;
		var _el = "#index0"+i+" .animation-car .car-move-box";
		var _car_list = $(_el);
		for(var j=0;j<_car_list.length;j++){
			var _x = $(_car_list[j]).offset().left;
			var _xx = 0;
			var _prev_car_n = j+1;
			if(_prev_car_n >= _car_list.length) _prev_car_n = 0;
			var _prev_x = $(_car_list[_prev_car_n]).offset().left;
			switch(flag){
				case 0:
				var _el_w1 = $(_car_list[j]).children(".car-wheel-1").children("img");
				var _el_w2 = $(_car_list[j]).children(".car-wheel-2").children("img");
				_x += 2;
				if(_x > (_wx + 980)){
					_xx = (_wx - (_w - _x))*0.03;

				}else if(_x < _prev_x-200 && _x < (_w/2)){
					_xx = (_prev_x-200 - _x)*0.03;
				}
				if(_xx > 10) _xx = 8;
				break;
			
				case 1:
				var _el_w1 = $(_car_list[j]).children(".car-wheel-1-2").children("img");
				var _el_w2 = $(_car_list[j]).children(".car-wheel-2-2").children("img");
				_x -= 2;
				if(_x < _wx){
					_xx = -(_wx - _x)*0.03;

				}else if( _prev_x+200 < _x && (_w/2) < _x){
					_xx = (_prev_x+200 - _x)*0.03;
				}
				if(_xx < -10) _xx = -8;
				break;
			}
			_x +=_xx;
			switch(flag){
				case 0:
				if(_w <= _x){
					var _ln = i;
					var _lx = 99999;
					for(var k=0;k<_car_list.length;k++){
						var _xx = $(_car_list[k]).offset().left;
						if(_xx < _lx){
							_lx = _xx;
							_ln = k;
						}
					}
					if(_lx > 0){
						_x = -171;
					}else{
						_x = _lx -200;
					}
				}
				break;
				
				case 1:
				if(_x < -171){
					var _ln = i;
					var _lx = -99999;
					for(var k=0;k<_car_list.length;k++){
						var _xx = $(_car_list[k]).offset().left;
						if( _xx > _lx){
							_lx = _xx;
							_ln = k;
						}
					}
					if(_lx+200 < _w){
						_x = _w;
					}else{
						_x = _lx + 200;
					}
				}
				break;
			}
			var _pos_ad = 1;
			switch(flag){
				case 0:
				if(_xx > 0){
					_pos_ad = _xx/4;
				}
				break;
				
				case 1:
				if(_xx < 0){
					_pos_ad = -_xx/4;
				}
				break;
			}
			if(_pos_ad < 1) _pos_ad = 1;
			tire_pos_n[i][j]+=_pos_ad;
			if(tire_pos_n[i][j] >= tire_pos.length){
				tire_pos_n[i][j] =0;
			}
			
			
			switch(flag){
				case 0:
				var _tn = Math.floor(tire_pos_n[i][j]);
				var _deg = 180*(2+_xx/2)/Math.PI/14;
				break;

				case 1:
				var _tn = Math.floor(tire_pos_n[i][j]);
				var _deg = 180*(2+-_xx/2)/Math.PI/14;
				break;
			}
			car_r[i][j] = (car_r[i][j] + _deg) % 360;
			_tn = Math.floor(car_r[i][j]/6) % 60;
			if(_tn < 0) _tn = 0;


			var _t_pos_o = tire_pos[_tn];


			$(_el_w1).css({"left":_t_pos_o.x, "top":_t_pos_o.y});
			$(_el_w2).css({"left":_t_pos_o.x, "top":_t_pos_o.y});

			$(_car_list[j]).css("left",_x);
		}
		
	}

	var checkBrowser = function(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    var ver = window.navigator.appVersion.toLowerCase();
	    var name = 'unknown';

	    var ret = {type:"", ver:0};
	    if (ua.indexOf("msie") != -1){
	    	var _n = ver.indexOf("msie ");
			ret.type="ie"
	    	if(_n >= 0){
				var _v = parseInt(ver.substr(_n+5),10);
				ret.ver = _v;
	    	}
	   	}else if(ua.indexOf('trident/7') != -1){
	    	ret.type="web";
	    }else if (ua.indexOf('chrome') != -1){
	    	ret.type="web";
	    }else if (ua.indexOf('safari') != -1){
	    	ret.type="web";
	    }else if (ua.indexOf('opera') != -1){
	    	ret.type="web";
	    }else if (ua.indexOf('firefox') != -1){
	    	ret.type="ff";
	    }


	    return ret;
	};


	start();


});

