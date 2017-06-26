var tpl = tpl || {};

(function() {
    var data;
    var scrollOffset = 20;
    var navChangeOffset = 90;//ナビゲーションのカレント処理に関するoffset
    var currentId = "";

    //販社jsonが読み込まれたタイミングで呼び出される
    $(document).on('contentsJsonLoaded', function(e, json) {
         data = json;
        startContents();
    });

    //販社json読み込みとonloadの両方が完了したら呼び出される。
    $(document).on('contentsReady', function(e, json) {
       
    });

    //コンテンツ開始
    function startContents() {
        //コンテンツの処理はここに書く

        var topSlider = $('.multiple-items');

        topSlider.slick({
            accessibility: false,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            speed: 600
        });

        $('.multiple-items').addClass('is-show');


        var interiorSlide = $('.interior__slide');
        interiorSlide.slick({
            accessibility: false,
            autoplaySpeed: 3000,
            dots: false,
            fade: true,
            speed: 600
        });
      
        $('.interior__slide-btn-item').on('click',function(e){
            var index = $(this).index();
            interiorSlide.slick('slickGoTo',parseInt(index));
        });
      

        topSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            updateSliderText(nextSlide);
        });

        $('.interior__slide-btn-item').eq(0).addClass('is-active');

        interiorSlide.on('afterChange', function(event, slick, currentSlide) {
            $('.interior__slide-area').removeClass('is-change-process');
        });

        interiorSlide.on('beforeChange', function(event, slick, currentSlide,nextSlide) {
            $('.interior__slide-btn-item').removeClass('is-active');
            $('.interior__slide-btn-item').eq(nextSlide).addClass('is-active');
            $('.interior__slide-area').addClass('is-change-process');
        });

        function jsCopy(){
            $('.js-copy').each(function(index, el) {
                var dest = $(el).data('destination');
                var html = $(el).html();
                $(dest).html(html);
            });
        }
        jsCopy();

        function updateSliderText(id){
            var len = $('.slide-notice-item').length;
            $('.slide-notice-item').css('opacity',0);
            for (var i = 0; i < len; i++) {
                if(i == id){
                    TweenMax.to($('.slide-notice-item-'+(id+1)),0.2,{opacity:1});
                }
            }
        }
        function updateSliderTextHeight(){
            var maxHeight = 0;
            $('.slide-notice-item').each(function(index, el) {
                var h = $(el).outerHeight();
                maxHeight = maxHeight < h ? h : maxHeight;
            });
            $('.slide-notice').height(maxHeight);
        }
        
        $(window).resize(updateSliderTextHeight);

        updateSliderText(0);
        updateSliderTextHeight();


        $('.style-car-box__dressup').on('click',function(e){
            var target = $(this);
            var parent = target.parents('.style-car-box');
            parent.toggleClass('is-open');
            var border = target.find(".border");
            if(parent.hasClass('style-car-box--sporty')){
                parent.find('.style-car-box__spec').slideToggle();
            }else{
                parent.find('.style-car-box__spec').slideToggle();
                parent.find('.style-car-box__notice').slideToggle();
            }
            if(parent.hasClass('is-open')){
                target.off("mouseenter");
                border.addClass('is-out-process');
                TweenMax.to(border,0.14,{scaleX:0,ease:Power2.easeOut});
                
            }else{
                border.removeClass('is-out-process');
                TweenMax.to(border,0.3,{scaleX:1,ease:Power2.easeOut});
                setBorderInteraction(target);

            }
            
            
        });
        setBorderInteraction();
        function setBorderInteraction(btn){
            var target = btn ? btn : $('.style-car-box__dressup');
            target.on('mouseenter',function(e){
            var border = $(this).find(".border");
            border.addClass('is-out-process');

            TweenMax.to(border,0.1,{scaleX:0,ease:Power2.easeOut,onComplete:function(){
                border.removeClass('is-out-process');
                TweenMax.to(border,0.3,{scaleX:1,ease:Power2.easeOut});
            }});
        });
        }

        $('.contents-nav__menu-btn').on('click',function(e){
            $('.contents-nav-list').addClass('is-show');
            $('.contents-nav-list.is-show').hammer().on('swiperight',function(e){
                $('.contents-nav-list.is-show').hammer().off('swiperight');
                $('.contents-nav-list').removeClass('is-show');
            });
        });
        $('.contents-nav__close').on('click',function(e){
            $('.contents-nav-list').removeClass('is-show');
        });


        var navSection = $('.nav-target');
        var tmpId = "";
        var navArrow = $('.nav-arrow');
        var navContainer = $('.contents-nav-container');

        $(window).scroll(function(e){

            var scrollTop = $(window).scrollTop();
            
            var currentNav;

            checkNavState(scrollTop);
            checkNavCurrent(scrollTop);
            
        });

        function checkNavCurrent(scrollTop){
            var currentNav;

            navSection.each(function(index, el) {
                var id = $(el).data('id');
                var pos = $(el).offset().top;

                if(scrollTop > pos-navChangeOffset){
                    currentId = id;
                    currentNav = $(".contents-nav-item[data-id="+id+"]");
                }
            });

            if(!currentNav){
                navArrow.addClass('is-hide');
            }else{
                navArrow.removeClass('is-hide');
            }
            if(tmpId != currentId){
                if(currentNav){
                    if(currentNav.length > 0){
                        changeNav(currentNav);        
                    }
                    
                }
            }
            tmpId = currentId;
        }


        
        function checkNavState(scrollTop){
            if(scrollTop > scrollOffset){
                navContainer.addClass('contents-nav-container--small');
            }else{
                navContainer.removeClass('contents-nav-container--small');
            }
        }

        function changeNav(nav){

            $('.contents-nav-item').removeClass('is-active');
            nav.addClass('is-active');
            var target = nav.position().left;
            var paddingLeft = Number(nav.find("a").css('padding-left').replace("px",""));
            
            var offset = paddingLeft + nav.find("a").width()/2;
            TweenMax.to(navArrow,0.3,{x:target+offset});
        }


        function init(){
            var scrollTop = $(window).scrollTop();
            checkNavState(scrollTop);
            checkNavCurrent(scrollTop);
        }

        $('a[href^=\\#]').on('click',function(e){
            var speed = 500;
            var offset = $('.contents-nav-container').height();
           
            var target = $(this).attr("href");
            var targetY = $(target).offset().top - offset;

            $('html,body').animate({scrollTop: targetY}, speed, 'swing');
            return false;
      });

        init();
    }

})();
