var player;
var _youtube_ready_flag = false;
var _youtube_request_flag = false;
var _youtube_request_para = undefined;
var Youtube = {};

function onYouTubeIframeAPIReady() {
	_youtube_ready_flag = true;
	if(_youtube_request_flag){
		CRHP.playYoutube(_youtube_request_para);
	}
}

var CRHP = CRHP || {};

$(function(){
	(function(global){

	  $(".top-youtube-container").hide();

	  Youtube.list = youtubeJson;

	  var _youtube_id;
	  var agent = navigator.userAgent;
	  var _movie_flag = false;
	    var choice = Math.floor(Math.random()*Youtube.list.length);

		if(Youtube.list.length > 0){
			var _id = Youtube.list[choice].split("/");
			_youtube_id = _id[_id.length-1];
			if(_youtube_id.indexOf("=") >= 0){
				_youtube_id = _youtube_id.substr(_youtube_id.indexOf("=") + 1);
			}
		}
		Youtube.youtube_id = _youtube_id;
	  Youtube.play = function(flag){
			if(flag){
				if( (agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) && flag == undefined){
				//	  	$(".movie-area .movie-image").show();
				//	  	$(".movie-area .video").hide();

				}else{
					_movie_flag = true;
				//	  	$(".movie-area .movie-image").hide();
				//	  	$(".movie-area .video").show();
				}
			}else{
				_movie_flag = true;
			}
		  if(_movie_flag){
		  	if(Youtube.youtube_id){
				  $(".top-youtube-container").show();
			    var onPlayerReady =  function(event){
					event.target.mute();



						//プレビュー時の制御
						if ($("#size-detect").css("font-family") === "tablet" || $("#size-detect").css("font-family") === "sp") {
								event.target.stopVideo();
						} else {
								return;
						}


					if(flag){
						event.target.playVideo();
					}
			      }
				var onPlayerStateChange = function(v){
					if(v.data == 0){
						player.seekTo(0);
					}
				}
				var onPlayerError = function(v){
				}
				var options =
				{
					width:720,
					height:315,
					videoId:Youtube.youtube_id,
					playerVars:{
						autoplay:1,
						rel:0,
						showinfo:0,
						iv_load_policy:3,
						controls:0,
						modestbranding:1,
						version:3,
						playsinline:1
			        },
				    events: {
				         onReady: onPlayerReady,
				        onStateChange: onPlayerStateChange,
				        onError:onPlayerError
				    }
				};
				if(!player){
					player = new YT.Player( "youtube-iframe", options);
				}
			  }
			}
		}


	  function playYoutube(flag){
		  if(_youtube_ready_flag){
		  		Youtube.play(flag);
		  }else{
			_youtube_request_flag = true;
			_youtube_request_para = flag;
		  }
	  }

		global.playYoutube = playYoutube;

	})(CRHP);
});
