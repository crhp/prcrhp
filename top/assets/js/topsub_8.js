$(function(){
	var Base64 = {
	    encode: function(str) {
	        return btoa(unescape(encodeURIComponent(str)));
	    },
	    decode: function(str) {
	        return decodeURIComponent(escape(atob(str)));
	    }
	};
	var _date = new Date();
	var _comp = _date.getFullYear()+"-"+("00"+(_date.getMonth()+1)).substr(-2)+"-"+("00"+_date.getDate()).substr(-2)+" "+("00"+_date.getHours()).substr(-2)+":"+("00"+_date.getMinutes()).substr(-2)+":"+("00"+_date.getSeconds()).substr(-2);
	var _ddlist = $("#section-news dl dd")
	var _dtlist = $("#section-news dl dt");
	for(var i=0,cnt=0;i<_dtlist.length;i++){
		var _element = $(_dtlist[i]);
		if(!_element.is(":visible")){
			var _mydate = Base64.decode(_element.data("time"));
			if(_mydate <= _comp){
				_element.show();
				_element.append(Base64.decode(_element.data("text")));
				$(_ddlist[i]).show().find("a").append(Base64.decode($(_ddlist[i]).data("text")));
				cnt++;
			}
		}else{
			cnt++;
		}
		if(cnt > 10) {
			_element.hide();
			$(_ddlist[i]).hide();
		}
	}

});
