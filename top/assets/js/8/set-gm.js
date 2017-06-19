var currentWindow = null;
function initialize() {
  var myOptions = {
    zoom: 9,
    zoomControl: true,
    scrollwheel: false,
    scaleControl:false,
    center: new google.maps.LatLng(35.353977, 139.578971),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("gmap"),myOptions);
  var markers = [
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-01/">伊勢佐木店</a></p><p class="map-add">〒231-0033<br/>横浜市中区長者町3-8</p><p class="tel">045-661-5100</p></div>',   35.439677, 139.634613],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-02/">港南店</a></p><p class="map-add">〒234-0053<br/>横浜市港南区日野中央1-2-6</p><p class="tel">045-842-3344</p></div>',     35.394830, 139.585894],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-03/">下永谷店</a></p><p class="map-add">〒233-0016<br/>横浜市港南区下永谷6-2-24</p><p class="tel">045-821-1421</p></div>',    35.415241, 139.560796],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-04/">磯子店</a></p><p class="map-add">〒235-0042<br/>横浜市磯子区上中里町280-1</p><p class="tel">045-774-1221</p></div>',   35.375679, 139.610359],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-05/">南店</a></p><p class="map-add">〒232-0053<br/>横浜市南区井土ヶ谷下町216</p><p class="tel">045-711-1221</p></div>',    35.433226, 139.603872],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-06/">保土ヶ谷店</a></p><p class="map-add">〒240-0002<br/>横浜市保土ヶ谷区宮田町3-284-2</p><p class="tel">045-334-3221</p></div>',   35.458600, 139.601659],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-07/">戸塚下倉田店</a></p><p class="map-add">〒244-0815<br/>横浜市戸塚区下倉田町140</p><p class="tel">045-869-1221</p></div>',    35.385395, 139.535729],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-08/">湘南店</a></p><p class="map-add">〒252-0815<br/>藤沢市石川6-19-1</p><p class="tel">0466-87-2131</p></div>',   35.38825, 139.44642],
  // ['<div class="popup"> <p class="map-title"><a href="http://toyota-dealers.jp/33701/store/store_58_58.html">ライフタウン店</a></p><p class="map-add">〒252-0816<br/>藤沢市遠藤2015-4</p><p class="tel">0466-87-2131</p></div>',   35.378741, 139.442677],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-09/">大船店</a></p><p class="map-add">〒247-0056<br/>鎌倉市大船6-9-35</p><p class="tel">0467-48-2221</p></div>',   35.351544, 139.542264],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-10/">横須賀中央店</a></p><p class="map-add">〒238-0014<br/>横須賀市三春町2-18-1</p><p class="tel">046-823-2800</p></div>',    35.266405, 139.686949],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-11/">横須賀佐原インター店</a></p><p class="map-add">〒239-0835<br/>横須賀市佐原1-1-30</p><p class="tel">046-836-2111</p></div>',    35.242692, 139.680498],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-12/">金沢店</a></p><p class="map-add">〒236-0021<br/>横浜市金沢区泥亀1-17-13</p><p class="tel">045-701-1221</p></div>',   35.340466, 139.623490],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-13/">武山店(仮店舗)</a></p><p class="map-add">〒238-0313<br/>横須賀市武1-28-5</p><p class="tel">046-857-1441</p></div>',   35.227403, 139.651206],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-14/">立場駅前店</a></p><p class="map-add">〒245-0012<br/>横浜市泉区中田北1-5-15</p><p class="tel">045-802-8611</p></div>',   35.414883, 139.501594],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-15/">鎌倉店</a></p><p class="map-add">〒248-0027<br/>鎌倉市笛田1-2-36</p><p class="tel">0467-45-5221</p></div>',   35.330820, 139.512020],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-16/">藤沢店</a></p><p class="map-add">〒251-0044<br/>藤沢市辻堂太平台2-1-7</p><p class="tel">0466-36-3131</p></div>',   35.332037, 139.461388],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-17/">茅ヶ崎店</a></p><p class="map-add">〒253-0087<br/>茅ヶ崎市下町屋2-1-25</p><p class="tel">0467-85-2181</p></div>',    35.330900, 139.389282],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-18/">ジョイパークみなとみらい21</a></p><p class="map-add">〒220-0012<br/>横浜市西区みなとみらい3-2</p><p class="tel">045-210-0881</p></div>',    35.456123, 139.627617],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-22/">マリコム磯子(ヤマダ電機テックランド磯子店)</a></p><p class="map-add">〒235-0016<br/>横浜市磯子区磯子1-2-10</p><p class="tel">045-661-5100</p></div>',    35.413558, 139.626172],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-23/">ビアレ横浜(新館３Ｆ)</a></p><p class="map-add">〒236-0005<br/>横浜市金沢区並木2-13-7</p><p class="tel">045-701-1221</p></div>',    35.362123, 139.639282],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-26/">ミスターマックス湘南藤沢ショッピングセンター<br>LOUNGE COROLLA 『ラウンジカローラ』</a></p><p class="map-add">〒251-0042<br/>藤沢市辻堂新町4-3-5</p><p class="tel">0466-36-3131</p></div>',    35.340195, 139.464631],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-29/">ダイエーショッパーズプラザ横須賀(２Ｆ)</a></p><p class="map-add">〒238-0041<br/>横須賀市本町2-1-12</p><p class="tel">046-823-2800</p></div>',    35.282764, 139.662304]
  ];
  for (var i = 0; i < markers.length; i++) {
    var name = markers[i][0];
    var latlng = new google.maps.LatLng(markers[i][1],markers[i][2]);
    createMarker(name,latlng,map);
  }
}
function createMarker(name,latlng,map){
  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({position: latlng,map: map});
  google.maps.event.addListener(marker, 'click', function() {
    if (currentWindow) {
      currentWindow.close();
    }
    infoWindow.setContent(name);
    infoWindow.open(map,marker);
    currentWindow = infoWindow;
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
// google.maps.event.addDomListener(window, 'resize', initialize);