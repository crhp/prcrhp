var store;
var _jsondata = [];
var _store_list;
var markerList = {};
var petit_name;
try{
	if(!_minipin_flag){
		_minipin_flag = "default";
	}
}catch(e){
	_minipin_flag = "default";
}
try{
	if(!_channel_name){
		_channel_name = "";
	}
}catch(e){
	_channel_name = "";
}

var initStore = function(){
    var myMap = new google.maps.Map(document.getElementById('gmap'), {
		zoom: 11,
		zoomControl: true,
		scrollwheel: false,
		scaleControl:false,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    });


	_store_list = $("#store_list_container li");
	for(var i=0;i<_store_list.length;i++){
		var _store = $(_store_list[i]);
		var _data = _store.data("info")
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
	$(".search-info .search-target").html(_jsondata.length);
	$(".search-info .search-all").html(_jsondata.length);

	jsonLoaded(_jsondata);

    function jsonLoaded(data) {
        store = data;

        checkParaAndSetSort();
//        checkDisplayStore();
        allLoadPinImage();


    }


    function checkParaAndSetSort() {
        var isPetitShowroom = getUrlParameter()["petit_showroom"] ? true : false;
        var isAreaPulldown = getUrlParameter()["area"] ? true : false;
        if (isPetitShowroom == 1) {
//            $('#sort_ps input:checkbox').prop("checked", true);
			var _name = decodeURI(getUrlParameter()["petit_showroom"]);
			if(_name == "1" || _name == undefined){
				_name = "プチショールーム";
			}
			$(".service-block ul.boxheight-align-item-container").append('<li class="boxheight-align-item para-sort" style="height: 44px;"><label><input class="run" type="checkbox" name="store_sort" value="-1" checked><p>' + _name + '</p></label></li>');
        }
        if (isAreaPulldown == 1) {
			var _name = decodeURI(getUrlParameter()["area"]);
			if(_name != undefined){
				$("#sort_area_container select").val(_name);
			}
        }
        var _service_obj = getUrlParameter()["service"];
        var isServiceName = _service_obj ? true : false;
        if (isServiceName == 1) {
        	var _service_ary = _service_obj instanceof Array ? _service_obj : [_service_obj];
        	var _list = $(".service-block ul li").each(function(_el){
        		for(var i=0;i<_service_ary.length;i++){
	        		var _service_name = decodeURI(_service_ary[i]);
					if((" "+$(this).find("p").text()+" ").indexOf(" "+_service_name+" ") !== -1){
						$(this).find("input").prop("checked", true);
					}
				}
        	});

        }
    }

    function getUrlParameter() {
        var arg = {};
        var pair = window.location.search.substring(1).split('&');
        for (var i = 0; pair[i]; i++) {
            var kv = pair[i].split('=');
			if(arg[kv[0]]){
				if(arg[kv[0]] instanceof Array){
		            arg[kv[0]].push(kv[1]);
	            }else{
	            	arg[kv[0]] = [arg[kv[0]], kv[1]];
	            }
			}else{
	            arg[kv[0]] = kv[1];
            }
        }
        return arg;
    }

    function checkDisplayStore() {
        var tmpStore = [];
        for (var i = 0; i < store.length; i++) {
            if (store[i].isDisplay == 0) {
                $("#store-" + store[i].storeid).addClass('no-display');
            } else {
                tmpStore.push(store[i]);
            }

        };
        store = tmpStore;
    }

    function allLoadPinImage() {
        var numImages = store.length;
        var loadedCount = 0;
        var markerSize = {};

        if(_minipin_flag.indexOf("custom") >= 0){
			setMarker(store, markerSize);
			init();
        }else{
	        for (var i = 0; i < store.length; i++) {
	            var img = new Image();
	            img.onload = completeHandler(store[i].storeid, img);
	            img.onerror = errorHandler(store[i].storeid);
	            img.src = store[i].pinfile+"?"+Math.random();
	        };

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


			if(_minipin_flag.indexOf("custom") >= 0){
				var _scale = 2.5;
	            var icon = {
	                url:"/common/assets/images/pin"+_channel_name+"/pin_"+stores.shopkind+".png",
	//                size: new google.maps.Size(sizeArr[storesId][0], sizeArr[storesId][1]),
	                scaledSize: new google.maps.Size(100/_scale, 130/_scale),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(100/_scale / 2, 130/_scale)
	            };
			}else{
	            var icon = {
	                url:stores.pinfile+"?"+Math.random(), //店舗ID
	                // size: new google.maps.Size(sizeArr[storesId][0], sizeArr[storesId][1]),
	                scaledSize: new google.maps.Size(sizeArr[storesId][0]/1.5, sizeArr[storesId][1]/1.5),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(sizeArr[storesId][0]/1.5 / 2, sizeArr[storesId][1]/1.5)
	            };
            }

			if(!stores.pinfile || stores.lat == undefined || stores.lat.length == 0 || stores.lng == undefined || stores.lng.length == 0) continue;

			var _depth_list = [0,2,1,3];
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
			if(_lat && _lat < minLat){ minLat = _lat; }
			if(_lat && _lat > maxLat){ maxLat = _lat; }
			if(_lng && _lng < minLng){ minLng = _lng; }
			if(_lng && _lng > maxLng){ maxLng =_lng; }
        }

	   var sw = new google.maps.LatLng(maxLat,minLng);
	   var ne = new google.maps.LatLng(minLat,maxLng);
	   var bounds = new google.maps.LatLngBounds(sw, ne);
	   myMap.fitBounds(bounds);

    }

    function updateMarker(filterStore) {


        for (var i = 0; i < store.length; i++) {
            // cnosole.log(store);
            if(markerList[store[i].storeid]){
	            markerList[store[i].storeid].setVisible(false);
            }
        }

        for (i = 0; i < filterStore.length; i++) {
            if(markerList[filterStore[i].storeid]){
	            markerList[filterStore[i].storeid].setVisible(true);
            }
        }
    }


    function getWindowContentHtml(storeData) {

        var html = '<div class="popup" style="margin:0;padding:0;line-height:150%;">';
        var _element = $("#store_list_container #store-"+storeData.storeid);
		var _href = _element.find(".store_btn_detail a").attr("href");
        if (_href) {
            html += '<p class="map-title"><a href="' + _href + '" style="text-decoration:underline;">' + _element.find("h4 span").text() + '</a></p>';
        } else {
            html += '<p class="map-title">' + _element.find("h4 span").text() + '</p>';
        }
        html += '<p class="map-add">' + _element.find(".store_address .address2").text() + '</p>';
        html += '<p class="tel">' + _element.find(".store_address .tel").text() + '</p></div>';
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
                var isParaShopKind = false;
                for (var j = 0; j < checkBox.length; j++) {
                    var prop = checkBox[j];
                    if(currentStore["shopkind"] && currentStore["shopkind"] == 4 && prop == -1){
                    	isParaShopKind = true;
                    }
                    if (!currentStore[prop] || currentStore[prop].indexOf("true") < 0) {
                        isServiceMatch = false;
                        break;
                    }
                }

                if (isServiceMatch === true || isParaShopKind == true) {
                    matchServiceStore.push(currentStore);
//                    console.log(matchServiceStore);//ok
                }
            }
        } // end serviceFilter()


        /////////////////////////////////////////////////////

        function areaFilter() {


            // console.log(matchServiceStore);

            var selectArea = String($("#sort_area").val());

            currentAreaFilter(selectArea);

            function currentAreaFilter(selectArea) {

                matchAreaObj = [];
                if (selectArea != "すべてのエリア") {

                    //マッチしたstoreIdを入れる配列
                    // var matchAreaObj = []; //外へ出してみる

                    // console.log(matchServiceStore);//ok
                    for (var k = 0; k < matchServiceStore.length; k++) {
                        var currentStore1 = matchServiceStore[k];
                        var store_area = currentStore1.area;

                        var isAreaMatch = false;
						var _area_list = store_area.split(",");
						for(var i=0;i<_area_list.length;i++){
	                        if ((" "+_area_list[i]+" ").indexOf(" "+selectArea+" ") != -1) {
	                            matchAreaObj.push(currentStore1);
	                            // console.log(matchAreaObj);
	                            isAreaMatch = true;
	                            break;
	                        }
                        }
                    }

                } else {

                    matchAreaObj = matchServiceStore;
                    // console.log(matchServiceStore);
                    // console.log(matchAreaObj);

                }
            }
            // console.log(matchAreaObj +"   matchAreaObj");//ok
            filterStore = matchAreaObj;
			$(".search-info .search-target").html(filterStore.length);
        } //end areaFilter()




        function storeDisplay() {

            // console.log(filterStore + "   filterStore"); //ok

            serviceFilter();
            areaFilter();
            //実行時に全て非表示にする（初期化）
            $("#store_list_container .store-box").css({

                "display": "none"
            });
            var matchStoreId = [];

            for (var m = 0; m < matchAreaObj.length; m++) {
                matchStoreId.push("#store-" + matchAreaObj[m].storeid);
            }

            for (var n = 0; n < matchStoreId.length; n++) {
                $(matchStoreId[n]).css({
                    "display": "block"
                });
            }
            // console.log(matchStoreId); //ok
            // console.log(matchAreaObj +"matchAreaObj"); //ok

        }





        $(".run").on("click", function() {
            storeDisplay();
            updateMarker(filterStore);
        });
        $("#sort_area_container #sort_area").on("change", function() {
            storeDisplay();
            updateMarker(filterStore);
        });

        storeDisplay();
        updateMarker(filterStore);
    } //init();


    $(".clear").on("click", function() {
        $("input:checkbox").attr("checked", false);
        $(".service-block li").removeClass("checked");
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


