$(function(){

	function initialize() {
		initStore();
		crhp.BoxHeightAlign.update();

countListIcon();


	}
	/*
	function checkAndSetDummyPanel(){
		var _panel_list = $("#store_list_container li");

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

			var _dummy_panel_num = _check_cnt - (_panel_list.length % _check_cnt);
			console.log("--- "+_dummy_panel_num+" "+_panel_list.length);
		}
	}
	*/

	//google.maps.event.addDomListener(window, 'load', initialize);


	var id = setInterval(function(){
		if(google){
			console.log("find google object");
			clearInterval(id);
			initialize();
		}
	}, 100);


	// store-icon-listのcount
	function countListIcon(){
		var listNum = $(".store-icon-list li").length;
		$("#store_map").addClass('listNum-' + listNum);
	}

});

