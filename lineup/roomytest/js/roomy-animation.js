var ROOMY = ROOMY || {};

(function(namespace){

	var roomyAnimation = function(){

////////////////////////////////////////////////////////////////

		this.reArr       = [];
		var reTitle      = $(".request-title-anim");
		var offsetOption = 214;

		for(var j = 0; j < reTitle.length; j += 1){
			var obj    = {};
			obj.dom    = reTitle.eq(j);
			obj.offset = reTitle.eq(j).offset().top + offsetOption;
			obj.done   = false;

			this.reArr.push(obj);
		}

///////////////////////////////////////////////////////////////

		this.iconArr = [];
		var iconGather = $(".request-icon-anim");
		var offsetOption = 100;

		for(var k = 0; k < iconGather.length; k += 1){
			var obj = {};
			obj.dom = iconGather.eq(k);
			obj.offset = iconGather.eq(k).offset().top + offsetOption;
			obj.done = false;

			this.iconArr.push(obj);

			var icon = obj.dom.find(".icon-anim");

			TweenMax.set(icon,{
				top : -30,
				opacity : 0,
				left : 30
			});
		}

///////////////////////////////////////////////////////////////////

		this.opaArr = [];
		var div = $(".request-fade-contents");
		for(var s = 0; s < div.length; s += 1){
			var obj = {};
			obj.dom = div.eq(s);
			obj.done = false;

			this.opaArr.push(obj);
		}

	}

	roomyAnimation.prototype.init = function(){
		// this.titleCssSet();
		this.reTitleCssSet();
		this.iconCssSet();
		this.divCssSet();
		this.onScroll();
	}

	// roomyAnimation.prototype.titleCssSet = function(){
	// 	var title        = $(".title-anim");
	// 	var img = title.find("img");

	// 	TweenMax.set(img,{
	// 		scale : 0,
	// 		opacity : 0
	// 	});
	// }

	roomyAnimation.prototype.reTitleCssSet = function(){
		var title        = $(".request-title-anim");
		var img = title.find("span").find("img");

		var one = 263;
		var two = 294;
		var four = 380;

		var widthArr = [
			four,
			one,
			two,
			two,
			two,
			four,
			two
		]

		TweenMax.set(img,{
			opacity : 0,
			rotationY : 0
		});

		for(var i = 0; i < title.length; i += 1){

			var d = widthArr[i];

			TweenMax.set(title.eq(i),{
				width : d
			});
		}

	}

	roomyAnimation.prototype.iconCssSet = function(){
		

	}

	roomyAnimation.prototype.divCssSet = function(){
		var div = $(".request-fade-contents");

		TweenMax.set(div,{

			opacity : 0

		});

	}

	roomyAnimation.prototype.onScroll = function(){

		var that = this;

		$(window).on("scroll",function(){
			var $this  = $(this);
			var scroll = $this.scrollTop() + $this.height(); 

			that.reTitleAnimationLoop(scroll);
		});
	}

	roomyAnimation.prototype.reTitleAnimationLoop = function(scrollValue){

		var that = this;
		var arr = this.reArr;
		var iconArr = this.iconArr;
		var opaArr = this.opaArr;
		var obj;
		var objIcon;
		var objOpa

		for(var i = 0; i < arr.length; i += 1){
			obj = arr[i];
			objIcon = iconArr[i];
			objOpa = opaArr[i];
			if(obj.done === false && (scrollValue > obj.offset)){
				that.reTitleAnimation(obj.dom);
				that.opaAnimation(objOpa.dom);
				obj.done = true;
				objOpa.done = true;

				if(i == arr.length - 1){
					return false;
				}


				that.iconAnimation(objIcon.dom);
				objIcon.done = true;
			}
		}
	}

	roomyAnimation.prototype.reTitleAnimation = function(titleDom){

		var dom = titleDom;
		var img = dom.find("span").find("img");

		TweenMax.to(dom,0.7,{

			width : 924,
			ease : Power1.easeInOut

		});

		TweenMax.staggerTo(img , 0.4 ,{
			opacity:1,
			rotationY : 360,
			delay : 0.6,
			ease : Power1.easeOut
		},0.04);



	}


	roomyAnimation.prototype.iconAnimation = function(titleDom){

		var dom = titleDom;
		var icon = dom.find(".icon-anim");

		TweenMax.to(icon , 0.5 ,{
			top  :0,
			ease : Bounce.easeOut,
			delay : 1.7,
			onStart : function(){
				icon.fadeTo(1,1);
				TweenMax.to(icon,0.75,{

					left : 0,
					ease : Power1.easeOut

				});
			}
		});

	}

	roomyAnimation.prototype.opaAnimation = function(titleDom){

		var dom = titleDom

		TweenMax.to(dom , 1 ,{
			opacity:1,
			delay : 1.8
		});

	}

	namespace.roomyAnimation = roomyAnimation;

})(ROOMY);

$(function(){


	$(window).load(function(){
		  var roomy = new ROOMY.roomyAnimation();
		  roomy.init();
	});

});