(function(){

	/*====================================================================
	
	main
	
	====================================================================*/

	var public = {};

	var nowLayoutType = "";
	var oldLayoutType = "";

	/*-----------------------------------------------------------------------------------------*/
	
	function init(){
		setResizeEvent();
		oldLayoutType = nowLayoutType = Corolla.getLayoutType();
		initalizeLayout();
		_resizeEndEvent(Corolla.getStageW(), Corolla.getStageH(), Corolla.getLayoutType());

		menuController.setEvent();
		
		//ooload時のサイズ調整処理を記載する
		switch(nowLayoutType){
			case Corolla.LAYOUTTYPE_LARGE:
				
			break;

			case Corolla.LAYOUTTYPE_MEDIUM:  //over w768
				
			break;

			case Corolla.LAYOUTTYPE_SMALL:  //over w320

			break;
		}
	}

	function initalizeLayout(){
		switch(nowLayoutType){
			case Corolla.LAYOUTTYPE_LARGE:   //over w1024
				
			break;

			case Corolla.LAYOUTTYPE_MEDIUM:  //over w768
				
			break;

			case Corolla.LAYOUTTYPE_SMALL:  //over w320
				
			break;
		}
	}

	function setResizeEvent(){
		Corolla.addEndResizeEvent(function(sw,sh,layoutType){_resizeEndEvent(sw,sh,layoutType);});
	}

	//resize終了イベント
	function _resizeEndEvent(sw, sh, layoutType){
		oldLayoutType = nowLayoutType;
		nowLayoutType = layoutType;
		switch(layoutType){
			case Corolla.LAYOUTTYPE_LARGE:   //over w1024
			if(oldLayoutType == nowLayoutType){

			}else{
				
			}
			_resizeLargeLayout();
			break;

			case Corolla.LAYOUTTYPE_MEDIUM:  //over w768
			if(oldLayoutType == nowLayoutType){

			}else{
				
			}
			_resizeMediumLayout();
			break;

			case Corolla.LAYOUTTYPE_SMALL:  //over w320
			if(oldLayoutType == nowLayoutType){

			}else{
				
			}
			_resizeSmallLayout();
			break;
		}
	}

	/*-----------------------------------------------------------------------------------------*/

	function _resizeLargeLayout(){
		//Largeレイアウトのリサイズ処理をここに記入
	}

	function _resizeMediumLayout(){
		//Mediumレイアウトのリサイズ処理をここに記入	
	}

	function _resizeSmallLayout(){
		//Smallレイアウトのリサイズ処理をここに記入
	}

	/*-----------------------------------------------------------------------------------------*/

	var menuController = (function(){

		var public = {};
		var selector = "#template_b_nav_top_close";

		public.setEvent = function(){
			_setEvent();
		}
		function _setEvent(){
			_setClearEvent();
			$(selector).bind("click", function(){onClickClose(); return false;});
		}
		function onClickClose(){
			$("#template_b_nav_top").toggleClass("close");
		}

		public.clearEvent = function(){
			_setClearEvent();
		}
		function _setClearEvent(){
			$(selector).unbind("click");
		}

		return public;

	})();
	
	/*-----------------------------------------------------------------------------------------*/

	window.CorollaTemplateB = public;

	Corolla.event.addLoadEvent(function(){
		init();
	});

	$(document).ready(function(){
		
	});
})();