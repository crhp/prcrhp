$(function() {
    sendUsergramParam();
});


function sendUsergramParam() {
    var taeget_usergram = $(".ug_param");
    taeget_usergram.on("click", function() {
        var $this = $(this);
        var send_param = $this.data("ug_param");

        // console.log(send_param)

        usergram.push(['send', 'UgkLJM-1', 'cv', send_param]);
    });
}
