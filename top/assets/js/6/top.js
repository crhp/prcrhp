var slick;
$(document).ready(function() {
  new CRHP.ElementManager([{
    breakpoint: "sp",
    target: [".top-column-right", ".top-column-left"],
    order: [
      [
        "#top-shop-information-container"
      ],
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "sp-large",
    target: [".top-column-right", ".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "tablet",
    target: [".top-column-right", ".top-contact-columns", ".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container"
      ],
      [
        "#top-contact-container",
        "top-date-container"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "pc-min",
    target: [".top-column-right", ".top-contact-columns","#top-calendar-contact",".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container"
      ],
      [
        "#top-contact-container",
        "top-date-container"
      ],
      [
        "#top-callendar-container",
        ".top-contact-columns"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "pc-large",
    target: [".top-column-right", ".top-contact-columns","#top-calendar-contact",".top-column-left"],
    order: [
     [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container"
      ],
      [
        "#top-contact-container",
        "top-date-container"
      ],
      [
        "#top-callendar-container",
        ".top-contact-columns"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }]);
  //  #top-map-container
  // #top-callendar-container
  // #top-date-container
  // #top-contact-container
  // #top-service-container
  // #top-news-container
  // #top-blog-container
  // #top-servicemenu-container
  // #top-car-container
  // #top-related-container
  slick = $('#top-slide-list').slick({
    autoplay:true,
    arrows: false,
    customPaging: function(slider, i) {
      var thumb = $(slider.$slides[i]).data('thumb');
      return '<a class="top-pager-item"></a>';
    },
    mobileFirst: true,
    swipe: true,
    dots: true,
    responsive: true
  });
    $("header").bind("openHumMenu", function(){
      console.log("top.js: openMenu");
      $('#top-slide-list').slick('slickPause');
    });
    $("header").bind("closeHumMenu", function(){
      console.log("top.js: closeMenu");
      $('#top-slide-list').slick('slickPlay');
    });


   var boxHeightAlign = new crhp.BoxHeightAlign($("#top-service-list"),{
    isAll:false
  });
   var boxHeightAlign2 = new crhp.BoxHeightAlign($(".top-news-container"),{
    isAll:false
  });

  var _terms = $("[data-term]");
  for(var i=0;i<_terms.length;i++){
    var _json = $(_terms[i]).data("term");
    if(_json && _json.length > 1){
      if(parseInt(_json["day"][0], 10) == _date.getDay()){
        $(_terms[i]).fadeTo(0, 0.5);
      }
      if(_json["color"].length == 7){
        $(_terms[i]).find(".top-dial-icon").css("background-color",_json["color"]);
      }
    }
  }
   boxHeightAlign.init();
   boxHeightAlign2.init();

    $(window).resize(function(event) {
       boxHeightAlign.update();
       boxHeightAlign2.update();
    });

  CRHP.blogListLines = {
    "pc-large": {title:2, content:2},
    "pc-min": {title:2, content:3},
    "tablet": {title:1, content:2},
    "sp-large": {title:1, content:2},
    "sp":   {title:2, content:2}
  };

  CRHP.facebookHeights = {
  "pc-large": 500,
  "pc-min": 500,
  "pc-twitter-empty-height": 390,
  "tablet": 500,
  "sp-large": 300,
  "sp":   300
  };

  CRHP.facebookWidth = {
  "pc-twitter-empty-width": 307,
  };

  CRHP.twitterWidth = {
  "pc-large": 500,
  "pc-min": 500,
  "pc-facebook-empty-width": 307,
  "tablet": 500,
  "sp-large": 500,
  "sp":   500
  };

  CRHP.twitterHeight = {
  "pc-large": 500,
  "pc-min": 500,
  "pc-facebook-empty-Height": 390,
  "tablet": 500,
  "sp-large": 300,
  "sp":   300
  };
});
