$(function() {

    recruitSendUsergramParam();

    // var ua = navigator.userAgent;
    // console.log(ua);

});


function recruitSendUsergramParam() {

    var ug_id = $("#conversion").data("ug_id");

    if (ug_id) {

        var taeget_usergram_recruit = $(".ug_param_recruit");

        taeget_usergram_recruit.on("click", function() {
            var $this = $(this);
            var param_text = $this.find('.item-text').text();

            this.href = usergram.link(this.href);

            window.usergram=window.usergram||[],window.ugattr=window.ugattr||{};
            ugattr['recruit'] = param_text;

            usergram.push(['send', ug_id, 'cv', 'entry_click', ugattr]);
            console.log(param_text);
        });

    } else {
        return;
    }


}
