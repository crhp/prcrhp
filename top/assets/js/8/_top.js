function setContents(){
  var $window = $(window);
  var $responsiveProp = $("#responsive-property");
  var contentType = $responsiveProp.css("font-family").replace(/[\'\"]/g,"");

  if(contentType != $responsiveProp.data("mode")){
    setContentPosition(contentType);
    $responsiveProp.data("mode",contentType);
    window.slideshow = new Slideshow();
  }

  clearInterval(window.slideshow.autoTimer);
  window.slideshow.slideSetting();
  window.slideshow.autoCycle();
}

function getToday(callback){
  var url = "/api/today/";
  $.ajax({
    url : url,
    dataType: "json",
    success  : function(data){
      callback(data);
    }
  });
}

function setCalendar(data){
  var dateObj = new Date(data.date);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth();

  var $firstMonth = $(".first-month img");
  var firstMonthName = $firstMonth.attr("src");
  firstMonthName = firstMonthName.replace(/[0-9]{6,6}\.gif/g,"");
  var $secondMonth = $(".second-month img");
  var secondMonthName = $secondMonth.attr("src");
  secondMonthName = secondMonthName.replace(/[0-9]{6,6}\.gif/g,"")

  $firstMonth.attr("src",firstMonthName + year+("0"+month).slice(-2)+".gif");
  $secondMonth.attr("src",secondMonthName + year+("0"+month+1).slice(-2)+".gif");
}

function setContentPosition(type){
  var $leftSections  = $(".main");
  var $rightSections = $(".right_column");
  var $sections      = $(".section");
  var sectionsHtml   = {};
  var sectionsPosition = {
    "pc": {
      right : ["section-calendar","section-shoplist","section-lineup","section-contact"],
      left  : ["slideshow","section-unique","section-news","section-service","section-links"]
    },
    "tab": {
      right : ["section-calendar","section-shoplist","section-lineup","section-links","section-contact"],
      left  : ["slideshow","section-unique","section-news","section-service"]
    },
    "sp": {
      right : ["section-lineup","section-contact","section-links"],
      left  : ["section-shoplist","section-calendar","slideshow","section-unique","section-news","section-service"]
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

}







$(window).load(function(){
  window.slideshow = new Slideshow();
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



// snav
$(function(){
  var
  menuBtn = $(".main-menu>li");
  menuBtn.click(function(e){
    menuBtn.toggleClass('active');
    $(this).siblings(".main-menu>li").removeClass("active");
    return false;
  });
  $("#contents").on("click",function(){
    $(".main-menu>li").removeClass('active');
  });
  return false;
});


// gnav
$(function(){
  var
  navTitle = $(".nav-title>li");
  navTitle.click(function(e){
    navTitle.toggleClass('active');
    $(this)
    .siblings(".nav-title>li").removeClass("active");
    return false;
  });

  $("#contents").on("click",function(){
    $(".nav-title>li").removeClass('active');
  });
});



$(function(){
  $('.unique ul li:odd').addClass('right');

  getToday(function(data){
    setCalendar(data);
  });

});

// class付与
$(function(){
  $(".burger-menu").on("click",function(){
    var $this = $(this);
    $this
    .next().toggleClass('active');

    $(".loading-label").toggleClass('hide');
    $("#contents").toggleClass('hide');
    $("#nav .gnav").toggleClass('open');

    return false;

  });

  $("#contents").on("click",function(){
    $(".menu").removeClass('active');
  });
});



// sp カレンダー
$(function(){
  $(".sp-next-calendar").on("click", function() {

    var $this = $(this);

    $this
    .prev().find("li.second-month").slideToggle(300)
    .next().toggleClass("active");

    return false;
  });
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

// tab,sp movie
$(function(){
  var agent = navigator.userAgent;

  if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){

    $(".movie-area").addClass('movie-hide');
  }
});



// ページの読み込みが完全に完了したら以下の処理を実行
window.onload = function() {



// 「.movie-area」の最上部からの相対位置を取得
var movie = $(".movie-area").offset().top;
// 画面がスクロールされたら以下の処理を実行
$(window).scroll(function() {

// ScrollTopの位置が「movie」よりも値が大きければ、「.movie-area」を固定し、
// 「.main-wrap」を「.movie-area」の分だけ下げる
if($(window).scrollTop() > movie) {

  $(".movie-area").addClass("fixed");
  $(".movie-area").next().addClass("pdSet");


// ScrollTopの位置が「topbar」よりも値が小さければ、「.movie-area」の固定を解除し、
// 「.main-wrap」を元に戻す
} else {

  $(".movie-area").removeClass('fixed');
  $(".movie-area").next().removeClass("pdSet");
  // $(".main-wrap").css({"position": "relative", "top":"-70px"});

}

});

}