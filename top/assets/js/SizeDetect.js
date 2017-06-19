var CRHP = CRHP || {};

(function(global){

	var SizeDetect = {
		size       : ""
	};

	SizeDetect.check = function(){
		if($("#size-detect").width() > 0){
			SizeDetect.size = $("#size-detect").css("font-family").replace(/\"/g,"");

			SizeDetect.isSp       = false;
			SizeDetect.isSpLarge  = false;
			SizeDetect.isTable    = false;
			SizeDetect.isPcMin    = false;
			SizeDetect.isPcMiddle = false;
			SizeDetect.isPcLarge  = false;

			if(SizeDetect.size == "sp") SizeDetect.isSp              = true;
			if(SizeDetect.size == "sp-large") SizeDetect.isSpLarge   = true;
			if(SizeDetect.size == "tablet") SizeDetect.isTable       = true;
			if(SizeDetect.size == "pc-min") SizeDetect.isPcMin       = true;
			if(SizeDetect.size == "pc-large") SizeDetect.isPcMiddle = true;
			console.log(SizeDetect.isSp);
			console.log(SizeDetect.isPcMin);
		}
	};

	$(function(){
		SizeDetect.check();
		$(window).off("resize.sizeDetect");
		$(window).on("resize.sizeDetect",SizeDetect.check);
	});

	global.SizeDetect = SizeDetect;

})(CRHP);
