var CRHP = CRHP || {};

(function(global) {

    $(function() {

        crhp.BoxHeightAlign.init();
        $(window).on("resize", function(event) {
            crhp.BoxHeightAlign.update();
        });


        $(".blog-list li .blog-item-image img").each(function(index, element) {
            $(this).originSrc = $(this).src;
            $(this).src = "";
            var _setImageStyle = function(_element) {
                var _parent = _element.parent();
                _element.css({ "width": 0, "height": 0 });
                var _t_w = _parent.width();
                var _t_h = _parent.height();
                if (_element.context.naturalWidth / _element.context.naturalHeight < _t_w / _t_h) {
                    _element.css({ "height": "100%", "width": "auto" });
                    _parent.css({ "display": "block" });
                } else {
                    _element.css({ "height": "auto", "width": "100%" });
                    _parent.css({ "display": "table-cell" });
                }
            }
            $(this).bind("load", function() {
                _setImageStyle($(this));
                clearInterval(_id);
            });
            var _img = $(this);
            var _id = setTimeout(function() {
                if (_img.width() > 50 && _img.height() > 50) {
                    _setImageStyle(_img);
                }
                clearInterval(_id);
            }, 300);
        });

        function characterControl() {
            var $setElm = $('.blog-list li .blog-item-title');
            var cutFigure = '40'; // カットする文字数
            var afterTxt = ' …'; // 文字カット後に表示するテキスト

            $setElm.each(function() {
                var textLength = $(this).text().length;
                var textTrim = $(this).text().substr(0, (cutFigure))

                if (cutFigure < textLength) {
                    $(this).html(textTrim + afterTxt).css({ visibility: 'visible' });
                } else if (cutFigure >= textLength) {
                    $(this).css({ visibility: 'visible' });
                }
            });
        }
        characterControl();


    });

})(CRHP);
