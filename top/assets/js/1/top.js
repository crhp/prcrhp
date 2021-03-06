var slick;
$(document).ready(function() {
  new CRHP.ElementManager([{
    breakpoint: "sp",
    target: [".top-column-right", ".top-column-left", ".top-contact-columns"],
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
      ],
      [
        "#top-date-container",
        "#top-contact-container",
        "#top-ownership-container",
        "#top-emergency-container"
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
        "#top-servicemenu-container",
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
        "#top-servicemenu-container",
      ],
      [
        "#top-date-container",
        "#top-contact-container",
        "#top-ownership-container",
        "#top-emergency-container"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "pc-min",
    target: [".top-column-right", "#top-shop-information-container", ".top-contact-columns", ".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container",
      ],
      [
        "#top-map-container",
        "#top-callendar-container",
        "#top-date-container",
        "#top-contact-columns"
      ],
      [
        "#top-contact-container",
        "#top-ownership-container",
        "#top-emergency-container"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "pc-middle",
    target: [".top-column-right", "#top-shop-information-container", ".top-contact-columns", ".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container",
      ],
      [
        "#top-map-container",
        "#top-callendar-container",
        "#top-date-container",
        "#top-contact-columns"
      ],
      [
        "#top-contact-container",
        "#top-ownership-container",
        "#top-emergency-container"
      ],
      [
        "#top-shop-information-container",
        "#top-car-container",
        "#top-related-container"
      ]
    ]
  }, {
    breakpoint: "pc-large",
    target: [".top-column-left-inner", "#top-contact-columns", ".top-column-right"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-blog-container",
        "#top-servicemenu-container",
        "#top-car-container",
        "#top-related-container"
      ],
      [
        "#top-date-container",
        "#top-contact-container",
        "#top-ownership-container",
        "#top-emergency-container"
      ],
      [
        "#top-shop-information-container"
      ]
    ]
  }]);
  //  #top-map-container
  // #top-callendar-container
  // #top-date-container
  // #top-contact-container
  // #top-service-container
  // #top-news-container
  // "#top-blog-container",
  // #top-servicemenu-container
  // #top-car-container
  // #top-related-container
  slick = $('#top-slide-list').slick({
    autoplay: true,
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
  $("header").bind("openHumMenu", function() {
    console.log("top.js: openMenu");
    $('#top-slide-list').slick('slickPause');
  });
  $("header").bind("closeHumMenu", function() {
    console.log("top.js: closeMenu");
    $('#top-slide-list').slick('slickPlay');
  });

  var boxHeightAlign = new crhp.BoxHeightAlign($("#top-service-list"), {
    isAll: false
  });
  var boxHeightAlign2 = new crhp.BoxHeightAlign($(".top-news-container"), {
    isAll: false
  });

  var boxHeightAlign3 = new crhp.BoxHeightAlign($(".top-contact-columns"), {
    isAll: false
  });


  var _terms = $("[data-term]");
  for (var i = 0; i < _terms.length; i++) {
    var _json = $(_terms[i]).data("term");
    if (_json && _json.length > 1) {
      if (parseInt(_json["day"][0], 10) == _date.getDay()) {
        $(_terms[i]).fadeTo(0, 0.5);
      }
      if (_json["color"].length == 7) {
        $(_terms[i]).find(".top-dial-icon").css("background-color", _json["color"]);
      }
    }
  }

  // BoxHeightAlign
  boxHeightAlign.init();
  boxHeightAlign2.init();
  boxHeightAlign3.init();


  $(window).resize(function(event) {
    boxHeightAlign.update();
    boxHeightAlign2.update();
    boxHeightAlign3.update();
  });

  CRHP.blogListLines = {
    "pc-large": { title: 2, content: 3 },
    "pc-middle": { title: 2, content: 3 },
    "pc-min": { title: 2, content: 3 },
    "tablet": { title: 1, content: 2 },
    "sp-large": { title: 1, content: 2 },
    "sp": { title: 2, content: 2 }
  };

  CRHP.facebookHeights = {
    "pc-large": 470,
    "pc-middle": 470,
    "pc-min": 470,
    "pc-twitter-empty-height": 307,
    "tablet": 500,
    "sp-large": 500,
    "sp": 250
  };

  CRHP.facebookWidth = {
    "pc-large": 500,
    "pc-middle": 500,
    "pc-min": 500,
    "pc-twitter-empty-width": 304,
    "tablet": 500,
    "sp-large": 500,
    "sp": 500
  };

  CRHP.twitterWidth = {
    "pc-large": 500,
    "pc-middle": 500,
    "pc-min": 500,
    "pc-facebook-empty-width": 304,
    "tablet": 500,
    "sp-large": 500,
    "sp": 500
  };

  CRHP.twitterHeight = {
    "pc-large": 470,
    "pc-middle": 470,
    "pc-min": 470,
    "pc-facebook-empty-Height": 307,
    "tablet": 500,
    "sp-large": 500,
    "sp": 250
  };


  // top-date-container
  // boxHeightAlignバッティング回避
  _dateWrap_height_control();


  $(window).on("resize", function() {
    _dateWrap_height_control();
  });

  function _dateWrap_height_control() {
    var sizeDetect = $('#size-detect').css('font-family');
    var control_target = $("#top-date-container .top-date-list .top-date-item");

    var maxHeight = 0;

    $("#top-date-container .top-date-item").each(function() {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).height();
      }
    });

    if (sizeDetect === "tablet") {
      control_target.css({ "height": maxHeight });
    }else{
      control_target.css({ "height": "auto" });
    }
  }


});
