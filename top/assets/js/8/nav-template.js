// $(window).load(function(){

// snav
$(function(){
  var
  menuBtn = $(".main-menu>li>a");
  menuBtn.click(function(e){
    $(this).parent().toggleClass('active');
    $(this).parent().siblings(".main-menu>li").removeClass("active");



    return false;
  });
  $("#contents").on("click",function(){
    $(".main-menu>li").removeClass('active');
  });
});



// gnav
$(function(){
  var
  navTitle = $(".nav-title>li>p>a");
  navTitle.click(function(e){
    $(this).parent().parent().toggleClass('active');
    $(this).parent().parent()
    .siblings(".nav-title>li").removeClass("active");
    return false;
  });

  $("#contents").on("click",function(){
    $(".nav-title>li").removeClass('active');
  });
});



$(function(){
  $(".burger-menu").on("click",function(){
    var $this = $(this);
    $this
    .next().toggleClass('active');

    $(".loading-label").toggleClass('hide');
    $("#contents").toggleClass('hidehide');
    $("#nav .gnav").toggleClass('open');
    $(".nav-title>li").removeClass('active');

    return false;

  });

  $("#contents").on("click",function(){
    $(".menu").removeClass('active');
  });
});


//naradewa clickControl
$(function(){
  //PC
  $(".snav .main-menu .sub-menu li a").on("click",function(){
    $(".menu li").removeClass('active');
  });

  //tab sp
  $(".gnav .nav-title .sub-menu li a").on("click",function(){
    $(".nav-title li").removeClass('active');
    $(".gnav").removeClass('open');
    $(".gnav .menu").removeClass('active');


  });

});

//mouseOver-picchange
$(function(){
  $('.link-box li a img').mouseover(function(){
    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
  });
  $('.link-box li a img').mouseout(function(){
    $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
  });
});


// });



