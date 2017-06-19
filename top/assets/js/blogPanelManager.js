var CRHP = CRHP || {};

(function(global){

	$(function(){
		$(".top-blog-list .blog-textoverflow-hidden").each(function(index,element){
			if(!$(element).data("orgtext")){
				$(element).attr("data-orgtext", $(element).text());
				setOverflowText($(this));
			}
		});

		$(".top-blog-list li .top-blog-item-image img").each(function(index,element){
			$(this).originSrc = $(this).src;
			$(this).src="";
			var _setImageStyle = function(_element){
				var _parent = _element.parent();
				_element.css({"width":0, "height":0});
				var _t_w = _parent.width();
				var _t_h = _parent.height();
				if(_element.context.naturalWidth / _element.context.naturalHeight < _t_w / _t_h){
					_element.css({"height":"100%","width":"auto"});
					_parent.css({"display":"block"});
				}else{
					_element.css({"height":"auto","width":"100%"});
					_parent.css({"display":"table-cell"});
				}
			}
			$(this).bind("load",function(){
				_setImageStyle($(this));
				clearInterval(_id);
			});
			var _img = $(this);
			var _id = setTimeout(function(){
				if(_img.width() > 50 && _img.height() > 50){
					_setImageStyle(_img);
				}
				clearInterval(_id);
			},300);
		});

		function setOverflowText(element){

			var _h = 0;
			var _h_cnt=0;
			var _lines = 1;
			var _fontfamily = $("#size-detect").css("fontFamily").replace(/\"/g, "");
			if($(element).hasClass("top-blog-item-title")){
				_lines=CRHP.blogListLines[_fontfamily].title;
			}
			if($(element).hasClass("top-blog-item-text")){
				_lines=CRHP.blogListLines[_fontfamily].content;
			}
			var _org = $(element).data("orgtext");
			var _text ="";
			$(element).text("");
			for(var i=0;i<_org.length;i++){
				_text = _org.substr(0,i+1); //"…";
				$(element).text(_text);
				if($(element).height() > _h){
					_h = $(element).height();
					_h_cnt++;
				}
				if(_h_cnt > _lines){
					_text = _text.substr(0,_text.length-3);
					$(element).text(_text);
					break;
				}
			}
			if(_text.length < _org.length){
				_text += "…";
				$(element).text(_text);
			}
			if($(element).hasClass("blog-text-padding-br")){
				for(var i=0;i<=_lines;i++){
					if(i > _h_cnt){
						$(element).append("<br>");
					}
				}
				if(_h_cnt < _lines){
					$(element).append("<br>");
				}
			}
		}
		
		function setImageWidthHeight(){
			$(".top-blog-list li .top-blog-item-image img").each(function(index,element){
				var _parent = $(this).parent();
				var _element = $(this);
				_element.css({"width":0, "height":0});
				var _t_w = _parent.width();
				var _t_h = _parent.height();
				if(_element.context.naturalWidth / _element.context.naturalHeight < _t_w / _t_h){
					$(this).css({"height":"100%","width":"auto"});
					_parent.css({"display":"block"});
				}else{
					$(this).css({"height":"auto","width":"100%"});
					_parent.css({"display":"table-cell"});
				}
			});
		}
		
		var _timer_id;
		$(window).resize(function(){
			clearTimeout(_timer_id);
			_timer_id = setTimeout(function(){
				$(".top-blog-list .blog-textoverflow-hidden").each(function(index,element){
					setOverflowText($(this));
				});
				setImageWidthHeight();
			},300);
		});
//		setOverflowText($(".top-blog-list .top-blog-item-title")[0]);
	});
	

})(CRHP);
