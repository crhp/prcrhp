var CRHP = CRHP || {};

(function(global){
	var _lastSizeDetect = "";
	var SizeDetect = global.SizeDetect;
	var ElementManager = function(selectors){
		this.init(selectors);
	};

	ElementManager.prototype.init   = init;
	// ElementManager.prototype.add    = add;
	// ElementManager.prototype.remove = remove;
	ElementManager.prototype.sort   = sort;

// [{
// 	breakpoint : "sp"
// 	target : [],
// 	order  : []
// },{
// 	breakpoint : "sp"
// 	target : [],
// 	order  : []
// },{
// 	breakpoint : "sp"
// 	target : [],
// 	order  : []
// }]

	function init(target){
		this.target = target;
		this.sort();

		$(window).on("resize",this.sort.bind(this));
	}

	// function add(selector)
	// {
	// 	this.selectorList.push(selector);
	// }

	// function remove(selector)
	// {
	// }

	function sort()
	{
		if( _lastSizeDetect !== $('#size-detect').css('font-family') ){
			var item = {};
			for(var i = 0; i < this.target.length; i++){
				if(this.target[i].breakpoint == SizeDetect.size){
					item = this.target[i];
					break;
				}
			}
			if(item.target){
				for(var i = 0,len = item.target.length; i < len; i++){
					var $target  = $(item.target[i]);
					if(item.order[i]){
						for(var j =0,len2 = item.order[i].length; j < len2 ; j++){
							$(item.order[i][j]).appendTo(item.target[i]);
						}
					}
				}
			}
			_lastSizeDetect = $('#size-detect').css('font-family');
		}
	}


	global.ElementManager = ElementManager;
})(CRHP);
