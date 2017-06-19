var crhp = crhp || {};

(function(global) {

    /* =========================================================
    
     BoxHeightAlign
     heightが決められないけれど横並びのときに美しく配置するための処理
     
    ========================================================= */
    var BoxHeightAlign = (function() {
        BoxHeightAlign.LAYOUT_CHANGE = "boxHeightLayoutChange";
        BoxHeightAlign.LAYOUT_INIT = "boxHeightLayoutInit";

        function BoxHeightAlign(dom,options) {
            var that = this;
            this.dom = dom;
            this.alignItems = this.dom.find(".boxheight-align-item");
            that._boxItems = [];
            this.dom.find(".boxheight-align-item").each(function(index, el) {
                that._boxItems.push(new BoxItem($(el),that));
            });
            this.prevAlignNum = undefined;
            var defaultOptions = {
                isAll:false
            }
            this.options = $.extend(defaultOptions, options);
        }

        BoxHeightAlign.prototype.init = function() {
            var that = this;
            this.update();
            this._checkImgLoad(this.update.bind(this));
        };

        BoxHeightAlign.prototype._checkImgLoad = function(callback){
            var that = this;
            var numImage = this.dom.find(".boxheight-align-item img").length;
            var count = 0;

            if(numImage == 0){
                $(that).trigger(BoxHeightAlign.LAYOUT_INIT);
            }

            this.dom.find(".boxheight-align-item img").each(function(index, el) {
                var src = $(el).attr("src");
                var image = new Image();
                image.onload = function(){
                    checkComplete();
                }
                image.onerror = function(){
                    checkComplete();
                }
                image.src = src;
            });

            function checkComplete(){
                count++;
                if(count == numImage){
                    $(that).trigger(BoxHeightAlign.LAYOUT_INIT);
                    callback();
                }
            }
        }

        BoxHeightAlign.prototype.update = function() {
            var alignNum = this._getAlignNum();
            if(this.prevAlignNum != alignNum){
                $(this).trigger(BoxHeightAlign.LAYOUT_CHANGE,[alignNum]);

                
            }
            this.prevAlignNum = alignNum;
            
            if(this.options.isAll){
                alignNum = this.alignItems.length;
            }
            var boxSet = [];
            for (var i = 0; i < this._boxItems.length; i++) {
                var boxIndex = Math.floor(i/(alignNum));
                if(!boxSet[boxIndex]){
                    boxSet[boxIndex] = [];
                }
                boxSet[boxIndex].push(this._boxItems[i]);
            }
            
            for (var i = 0; i < boxSet.length; i++) {
                this._alignHeight(boxSet[i]);
            };

        }

        BoxHeightAlign.prototype._getMaxHeight = function(heights){
            var maxHeights = [];
            for (var i = 0; i < heights.length; i++) {
                maxHeights[i] = 0;
            }
            
            for (var i = 0; i < heights.length; i++) {
                for (var j = 0; j < heights[i].length; j++) {
                    maxHeights[j] = heights[i][j] > maxHeights[j] ? heights[i][j] : maxHeights[j];
                }
            }
            return maxHeights;
        }      

        BoxHeightAlign.prototype._alignHeight = function(boxSet){
            var heights = [];
            for (var i = 0; i < boxSet.length; i++) {
                var boxItem = boxSet[i];
                boxItem.boxInit();
                heights.push(boxItem.elementsHeight);
            }
            var maxHeights = this._getMaxHeight(heights);

            for (var i = 0; i < boxSet.length; i++) {
                var boxItem = boxSet[i];
                boxItem.update(maxHeights);
                
            }
        }

         BoxHeightAlign.prototype._resetHeight = function(boxSet){
            var heights = [];
            for (var i = 0; i < boxSet.length; i++) {
                var boxItem = boxSet[i];
                boxItem.update(undefined);
            }
          
        }
        
        BoxHeightAlign.prototype._getAlignNum = function() {
            var count = 0;
            var prevElementPos = undefined;
            this.alignItems.each(function(index, el) {
                if(prevElementPos !== undefined){
                    if($(el).offset().top != prevElementPos){
                        return false;
                    }
                }
                count++;
                prevElementPos = $(el).offset().top;
            });
            return count;
        }

        global.BoxHeightAlign = BoxHeightAlign;
        return BoxHeightAlign;
    }());


    var BoxItem = (function() {

        function BoxItem(dom,delegate) {
            var that = this;
            this.dom = dom;
            this.elements = [];
            this.elementsHeight = [];
            this.dom.find(".boxheight-align-item-element").each(function(index, el) {
                that.elements.push($(el));
            });

            $(delegate).on(BoxHeightAlign.LAYOUT_CHANGE,function(e,numAlign){
                
                if(numAlign == 1){
                    that.isAlign = false;
                }else{
                    that.isAlign = true;
                }
            });


        }

        BoxItem.prototype.init = function() {
            var that = this;
        };
        BoxItem.prototype.boxInit = function() {
            this._boxInit();
        }
        BoxItem.prototype.update = function(maxHeights) {

            if(this.elements.length == 0){
                if(!this.isAlign){
                    this.dom.css('height','auto');    
                }else{
                    this.elementsHeight[0] = this.dom.height(maxHeights[0]);    
                }

                
                return;
            }

            for (var i = 0; i < this.elements.length; i++) {
                if(!this.isAlign){
                    this.elements[i].css('height','auto');
                }else{
                   this.elements[i].height(maxHeights[i]);    
                }
                
            }
        }
        BoxItem.prototype._boxInit = function(){
            this.elementsHeight = [];
            if(this.elements.length == 0){
                this.dom.css('height','auto');
                this.elementsHeight[0] = this.dom.height();
                return;
            }
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].css('height','auto');
                this.elementsHeight[i] = this.elements[i].height();
            }

        };

        
        global.BoxItem = BoxItem;

        return BoxItem;
    }());


    var boxAligns = [];

    BoxHeightAlign.init = function(options){
        var defaultOptions = {
            isAll:false
        }
        var initOption = $.extend(defaultOptions, options);
        
        if($('.boxheight-align-item-container').length == 0) return;

        $('.boxheight-align-item-container').each(function(index, el) {
            var boxalignItem = new BoxHeightAlign($(el),initOption);
            boxalignItem.init();
            boxAligns.push(boxalignItem);
        });
    }

    BoxHeightAlign.update = function(){
        if(boxAligns.length == 0) return;
        for (var i = 0; i < boxAligns.length; i++) {
            boxAligns[i].update();
        }
    }

}(crhp));
