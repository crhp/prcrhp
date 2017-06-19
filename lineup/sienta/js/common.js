(function(){

	var public = {};

	/*-----------------------------------------------------------------------------------------*/

	if (typeof window.console != 'object'){
	window.console = {log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){},assert:function(){},dir:function(){},dirxml:function(){},trace:function(){},group:function(){},groupEnd:function(){},time:function(){},timeEnd:function(){},profile:function(){},profileEnd:function(){},count:function(){}};
	}


	/*-----------------------------------------------------------------------------------------*/
	//Class UA
	/*-----------------------------------------------------------------------------------------*/
	var UA = (function(){
		
		var public = {};

		var uaLowerCase = navigator.userAgent.toLowerCase();
		var _isIE = (uaLowerCase.indexOf("msie") != -1);
		var _isUnderIE8 = false;
		var _isUnderIE7 = false;
		var _rev;

		var ua = navigator.userAgent;
		var DEVICE_IPAD = "iPad";
		var DEVICE_IPHONE = "iPhone";
		var DEVICE_IPOD = "iPod";
		var DEVICE_ANDROID = "Android";
		var DEVICE_ANDROID_TABLET = "AndroidTablet";
		var DEVICE_WINDOWSPHONE = "WindowsPhone";
		var DEVICE_BLACKBERRY = "BlackBerry";
		var DEVICE_SYMBIAN = "Symbian";
		var DEVICE_GALAPAGOS = "Galapagos";
		var device = "";

		if( ua.indexOf("iPad") >= 0) {
			device = DEVICE_IPAD;
		}
		else if(ua.indexOf("iPhone") >= 0){
			device = DEVICE_IPHONE;
		}
		else if(ua.indexOf("iPod") >= 0){
			device = DEVICE_IPOD;
		}
		else if( ua.indexOf("Android") >= 0 ) {
			device = DEVICE_ANDROID_TABLET;
			if(ua.indexOf("Mobile") >= 0){
				device = DEVICE_ANDROID;
			}
		}
		else if( ua.indexOf("Windows Phone") >= 0 ) {
			device = DEVICE_WINDOWSPHONE;
		}
		else if(ua.indexOf("BlackBerry") >=0) {
			device = DEVICE_BLACKBERRY;
		}
		else if(ua.indexOf("Symbian") >= 0) {
			device = DEVICE_SYMBIAN;
		}
		else if( ua.indexOf("KDDI") >= 0 || ua.indexOf("DoCoMo") >= 0 || ua.indexOf("SoftBank") >= 0 || ua.indexOf("J-PHONE") >= 0 ) {
			device = DEVICE_GALAPAGOS;
		}

		

		if(_isIE)
		{
			var num = uaLowerCase.indexOf("msie")+1;
			var toNum = uaLowerCase.indexOf(";", num);
			var str = uaLowerCase.substring(uaLowerCase.indexOf(" ", num) + 1, toNum);
			_rev = str.split(".");
			if(Number(_rev[0])<=8){
				_isUnderIE8 = true;
				if(Number(_rev[0])<=7){
					_isUnderIE7 = true;
				}
			}
		}

		public.init = function(){

		}

		public.isIE = function(){
			return _isIE;
		}

		public.getIEVersion = function(){
			return _rev[0];
		}

		public.isUnderIE8 = function(){
			return _isUnderIE8;
		}

		public.isUnderIE7 = function(){
			return _isUnderIE7;
		}

		public.getDevice = function(){
			return device;
		}
		
		return public;
	})();

	//@public
	public.UA = UA;



	/*-----------------------------------------------------------------------------------------*/
	//Class scroller
	/*-----------------------------------------------------------------------------------------*/

	var scroller = (function(){
		var public = {};

		public = {
			scroll:function(num){
				var scope = this;
				scope.animate(num);
			},
			scrollTop:function(){
				var scope = this;
				scope.animate(0);
			},
			scrollID:function(id){
				var scope = this;
				var targetY = $(id).offset().top;
				scope.animate(targetY);
			},
			animate:function(num){
				var scope = this;
				$("html,body").stop(true).animate({scrollTop:num}, 600, "easeInOutCubic", scope.pageScrollTopComplete);
			},
			pageScrollTopComplete:function(){
				$("html,body").stop();
			},
			startScrollEvent:function(){
				$(window).bind("scroll", function(evt){_dispatchScrollEvent(evt);});
			},
			stopScrollEvent:function(){
				$(window).unbind("scroll");
			},
			getScrollTop:function(){
				return top;
			},
			update:function(){
				_update();
			}
		}

		var intervalID;
		var top = 0;

		var scrollEventList = {};

		public.scrollX = 0;
		public.scrollY = 0;

		public.addScrollEvent = function(key, func){
			scrollEventList.key = func;
		}
		public.removeScrollEvent = function(key){
			scrollEventList.key = null;
		}

		function _dispatchScrollEvent(evt){
			//scroll　イベントの配信
			public.scrollX = $(window).scrollLeft();
			public.scrollY = $(window).scrollTop();
			for (var o in scrollEventList){
				var func = scrollEventList[o];
				if(func != null){
					func();
				}
			}
		}

		function _update(){
			top = $(window).scrollTop();
		}

		return public;
	})();




	/*-----------------------------------------------------------------------------------------*/
	//Class resizer
	/*-----------------------------------------------------------------------------------------*/
	var resizer = (function(){
		var public = {};

		public.sw = 0;
		public.sh = 0;

		var resizeEventList = {};
		var intervalID;
		var sh = 0;

		var realTimeResizeEventList = {};

		public.startResizeEvent = function(){
			$(window).bind("resize", function(){_resizeEvent();});
		}
		
		public.stopResizeEvent = function(){
			$(window).unbind("resize");
		}
		
		public.getHeight = function(){
			return sh;
		}

		public.update = function(){
			_update();
		}


		function _resizeEvent(evt){
			_update();

			clearInterval(intervalID);
			intervalID = setInterval(function(){_dispatchEndResize();}, 200);

			_dispatchRealTimeResize();
		}


		//resize end イベントの登録
		public.addResizeEvent = function(key,func){
			resizeEventList.key = func;
		}

		public.removeResizeEvent = function(key){
			resizeEventList.key = null;
		}

		function _dispatchEndResize(){
			clearInterval(intervalID);
			for (var o in resizeEventList){
				var func = resizeEventList[o];
				if(func != null){
					func();
				}
			}

		}

		//resize の度に発行されるイベント
		public.addRealTimeResizeEvent = function(key, func){
			realTimeResizeEventList.key = func;
		}
		public.removeRealTimeResizeEvent = function(key){
			realTimeResizeEventList.key = null;
		}
		function _dispatchRealTimeResize(){
			for (var o in realTimeResizeEventList){
				var func = realTimeResizeEventList[o];
				if(func != null){
					func();
				}
			}
		}


		function _update(){
			public.sw = $(window).width();
			public.sh = $(window).height();
		}

		return public;
	})();




	/*-----------------------------------------------------------------------------------------*/
	//Class Event
	/*-----------------------------------------------------------------------------------------*/
	var event = (function(){
		var public = {};

		public.addLoadEvent = function(func){
			var oldonLoad = window.onload;
			if(typeof window.onload != "function")
			{
				window.onload = func;
			}
			else
			{
				window.onload = function()
				{
					oldonLoad();
					func();
				};
			}
		}

		public.SCROLL = "scroll";
		public.RESIZE = "resize";

		public.add = function(type, key, func){

			switch(type){
				case "scroll":
					scroller.addScrollEvent(key, func);
				break;

				case public.RESIZE:
					resizer.addRealTimeResizeEvent(key, func);
				break;
			}
		}

		public.remove = function(type, key){
			switch(type){
				case "scroll":
					scroller.removeScrollEvent(key);
				break;

				case public.RESIZE:
					resizer.removeRealTimeResizeEvent(key);
				break;
			}
		}

		return public;

	})();

	public.event = event;




	/*-----------------------------------------------------------------------------------------*/
	//Class Util
	/*-----------------------------------------------------------------------------------------*/

	var util = (function(){
		var public = {};

		var _params = {};

		public.analyzeLocation = function(){
			_analyzeLocation();
		}
		function _analyzeLocation(){
			var getparameter = location.search;
			var delimiterPosition = getparameter.indexOf("?");
			if(delimiterPosition == -1){
				
			}else{
				var p = getparameter.substr(delimiterPosition+1);
				var pList = p.split("&");
				var i,len;
				for(i=0,len=pList.length; i<len; i++){
					var para = pList[i];
					var paraList = para.split("=");
					_params[paraList[0]] = paraList[1];
				}
			}
		}

		_analyzeLocation();

		public.getParams = function(){
			return _params;
		}

		return public;
	})();
	util.analyzeLocation();

	public.util = util;










	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*======================================================================================
	
	Main
	
	======================================================================================*/

	var endResizeEventList = [];
	public.LAYOUTTYPE_LARGE = "large";
	public.LAYOUTTYPE_MEDIUM = "medium";
	public.LAYOUTTYPE_SMALL = "small";
	var layoutType = public.LAYOUTTYPE_LARGE;


	/*-----------------------------------------------------------------------------------------*/

	/*-----------------------------------------------------------------------------------------*/
	
	function init(){
		//console.log("common.js init()");
		resizer.update();
		resizer.addResizeEvent("mainResizeEvent", function(){mainResizeEvent();});
		resizer.startResizeEvent();
		mainResizeEvent();

		createGlobalNavigation();
		createFooterNavigation();
		creatFooterMenu();
		builder.createCopyright();
		setGlobalNaviLinksInSSL();

		var Menu = Backbone.Model.extend({
			defaults:{
				"visible":false
			},
			initialize:function(){

			}
		});
		var menu = new Menu();
		
		$("#open_menu").bind("click", function(){_menuClick(this); return false;});
		//_setNaviEvent();

		//pagetopのイベント設定
		_setPagetopEvent();

		//snsのイベント設定
		//_setSnsEvent();
	}

	/*-----------------------------------------------------------------------------------------*/

	//resizeイベントの配信
	function mainResizeEvent(){
		
		if(resizer.sw >= 980){
			layoutType = public.LAYOUTTYPE_LARGE;
			showGlobalMenu();
		}else if(resizer.sw >= 768){
			layoutType = public.LAYOUTTYPE_MEDIUM;
			showGlobalMenu();
		}else{
			layoutType = public.LAYOUTTYPE_SMALL;
		}
		var i,len;
		for(i=0,len=endResizeEventList.length; i<len; i++){
			var func = endResizeEventList[i];
			func(resizer.sw,resizer.sh,layoutType);
		}
	}

	function showGlobalMenu(){
		//console.log('common.js showGlobalMenu()');
		if(!$("#menu").hasClass("visible")){
			$("#menu").addClass("visible");
		}
	}

	/*-----------------------------------------------------------------------------------------*/

	function _menuClick(target){
		$("#menu").toggleClass("visible");
		//$("#menu_legacy").toggleClass("visible");
	}

	/*-----------------------------------------------------------------------------------------*/

	function _setPagetopEvent(){
		$("#footer_function_pagetop a").bind("click", function(){scroller.scrollTop(); return false;});
	}

	/*-----------------------------------------------------------------------------------------*/

	public.snsEventInit = function(){
		_snsEventInit();
	}

	function _snsEventInit(){
		FB.Event.subscribe('xfbml.render',
		    function(response) {
		        //xfbmlのロードが完了したらiframeの中のロードを監視する iframeの中身を監視後非表示に切り替える。FFで表示しなくなる。
		        snsFbPopupInvisible();
		        $("#footer_sns_fb_popup iframe").bind("load", function(){
		        	
		        	if(UA.isIE() && UA.getIEVersion()>=9){
			        	setTimeout(function(){snsFbPopupInvisible();},500);
			        }else{
			        	snsFbPopupInvisible();
			        }
			        
		        });
		        _setSnsEvent();
		    }
		);
	}

	function snsFbPopupInvisible(){
		$("#footer_sns_fb_popup").removeClass("popup_visible");
	}

	function _setSnsEvent(){
		$("#footer_sns_fb a").unbind("click");
		$("#footer_sns_fb a").bind("click", function(){_onClickFacebook(); return false;});
	}
	function _onClickFacebook(){
		//console.log("_onClickFacebook()");
		$("#footer_sns_fb_popup").toggleClass("popup_visible");
	}

	/*-----------------------------------------------------------------------------------------*/

	//@public
	//resize終了イベントの登録
	public.addEndResizeEvent = function(func){
		var i,len;
		for(i=0,len=endResizeEventList.length; i<len; i++){
			if(endResizeEventList[i] == func){
				return;
			}
		}
		endResizeEventList.push(func);
	}

	//@public
	//resizeイベントの登録
	public.addResizeEvent = function(func){
		
	}

	public.getStageW = function(){
		return resizer.sw;
	}

	public.getStageH = function(){
		return resizer.sh;
	}

	/*-----------------------------------------------------------------------------------------*/
	
	//@public
	public.getStageW = function(){
		return resizer.sw;
	}

	//@public
	public.getStageH = function(){
		return resizer.sh;	
	}

	//@public
	public.getLayoutType = function(){
		return layoutType;
	}

	/*-----------------------------------------------------------------------------------------*/

	//@public
	public.scrollTop = function(){
		scroller.scrollTop();
	}

	//@public
	public.scrollToID = function(id){
		scroller.scrollID(id);
	}

	public.scrollX = function(){
		return scroller.scrollX;
	}

	public.scrollY = function(){
		return scroller.scrollY;
	}

	public.startScrollEvent = function(){
		scroller.startScrollEvent();
	}

	public.stopScrollEvent = function(){
		scroller.stopScrollEvent();
	}
	public.mainResizeEvent = function(){
		mainResizeEvent();
	}
	/*-----------------------------------------------------------------------------------------*/

	function createGlobalNavigation(){
		$("#menu").html(getGlobalNaviHtml());
		switch(layoutType){
			case public.LAYOUTTYPE_LARGE:
			case public.LAYOUTTYPE_MEDIUM:
				showGlobalMenu();
			break;
		}
	}

	function getGlobalNaviHtml(){
		var htmlList = [
			'<li id="menu_1"><a href="/store/">店舗のご案内</a></li>',
			'<li id="menu_2"><a href="/lineup/">取扱い車種</a></li>',
			'<li id="menu_3"><a href="/lineup/welcab/">福祉車両(ウェルキャブ)</a></li>',
			'<li id="menu_4"><a href="/purchase/triple_assist.html">購入検討サポート</a></li>',
			//'<li id="menu_5"><a href="/index2.html?page=service/index.html">アフターサービス</a></li>',
			'<li id="menu_5"><a href="/afterservice/">車検・アフターサービス</a></li>',
			'<li id="menu_6"><a href="/u-car/">U-Car</a></li>',
			'<li id="menu_7"><a href="/index2.html?page=/corporate/business.html">法人のお客様</a></li>',
			'<li id="menu_8"><a href="/company/">会社案内</a></li>'
		];
		return htmlList.join("");
	}
	
	/////
	
	function createFooterNavigation(){
		$("#footer_function ul").html(getFooterNaviHtml());
	}

	function setGlobalNaviLinksInSSL()
	{
		var baseUrl = "http://www.tokyo-corolla.com";

		if(location.href.indexOf("/mail_maga/") == -1 && location.href.indexOf("https") == -1){
			return false;
		}

		$("#menu a,#footer_function a,#footer_nav a").each(function(){
			var $this = $(this);
			var link  = $this.attr("href");
			if(link.indexOf("http") == -1){
				$this.attr("href",baseUrl+link);
			}
		});
	}

	function getFooterNaviHtml(){
		var htmlList = [
			'<li id="footer_function_coupon"><a href="/coupon/">クーポン・キャンペーン</a></li>',
			'<li id="footer_function_testdrive"><a href="http://toyota.jp/service/dealer/spt/trial-car?OFFICE_CD=33609" target="_blank">試乗予約</a></li>',
			'<li id="footer_function_catalog"><a href="/purchase/catalog/">カタログ請求</a></li>',
			'<li id="footer_function_online"><a href="http://toyota.jp/service/dealer_estimate/dc/top?SALE_OFFICE_CD=33609" target="_blank">オンライン見積り</a></li>',
			'<li id="footer_function_carreceipt"><a href="https://toyota-dealers.jp/form.php?code=33609&page=kiyaku&genre=support&form_type=nyuko" target="_blank">入庫予約</a></li>',
			'<li id="footer_function_mailmagazine"><a href="/mail_maga/">メールマガジン登録</a></li>',
			'<li id="footer_function_ad"><a href="http://toyota-dealers.jp/33609/store/fliers.html" target="_blank">チラシ</a></li>'
		];
		return htmlList.join("");
	}

	/////

	function creatFooterMenu(){
		$("#footer_nav").html(getFooterMenuHtml());
	}

	function getFooterMenuHtml(){
		var htmlList = [
			'<ul id="footer_nav_group1">',
				'<li id="footer_nav_business_user"><a href="/index2.html?page=/corporate/business.html">法人のお客様</a></li>',
				//'<li id="footer_nav_1"><a href="/keieirinen/" target="_blank">経営理念</a></li>',
				'<li id="footer_nav_2"><a href="/recruit/">採用情報</a></li>',
				'<li id="footer_nav_3"><a href="/mail_maga/">メールマガジン</a></li>',
			'</ul>',
			'<ul id="footer_nav_group2">',
				'<li id="footer_nav_4"><a href="http://toyota.jp/recall/index.html?ptopid=men" target="_blank">リコール情報</a></li>',
				'<li id="footer_nav_5"><a href="/index2.html?page=/information/1110/kaijo.html">所有権解除</a></li>',
				'<li id="footer_nav_6"><a href="/index2.html?page=/recycle/main.html">リサイクル法</a></li>',
				'<li id="footer_nav_7"><a href="/privacy/" target="_blank">プライバシーポリシー</a></li>',
			'</ul>'
		];
		return htmlList.join("");
	}

	var builder = (function(){
		var public = {};

		public.createCopyright = function(){
			createCopyright();
		}
		function createCopyright(){
			$("#footer_copyright .txt1").text("COPYRIGHT 2015 TOYOTA TOKYO COROLLA CORPORATION. ALL RIGHTS RESERVED.");
		}

		return public;
	})();

	/*-----------------------------------------------------------------------------------------*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	window.Corolla = public;

	$(document).ready(function(){
		init();
	});
})();