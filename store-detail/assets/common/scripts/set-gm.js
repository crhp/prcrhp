$(function(){
	var markerSize;
	var pin_file = $("#google-map").data('pin') +"?"+Math.random();

  function initialize() {
	var img = new Image();
	img.onload = completeHandler( img);
	img.src = pin_file;

	function completeHandler( img) {
	    return function() {
	        markerSize = [img.width, img.height];
	        setMarker(markerSize);
	    }
	}
  }


  function setMarker(sizeArr){
    var lng = $("#gmap").data('lng');
    var lat = $("#gmap").data('lat');


    var latlng = new google.maps.LatLng(lat, lng); //緯度・経度
    var myOptions = {
      zoom: 16, //拡大倍率
      scrollwheel: false,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP //地図の種類
    };
    var map = new google.maps.Map(document.getElementById("gmap"), myOptions); //地図を表示


    //地図上にマーカーを配置する
    var _scale = 1.5;
    var icon = {
        url:pin_file,
        scaledSize: new google.maps.Size(sizeArr[0]/_scale, sizeArr[1]/_scale),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(sizeArr[0]/_scale / 2, sizeArr[1]/_scale)
    };
    var marker = new google.maps.Marker({
      icon:icon,
      position: latlng,
      map: map
    });
  }

	var id = setInterval(function(){
		if(google){
			console.log("find google object");
			clearInterval(id);
			initialize();
		}
	},1500);

});