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
	var _ddlist = $(".news__list dl dd");
	$(".news__list dl").each(function(_index){
		if(!$(this).is(":visible")){
			var _mydate = Base64.decode($(this).find("dt").data("time"));
			if(_mydate <= _comp){
				$(this).show();
				$(this).find("dt").append(Base64.decode($(this).find("dt").data("text")));
				$(_ddlist[_index]).show().find("a").append(Base64.decode($(_ddlist[_index]).data("text")));
			}

		}
	});

});
