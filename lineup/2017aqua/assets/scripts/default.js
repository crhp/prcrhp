
// jQueryを使うもの
$(document).ready(function() {
	//スムーススクロール
	SmoothScroll($('header').height());

  //フェードインアニメーション
  $(window).fadeThis({
    speed: 1000,
  });

  //ボディカラー選択
  slider = $('.bxslider01').bxSlider({
        pagerCustom: '.bxs',
        onSlideAfter: function(){
            var idx = slider.getCurrentSlide();
            //全部の_onを取る
            $('.bxs li').each(function(){
               var src = $(this).find('img').attr('src');
                if(src.match('_on')){
                    src = src.split('_on')[0]+'.gif';
                    $(this).find('img').attr('src',src);
                }
            });
            
            //カレントの_onを取る
            var passive_src = $('.bxs li').eq(idx).find('img').attr('src');
            var active_pc_src = passive_src.split('.gif')[0] + '_on.gif';
            var active_sp_src = passive_src.split('.gif')[0] + '_sp_on.gif';
            $('.pc .bxs li').eq(idx).find('img').attr('src',active_pc_src);
            $('.sp .bxs li').eq(idx).find('img').attr('src',active_sp_src);
            //適応可能グレードを変更
            gradeCntl($('.pc .bxs li').eq(idx).find('a').data('grade'));
            
        }
    });


  //matchHeight
    $(function() {
        $('.fuel-consumption').matchHeight();
        $('.matchheight').matchHeight();
        $('.mc-spec_list li').matchHeight();
        $('.mc-spec_list li dt').matchHeight();
        $('.mc-spec_list.normal dt').matchHeight();
    });


    	// sp menu
    	WindowHeight = $(window).height();
        $('.drawr').css('height', WindowHeight); //メニューをWindowの高さいっぱいにする
        $(document).ready(function() {
            $('.btn').click(function(){ //クリックしたら
                $('.drawr').animate({width:'toggle'}); //animateで表示・非表示
                $(this).toggleClass('close'); //toggleでクラス追加・削除
            });
        });


});

//scroll
function SmoothScroll(header_height,not){
    if(isNaN(header_height)){
        header_height = 0;
    }
    if( not == null ){
        not = '.no-scroll';
    }
    var animation_time = 300;
    $(document).on('click','a:not("'+not+'")[href^="#"]',function(){
        var target = $(this).attr('href');
        var $target = $(target);
        var target_pos = $target.get( 0 ).offsetTop - header_height;
        $('html,body').animate({scrollTop: target_pos}, animation_time, 'swing');
    });
    return 0;

}

/*UA判定*/
function isSP(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return true;
    }else if(ua.indexOf('iPad') > 0){
        return true;
    }else if(ua.indexOf('Android') > 0){
      $("#content #endmenu .menuList li:nth-child(3)").css("margin-top","-31px");//android cssハック
      return true;
    }else{
      return false;
    }
}


//ボディカラー グレード判定
function gradeCntl(value){
	if(value == '1'){
		$(".grade-list ul").removeClass("apply02");
		$(".grade-list ul").removeClass("apply03");
		$(".grade-list ul").removeClass("apply04");
		$(".grade-list ul").addClass("apply01");
	}else if(value == '2'){
		$(".grade-list ul").removeClass("apply01");
		$(".grade-list ul").removeClass("apply03");
		$(".grade-list ul").removeClass("apply04");
		$(".grade-list ul").addClass("apply02");
	}else if(value == '3'){
		$(".grade-list ul").removeClass("apply01");
		$(".grade-list ul").removeClass("apply02");
		$(".grade-list ul").removeClass("apply04");
		$(".grade-list ul").addClass("apply03");
	}else if(value == '4'){
		$(".grade-list ul").removeClass("apply01");
		$(".grade-list ul").removeClass("apply02");
		$(".grade-list ul").removeClass("apply03");
		$(".grade-list ul").addClass("apply04");
	}
}