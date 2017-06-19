function setContents(){
  var $window = $(window);
  var $responsiveProp = $("#responsive-property");
  var contentType = $responsiveProp.css("font-family").replace(/[\'\"]/g,"");

  if(contentType != $responsiveProp.data("mode")){

    setContentPosition(contentType);
    $responsiveProp.data("mode",contentType);

  }

  if(!window.slide){
    window.slide = new Slideshow();
  }

  window.slide.prepareDom();
  window.slide.addEventListeners();

  setTimeout(function(){
    window.slide.slideSetting();
  },500);


}



function setContentPosition(type){
  var $leftSections  = $(".main");
  var $rightSections = $(".right_column");
  var $sections      = $(".section");
  var sectionsHtml   = {};
  var sectionsPosition = {
    "pc": {
      right : ["section-calendar","section-contact","section-shoplist","section-lineup"],
      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service","section-links"]
    },
    "pc2": {
      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
    },
    "tab": {
      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
    },
    "tab2": {
      right : ["section-calendar","section-contact","section-shoplist","section-lineup","section-links"],
      left  : ["slideshow","section-unique","section-contents-bg","section-news","section-service"]
    },
    "sp": {
      right : ["section-lineup","section-links"],
      left  : ["section-shoplist","section-calendar","section-contact","slideshow","section-unique","section-contents-bg","section-news","section-service"]
    }
  };


  $sections.each(function(){
    var $this = $(this);
    sectionsHtml[$this.attr("id")] = $this.get(0).outerHTML;
  });


  $leftSections.empty();
  $rightSections.empty();

  for(var i = 0,len = sectionsPosition[type].left.length; i < len; i++){
    $leftSections.append(sectionsHtml[sectionsPosition[type].left[i]]);
  }

  for(var i = 0,len = sectionsPosition[type].right.length; i < len; i++){
    $rightSections.append(sectionsHtml[sectionsPosition[type].right[i]]);
  }

  google.maps.event.addDomListener(window, 'resize', initialize);

}

$(window).load(function(){

  setContents();

  $(window).resize(function(){
    setContents();
  });


});


$(function(){
   // heightLine.js
   $(".unique .text-area").heightLine({
    maxWidth:1023,
    minWidth:320,
    fontSizeCheck:true
  });
 });

$( window ).resize(function(){
  // heightLine.js
  $(".unique .text-area").heightLine({
    maxWidth:1023,
    minWidth:320,
    fontSizeCheck:true
  });
});


$(window).on('load resize', function(){
/*
  var contentsWidth = $("#contents").width();
  $("#contents .movie-area").css({'width':contentsWidth});
  $(".movie-image").css({'width':contentsWidth});
  var topSlideHeight = $(".movie-image img").height();
  var _y = $(".movie-image").offset().top;
  $(".movie-image").css({'height':topSlideHeight});
  $(".main-wrap").css({'top':topSlideHeight -  _y});
  $("#contents.tab_sideway .main-wrap").css({'top':topSlideHeight-30});
  $("#footer").css({'margin-top':topSlideHeight});
  */

});


$(function(){
  $('.unique ul li:odd').addClass('right');




});

//PC tel cancel
$(function(){
  var ua = navigator.userAgent;
  if(ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0){
    $('.telhref span').each(function(){
      $(this).unwrap();
    });
  }
});


//random coverPic
// $(function() {
//   var array = [
//   "/img/top/movie-image_1.jpg",
//   "/img/top/movie-image_2.jpg",
//   "/img/top/movie-image_3.jpg",
//   "/img/top/movie-image_4.jpg"
//   ];

//   var l = array.length;
//   var r = Math.floor(Math.random()*l);
//   var imgurl = array[r];
//   $("img#randomimg").attr({"src":imgurl});
// });







// tab,sp movie
$(function(){
  var agent = navigator.userAgent;

  if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){

    $("#contents").addClass('tab_sideway');
    $(".movie-area").addClass('movie-hide');
  }else{
   $(".youtube-link-icon").css({'display':'none'});
   // $("#contents").addClass('tab_sideway');
 }
});


window.onload = function() {
//  setMovie();
  noMovieSlide();



//movie-area
var movie = $(".movie-area").offset().top;
var alert_box_h = 0;
if($("#alert-box").width() > 0){
	alert_box_h = $("#alert-box").outerHeight() + $("#alert-box").position().top;
}

var movie_base_y = alert_box_h + $("#contents").offset().top;

console.log("movie_base_y="+movie_base_y);
$(".movie-area").css("top", movie_base_y);
var _scrollMovie = function(){
	var _y =  movie_base_y - $(window).scrollTop();
	if(_y < -$("#contents").offset().top) {
		_y = -$("#contents").offset().top;
	}else{
		
	}
	$(".movie-area").css("top", _y);
}
$(window).scroll(function() {
	_scrollMovie();
});
_scrollMovie();

var contentsWidth = $("#contents").width();
//$("#contents .movie-area").css({'width':contentsWidth});


//sp-calendar
$(function(){
  $(".sp-next-calendar").on("click", function() {

    var $this = $(this);
    $this
    .prev().find("li.second-month").slideToggle(300)
    .parent().parent().next().toggleClass("open");

    $(function(){
      if($(".sp-next-calendar").hasClass('open')){
        $(".sp-next-calendar").find("img").attr({"src":"img/top/section-calendar-arrow-close.png"});
      }else{
        $(".sp-next-calendar").find("img").attr({"src":"img/top/section-calendar-arrow-open.png"});
      }
    });
    return false;
  });
});

//mouseOver-picchange
$(function(){
  $('#section-service a img').mouseover(function(){
    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
  });
  $('#section-service a img').mouseout(function(){
    $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
  });
});


$(function(){
  $('.car-pic li').hover(
    function(){
      $(this).stop().fadeTo('fast', 0.7);
    },
    function(){
      $(this).stop().fadeTo('fast', 1);
    }
    );
});

$(function(){

});


};



function noMovieSlide(){
  var setImg = '.movie-image';
  var fadeSpeed = 2500;
  var switchDelay = 5000;

  $(setImg).children('img').css({opacity:'0'});
  $(setImg + ' img:first').stop().animate({opacity:'1',zIndex:'20'},fadeSpeed);

  setInterval(function(){
    $(setImg + ' :first-child').animate({opacity:'0'},fadeSpeed).next('img').animate({opacity:'1'},fadeSpeed).end().appendTo(setImg);
  },switchDelay);
}


