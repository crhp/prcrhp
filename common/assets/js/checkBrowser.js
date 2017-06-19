
(function (){


	    var userAgent = window.navigator.userAgent.toLowerCase();
	    var appVersion = window.navigator.appVersion.toLowerCase();
	 
	 	var _flag = true;
	    if (userAgent.indexOf('msie') != -1) {
	        if (appVersion.indexOf("msie 6.") != -1) {
	        	_flag = false;
	        }else if (appVersion.indexOf("msie 7.") != -1) {
	        	_flag = false;
	        }else if (appVersion.indexOf("msie 8.") != -1) {
	        	_flag = false;
	        }else if (appVersion.indexOf("msie 9.") != -1) {
	        	_flag = false;
	        }
	    }

		if(!_flag){
	    var _id = setInterval(function(){
		    if(document.body != null){
			    var _parent = document.body.parentNode;
				document.body.innerHTML = '<div style="text-align: center;font-size: 16px;line-height: 180%;"><div style="font-size: 20px;font-weight: bold;padding-bottom: 30px;padding-top: 100px;">お使いのブラウザが古いため、<br>ご覧になることができません。<br>お手数ですが、最新のブラウザで御覧ください。</div><div style="padding-bottom: 10px;">Microsoft Internet Explorer : 最新版（Windows）<br>Mozilla Firefox : 最新版（Windows/Macintosh/iOS/Android）<br>Google Chrome : 最新版（Windows/Macintosh/iOS/Android）<br>Safari : 最新版（Windows/Macintosh/iOS）<br></div><div style="font-size: 12px;line-height: 150%;padding-bottom: 30px;">＊ご利用のブラウザのバージョンが古い場合、一部のコンテンツで正しく表示されない場合があります。 <br>ご覧になる際には、ご利用のブラウザバージョンをご確認のうえ、<br>最新のものにアップデートしていただきますようお願いします。<br>＊各コンテンツの表示における体感速度は、ご利用の端末のスペックや通信環境に依存する場合がございます。<br>CPUやメモリのスペックが満足でなかった場合、<br>スムーズな操作ができない場合がありますことを予めご了承ください。<br></div><div style="font-size: 20px;padding-bottom: 10px;">推奨画面サイズ</div><div style="padding-bottom: 10px;">PC・タブレット端末 : 横幅768pixel～1280pixel<br>スマートフォン端末 : 横幅320pixel～767pixel<br></div><div style="font-size: 12px;line-height: 150%;">＊当サイトでは使用しているブラウザのサイズにあわせて<br>画面レイアウトが最適化されますので、<br>上記以外のサイズでも閲覧いただけます。<br></div></div>';
				clearInterval(_id);
			}
		},10);

		}

})();