var CRHP = CRHP || {};
(function(global){

  var ResponsiveImage = {size:""};
  var detectId        = "#size-detect";
  var targetClass     = ".imageChange";

  ResponsiveImage.init = function(){
    if(!$(detectId).size()){
      $("body").append('<div id="'+detectId.replace("#","")+'" />');
    }
    update();
    onResize();
  }

  var onResize = function(){
    $(window).on("resize.responsive",update);
  }

  var update = function(){
    if(check() != ResponsiveImage.size){
      ResponsiveImage.size = check();
      change();
    }

  }

  var check = function(){
    return $(detectId).css("fontFamily").replace('',"");
  }

  var change = function(){
    $(targetClass).each(function(){
      if($(this).attr("data-"+ResponsiveImage.size)){
        var attr = $(this).attr("data-"+ResponsiveImage.size);
        $(this).attr("src",attr);
      }
    })
  };

  global.ResponsiveImage = ResponsiveImage;

})(CRHP);

$(function(){
  CRHP.ResponsiveImage.init();
});
