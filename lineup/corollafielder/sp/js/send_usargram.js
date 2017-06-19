$(function() {
    sendUsergramParam();

    // var ua = navigator.userAgent;
    // console.log(ua);
});


function sendUsergramParam() {
    var taeget_usergram = $(".ug_param");
    taeget_usergram.on("click", function() {
        var $this = $(this);
        var send_param = $this.data("ug_param");

        // console.log(send_param)

        this.href = usergram.link(this.href)
        usergram.push(['send', 'WArBZq-1', 'cv', send_param]);
    });
}
