$(document).ready(function(){

  facebookShare();
  twitterShare();
  sharegPlus();
  hoverAction();
});




function facebookShare(url){

  var url = location.href;
  var x = screen.width/2 - 626/2;
  var y = screen.height/2 - 436/2;
  // alert(url);

  $(".sns-area .btn-fb a").live("click",function(){
    // $(".sharebtn-area .btn-fb a").attr("href","http://www.facebook.com/sharer/sharer.php?u= ")
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
      '_blank',
      'width=626,height=436,left='+x+',top='+y
      ); return false;
  });
};

function twitterShare(){
  var x = screen.width/2 - 550/2;
  var y = screen.height/2 - 420/2;

  $(".sns-area .btn-tw a").live("click",function(){
    var twText = $("meta[name=tw_text]").attr("content");
    window.open(
      'https://twitter.com/intent/tweet?text='+encodeURIComponent(twText),
      '_blank',
      'width=550,height=420,left='+x+',top='+y
      );
    return false;
  });
};



function sharegPlus(){
  var url = location.href;
  var x = screen.width/2 - 550/2;
  var y = screen.height/2 - 590/2;

  $(".sns-area .btn-gp a").live("click",function(){
    window.open(
      'https://plus.google.com/share?url='+encodeURIComponent(location.href),
      '_blank',
      'width=550,height=590,left='+x+',top='+y
      );
    return false;
  });
};



function hoverAction(){
  $(".sns-area li img") .hover(function(){
    $(this).stop().fadeTo("100",0.7);
  },function(){
    $(this).stop().fadeTo("100",1.0);
  });
};