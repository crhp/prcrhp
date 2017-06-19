(function(){
  var currentClassName = "currentItem";
  var oldClassName     = "oldItem";

  var ColorSlider = function($item){
    this.$item      = $item;
    this.index      = 0;
    this.oldIndex   = 0;
    this.isAnimate  = false;
    this.slides     = [];
    this.zIndexPlus = 10;
    this.maxSize    = 0;
    this.setSlide();
  };

  ColorSlider.prototype.setSlide  = setSlide;
  ColorSlider.prototype.nextSlide = nextSlide;
  ColorSlider.prototype.gotoSlide = gotoSlide;
  ColorSlider.prototype.getSlideIndex = getSlideIndex;
  ColorSlider.prototype.setList   = setList;
  ColorSlider.prototype.setLook   = setLook;
  ColorSlider.prototype.sortSlide   = sortSlide;

  function setSlide() {
    var size = this.maxSize = this.$item.size(),
      that = this;

    this.$item.each(function(i) {
      $(this).css({
        "z-index": size--
      }).attr("data-index", i);

      that.slides.push({
        index: i,
        zIndex: size,
        $el: $(this)
      });

    });
  }

  function nextSlide() {
    if (this.index < this.maxSize - 1) {
      this.gotoSlide(1);
    } else {
      this.gotoSlide(0);
    }
  }

  function gotoSlide(target) {
    if(this.$item.eq(this.index).is(':animated') || target == this.index) return false;
    this.slides   = this.sortSlide(this.getSlideIndex(target));
    this.oldIndex = this.index;
    this.index    = target;

    this.setList();
    this.setLook();

    return true;
  }

  function getSlideIndex(index) {
    for (var i = 0; i < this.slides.length; i++) {
      if (index == this.slides[i].index) return i
    }
  }

  function setList() {
    var zIndex = this.slides.length;
    for (var i = 0; i < this.slides.length; i++) {
      this.slides[i].zIndex = zIndex--;
    }
  }

  function setLook() {
    var depth = this.maxSize;
    var that  = this;

    for (var i = 0; i < this.slides.length; i++) {
      this.slides[i].$el.css("z-index", this.slides[i].zIndex + this.zIndexPlus);
    }

    this.$item.eq(this.slides[0].index).stop().animate({opacity:1},500,"easeOutQuint",function(){
      that.$item
      .removeClass(currentClassName)
      .removeClass(oldClassName)
      .eq(that.oldIndex)
      .css("opacity","0")
      .addClass(oldClassName);
    });

    this.$item.eq(this.slides[0].index)
      .removeClass(oldClassName)
      .addClass(currentClassName)
  }

  function sortSlide(index) {
    var arr = [];
    for (var i = 0; i < this.slides.length; i++) {
      arr.push(this.slides[index++]);
      if (index == this.slides.length) {
        index = 0;
      }
    }
    return arr;
  }

  window.ColorSlider = ColorSlider;

})()
