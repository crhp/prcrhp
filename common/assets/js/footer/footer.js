var CRHP = CRHP || {};

(function(namespace) {

	var siteMapAvarage = function() {

		this.block = $(".footer-block");
		this.blockLength = this.block.length;
		this.blockHeightAve = 0;

	}

    //カラム振り分け
    siteMapAvarage.prototype.makeCol = function(column) {
    	$(".footer-block").hide();
    	$(".footer-col").empty();

    	var footerWrap = $(".footer-sitemap-wrap");

    	this.block.css("margin-bottom", 0);

    	footerWrap.append(this.block);

    	this.heightAve(column);

    	var _block_num = 0;
    	var _target_block_num = 0;
    	var _li_num = 0;
        var _append_mode = 0; // 0 - ul tag , 1- li tag
        var _blocks = $(".footer-sitemap-wrap .footer-block");
        var _li_list;
        var footerCol = $(".footer-col").eq(_target_block_num);
        var footerColUl;
        var _check_mode = true;
        var _check_count = 0;
        var _last_type;

        var _appendFooterBlock = function() {
        	var _element = _li_list[_li_num++];
            //console.log($(_element).prop("outerHTML"));
            //			footerColUl.append(_element);
            var _target_element = $($(_element).prop("outerHTML"));
            footerColUl.append(_target_element);
            _last_type = 1; // li tag
            _check_count++;
            if ($(_target_element).hasClass("footer-title")) {
                _last_type = 2; // ul tag
                if (_block_num > 0) {
                	if (column === 4) {
                		_target_element.css("margin-top", 48);
                	} else if (column === 3) {
                		_target_element.css("margin-top", 20);
                	}

                	if (_check_mode) {
                		if (_check_count <= 6) {

                			var prevFooterCol = $(".footer-col").eq(_target_block_num - 1);
                			var prevFooterColUl = prevFooterCol.find(".footer-block");
                			var _li_temp_list = $(footerColUl).find("li");
                			for (var i = 0; i < _li_temp_list.length - 1; i++) {
                				prevFooterColUl.append(_li_temp_list[i]);
                			}
                			$(_li_temp_list[_li_temp_list.length - 1]).css("margin-top", "");

                		}
                	}

                }
                _check_mode = false;

              }

            }

            var _loop_flag = true;
            _li_list = $(_blocks[0]).find("li");
            footerCol.append('<ul class="footer-block" ></ul>');
            footerColUl = footerCol.find(".footer-block");
            _check_mode = true;
            _check_count = 0;
            do {
            	_appendFooterBlock();
            //console.log("_block_num="+_block_num+" _li_num="+_li_num+" _h="+_h+" blockHeightAve="+this.blockHeightAve);
            var _h = $(footerCol).height();
            //console.log("_h="+_h+" "+this.blockHeightAve+" "+_target_block_num);
            if (_h > this.blockHeightAve && _target_block_num < column - 1) {
            	if (_last_type == 2) {
            		var _last_block_list = $(footerColUl).find("li");
            		var _last_block = _last_block_list[_last_block_list.length - 1];
                    //					$(_last_block).css("margin-top", "");
                  }
                  _target_block_num++;
                  var footerCol = $(".footer-col").eq(_target_block_num);
                  footerCol.append('<ul class="footer-block" ></ul>');
                  footerColUl = footerCol.find(".footer-block");
                  if (_last_type == 2) {
                  	$(footerColUl).append(_last_block);
                  }
                  _check_mode = true;
                  _check_count = 0;
                }

                if (_li_num > _li_list.length) {
                	_block_num++;
                	_li_list = $(_blocks[_block_num]).find("li");
                	_li_num = 0;
                	if (_block_num > _blocks.length) {
                		_loop_flag = false;
                	}
                }
              } while (_loop_flag);

              var footerCol = $(".footer-col").eq(0);
              var footerColUl = footerCol.find(".footer-block");
              var _li_temp_list = $(footerColUl).find("li");
              var _check_flag = false;
              var _title_count = 0;
              for (var i = 0; i < _li_temp_list.length; i++) {
              	if ($(_li_temp_list[i]).hasClass("footer-title")) {
              		_title_count++;
              	}
              }
              if (_title_count <= 1) {
              	_check_flag = true;
              }

              if (_check_flag && $(".footer-col").eq(0).height() < $(".footer-col").eq(1).height()) {
              	var _target0_ul = $(".footer-col").eq(0).find("ul");
              	var _target1_ul = $(".footer-col").eq(1).find("ul");
              	var _target0 = $(".footer-col").eq(0).find("li");
              	var _target1 = $(".footer-col").eq(1).find("li");
              	var _count = 0;
              	do {
              		if ($(_target1[_count]).hasClass("footer-title")) break;
              		_target0_ul.append(_target1[_count++]);
              	} while ($(".footer-col").eq(0).height() < $(".footer-col").eq(1).height());
              }

              for (var i = 0; i < column; i++) {
              	var footerCol = $(".footer-col").eq(i);
              	var footerColUl = footerCol.find(".footer-block");
              	var _li_temp_list = $(footerColUl).find("li");
              	if ($(_li_temp_list[0]).hasClass("footer-title")) {
              		$(_li_temp_list[0]).css("margin-top", "");
                //console.log("margin none");
              }
            }

          }


    //一つのカラムの高さの平均
    siteMapAvarage.prototype.heightAve = function(column) {

    	var _blocks = $(".footer-sitemap-wrap .footer-block");
    	var _total = 0;
    	for (var i = 0; i < _blocks.length; i++) {
    		var _h = $(_blocks[i]).height();
    		_total += _h;
    	}
    	var _mt = 48;
    	if (column === 4) {
    		_mt = 48;
    	} else if (column === 3) {
    		_mt = 20;
    	}
    	this.blockHeightAve = _total / column + _blocks.length * _mt / column;
        //console.log("blockHeightAve="+this.blockHeightAve +" "+_blocks.length);

        return this.blockHeightAve;
      }


      siteMapAvarage.prototype.onResize = function() {

      	var that = this;

      	var pcFlag;
      	var tabFlag;
      	var spFlag;

      	var resizeMain = function() {
      		if (that.isPC() && pcFlag != false) {
      			pcFlag = false;
                //PCの処理

                that.makeCol(4);

                tabFlag = true;
                spFlag = true;

              } else if (that.isTAB() && tabFlag != false) {
              	tabFlag = false;
                //tabの処理

                that.makeCol(3);

                pcFlag = true;
                spFlag = true;

              } else if (that.isSP() && spFlag != false) {
              	spFlag = false;
                //spの処理

                pcFlag = true;
                tabFlag = true;
              }
            }

            $(window).on("load resize", resizeMain);
            resizeMain();

          }


    //size判別
    siteMapAvarage.prototype.isPC = function() {
    	return $(".footer-sizedetect").css("fontFamily").indexOf("PC") != -1;
    }

    siteMapAvarage.prototype.isTAB = function() {
    	return $(".footer-sizedetect").css("fontFamily").indexOf("TAB") != -1;
    }

    siteMapAvarage.prototype.isSP = function() {
    	return $(".footer-sizedetect").css("fontFamily").indexOf("SP") != -1;
    }

    namespace.siteMapAvarage = siteMapAvarage;

  })(CRHP);


  $(function() {

  	sitemap = new CRHP.siteMapAvarage();
  	sitemap.onResize();

  	goTop();

  });





  $(window).on("load resize", function() {

    //採用情報追従時の調整
    var recruit_fixedNavHeight = $("#fixed-nav.bottom").height();
    console.log(recruit_fixedNavHeight)
    if (recruit_fixedNavHeight) {
    	$(".btn-pageTop").css({ "bottom": recruit_fixedNavHeight + 10 });
    }

    //店舗詳細SP追従時の調整
    var store_spNavHeight = $("#snav-fixed-sp").outerHeight();
    console.log(store_spNavHeight)

    if ($("#snav-fixed-sp").css("display") === "block") {
    	$(".btn-pageTop").css({ "bottom": store_spNavHeight + 10 });
    }

  });

  function goTop() {
    var btn_gotop = $('#btn-pageTop');

  	$(window).scroll(function() {
  		if ($(this).scrollTop() > 500) {
  			btn_gotop.addClass('show');
  		} else {
        btn_gotop.removeClass('show');
  		}
  	});


  	$('#btn-pageTop a').click(function() {
  		$('body,html').animate({
  			scrollTop: 0
  		}, 500);
  		return false;
  	});
  }
