(function(global){
  "use strict;"

// Class ------------------------------------------------
function Slideshow(option){

  var defaultOption = {
    auto        : true,
    resize      : true,
    activeClass : "active",
    el          : "#slideshow .slide-inner-wrap",
    elInner     : ".slide-inner",
    elItem      : ".slide-item",
    paging      : ".pager",
    pagingItem  : "li",
    arrowPrev   : ".prev",
    arrowNext   : ".next",
    speed       : 600,
    interval    : 4500
  };

  if (!$.support.transition){ $.fn.transition = $.fn.animate; }

  this.option      = $.extend(defaultOption,option);
  this.animateFlg  = false;

  this.$slideshow  = $(this.option.el);
  this.$slideInner = this.$slideshow.find(this.option.elInner);
  this.$slideItems = this.$slideshow.find(this.option.elItem);

  this.$paging     = $(this.option.paging);

  this.slideLength = this.$slideItems.size();
  this.count       = 0;

  this.pagingSetting();
  this.cloneSlides();

  this.$slideItems = this.$slideshow.find(this.option.elItem);

  this.loadImg();
  this.slideSetting();
  this.addEventListeners();
  this.autoCycle();


}

// Header -----------------------------------------------

Slideshow.prototype = {

  activePaging      : activePaging,
  autoCycle         : autoCycle,
  addEventListeners : addEventListeners,
  cloneSlides       : cloneSlides,
  loadImg           : loadImg,
  pagingSetting     : pagingSetting,
  prepareDom        : prepareDom,
  slideSetting      : slideSetting,
  slideMove         : slideMove,
  slideImg          : slideImg,
  stopCycle         : stopCycle,
  update            : update

};


// Implementation ---------------------------------------

function activePaging(){

  this.$pagingItem.removeClass(this.option.activeClass);

  if(this.count === this.slideLength){
    this.$pagingItem.eq(0).addClass(this.option.activeClass)
  } else {
    this.$pagingItem.eq(this.count).addClass(this.option.activeClass)
  }

}

function autoCycle(){

  var that = this;

  clearTimeout(this.autoTimer);

  if(this.option.auto){
    this.autoTimer = setInterval(function(){

      that.slideImg(1);

    },this.option.interval);
  }

}

var addEventListenersId;
function addEventListeners(){

  var that = this;

	if(this.option.resize){
		$(window).bind("resize",function(){
			clearInterval(that.autoTimer);
			if($("#header .gnav-outer").css("display").indexOf("none") < 0){
				clearInterval(addEventListenersId);
				addEventListenersId = setInterval(function(){
					if($("#header .gnav-outer").css("display").indexOf("none") >= 0){
						clearInterval(addEventListenersId);
						that.slideSetting();
						that.autoCycle();
					}
				},300);
			}else{
				that.slideSetting();
				that.autoCycle();
			}
		});
	}

  $(this.option.arrowPrev).bind("click",function(){
    if(!that.animateFlg){
      clearInterval(that.autoTimer);
      that.slideImg(-1);
      that.autoCycle();
    }
  });

  $(this.option.arrowNext).bind("click",function(){
    if(!that.animateFlg){
      clearInterval(that.autoTimer);
      that.slideImg(1);
      that.autoCycle();
    }
  });

  this.$slideItems.eq(0).bind("slide-end",function(){

    if(that.count  === that.slideLength) {
      that.count = 0;
      that.slideMove(false);
    }

    if(that.count === -1){
      that.count = that.slideLength-1;
      that.slideMove(false);
    }

  });

  this.$pagingItem.bind("click",function(){

    var $this = $(this);
    var index = that.$pagingItem.index(this);

    clearInterval(that.autoTimer);
    that.count = index;
    that.slideMove(true);
    that.activePaging();
    that.autoCycle();

  });

}

function cloneSlides(){

  var $slideFirst = this.$slideItems.eq(0);
  var $slideLast  = this.$slideItems.eq(this.$slideItems.length-1);

  this.$slideInner.append($slideFirst.clone(true));
  this.$slideInner.prepend($slideLast.clone(true));

}

function loadImg(){

  if(this.option.elItem.indexOf("img") == -1){
    this.$slideItems.find("img").each(function(){
      $("<img>").attr("src", $(this).attr("src"));
    });
  } else {
    this.$slideItems.each(function(){
      $("<img>").attr("src", $(this).attr("src"));
    });
  }

}

function pagingSetting(){

  for(var i=0; i < this.slideLength; i++){

    this.$paging.append("<"+this.option.pagingItem+">");

  }

  this.$pagingItem = this.$paging.find(this.option.pagingItem);
  this.$pagingItem.eq(0).addClass(this.option.activeClass);

}

function prepareDom(){
  this.$slideshow  = $(this.option.el);
  this.$slideInner = this.$slideshow.find(this.option.elInner);
  this.$slideItems = this.$slideshow.find(this.option.elItem);

  this.$paging     = $(this.option.paging);
  this.$pagingItem = this.$paging.find(this.option.pagingItem);
}


function slideImg(i){

  if(i > 0){

    this.count += 1;
    this.slideMove(true);

  } else {


    this.count -= 1;
    this.slideMove(true);

  }

  this.activePaging();

}

function slideMove(animate){

  var that = this;
  var func = "";

  if(animate){
    this.animateFlg = true;
  }

  this.$slideItems.each(function(i){

    var $this = $(this);

    if(animate){

      $this.stop().transition({
        left: i*that.imgSize + (-that.count * that.imgSize) - that.imgSize
      },that.option.speed,function(){
        that.animateFlg = false;

        if(that.$slideItems.index(this) === 0){
          that.$slideItems.eq(0).trigger("slide-end");
        }

      });

    } else {
      $this.stop().css({
        left: i*that.imgSize + (-that.count * that.imgSize) - that.imgSize
      });

    }

  });

  setTimeout(function(){
    that.update();
  },this.option.speed);

}

function slideSetting() {
  var that = this;
  this.imgSize = $(this.option.el).width();

  this.$slideItems.width(this.imgSize);
  this.$slideItems.each(function(){
    var $this = $(this);
    $this.width(that.imgSize);
  });


  this.$slideInner.css({
    width : this.imgSize * this.slideLength
  });

  this.$slideshow.css({
    height : this.$slideItems.eq(0).height()
  });

  this.slideMove(false);

}

function stopCycle(){

  clearInterval(this.autoTimer);

}

function update(){

  if(this.callback != undefined){
    this.callback();
  }

}

global.Slideshow = Slideshow;

})(window);