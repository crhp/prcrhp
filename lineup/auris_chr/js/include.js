/******************************************************************************/
// include.js
// 処理：各コンバージョンボタン出力
// 注意：document.write内に「'」がある場合は、
//       「'」の前に「\」をつけてエスケープシーケンスで回避してください。
//       内容が何もないときはdocument.write内を空白にしてください。
//       例：document.write('');
// 価格については該当する箇所のコメントアウトを外してください。デフォルトは標準価格です。
/******************************************************************************/


//カスタマイズ COROLLA
function customize_corolla(){

document.write('メーカー希望小売価格 車両本体：2,905,200円＋メーカーオプション費用：259,200円＋販売店オプション費用：241,920円<sup class="whi">※3</sup> 合計金額：3,406,320円');

/* 沖縄
document.write('沖縄地区メーカー希望小売価格 車両本体：2,932,200円＋メーカーオプション費用：259,200円＋販売店オプション費用：241,920円<sup class="whi">※3</sup> 合計金額：3,433,320円');
*/

/* 北海道
document.write('北海道地区メーカー希望小売価格 車両本体：2,933,280円＋メーカーオプション費用：259,200円＋販売店オプション費用：241,920円<sup class="whi">※3</sup> 合計金額：3,434,400円');
*/

}


//カスタマイズ Sporty Style
function customize_sporty(){

document.write('メーカー希望小売価格 車両本体：2,905,200円＋メーカーオプション費用：259,200円＋販売店オプション費用：237,600円<sup class="whi">※3</sup> 合計金額：3,402,000円');

/* 沖縄
document.write('沖縄地区メーカー希望小売価格 車両本体：2,932,200円＋メーカーオプション費用：259,200円＋販売店オプション費用：237,600円<sup class="whi">※3</sup> 合計金額：3,429,000円');
*/

/* 北海道
document.write('北海道地区メーカー希望小売価格 車両本体：2,933,280円＋メーカーオプション費用：259,200円＋販売店オプション費用：237,600円<sup class="whi">※3</sup> 合計金額：3,430,080円');
*/

}

//価格G
function g_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,905,200円</dd><dd>2,690,000円（消費税抜き）</dd>');
/*
document.write('<dt>沖縄地区メーカー希望小売価格</dt><dd class="value">2,932,200円</dd><dd>2,715,000円（消費税抜き）</dd>');
*/
/*
document.write('<dt>北海道地区メーカー希望小売価格</dt><dd class="value">2,933,280円</dd><dd>2,716,000円（消費税抜き）</dd>');
*/
}

//価格G-T
function g_t_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,775,600円</dd><dd>2,570,000円（消費税抜き）</dd>');
/*
document.write('<dt>沖縄地区メーカー希望小売価格</dt><dd class="value">2,802,600円</dd><dd>2,595,000円（消費税抜き）</dd>');
*/
/*
document.write('<dt>北海道地区メーカー希望小売価格</dt><dd class="value">2,799,360円</dd><dd>2,592,000円（消費税抜き）</dd>');
*/
}

//価格S
function s_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,646,000円</dd><dd>2,450,000円（消費税抜き）</dd>');
/*
document.write('<dt>沖縄地区メーカー希望小売価格</dt><dd class="value">2,673,200円</dd><dd>2,475,000円（消費税抜き）</dd>');
*/
/*
document.write('<dt>北海道地区メーカー希望小売価格</dt><dd class="value">2,674,080円</dd><dd>2,476,000円（消費税抜き）</dd>');
*/
}

//価格S-T
function s_t_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,516,400円</dd><dd>2,330,000円（消費税抜き）</dd>');
/*
document.write('<dt>沖縄地区メーカー希望小売価格</dt><dd class="value">2,543,400円</dd><dd>2,355,000円（消費税抜き）</dd>');
*/
/*
document.write('<dt>北海道地区メーカー希望小売価格</dt><dd class="value">2,540,160円</dd><dd>2,352,000円（消費税抜き）</dd>');
*/
}


