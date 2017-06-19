(function ($) {
  	$(function(){

        animateMainBanner();
  		anchorAnimate();
  		backTop();

	});
})(jQuery);

/* ANIMATION OF TOP BANNER
==============================*/

function animateMainBanner(){
    
    //「00_gaijin_san_11.psd」を右下に「rotateinUpRight」で登場させ後に（ページが読み込んでから6秒）、「zoomOutRight」で右にはける
     var newLoop = setInterval(function(){
        $(".position08").removeClass("rotateInUpRight");
        $(".position08").css("opacity", 1);
        $(".position08").css("animation-delay", "0s");
        $(".position08").addClass("zoomOutRight");
        clearInterval(newLoop);
    }, 6000);
    
    // 星のおじさんを一人ずつ飛ぶようにする
    var numberOfStars = $(".toFly").length;//星のおじさんの数
    var animationTime = 2;
    var allStarsOver = numberOfStars * animationTime * 1000;//おじさんが全員一回飛び終わった時間
        
    refreshStarsDelay();
    
    // おじさんが全員一回飛び終わった後に、アニメーションを再実行する
    var restartLoop = setInterval(function(){
        refreshStarsDelay();
    }, allStarsOver);
    
    function refreshStarsDelay(){//
        $(".flyingStar").removeClass("flyingStar");
        $(".toFly")[0].offsetWidth = $(".toFly")[0].offsetWidth;
        $(".toFly").addClass("flyingStar");
    }
    
    
}

/* BACK TO TOP
==============================*/

function backTop() {
	/*
	$(window).scroll(function() {
        if($(window).scrollTop() != 0) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }
    });
	*/
   	$('#backtop').click(function() {
    	$('html, body').animate({scrollTop:0},500);
   	});
}


/* ANCHOR ANIMATE
==============================*/

function anchorAnimate() {
	$('.anchor a').click(function() {
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
  	var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
}
$(function () {
    var headerHight = 86; //ヘッダの高さ
    $('a[href^=#]').click(function(){
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top-headerHight; //ヘッダの高さ分位置をずらす
        $("html, body").animate({scrollTop:position}, 550, "swing");
        return false;
    });
  $(function(){
      var setElm01 = $('.animation-left');
      setElm06.css({display:'table',opacity:'0'});
      delayHeight = 200;
      $('html,body').animate({scrollTop:0},1);
      function scrollElm(){
          var setThis = $(this),
          elmTop = setThis.offset().top,
          elmHeight = setThis.height(),
          scrTop = $(window).scrollTop(),
          winHeight = $(window).height();
      }
      $(window).on('load scroll resize',function(){
          setElm01.each(function(){
              var setThis = $(this),
              elmTop = setThis.offset().top,
              elmHeight = setThis.height(),
              scrTop = $(window).scrollTop(),
              winHeight = $(window).height();
              if (scrTop > elmTop - winHeight + delayHeight && scrTop < elmTop + elmHeight){
                  setThis.stop().addClass("animated bounceInLeft");
              } else if (scrTop < elmTop - winHeight + delayHeight && scrTop < elmTop + delayHeight){
                  setThis.stop().removeClass("animated bounceInLeft");
              }
          });
      });
  });
});