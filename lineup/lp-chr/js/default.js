/******************************************************************************/
// isSP()
// 処理：スマホ判定（UA）
// 引数：
// 戻り値：boolean true:sp/false:pc or tablet
/******************************************************************************/

// jQueryを使うもの
$(document).ready(function() {
	//scroll
	SmoothScroll($('header').height());　//スムーススクロール

    //matchheight
    $('#content #interior ul li').matchHeight();
    $('#content #interior ul li dt').matchHeight();

    //colorbox
     $(".modal").colorbox({
        rel:'modal'
    });

	if (isSP()){  // モバイル表示
	  var SCdevflag = "sp";//モバイル表示用AA

	  //colorboxレスポンシブ
	  $(document).ready(function(){
		 $(".modal").colorbox({
		 	rel:'modal',
			maxWidth:"98%",
			maxHeight:"98%"
		});
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
    }

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
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return true;
    }else{
        return false;
    }
}

/*android cssハック*/
if ( navigator.userAgent.indexOf('Android') > 0 ) {
    $("#content #endmenu .menuList li:nth-child(3)").css("margin-top","-31px");
};