jQuery(document).ready(function($) {
   /* =========================================================
  
   ga
   
  ========================================================= */
  var clickEvent = function() {

    function gaSend(eventName,label,url,target){
      var trackInfo = undefined;
      var agc = gaUtil.mode != "" ? gaUtil.mode+"_" : "";
      var adType = gaUtil.adType != "" ?  gaUtil.adType+"_" : "";
      for (var i = 0; i < gaUtil.trackingItem.length; i++) {
        trackInfo = gaUtil.trackingItem[i];
          ga(trackInfo.name+'.send', 'event',gaUtil.trackCategory,eventName,agc+adType+label,{
           'transport': 'beacon',
           'hitCallback': function(){
              if(target=="_blank") return;
              document.location = url;
            }
         });
      };       
    }


    $('.gaEvent').on('click', function(event) {
      var eventName = $(this).attr('data-gaevent').split(",")[0];
      var label = $(this).attr('data-gaevent').split(",")[1];
      var url = $(this).attr('href');
      var target = $(this).attr('target');
      gaSend(eventName,label,url,target);
    });
    
  };
  
  clickEvent();

});