// メイン部分「今すぐお店で見てみよう」の表示
function main_store1(){
// pc表示
document.write('<p class="viewsite pc"><a href="#" target="_blank"><span>今すぐお店で<br>見てみよう！</span></a></p>');
// sp表示
document.write('<p class="viewsite sp"><a href="#" target="_blank"><span>今すぐお店で<br>見てみよう！</span></a></p>');
}


// インテリア部分「今すぐお店で見てみよう」の表示
function contents_store1(){
// pc表示
document.write('<p class="conv pc"><a href="#" target="_blank">今すぐお店で見てみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" target="_blank">今すぐお店で見てみよう！</a></p>');
}


// 走行性能部分「実際に走りを体験してみよう！」の表示
function contents_try1(){
// pc表示
document.write('<p class="conv pc"><a href="#" target="_blank">実際に走りを体験してみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" target="_blank">実際に走りを体験してみよう！</a></p>');
}


// スタイル部分「今すぐお店で実物を確かめよう！」の表示
function contents_store2(){
// pc表示
document.write('<p class="conv pc"><a href="#" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
}


// 購入プラン部分「詳しくはお店のスタッフに聞いてみよう！」の表示
function contents_negotiation1(){
// pc表示
document.write('<p class="conv pc"><a href="#" target="_blank">詳しくはお店のスタッフに聞いてみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" target="_blank">詳しくはお店のスタッフまで！</a></p>');
}


// フッターメニュー部分の表示
function endmenu(){


// メニューが4個以下の場合
/*
	// pc表示
	document.write('\
	<ul class="pc">\
	<li><a href="#" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="#" " target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="#" );" target="_blank"><span>カタログ請求</span></a></li>\
	<li><a href="#" ;" target="_blank"><span>オンライン<br>見積もり</span></a></li>\
	</ul>\
	');

	// sp表示
	document.write('\
	<ul class="sp mat50">\
	<li><a href="#" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="#" target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="#" target="_blank"><span>カタログ請求</span></a></li>\
	<li><a href="#" target="_blank"><span>オンライン<br>見積もり</span></a></li>\
	</ul>\
	');
*/


// メニューが5個の場合
	// pc表示
	document.write('\
	<div class="pc">\
	<ul>\
	<li><a href="#" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="#" target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="#" target="_blank"><span>カタログ請求</span></a></li>\
	</ul>\
	<ul>\
	<li><a href="#" target="_blank"><span>オンライン<br>見積もり</span></a></li>\
	<li><a href="#" target="_blank"><span>商談予約</span></a></li>\
	</ul>\
	</div>\
	');

	// sp表示
	document.write('\
	<div class="sp">\
	<ul>\
	<li><a href="#" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="#" target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="#" target="_blank"><span>カタログ請求</span></a></li>\
	</ul>\
	<ul>\
	<li><a href="#" target="_blank"><span>オンライン<br>見積もり</span></a></li>\
	<li><a href="#" target="_blank"><span>商談予約</span></a></li>\
	</ul>\
	</div>\
	');
}


// フッターメニュー部分の表示
function footermenu(){
	// pc表示
	document.write('\
	<ul class="pc">\
	<li><a href="#" target="_blank">試乗予約</a></li>\
	<li><a href="#" target="_blank">店舗一覧</a></li>\
	<li><a href="#" target="_blank">カタログ請求</a></li>\
	<li class="online"><a href="#" target="_blank">オンライン<br class="sp">見積もり</a></li>\
	<li><a href="#" target="_blank">商談予約</a></li>\
	</ul>\
	');

	// sp表示
	document.write('\
	<ul class="sp">\
	<li><a href="#" target="_blank">試乗予約</a></li>\
	<li><a href="#" target="_blank">店舗一覧</a></li>\
	<li><a href="#" target="_blank">カタログ請求</a></li>\
	<li class="online"><a href="#" target="_blank">オンライン<br class="sp">見積もり</a></li>\
	<li><a href="#" target="_blank">商談予約</a></li>\
	</ul>\
	');
}