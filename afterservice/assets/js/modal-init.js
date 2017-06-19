var crhp = crhp || {};

(function(namespace){

	var afterServiceModal = function(){

	}

	afterServiceModal.prototype.init = function(){

		$("a.modal-content").fancybox({
			'overlayColor'		: '#000',
			'overlayOpacity'	: 0.7,
			'cyclic'            : true,
			'padding' : 0,
			autoSize : false,
			width    : "90%",
			height   : "auto",
			"maxWidth" : "700",
			"minWidth": "250"
		});


	}



	namespace.afterServiceModal = afterServiceModal;

})(crhp);

$(function(){

	var modal = new crhp.afterServiceModal();

	modal.init();

});
