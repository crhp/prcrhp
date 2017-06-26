function checkLegacyIE(){

	// 対応ブラウザ判定
	var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();

    var isLegacyIE = false;
    if (userAgent.indexOf("msie") != -1) {
        if (appVersion.indexOf("msie 6.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 7.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 8.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 9.") != -1) {
            isLegacyIE = true;
        } else if (appVersion.indexOf("msie 10.") != -1) {
            isLegacyIE = true;
        }
    }

    if (isLegacyIE) {
        var legacyIEhtml = '<div class="ie-wrap">';
        legacyIEhtml += '<div class="ie-main"><img src="images/browser_alert.jpg" alt="browser_alert" /></div>';
        legacyIEhtml += '</div>';

        $("body").prepend(legacyIEhtml).addClass('isLegacyIE');
    }
};