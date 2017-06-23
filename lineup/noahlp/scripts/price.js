var tpl = tpl || {};

(function(){
	var priceLabel = $('body').hasClass('tpl-type-gp') ? "車両本体価格" : "メーカー希望小売価格";
	var price = {
		//通常
		"price-type-1":{
			"price-hybrid-si":getPriceHtml("3,269,160","3,027,000"),
			"price-hybrid-g":getPriceHtml("3,142,800","2,910,000"),
			"price-hybrid-x":getPriceHtml("3,014,280","2,791,000"),
			"price-si-2wd-7":getPriceHtml("2,775,600","2,570,000"),
			"price-si-4wd-7":getPriceHtml("2,970,000","2,750,000"),
			"price-si-2wd-8":getPriceHtml("2,745,360","2,542,000"),
			"price-si-4wd-8":getPriceHtml("2,939,760","2,722,000"),
			"price-g-2wd-7":getPriceHtml("2,786,400","2,580,000"),
			"price-g-4wd-7":getPriceHtml("2,991,600","2,770,000"),
			"price-g-2wd-8":getPriceHtml("2,756,160","2,552,000"),
			"price-g-4wd-8":getPriceHtml("2,961,360","2,742,000"),
			"price-x-2wd-7":getPriceHtml("2,496,960","2,312,000"),
			"price-x-4wd-7":getPriceHtml("2,702,160","2,502,000"),
			"price-x-2wd-8":getPriceHtml("2,466,720","2,284,000"),
			"price-x-4wd-8":getPriceHtml("2,671,920","2,474,000"),
			"price-x-2wd-welcab":getPriceWelcabHtml("2,671,000"),
			"price-x-4wd-welcab":getPriceWelcabHtml("2,861,000"),
		},
		//北海道
		"price-type-2":{
			"price-hybrid-si":getPriceHtml("0,000,000","0,000,000"),
			"price-hybrid-g":getPriceHtml("0,000,000","0,000,000"),
			"price-hybrid-x":getPriceHtml("0,000,000","0,000,000"),
			"price-si-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-si-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-si-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-si-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-g-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-g-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-g-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-g-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-x-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-welcab":getPriceWelcabHtml("0,000,000"),
			"price-x-4wd-welcab":getPriceWelcabHtml("0,000,000"),
		},
		//沖縄
		"price-type-3":{
			"price-hybrid-si":getPriceHtml("0,000,000","0,000,000"),
			"price-hybrid-g":getPriceHtml("0,000,000","0,000,000"),
			"price-hybrid-x":getPriceHtml("0,000,000","0,000,000"),
			"price-si-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-si-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-si-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-si-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-g-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-g-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-g-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-g-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-x-4wd-7":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-4wd-8":getPriceHtml("0,000,000","0,000,000"),
			"price-x-2wd-welcab":getPriceWelcabHtml("0,000,000"),
			"price-x-4wd-welcab":getPriceWelcabHtml("0,000,000"),
		},
	}
	
	function getPriceHtml(taxInclude,taxExclude){
		return '<p class="grade-price__retail">'+priceLabel+'</p><p class="grade-price__num">'+taxInclude+'<span class="grade-price__unit">円</span></p><p class="grade-price__tax-exculde-num">'+taxExclude+'円(消費税抜き)</p>';
	}
	function getPriceWelcabHtml(taxInclude){
		return '<p class="grade-price__retail">'+priceLabel+'</p><p class="grade-price__num">'+taxInclude+'<span class="grade-price__unit">円</span></p><p class="grade-price__tax-exculde-num">(消費税は非課税となります)</p>';
	}

	var priceType = $('body').data('price');
	var usePrice = price["price-type-"+priceType];

	for(var key in usePrice){
		$('#'+key).html(usePrice[key]);
	}
})();
