$(window).on('load', function() {
    sendUsergramParam();
});
// $(function() {
//     sendUsergramParam();
// });

function sendUsergramParam() {

    var ug_id = $("#conversion").data("ug_id");

    if (ug_id) {
        var taeget_usergram = $(".ug_param");

        taeget_usergram.on("click", function() {
            var $this = $(this);
            var send_param = $this.data("ug_param");

            console.log(send_param);

            this.href = usergram.link(this.href)
            usergram.push(['send', ug_id, 'cv', send_param]);
        });

    } else {
        return;
    }


}
