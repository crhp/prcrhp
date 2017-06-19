var store;
var _jsondata = [];
var _store_list;
var markerList = {};
var myMap;
try{
	if(_minipin_flag){
		_minipin_flag = false;
	}
}catch(e){
	_minipin_flag = false;
}

var initStore = function(){
	    myMap = new google.maps.Map(document.getElementById('top-map'), {
			zoom: 11,
			zoomControl: true,
			scrollwheel: false,
			scaleControl:false,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	if(_store_data){
		_store_list = _store_data;
		for(var i=0;i<_store_list.length;i++){
			var _store = _store_list[i];
			var _data = _store["data-info"];
			if(_data){
				_data = _data.split(";");
				var _datalist = {};
				for(var j=0;j<_data.length;j++){
					var _obj = _data[j].split(":");
					_datalist[_obj[0]] = _obj[1];
				}
				_datalist["html"] = $(_store_list[i]).prop('outerHTML');
				_datalist["def_sort"] = i;
				_jsondata.push(_datalist);
			}
		}

		jsonLoaded(_jsondata);
	}

    function jsonLoaded(data) {
        store = data;

        allLoadPinImage();


    }



    function getUrlParameter() {
        var arg = {};
        var pair = window.location.search.substring(1).split('&');
        for (var i = 0; pair[i]; i++) {
            var kv = pair[i].split('=');
            arg[kv[0]] = kv[1];
        }
        return arg;
    }


    function allLoadPinImage() {
        var numImages = store.length;
        var loadedCount = 0;
        var markerSize = {};

        if(_minipin_flag){
			setMarker(store, markerSize);
			init();
        }else{
	        for (var i = 0; i < store.length; i++) {
	            var img = new Image();
	            img.onload = completeHandler(store[i].storeid, img);
	            img.onerror = errorHandler(store[i].storeid);
	            img.src = store[i].pinfile+"?"+Math.random(); //getPinName(store[i].storeid);
	        };
        }
        function completeHandler(storeId, img) {
            return function() {
                loadedCount++;
                markerSize[storeId] = [img.width, img.height];
                checkFinish();
            }
        }

        function errorHandler(storeId) {
            return function() {
                loadedCount++;
                markerSize[storeId] = [0, 0];
                checkFinish();
            }
        }

        function checkFinish() {
            if (loadedCount >= numImages) {
                setMarker(store, markerSize);
                init();
            }
        }
    }




    function setMarker(allStore, sizeArr) {
		var minLat = 999;
		var maxLat = 0;
		var minLng = 999;
		var maxLng = 0;
		var _depth_list = [0,7,6,5,3,2,4,1];

		var _sortStore = [];
		for(var i=0;i<allStore.length;i++){
			_sortStore[i] = allStore[i];
		}
		_sortStore.sort(function(a,b){
			var _a_lat = a.lat;
			var _b_lat = b.lat;
			if(_a_lat == undefined || _a_lat == "") _a_lat = 0;
			if(_b_lat == undefined || _b_lat == "") _b_lat = 0;
			var _a_num = (7-_depth_list[parseInt(a.shopkind,10)]) * 10000 + parseFloat(_a_lat);
			var _b_num = (7-_depth_list[parseInt(b.shopkind,10)]) * 10000 + parseFloat(_b_lat);
			return _a_num - _b_num;
		});
        for (var i = 0; i < _sortStore.length; i++) {
            var stores = _sortStore[i];
            var storesId = stores.storeid;

			if(_minipin_flag){
				var _scale = 2;
	            var icon = {
	                url:"/common/assets/images/pin"+_channel_name+"/pin_"+stores.shopkind+".png",
	//                size: new google.maps.Size(sizeArr[storesId][0], sizeArr[storesId][1]),
	                scaledSize: new google.maps.Size(100/_scale, 130/_scale),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(100/_scale / 2, 130/_scale)
	            };
			}else{
	            var icon = {
	                url: stores.pinfile+"?"+Math.random(), //getPinName(storesId), //店舗ID
	//                size: new google.maps.Size(sizeArr[storesId][0], sizeArr[storesId][1]),
	                scaledSize: new google.maps.Size(sizeArr[storesId][0]/1.5, sizeArr[storesId][1]/1.5),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(sizeArr[storesId][0]/1.5 / 2, sizeArr[storesId][1]/1.5)
	            };
            }

			if(stores.lat == undefined || stores.lat.length == 0 || stores.lng == undefined || stores.lng.length == 0) continue;

            var myMarker = new google.maps.Marker({
                position: (new google.maps.LatLng(stores.lat, stores.lng)),
                map: myMap,
                storeData: stores,
                icon: icon,
                zIndex:_sortStore.length - i,
                infoWindow: new google.maps.InfoWindow({
                    content: getWindowContentHtml(stores)
                })
            });
            myMarker.addListener('click', function(e) {
                this.infoWindow.open(myMap, this);
            });

            markerList[stores.storeid] = myMarker;

			var _lat = stores.lat
			var _lng = stores.lng;
			if(_lat < minLat){ minLat = _lat; }
			if(_lat > maxLat){ maxLat = _lat; }
			if(_lng < minLng){ minLng = _lng; }
			if(_lng > maxLng){ maxLng =_lng; }
        }


	   var sw = new google.maps.LatLng(maxLat,minLng);
	   var ne = new google.maps.LatLng(minLat,maxLng);
	   var bounds = new google.maps.LatLngBounds(sw, ne);
	   myMap.fitBounds(bounds);

        if(_minipin_flag){
		   function setIconSize(){
				var _scale = 5 - ($("#top-map").width()/400);
				if(_scale < 2) _scale = 2;
				for(var i in markerList){
					var _o = markerList[i].getIcon();
					_o.scaledSize = new google.maps.Size(100/_scale, 130/_scale);
					_o.origin =  new google.maps.Point(0, 0);
					_o.anchor =  new google.maps.Point(100/_scale / 2, 130/_scale);
					markerList[i].setIcon(_o);
				}
		   }
		   setIconSize();
			$(window).resize(function() {
				    	setIconSize();
			});
		}
    }


    function getWindowContentHtml(storeData) {

        var html = '<div class="popup" style="margin:0;padding:0;line-height:150%;">';
        var _element = $("#store_list_container #store-"+storeData.storeid);
		var _href = storeData.href;
        if (_href) {
            html += '<p class="map-title"><a href="' + _href + '" style="text-decoration:underline;">' + storeData.title + '</a></p>';
        } else {
            html += '<p class="map-title">' + storeData.title + '</p>';
        }
        html += '<p class="map-add">' + storeData.address2 + '</p>';
        html += '<p class="tel">' + storeData.tel + '</p></div>';
        return html;
    }




    function getPinName(pinId) {
        return "/store/assets/images/pins/map-pin_" + pinId + ".png";
    }


    function init() {

        var matchServiceStore;
        var matchAreaObj;
        var allStore = store;
        var filterStore = [];


        /////////////////////


        function serviceFilter() {
            var checkBox = [];
            $('[name="store_sort"]:checked').each(function() {
                checkBox.push($(this).val());
            });

            matchServiceStore = [];

            for (var i = 0; i < store.length; i++) {

                var currentStore = store[i];


                var isServiceMatch = true;

                for (var j = 0; j < checkBox.length; j++) {
                    var prop = checkBox[j];

                    if (!currentStore[prop] || currentStore[prop].indexOf("true") < 0) {

                        isServiceMatch = false;
                        break;
                    }
                }

                if (isServiceMatch === true) {
                    matchServiceStore.push(currentStore);
                    // console.log(matchServiceStore);//ok
                }
            }
        } // end serviceFilter()



    } //init();


    $(".clear").on("click", function() {
        $("input:checkbox").attr("checked", false);
        $("#sort_area_container select").val("すべてのエリア");
        $("#store-list-container store-box").css({
            "display": "block"
        });
        init();
    });

}

function clearGeolocation(){
	_jsondata.sort(function(a,b){
		return b.def_sort < a.def_sort;
	});

	$("#store-list #store_list_container").empty();
	var _html = "";
	for(var i=0;i<_jsondata.length;i++){
		_html += _jsondata[i].html;
	}
	$("#store-list #store_list_container").append(_html);
	$("#store_list_container .distance").hide();
}
function checkAndSortGeolocation(_coords){
	var marker1 = new google.maps.Marker({});
	marker1.setPosition(new google.maps.LatLng(_coords.latitude, _coords.longitude));
	for(var i=0;i<_jsondata.length;i++){

		var marker2 = new google.maps.Marker({});
		marker2.setPosition(new google.maps.LatLng(_jsondata[i].lat, _jsondata[i].lng));
		var from = marker1.getPosition();
		var to = marker2.getPosition();
		var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000;
		_jsondata[i].distance = distance;

//		$("#store_list_container #store-"+_jsondata[i].storeid+" .distance").html("現在地から"+Math.floor(distance*10)/10+"km");
	}

	_jsondata.sort(function(a,b){
		return b.distance < a.distance;
	});

	$("#store-list #store_list_container").empty();
	var _html = "";
	for(var i=0;i<_jsondata.length;i++){
		_html += _jsondata[i].html;
	}
	$("#store-list #store_list_container").append(_html);
	for(var i=0;i<_jsondata.length;i++){
		$("#store_list_container #store-"+_jsondata[i].storeid+" .distance").html("現在地から"+Math.floor(_jsondata[i].distance*10)/10+"km");
	}
	$("#store_list_container .distance").show();

}


