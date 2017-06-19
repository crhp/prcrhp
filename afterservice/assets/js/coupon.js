var crhp = crhp || {};

(function(namespace){

	var QRCODE = function(){

	}

	QRCODE.prototype.init = function(){
		this.getURL();
	}

	QRCODE.prototype.getURL = function(){
		var href = window.location.href ;

		this.makeQRcode(href);

	}

	QRCODE.prototype.makeQRcode = function(url){
		var img = $(".qr-img");

		img.qrcode({
			width : 124,
			height: 124,
			text  : url
		});

	}

	namespace.QRCODE = QRCODE;

})(crhp);

$(function(){

	var makeQR = new crhp.QRCODE();

	makeQR.init();

});
