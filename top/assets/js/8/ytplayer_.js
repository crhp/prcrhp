var ary = ['xZwhdLpWMCo','7LOn3zw3ifk'];
var videoId = ary[Math.floor(Math.random() * ary.length)];
var player;



function setMovie(){
  /* IFrame Player APIのコードを非同期にロード */
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  /* APIコードがダウンロードされた後で、ifraemとYouTubeプレーヤー要素を生成 */
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '827',
    width: '1470',
    videoId: videoId,
    playerVars:{
      // "playlist":videoId,
      // "autoplay":1,
      "controls":0,
      "disablekb":1,
      "rel":0,
      // "loop":1,
      "showinfo":0,
      wmode: 'transparent'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}