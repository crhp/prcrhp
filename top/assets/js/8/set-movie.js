$(document).ready(function() {

  tabRondamMovie();
console.log("check set-movie");
  var ary = ['btTnhLkrt9s','6jTjdvmvKCI','Qu1t0iV4P7I'];
  var videoId = ary[Math.floor(Math.random() * ary.length)];
  $(".youtube-link-icon a").click(function(){
		moviePlayById(videoId);
		$(window).on('touchmove.noScroll', function(e) {
			e.preventDefault();
		});
		return false;
  });

  $(document).on("click", ".modal-bg", function(){
    closeMovie();
  });
  /*
  $(".modal-bg").live("click",function(){
    closeMovie();
  });
  */

	$(window).on('resize', function(){
		setYoutubeAndImage();
	});
	setYoutubeAndImage();


});


function setYoutubeAndImage(){
	if(checkPlayYoutube()){
		CRHP.playYoutube(true);
		
		$(".movie-area .video").show();
		$(".movie-area .movie-image").hide();
		$(".movie-area .youtube-link-icon").hide();
		$(".movie-area .video-cover").show();

		if(CRHP.SizeDetect.size.indexOf("pc") < 0){
			$(".main-wrap").css("margin-top","40%");
		}else{
			$(".main-wrap").css("margin-top","");
		}
	}else{
		$(".movie-area .video").hide();
		$(".movie-area .movie-image").show();
		$(".movie-area .youtube-link-icon").show();
		$(".movie-area .video-cover").hide();
	}

}

function checkPlayYoutube(){
	var ua_base = window.navigator.userAgent.toLowerCase();
	var _ver = 99999;
	var _ret = false;

	var ua_chrome = ua_base.indexOf("chrome/");
	var ua_ios = ua_base.indexOf("iphone os");
	if(ua_chrome >= 0){
		var _ver = parseInt(ua_base.split("chrome/")[1].split(".")[0]);
		if(_ver > 53){
			_ret = true;
		}
	}else if(ua_ios >= 0){
		var _ver = parseInt(ua_base.split("iphone os ")[1].split("_")[0]);
		if(_ver >= 10){
			_ret = true;
		}
	}else{
		_ret = true;
	}
	
	return _ret;
}



function moviePlayById(movieId){
console.log("moviePlayById "+movieId);
	var ua_base = window.navigator.userAgent.toLowerCase();
	var _ver = 99999;
	var _ok_flag = checkPlayYoutube();

	var ua_chrome = ua_base.indexOf("chrome/");
	var ua_ios = ua_base.indexOf("iphone os");
	if(ua_chrome >= 0){
		var _ver = parseInt(ua_base.split("chrome/")[1].split(".")[0]);
		if(_ver > 53){
			_ok_flag = true;
		}
	}else if(ua_ios >= 0){
		var _ver = parseInt(ua_base.split("iphone os ")[1].split("_")[0]);
		if(_ver >= 10){
			_ok_flag = true;
		}
	}else{
		_ok_flag = true;
	}



  var bc_html = "";
  bc_html += '<iframe width="1280" height="720" src="//www.youtube.com/embed/'+movieId+'?autoplay=1&rel=0&controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';

	if(_ok_flag){
		bc_html = "<div id='ytframe'></div>";
	}

  var html = '';
  html += '<div class="modal-bg"></div>';
  html += '<div class="movie-wrap">';
  html += '<div id="cover_wrapper">';
  html += bc_html;
  // Link transition disabled
  html +='<div class="movie-cover"><span class="modal-tit"><img src="/top/assets/images/8/top/modal-tit.png" alt="" /></span></div>';
  html += '</div>';

  // CLOSE
  html += '<div class="close-btn"><a href="javascript:void(0);" onclick="closeMovie();"><img src="/top/assets/images/8/top/btn-close-modal-white.gif" /></a></div>';
  html += '</div>';
  $("#cover").html( html );

	if(_ok_flag){
        player = new YT.Player('ytframe', {
			width: '1280',
			height: '720',
			videoId: movieId,
			playerVars: {
				playsinline: 1,
				autoplay:1,
				rel:0,
				controls:0,
				showinfo:0
			},
			events: {
				
			}
        });
		console.log("check------1");
	}else{
		console.log("check------2");
		CRHP.playYoutube();
	}


  $("#cover").css( "display", "block" );
  $("#cover").css( "opacity", "0.0" );
  $("#cover").animate( { "opacity":"1.0" }, 600, function() {
    $("#movie_area").css( "display",  "block" );
    $("#movie_area").css( "opacity",  "0.0" );
    $("#movie_area").animate( { "opacity":"1.0" }, 600 );
  });
};

function closeMovie(){
  $(window).off('.noScroll');

  $("#cover_wrapper").html( '<div id="movie_area"></div>' );
  $("#cover").animate( { "opacity":"0.0" }, 600, function() {
    $("#cover").css( "display", "none" );
    $("#cover").html( "" );
  });
};


function tabRondamMovie(){
  var array = [
  "https://www.youtube.com/embed/n0GRmokDb8I?autoplay=0&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=btTnhLkrt9s",
  "https://www.youtube.com/embed/09sw3JIrVj0?autoplay=0&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=6jTjdvmvKCI",
  "https://www.youtube.com/embed/W7Uv1A-dzRk?autoplay=0&amp;rel=0&amp;controls=0&amp;showinfo=0&amp;loop=1&amp;playlist=Qu1t0iV4P7I"
  ];

  var l = array.length;
  var r = Math.floor(Math.random()*l);
  var movieurl = array[r];
  $(".embed-youtube iframe").attr({"src":movieurl});

}

