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
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-01/">�ɐ����ؓX</a></p><p class="map-add">��231-0033<br/>���l�s���撷�Ғ�3-8</p><p class="tel">045-661-5100</p></div>',   35.439677, 139.634613],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-02/">�`��X</a></p><p class="map-add">��234-0053<br/>���l�s�`�����쒆��1-2-6</p><p class="tel">045-842-3344</p></div>',     35.394830, 139.585894],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-03/">���i�J�X</a></p><p class="map-add">��233-0016<br/>���l�s�`��扺�i�J6-2-24</p><p class="tel">045-821-1421</p></div>',    35.415241, 139.560796],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-04/">��q�X</a></p><p class="map-add">��235-0042<br/>���l�s��q��㒆����280-1</p><p class="tel">045-774-1221</p></div>',   35.375679, 139.610359],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-05/">��X</a></p><p class="map-add">��232-0053<br/>���l�s����y���J����216</p><p class="tel">045-711-1221</p></div>',    35.433226, 139.603872],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-06/">�ۓy���J�X</a></p><p class="map-add">��240-0002<br/>���l�s�ۓy���J��{�c��3-284-2</p><p class="tel">045-334-3221</p></div>',   35.458600, 139.601659],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-07/">�˒ˉ��q�c�X</a></p><p class="map-add">��244-0815<br/>���l�s�˒ˋ扺�q�c��140</p><p class="tel">045-869-1221</p></div>',    35.385395, 139.535729],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-08/">�Ó�X</a></p><p class="map-add">��252-0815<br/>����s�ΐ�6-19-1</p><p class="tel">0466-87-2131</p></div>',   35.38825, 139.44642],
  // ['<div class="popup"> <p class="map-title"><a href="http://toyota-dealers.jp/33701/store/store_58_58.html">���C�t�^�E���X</a></p><p class="map-add">��252-0816<br/>����s����2015-4</p><p class="tel">0466-87-2131</p></div>',   35.378741, 139.442677],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-09/">��D�X</a></p><p class="map-add">��247-0056<br/>���q�s��D6-9-35</p><p class="tel">0467-48-2221</p></div>',   35.351544, 139.542264],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-10/">���{�ꒆ���X</a></p><p class="map-add">��238-0014<br/>���{��s�O�t��2-18-1</p><p class="tel">046-823-2800</p></div>',    35.266405, 139.686949],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-11/">���{�ꍲ���C���^�[�X</a></p><p class="map-add">��239-0835<br/>���{��s����1-1-30</p><p class="tel">046-836-2111</p></div>',    35.242692, 139.680498],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-12/">����X</a></p><p class="map-add">��236-0021<br/>���l�s�����D�T1-17-13</p><p class="tel">045-701-1221</p></div>',   35.340466, 139.623490],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-13/">���R�X(���X��)</a></p><p class="map-add">��238-0313<br/>���{��s��1-28-5</p><p class="tel">046-857-1441</p></div>',   35.227403, 139.651206],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-14/">����w�O�X</a></p><p class="map-add">��245-0012<br/>���l�s��撆�c�k1-5-15</p><p class="tel">045-802-8611</p></div>',   35.414883, 139.501594],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-15/">���q�X</a></p><p class="map-add">��248-0027<br/>���q�s�J�c1-2-36</p><p class="tel">0467-45-5221</p></div>',   35.330820, 139.512020],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-16/">����X</a></p><p class="map-add">��251-0044<br/>����s�ғ�������2-1-7</p><p class="tel">0466-36-3131</p></div>',   35.332037, 139.461388],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-17/">������X</a></p><p class="map-add">��253-0087<br/>������s������2-1-25</p><p class="tel">0467-85-2181</p></div>',    35.330900, 139.389282],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-18/">�W���C�p�[�N�݂ȂƂ݂炢21</a></p><p class="map-add">��220-0012<br/>���l�s����݂ȂƂ݂炢3-2</p><p class="tel">045-210-0881</p></div>',    35.456123, 139.627617],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-22/">�}���R����q(���}�_�d�@�e�b�N�����h��q�X)</a></p><p class="map-add">��235-0016<br/>���l�s��q���q1-2-10</p><p class="tel">045-661-5100</p></div>',    35.413558, 139.626172],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-23/">�r�A�����l(�V�قR�e)</a></p><p class="map-add">��236-0005<br/>���l�s��������2-13-7</p><p class="tel">045-701-1221</p></div>',    35.362123, 139.639282],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-26/">�~�X�^�[�}�b�N�X�Ó쓡��V���b�s���O�Z���^�[<br>LOUNGE COROLLA �w���E���W�J���[���x</a></p><p class="map-add">��251-0042<br/>����s�ғ��V��4-3-5</p><p class="tel">0466-36-3131</p></div>',    35.340195, 139.464631],
  ['<div class="popup"> <p class="map-title"><a href="/store/detail/store-29/">�_�C�G�[�V���b�p�[�Y�v���U���{��(�Q�e)</a></p><p class="map-add">��238-0041<br/>���{��s�{��2-1-12</p><p class="tel">046-823-2800</p></div>',    35.282764, 139.662304]
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