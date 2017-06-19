var crhp = crhp || {};

(function(namespace) {

    var conversionFixed = function() {

        this.$window = $(window);
        this.footer = $("footer");


    }

    conversionFixed.prototype.init = function() {
        this.onResize();
        this.moveBtns();

    }

    conversionFixed.prototype.moveBtns = function() {

        var $conversion = $("#conversion");

        $conversion.css({
            bottom: -$conversion.height()
        });

    }

    conversionFixed.prototype.getContentSize = function() {
        var $content = $("#container");
        return $content.width();
    }

    conversionFixed.prototype.onResize = function() {

        var that = this;
        var $conversion = $("#conversion");


        this.$window.on("load resize", position);
        this.$window.ready(position);

        function position() {
            var contentSize = that.getContentSize();

            $conversion.css({
                "max-width": contentSize
            });

            if (that.isPC() === true) {
                $conversion.css("position", "fixed");
            } else {
                $conversion.css("position", "static");
            }

            that.getFooterOffset();

        }
    }

    conversionFixed.prototype.fixBtn = function() {

    }

    conversionFixed.prototype.getFooterOffset = function() {
        var temp = this.footer.offset().top;
        var that = this;

        var $conversion = $("#conversion");


        // if(that.isPC() === true){
        //     if(scroll > footerOffset){
        //         $conversion.css("position","static");
        //     }else{
        //         $conversion.css("position","fixed");
        //     }
        // }else{
        //     $conversion.css("position","static");
        // }



        this.onScroll(temp);

    }

    conversionFixed.prototype.onScroll = function(offsets) {

        var that = this;
        var $conversion = $("#conversion");
        var footerOffset = offsets;
        var header = $("#header");


        this.$window.on("scroll resize", function() {
            var scroll = $(this).scrollTop() + $(this).height() - $conversion.height();

            if (that.isPC() === true) {
                if (scroll > footerOffset) {
                    $conversion.css("position", "static");
                } else {
                    $conversion.css("position", "fixed");
                }
            } else {
                $conversion.css("position", "static");
            }


        });
    }

    conversionFixed.prototype.loadingPage = function() {
        var $conversion = $("#conversion");

        $conversion.animate({
            bottom: 0
        }, 700);

    }


    conversionFixed.prototype.isPC = function() {
        return $(".footer-sizedetect").css("fontFamily").indexOf("PC") != -1;
    }

    conversionFixed.prototype.isTAB = function() {
        return $(".footer-sizedetect").css("fontFamily").indexOf("TAB") != -1;
    }

    conversionFixed.prototype.isSP = function() {
        return $(".footer-sizedetect").css("fontFamily").indexOf("SP") != -1;
    }


    namespace.conversionFixed = conversionFixed;

})(crhp);


$(function() {
    countBtn();
    gaSending();

    var conversion = new crhp.conversionFixed();

    conversion.init();

    $(window).ready(function() {
        conversion.loadingPage();
    });
});


// $(window).on('load',function(){
//     var conversion = new crhp.conversionFixed();

//     conversion.init();

//     $(window).ready(function() {
//         conversion.loadingPage();
//     });
// });




// cv btn count
function countBtn() {
    var count = $(".conversion-btns li").length;
    $(".conversion-btns").addClass('btn_count_' + count);
}

// gaSending
function gaSending() {
    var $ga_send = $("a.ga_send");
    $ga_send.on("click", function() {
        var $this = $(this);
        var $label = $this.data('label');
        if ($label) {
            ga('send', 'event', 'link', 'click', $label, 1, { 'nonInteraction': 1 });
        }
    });
}
