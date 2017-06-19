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
        "#top-servicemenu-container",
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
    target: [".top-column-right", ".top-contact-columns",".top-column-left"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-servicemenu-container",
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
    breakpoint: "pc-large",
    target: [".top-column-left-inner", "#top-contact-columns", ".top-column-right"],
    order: [
      [
        "#top-service-container",
        "#top-news-container",
        "#top-servicemenu-container",
        "#top-car-container",
        "#top-related-container"
      ],
      [
        "#top-date-container",
        "#top-contact-container"
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

    $(".top-calendar-nav-next").addClass("show");
    $(".top-calendar-top").addClass("show");

		var _dt = new Date();
		var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
		_dt.setDate(1);
		_dt.setMonth(_dt.getMonth()+1);
		var _next = _dt.getFullYear()*100 + _dt.getMonth()+1;
		$(".top-calendar-list li").each(function(){
			if(parseInt($(this).data("date"),10) == _now){
				$(this).addClass("show");
				$(this).removeClass("hide");
				$(this).addClass("show-all");
			}else if(parseInt($(this).data("date"),10) == _next){
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("show-all");
			}else{
				$(this).addClass("hide");
				$(this).removeClass("show");
				$(this).addClass("hide-all");
			}
		});
    $(".top-calendar-nav-prev").click(function(){
      $(this).removeClass("show");
      $(".top-calendar-nav-next").addClass("show");

		var _dt = new Date();
		$(".top-calendar-list li").each(function(){
			var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
			if(parseInt($(this).data("date"),10) == _now){
				$(this).addClass("show");
				$(this).removeClass("hide");
			}else{
				$(this).addClass("hide");
				$(this).removeClass("show");
			}
		});

      return false;
    });

    $(".top-calendar-nav-next").click(function(){
      $(this).removeClass("show");
      $(".top-calendar-nav-prev").addClass("show");

		var _dt = new Date();
		_dt.setDate(1);
		_dt.setMonth(_dt.getMonth()+1);
		$(".top-calendar-list li").each(function(){
			var _now = _dt.getFullYear()*100 + _dt.getMonth()+1;
			if(parseInt($(this).data("date"),10) == _now){
				$(this).addClass("show");
				$(this).removeClass("hide");
			}else{
				$(this).addClass("hide");
				$(this).removeClass("show");
			}
		});

      return false;
    });

   var boxHeightAlign = new crhp.BoxHeightAlign($("#top-service-list"),{
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


    $(window).resize(function(event) {
       boxHeightAlign.update();
    });


});
