var CRHP = CRHP || {};

(function(namespace){

	function CommonHeader(){
		this.firstNav = $(".first-nav-list");
		this.subNav   = $(".sub-nav");
		this.humMenu  = $(".hum-menu");


	}

	CommonHeader.prototype.init = function(){

	this.ua = (function(u) {
      return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
      }
    })(window.navigator.userAgent.toLowerCase());

		
		this.toggleHumMenu();
		this.resizeFun();

		if(this.ua.Tablet){
			//tabletの記述
			this.tablet();
		}


	}

	CommonHeader.prototype.tablet = function(){

	}

	CommonHeader.prototype.show = function(navi){
		navi.show();
	}

	CommonHeader.prototype.hide = function(navi){
		navi.hide();
	}

	CommonHeader.prototype.onClickFirstNav = function(device){

		var that = this;
		var active = "active-first-nav";

		// console.log(device)


		if(device === true){

			this.firstNav.on("mouseover",function(){

				var $this  = $(this);
				var subNav = $this.find(that.subNav);
				
				that.hide(that.subNav);

				that.show(subNav);
				that.firstNav.removeClass(active);
				$this.addClass(active);

			});

			this.firstNav.on("touchstart",function(){

				var $this  = $(this);
				var subNav = $this.find(that.subNav);
				
				
				if(that.firstNav.hasClass(active)){
					that.hide(that.subNav);
					that.firstNav.removeClass(active);
				}else{
					that.hide(that.subNav);

					that.show(subNav);
					that.firstNav.removeClass(active);
					$this.addClass(active);
				}

			});




			$("header").on("mouseleave",function(){
					that.hide(that.subNav);
					that.firstNav.removeClass(active);
			});

			$(document).on("mouseout click touchstart", function(where) {

	  		if (!$(where.target).closest(that.firstNav).length) {
					that.hide(that.subNav);
					that.firstNav.removeClass(active);
				}
			});

		}else if(device === false){
			this.firstNav.on("click",function(){

			var $this  = $(this);
			var subNav = $this.find(that.subNav);
			var active = "active-first-nav";

			that.hide(that.subNav);

			if($this.hasClass(active)){
				that.hide(subNav);
				$this.removeClass(active);
			}else{
				that.show(subNav);
				that.firstNav.removeClass(active);
				$this.addClass(active);
			}

		});
		}

	}

	CommonHeader.prototype.toggleHumMenu = function(){

		var that = this;
		var position;

		this.humMenu.on("click",function(){

			var $this     = $(this);
			var gnavOuter = $(".gnav-outer");
			var active    = "active-gnav-outer";

			if($this.hasClass(active)){
				$("header").trigger("closeHumMenu");
				that.hide(gnavOuter);
				$this.removeClass(active);
				that.removeStatus();
				that._stayPosition(position);
			}else{
				$("header").trigger("openHumMenu");
				position = that._clickPosition();
				that.show(gnavOuter);
				$this.addClass(active);
				that.addStatus();
				that._stayPosition(0);
				
			}

		});

	}

	CommonHeader.prototype.addStatus = function(){

		var header   = $("header");
		var container = $("#container");

		header.css("position","absolute");
		container.css({
			position : "fixed",
			visibility : "hidden"
		});
	}

	CommonHeader.prototype.removeStatus = function(){

		var header   = $("header");
		var container = $("#container");

		header.css("position","");
		container.css({
			position : "",
			visibility : ""
		});
	}

	CommonHeader.prototype._clickPosition = function(){

			var $window = $(window);
			var scroll  = $window.scrollTop();

			return scroll;
	}

	CommonHeader.prototype._stayPosition = function(position){

			$("body,html").scrollTop(position);
	}

	CommonHeader.prototype.resizeFun = function(){

	    var windowFlag;
	    var that = this;

	    var pcFlag;
	    var pc2Flag;
	    var tabFlag;
	    var spFlag;

			function changeMenu(){
				if(isPC() && pcFlag != false){
				pcFlag = false;
				//PCの処理
				that.show($(".gnav-outer"));
				that.removeStatus();
				that.hide($(".sub-nav"));
				that.humMenu.removeClass("active-gnav-outer");
				that.firstNav.removeClass("active-first-nav");
				that.firstNav.off();
				that.onClickFirstNav(true);

				pc2Flag = true;
				tabFlag = true;
				spFlag  = true;

				}

				if(isPC2() && pc2Flag != false){
				pc2Flag = false;

				that.show($(".gnav-outer"));
				that.removeStatus();
				that.hide($(".sub-nav"));
				that.humMenu.removeClass("active-gnav-outer");
				that.firstNav.removeClass("active-first-nav");
				that.firstNav.off();
				that.onClickFirstNav(true);

				pcFlag  = true;
				tabFlag = true;
				spFlag  = true;

				}

				if(isTAB() && tabFlag != false){
				tabFlag = false;

				that.hide($(".gnav-outer"));
				that.removeStatus();
				that.hide($(".sub-nav"));
				that.humMenu.removeClass("active-gnav-outer");
				that.firstNav.removeClass("active-first-nav");
				that.firstNav.off();
				that.onClickFirstNav(false);

				pcFlag  = true;
				pc2Flag = true;
				spFlag  = true;

				}

				if(isSP() && spFlag != false){
				spFlag = false;

				that.hide($(".gnav-outer"));
				that.removeStatus();
				that.hide($(".sub-nav"));
				that.humMenu.removeClass("active-gnav-outer");
				that.firstNav.removeClass("active-first-nav");
				that.firstNav.off();
				that.onClickFirstNav(false);

				pcFlag  = true;
				pc2Flag = true;
				tabFlag = true;
				}
			}

	    $(window).on("resize",function(){
	    	changeMenu();
        });
        
        changeMenu();

  }

  function isPC(){
    return $(".header-sizedetect").css("fontFamily").indexOf("PC") != -1;
  }

  function isPC2(){
    return $(".header-sizedetect").css("fontFamily").indexOf("P2") != -1;
  }

  function isTAB(){
    return $(".header-sizedetect").css("fontFamily").indexOf("TAB") != -1;
  }

  function isSP(){
    return $(".header-sizedetect").css("fontFamily").indexOf("SP") != -1;
  }
	

	namespace.CommonHeader = CommonHeader;

})(CRHP);


$(function(){

 var header = new CRHP.CommonHeader();

 header.init();


});