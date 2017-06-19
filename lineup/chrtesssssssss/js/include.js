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

}

//カスタマイズ Sporty Style
function customize_sporty(){

document.write('メーカー希望小売価格 車両本体：2,905,200円＋メーカーオプション費用：259,200円＋販売店オプション費用：237,600円<sup class="whi">※3</sup> 合計金額：3,402,000円');

}

//価格G
function g_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,905,200円</dd><dd>2,690,000円（消費税抜き）</dd>');

}

//価格G-T
function g_t_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,775,600円</dd><dd>2,570,000円（消費税抜き）</dd>');

}

//価格S
function s_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,646,000円</dd><dd>2,450,000円（消費税抜き）</dd>');

}

//価格S-T
function s_t_price(){
document.write('<dt>メーカー希望小売価格</dt><dd class="value">2,516,400円</dd><dd>2,330,000円（消費税抜き）</dd>');

}
// メイン部分「今すぐお店で見てみよう」の表示
function main_store1(){
// pc表示
document.write('<p class="viewsite pc"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'mainarea_pc_main_store\');" target="_blank"><span>今すぐお店で<br>見てみよう！</span></a></p>');
// sp表示
document.write('<p class="viewsite sp"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'mainarea_sp_main_store\');" target="_blank"><span>今すぐお店で<br>見てみよう！</span></a></p>');
}


// インテリア部分「今すぐお店で見てみよう」の表示
function contents_store1(){
// pc表示
document.write('<p class="conv pc"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'interior_pc_contents_store\');" target="_blank">今すぐお店で見てみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'interior_sp_contents_store\');" target="_blank">今すぐお店で見てみよう！</a></p>');
}


// 走行性能部分「実際に走りを体験してみよう！」の表示
function contents_try1(){
// pc表示
document.write('<p class="conv pc"><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'performance_pc_contents_try\');" target="_blank">実際に走りを体験してみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'performance_sp_contents_try\');" target="_blank">実際に走りを体験してみよう！</a></p>');
}


// スタイル部分「今すぐお店で実物を確かめよう！」の表示
function contents_store2(){
// pc表示
document.write('<p class="conv pc"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'style_pc_contents_store\');" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'style_sp_contents_store\');" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
}


// 購入プラン部分「詳しくはお店のスタッフに聞いてみよう！」の表示
function contents_negotiation1(){
// pc表示
document.write('<p class="conv pc"><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'plan_pc_contents_negotiation\');" target="_blank">詳しくはお店のスタッフに聞いてみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'plan_sp_contents_negotiation\');" target="_blank">詳しくはお店のスタッフまで！</a></p>');
}


// フッターメニュー部分の表示
function endmenu(){

// メニューが4個以下の場合
	// pc表示
	document.write('\
	<ul class="pc">\
	<li><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_pc_contents_try\');" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_pc_contents_store\');" target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="https://form.corolla-dealer.jp/catalog/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_pc_contents_catalog\');" target="_blank"><span>カタログ請求</span></a></li>\
	<li><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_pc_contents_negotiation\');" target="_blank"><span>商談予約</span></a></li>\
	</ul>\
	');

	// sp表示
	document.write('\
	<ul class="sp mat50">\
	<li><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_sp_contents_try\');" target="_blank"><span>試乗予約</span></a></li>\
	<li><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_sp_contents_store\');" target="_blank"><span>店舗一覧</span></a></li>\
	<li><a href="https://form.corolla-dealer.jp/catalog/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_sp_contents_catalog\');" target="_blank"><span>カタログ請求</span></a></li>\
	<li><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'endmenu_sp_contents_negotiation\');" target="_blank"><span>商談予約</span></a></li>\
	</ul>\
	');
	
}


// フッターメニュー部分の表示
function footermenu(){
	// pc表示
	document.write('\
	<ul class="pc">\
	<li><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_pc_navi_try\');" target="_blank">試乗予約</a></li>\
	<li><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_pc_navi_store\');" target="_blank">店舗一覧</a></li>\
	<li><a href="https://form.corolla-dealer.jp/catalog/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_pc_navi_catalog\');" target="_blank">カタログ請求</a></li>\
	<li><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_pc_navi_negotiation\');" target="_blank">商談予約</a></li>\
	</ul>\
	');

	// sp表示
	document.write('\
	<ul class="sp">\
	<li><a href="http://toyota.jp/service/dealer/spt/trial-list-car?CN=C&OFFICE_CD=38102" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_sp_navi_try\');" target="_blank">試乗予約</a></li>\
	<li><a href="http://www.corolla-hakata.jp/store/index.html" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_sp_navi_store\');" target="_blank">店舗一覧</a></li>\
	<li><a href="https://form.corolla-dealer.jp/catalog/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_sp_navi_catalog\');" target="_blank">カタログ請求</a></li>\
	<li><a href="https://form.corolla-dealer.jp/shodan/corolla-hakata/agreement/c-hr" onclick="ga(\'send\', \'event\', \'C-HR\', \'footernavi_sp_navi_negotiation\');" target="_blank">商談予約</a></li>\
	</ul>\
	');
}
