$(function(){

  function initialize() {
    var lng = $("#gmap").data('lng');
    var lat = $("#gmap").data('lat');
    var latlng = new google.maps.LatLng(lat, lng);
    var myOptions = {
      zoom: 17,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("gmap"), myOptions);

    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
  }
  // initialize();


  var id = setInterval(function(){
    if(google){
      console.log("find google object");
      clearInterval(id);
      initialize();
    }
  },1500);


});
