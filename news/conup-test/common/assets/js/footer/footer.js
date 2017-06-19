var CRHP = CRHP || {};

(function(namespace){

	var siteMapAvarage = function(){

		this.block              = $(".footer-block");
		this.blockLength        = this.block.length;
		this.sitemapWrap        = $(".footer-sitemap-wrap");
		this.blockHeightAverage = 0;

	}

	//カラム振り分け
	siteMapAvarage.prototype.makeCol = function(column){

		var footerWrap = $(".footer-sitemap-wrap");

		this.block.css("margin-bottom",0);

		footerWrap.append(this.block);

		var temp = this.seprateBlock(column);

		for(var i = 0; i < column; i += 1){
			this.sitemapWrap.append(this.frameCol);
			footerCol = $(".footer-col").eq(i);
			footerCol.append(temp[i]);
		}

		if(column === 4){
			this.block.prev().css("margin-bottom",48);
		}else if(column === 3){
			this.block.prev().css("margin-bottom",20);
		}

	}


	//一つのカラムの高さの平均
	siteMapAvarage.prototype.heightAve = function(column){

		this.blockHeightAve = Math.ceil(this.sitemapWrap.height() / column);
		return this.blockHeightAve;
	
	}


	//条件分岐に必要なobjectの作成
	siteMapAvarage.prototype._blockObj = function(){

		if(this.sitemapWrap.css("padding-top")){
			var siteWrapPadding = parseInt(this.sitemapWrap.css("padding-top").replace("px",""),10);
		}else{
			var siteWrapPadding = 0;
		}
		var blockArr = [];

		for(var i = 0; i < this.blockLength; i += 1){

			var obj       = {};
			var tempBlock = this.block.eq(i);
			var height    = tempBlock.height();
			var startPos  = tempBlock.position().top - siteWrapPadding;
			var endPos    = startPos + height;
			
			obj.dom       = tempBlock;
			obj.height    = height;
			obj.startPos  = startPos;
			obj.endPos    = endPos;

			blockArr.push(obj);

		}

		return blockArr;
	}



	siteMapAvarage.prototype.seprateBlock = function(num){

			var heightAve = this.heightAve(num);
			var blockArr  = this._blockObj();
			
			var block1 = [];
			var block2 = [];
			var block3 = [];
			var block4 = [];
			
			var blockWrap = [];


		for(var i = 0; i < this.blockLength; i += 1){

			if(heightAve > blockArr[i].startPos){
				block1.push(this.block[i]);
				
			}else if(heightAve*2 > blockArr[i].startPos){
				block2.push(this.block[i]);

			}else if(heightAve*3 > blockArr[i].startPos){
				block3.push(this.block[i]);

			}else if(heightAve*4 > blockArr[i].startPos){
				block4.push(this.block[i]);

			}

		}

		blockWrap = [block1,block2,block3,block4];

		return blockWrap;

	}

	siteMapAvarage.prototype.onResize = function(){

		var that = this;

	    var pcFlag;
	    var tabFlag;
	    var spFlag;

	    var resizeMain = function(){

		  if(that.isPC() && pcFlag != false){
	      	pcFlag = false;
	        //PCの処理

	        that.makeCol(4);

			tabFlag = true;
			spFlag  = true;
	        
	      }else if(that.isTAB() && tabFlag != false){
	      	tabFlag = false;
	      	//tabの処理

	      	that.makeCol(3);

	      	pcFlag = true;
			spFlag  = true;

	      }else if(that.isSP() && spFlag != false){
	      	spFlag = false;
	      	//spの処理

	      	pcFlag = true;
			tabFlag  = true;
	      }
	    }

	    $(window).on("load resize",resizeMain());
	    resizeMain();

	}


	//size判別
	  siteMapAvarage.prototype.isPC = function(){
	    return $(".footer-sizedetect").css("fontFamily").indexOf("PC") != -1;
	  }

	  siteMapAvarage.prototype.isTAB = function(){
	    return $(".footer-sizedetect").css("fontFamily").indexOf("TAB") != -1;
	  }

	  siteMapAvarage.prototype.isSP = function(){
	    return $(".footer-sizedetect").css("fontFamily").indexOf("SP") != -1;
	  }

	namespace.siteMapAvarage = siteMapAvarage;

})(CRHP);


$(function(){

  sitemap = new CRHP.siteMapAvarage();
  sitemap.onResize();

});