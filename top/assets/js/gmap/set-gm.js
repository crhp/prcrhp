var id;
var initilized_flag;
function initialize() {
	if(initilized_flag != true){
		initilized_flag = true;
		clearInterval(id);
		initStore();
	}
}
google.maps.event.addDomListener(window, 'load', initialize);


id = setInterval(function(){
	if(google){
		var _flag = false;
		try{
		if(_google_map_check){
			_flag = true;
		}
		}catch(e){
		}
		if(_flag){
			if(window.slide){
				_flag = false;
			}
		}
		if(!_flag){
			clearInterval(id);
			initialize();
		}
	}
}, 100);
