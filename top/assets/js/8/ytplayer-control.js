function movieCoverText(){
  $('.cover-wrap.first,.cover-wrap.second').css({opacity:'0'});

  setTimeout(function(){
    $('.cover-wrap div.first' ).animate({opacity:'1',},{duration: 1000,
      complete: function() {
        $('.cover-wrap div.second').delay(500).animate({opacity:'1',},{duration: 1000,
          complete: function() {
            $('.cover-wrap div.first,.cover-wrap div.second').delay(2000).animate({opacity:'0',},{duration: 1500,});
              // complete: function() {
              //   $('.cover-wrap div.second').delay(100).animate({opacity:'0',},{duration: 1000,});
              // },
            // });
      },
    });
      },
    });
  },2000);
}



function onPlayerReady(event){
  $(".movieWaiting-bg").css({opacity:'1'});

  // event.target.setVolume(0);

  var agent = navigator.userAgent;
  if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){
    event.target.stopVideo();
  }else{

    $(".movieWaiting-bg").animate({opacity:'0',},{duration: 1000,});
    movieCoverText();
    event.target.playVideo();
  }

  //ie8,7,6 lowerQuality
  if($.browser.msie && $.browser.version < 9){
    event.target.setPlaybackQuality('large');
  }


  $(".btn .off").on("click",function(){
    player.mute();
    return false;
  });

  $(".btn .on").on("click",function(){
    player.unMute();
    return false;
  });

  $(".movie-id").append(videoId);

}




function onPlayerStateChange(event){
  if (event.data == YT.PlayerState.ENDED)
  {
    // alert("YouTube½KÁË—ÊÖª01");
    event.target.playVideo();
  }
}

jQuery(function() {
  if(navigator.userAgent.indexOf("MSIE") != -1) {
    jQuery('img').each(function() {
      if(jQuery(this).attr('src').indexOf('.png') != -1) {
        jQuery(this).css({
          'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + jQuery(this).attr('src') + '", sizingMethod="scale");'
        });
      }
    });
  }
});




