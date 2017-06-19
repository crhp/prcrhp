/******************************************************************************/
// include.js
// 処理：各コンバージョンボタン出力
// 注意：document.write内に「'」がある場合は、
//       「'」の前に「\」をつけてエスケープシーケンスで回避してください。
//       内容が何もないときはdocument.write内を空白にしてください。
//       例：document.write('');
// 価格については該当する地区のコメントアウトを外してください。デフォルトは標準価格です。
// 北海道地区の場合、「価格注釈」も変更が必要です。
/******************************************************************************/


//価格L
function l_price(){
document.write('メーカー希望小売価格<span class="price">1,785,240円</span>1,653,000円（消費税抜き）');
//document.write('北海道地区メーカー希望小売価格<em>＊</em><span class="price">1,816,560円</span>1,682,000円（消費税抜き）');
//document.write('沖縄地区メーカー希望小売価格<span class="price">1,809,000円</span>1,675,000円（消費税抜き）');

}

//価格S
function s_price(){
document.write('メーカー希望小売価格<span class="price">1,886,760円</span>1,747,000円（消費税抜き）');
//document.write('北海道地区メーカー希望小売価格<em>＊</em><span class="price">1,902,960円</span>1,762,000円（消費税抜き）');
//document.write('沖縄地区メーカー希望小売価格<span class="price">1,910,520円</span>1,769,000円（消費税抜き）');

}

//価格G
function g_price(){
document.write('メーカー希望小売価格<span class="price">2,062,800円</span>1,910,000円（消費税抜き）');
//document.write('北海道地区メーカー希望小売価格<em>＊</em><span class="price">2,079,000円</span>1,925,000円（消費税抜き）');
//document.write('沖縄地区メーカー希望小売価格<span class="price">2,086,560円</span>1,932,000円（消費税抜き）');
}

//価格Gソフトレザーセレクション
function g2_price(){
document.write('メーカー希望小売価格<span class="price">2,089,800円</span>1,935,000円（消費税抜き）');
//document.write('北海道地区メーカー希望小売価格<em>＊</em><span class="price">2,106,000円</span>1,950,000円（消費税抜き）');
//document.write('沖縄地区メーカー希望小売価格<span class="price">2,113,560円</span>1,957,000円（消費税抜き）');
}

//価格Crossover
function co_price(){
document.write('メーカー希望小売価格<span class="price">2,062,800円</span>1,910,000円（消費税抜き）');
//document.write('北海道地区メーカー希望小売価格<em>＊</em><span class="price">2,079,000円</span>1,925,000円（消費税抜き）');
//document.write('沖縄地区メーカー希望小売価格<span class="price">2,086,560円</span>1,932,000円（消費税抜き）');
}

//価格注釈
function price_txt(){
//北海道以外
document.write('');
//北海道
//document.write('＊北海道地区の価格には寒冷地仕様が含まれます。　');
}



// メイン部分「今すぐお店で見てみよう」の表示
function main_store1(){
// pc表示
document.write('<p class="viewsite pc"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'mainarea_pc_main_store\');" target="_blank"><span>今すぐお店で見てみよう！</span></a></p>');
// sp表示
document.write('<p class="viewsite sp"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'mainarea_sp_main_store\');" target="_blank"><span>今すぐお店で<br>見てみよう！</span></a></p>');
}


// インテリア部分「お近くのお店で実車を確かめよう！」の表示
function contents_store1(){
// pc表示
document.write('<p class="conv pc"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'interior_pc_contents_store\');" target="_blank">お近くのお店で実車を確かめよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'interior_sp_contents_store\');" target="_blank">お近くのお店で実車を確かめよう！</a></p>');
}


// 走行性能部分「実際に走りを体験してみよう！」の表示
function contents_try1(){
// pc表示
document.write('<p class="conv pc"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'performance_pc_contents_try\');" target="_blank">実際に走りを体験してみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'performance_sp_contents_try\');" target="_blank">実際に走りを体験してみよう！</a></p>');
}


// スタイル部分「今すぐお店で実物を確かめよう！」の表示
function contents_store2(){
// pc表示
document.write('<p class="conv pc"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'style_pc_contents_store\');" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'style_sp_contents_store\');" target="_blank">今すぐお店で実物を確かめよう！</a></p>');
}


// 購入プラン部分「詳しくはお店のスタッフに聞いてみよう！」の表示
function contents_negotiation1(){
// pc表示
document.write('<p class="conv pc"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'plan_pc_contents_negotiation\');" target="_blank">詳しくはお店のスタッフに聞いてみよう！</a></p>');
// sp表示
document.write('<p class="conv sp"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'plan_sp_contents_negotiation\');" target="_blank">詳しくはお店のスタッフまで！</a></p>');
}


// フッターメニュー部分の表示
function footermenu(){
	// pc表示
	document.write('\
	<nav id="fNavi" class="pc">\
	<ul>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_pc_navi_try\');" target="_blank">試乗予約</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_pc_navi_store\');" target="_blank">店舗一覧</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_pc_navi_catalog\');" target="_blank">カタログ請求</a></li>\
	<li class="online"><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_pc_navi_online\');" target="_blank">オンライン<br class="sp">見積もり</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_pc_navi_negotiation\');" target="_blank">商談予約</a></li>\
	</ul>\
	</nav>\
	');

	// sp表示
	document.write('\
	<nav id="fNavi" class="sp">\
	<ul>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_sp_navi_try\');" target="_blank">試乗予約</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_sp_navi_store\');" target="_blank">店舗一覧</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_sp_navi_catalog\');" target="_blank">カタログ<br class="sp">請求</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_sp_navi_online\');" target="_blank">オンライン<br class="sp">見積もり</a></li>\
	<li><a href="#" onclick="ga(\'send\', \'event\', \'AQUA\', \'footernavi_sp_navi_negotiation\');" target="_blank">商談予約</a></li>\
	</ul>\
	</nav>\
	');
}
