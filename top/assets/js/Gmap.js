var CRHP = CRHP || {};

(function(global){
   var myOptions = {
      zoom: 9,
      zoomControl: true,
      scrollwheel: false,
      scaleControl:false,
      center: new google.maps.LatLng(35.353977, 139.578971),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

  var Gmap = function(){
  };

  Gmap.prototype.init   = function(){
    this.map = new google.maps.Map(document.getElementById("top-map"),myOptions)
    this.markers = [];
    this.setCenter();
    this.setMarker();
  }

  Gmap.prototype.setMarker = function()
  {
    console.log(mapListJson);
    for(var i = 0; i < mapListJson.length; i++){
      var markerLatLng = new google.maps.LatLng({lat: mapListJson[i]["latitude"], lng: mapListJson[i]["longitude"]});
      this.marker = new google.maps.Marker({ // マーカーの追加
        position: markerLatLng, // マーカーを立てる位置を指定
        map: this.map // マーカーを立てる地図を指定
      });
    }
  }

  Gmap.prototype.setCenter = function()
  {
    var minLat = 999;
    var maxLat = 0;
    var minLng = 999;
    var maxLng = 0;

    for(var i =0; i < mapListJson.length; i++){
      var lat = mapListJson[i]["latitude"];
      var lng = mapListJson[i]["longitude"];
      if(lat < minLat){ minLat = lat; }
      if(lat > maxLat){ maxLat = lat; }
      if(lng < minLng){ minLng = lng; }
      if(lng > maxLng){ maxLng =lng; }
    }

    var sw = new google.maps.LatLng(maxLat,minLng);
    var ne = new google.maps.LatLng(minLat,maxLng);
    var bounds = new google.maps.LatLngBounds(sw, ne);
    this.map.fitBounds(bounds);
  }

  Gmap.prototype.reload = function()
  {
    var center = this.map.getCenter();
    google.maps.event.trigger(this.map, "resize");
    this.map.setCenter(center);
  }

  CRHP.Gmap = Gmap;

})(window)

$(function(){
  var gmap = new CRHP.Gmap();
  google.maps.event.addDomListener(window, 'load', gmap.init.bind(gmap));
  google.maps.event.addDomListener(window, 'resize', gmap.reload.bind(gmap));
});
