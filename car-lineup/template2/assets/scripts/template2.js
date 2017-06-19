jQuery(document).ready(function($) {
    tabSwitchContents();
    stateSave();


    crhp.BoxHeightAlign.init({
       isAll:false
   });

    $(window).on("resize", function(event) {
        crhp.BoxHeightAlign.update();
    });


});


/**
 * tab-area
 */
var tabSwitchContents = function() {
    $("#tab-area .tab-item").on("click", function() {
        var $this = $(this);
        var index = $("#tab-area .tab-item").index(this);
        var type = $this.attr("data-type");
        selectTab(type);

        function selectTab(type) {
            $("#lineup-contents .carlist-name").css("display", "none");
            $("#lineup-contents .carlist-body").css("display", "none");
            $("#lineup-contents #carlist-" + type).css("display", "block");
            $("#tab-area .tab-item").removeClass('active');
            $("#tab-area .tab-item-" + type).addClass('active');
crhp.BoxHeightAlign.update();
        }

    });

};



function stateSave() {
    var index = 0;

    // クッキーのindexを取得し読み込み時にオープンする
    if ($.cookie('index')) {
        var index = $.cookie('index');
        var index_type;
        console.log(index);

        if (index == 0) {
            index_type = "body";
        } else {
            index_type = "name";
        }
        console.log(index_type)

        $('#tab-area li.tab-item').removeClass('active').eq(index).addClass('active');
        $("#lineup-contents .carlist-name").css("display", "none");
        $("#lineup-contents .carlist-body").css("display", "none");
        $("#lineup-contents #carlist-" + index_type).css("display", "block");
    }
    $.cookie('index', index, { expires: 1 });

    $('#tab-area li.tab-item').click(function() {
        if (index != $('#tab-area li.tab-item').index(this)) {
            index = $('#tab-area li.tab-item').index(this);
            $('#tab-area li.tab-item').removeClass('active').eq(index).addClass('active');

            // 有効期限は1日（クッキーにはドメインをセットしない、ブラウザを閉じたら初期化）
            $.cookie('index', index, { expires: 1 });
        }
    });
}