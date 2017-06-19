(function() {
	$(function(){

	var sizeDetect = $('#size-detect').css('font-family').replace(/"/g,'');
	var facebookUrl = $('.facebook-url').attr('data-sns-facebook-url');
	var twitterUrl = $('.twitter-url').attr('data-sns-twitter-url');
	var twitterContainer = $('.tweet-timeline-container');
	var facebookWrapper = $('.facebook-wrapper');
	var twitterResizeTimer = false;
	var facebookResizeTimer = false;


	//Twitter Publishの読み込み
	if (twitterUrl) {
		try{
			var twitterPcWidth = CRHP.twitterWidth[sizeDetect];
			var twitterPcheight = CRHP.twitterHeight[sizeDetect];

			//追加の定義
			var twitterPcMinWidth = CRHP.twitterWidth['pc-min-facebook-empty-width'];
			var twitterPcMinHeight = CRHP.twitterHeight['pc-min-facebook-empty-height'];

			if (!facebookUrl && (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1))
			{
				//facebookurlが入力されていない、PCのレイアウト

				var twitterPcWidth = CRHP.twitterWidth['pc-facebook-empty-width'];
				var twitterPcheight = CRHP.twitterHeight['pc-facebook-empty-Height'];

					if (twitterPcMinHeight && twitterPcMinWidth && sizeDetect.indexOf('pc-min') !== -1){

					//追加処理
					var twitterPcWidth = twitterPcMinWidth;
					var twitterPcheight = twitterPcMinHeight;
					}
			}

			var twitterPublishUrl = '<a class="twitter-timeline" href="' + twitterUrl + '" data-width="' + twitterPcWidth + '" data-height="' + twitterPcheight + '"></a>';

			twitterContainer.html(twitterPublishUrl);
		}catch(err){
			console.log(err);
		}finally{
			window.twttr.widgets.load();
		}
	}

    if (facebookUrl) {
		//facebookページプラグインの読み込み
		try{
			var facebookWidth = facebookWrapper.width();
			var facebookHeight = CRHP.facebookHeights[sizeDetect];

			if (!twitterUrl && (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1))
			{
				//Twitterurlが入力されていない、PCのレイアウト
				var facebookWidth = CRHP.facebookWidth['pc-twitter-empty-width'];
				var facebookHeight = CRHP.facebookHeights['pc-twitter-empty-height'];

				//追加の定義
				var facebookPcMinWidth = CRHP.facebookWidth['pc-min-twitter-empty-width'];
				var facebookPcMinHeight = CRHP.facebookHeights['pc-min-twitter-empty-height'];

				if (facebookPcMinWidth && facebookPcMinHeight && sizeDetect.indexOf('pc-min') !== -1) 
				{
					facebookWidth = facebookPcMinWidth;
					facebookHeight = facebookPcMinHeight;
				}
			}

			var fbPage = document.getElementsByClassName('fb-page');

			fbPage = fbPage[0];
			fbPage.setAttribute('data-width', facebookWidth);
			fbPage.setAttribute('data-height', facebookHeight);
			window.FB.XFBML.parse();

		}catch(err){
			console.log(err);
		}finally{
		}
	}

	//Twitter Publishの読み込み

	var twitterid;
	var twitter_load_flag = false;

		function twitterinitialize()
	{
		var _ret_tw = false;

			try{
				if (window.twttr)
				{

					var twitterPcWidth = CRHP.twitterWidth[sizeDetect];
					var twitterPcheight = CRHP.twitterHeight[sizeDetect];

					//追加の定義
					var twitterPcMinWidth = CRHP.twitterWidth['pc-min-facebook-empty-width'];
					var twitterPcMinHeight = CRHP.twitterHeight['pc-min-facebook-empty-height'];

					if (!facebookUrl && (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1))
					{
						//facebookurlが入力されていない、PCのレイアウト

						var twitterPcWidth = CRHP.twitterWidth['pc-facebook-empty-width'];
						var twitterPcheight = CRHP.twitterHeight['pc-facebook-empty-Height'];

						if (twitterPcMinHeight && twitterPcMinWidth && sizeDetect.indexOf('pc-min') != -1){

						//追加処理
						twitterPcWidth = twitterPcMinWidth;
						twitterPcheight = twitterPcMinHeight;
						}

					}

					console.log(sizeDetect);
					console.log(twitterPcWidth);
					var twitterPublishUrl = '<a class="twitter-timeline" href="' + twitterUrl + '" data-width="' + twitterPcWidth + '" data-height="' + twitterPcheight + '"></a>';

					twitterContainer.html(twitterPublishUrl);
					window.twttr.widgets.load();
					_ret_tw = true;
				}
			}catch(err){
				console.log(err);
			}finally{

			}

			return _ret_tw;
	}

	if (twitterUrl) {

		twitterid = setInterval(function() {
				if (!twitter_load_flag === true)
				{
					clearInterval(twitterid);
					twitter_load_flag = twitterinitialize();
				}
		}, 100);
	}

	//facebookページプラグインの読み込み

	var facebookid;
	var facebook_load_flag = false;

	function facebookinitialize()
	{
		var _ret = false;
		var fbRoot = $('#fb-root').find('iframe');

			try{
				if(!facebookUrl && (window.FB && window.FB.XFBML && window.FB.XFBML.parse && fbRoot.length > 0)){

					var facebookWidth = facebookWrapper.width();
					var facebookHeight = CRHP.facebookHeights[sizeDetect];

					if (!twitterUrl && (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1))
					{

					var facebookWidth = CRHP.facebookWidth['pc-twitter-empty-width'];
					var facebookHeight = CRHP.facebookHeights['pc-twitter-empty-height'];

						//追加の定義
						var facebookPcMinWidth = CRHP.facebookWidth['pc-min-twitter-empty-width'];
						var facebookPcMinHeight = CRHP.facebookHeights['pc-min-twitter-empty-height'];

						if (facebookPcMinWidth && facebookPcMinHeight && sizeDetect.indexOf('pc-min') !== -1) 
						{
							facebookWidth = facebookPcMinWidth;
							facebookHeight = facebookHeights;
						}
					}

			  var fbPage = document.getElementsByClassName('fb-page');

				fbPage = fbPage[0];
				fbPage.setAttribute('data-width', facebookWidth);
				fbPage.setAttribute('data-height', facebookHeight);
					window.FB.XFBML.parse();
					_ret= true;
				}
			}catch(err){
				console.log(err);
			}finally{

			}

			return _ret;
	}

	if (facebookUrl) {

			facebookid = setInterval(function() {
			if (!facebook_load_flag === true)
			{
				facebook_load_flag = true;
				clearInterval(facebookid);
				facebookinitialize();
			}
		}, 100);
	}

	//windowリサイズ時の処理

	function twitterResize() {
		var tweetTimelineContainer = $('.tweet-timeline-container');
		var sizeDetect = $('#size-detect').css('font-family').replace(/"/g,'');

		var tweetTimelineWidth = CRHP.twitterWidth[sizeDetect];
		var tweetTimelineHeight = CRHP.twitterHeight[sizeDetect];

		if (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1){

		if (!facebookUrl)
			{
				tweetTimelineWidth = CRHP.twitterWidth['pc-facebook-empty-width'];
				tweetTimelineHeight = CRHP.twitterHeight['pc-facebook-empty-Height'];

				//追加の定義
				var twitterPcMinWidth = CRHP.twitterWidth['pc-min-facebook-empty-width'];
				var twitterPcMinHeight = CRHP.twitterHeight['pc-min-facebook-empty-height'];

				if (twitterPcMinHeight && twitterPcMinWidth && sizeDetect.indexOf('pc-min') !== -1){

					//追加処理
					tweetTimelineWidth = twitterPcMinWidth;
					tweetTimelineHeight = twitterPcMinHeight;
				}
			}
		}
			tweetTimelineContainer.empty();
			var twitterPublishUrl = '<a class="twitter-timeline" href="' + twitterUrl + '" data-width="' + tweetTimelineWidth + '" data-height="' + tweetTimelineHeight + '"></a>';

		tweetTimelineContainer.html(twitterPublishUrl);
		window.twttr.widgets.load();
	}

function pagePluginCodeResize() {

	var sizeDetect = $('#size-detect').css('font-family').replace(/"/g,'');

	var resizeFacebookWidth = $('.facebook-wrapper').width();
	var resizeFacebookHeight = CRHP.facebookHeights[sizeDetect];

	if (!twitterUrl && (sizeDetect.indexOf('pc-min') !== -1 || sizeDetect.indexOf('pc-large') !== -1 || sizeDetect.indexOf('pc-middle') !== -1))
	{
		var resizeFacebookWidth = CRHP.facebookWidth['pc-twitter-empty-width'];
		var resizeFacebookHeight = CRHP.facebookHeights['pc-twitter-empty-height'];

		//追加の定義
		var facebookPcMinWidth = CRHP.facebookWidth['pc-min-twitter-empty-width'];
		var facebookPcMinHeight = CRHP.facebookHeights['pc-min-twitter-empty-height'];

		if (facebookPcMinWidth && facebookPcMinHeight && sizeDetect.indexOf('pc-min') !== -1) 
		{
			resizeFacebookWidth = facebookPcMinWidth;
			resizeFacebookHeight = facebookPcMinHeight;
		}
	}

	var facebookTag = '<div class="fb-page" data-href="'
	+ facebookUrl + '" data-tabs="timeline" data-width="'
	+ resizeFacebookWidth + '" data-height="'
	+ resizeFacebookHeight + '" '
	+ 'data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" '
	+ 'data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="'
	+ facebookUrl + '"><a href="' + facebookUrl + '"></a></blockquote></div></div>';

	facebookWrapper.empty();
	facebookWrapper.html(facebookTag);
	window.FB.XFBML.parse();

}

	var lastSizeDetect = ' ';
	var lastfacebookWidth = 0;

	$(window).on('resize', function() {
	var sizeDetect = $('#size-detect').css('font-family').replace(/"/g,'');

		if (twitterUrl)
		{
			if (twitterResizeTimer !== false)
			{
				clearTimeout(twitterResizeTimer);
			}

      twitterResizeTimer = setTimeout(function() {

	      	if (sizeDetect.indexOf(lastSizeDetect) < 0)
	      	{
		      	lastSizeDetect = sizeDetect;
		        twitterResize();
	      	}
      }, 200);
    }

    if (facebookUrl) {
	    if (facebookResizeTimer !== false)
	    {
	      clearTimeout(facebookResizeTimer);
	    }

	    facebookResizeTimer = setTimeout(function () {

	    	var facebookWidth = $('.facebook-wrapper').width();

	    	if (facebookWidth !== lastfacebookWidth)
	    	{
	    		lastfacebookWidth = facebookWidth;
		    	pagePluginCodeResize();
	    	}
	    }, 200);
	}

	});

	});

}());