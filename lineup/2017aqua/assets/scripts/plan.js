/******************************************************************************/
// plan.js
// 処理：購入プランのソースコード出力
// 注意：document.writeの内側は、末尾に必ず\マークをつけてください。
//       「'」「"」「&」「<」「>」などの特殊文字は、文字実態参照を使用するか
//       エスケープシーケンスで回避してください。
/******************************************************************************/
function plan(){


document.write('\
\
\
\
\
\
<!-- plan01a -->\
<h3 class="zanka1">残価設定型プランなら</h3>\
<div class="planBlock zanka1">\
<div class="planBlock-inner">\
<div class="right">\
<p class="catch">39プラン</p>\
<p class="catchTitle"><em>AQUA </em><span>S</span></p>\
<p class="expTxt">当プラン<span class="pay_number">60</span>回払いお支払い例の場合</p>\
<div class="exp">\
<table>\
<tr>\
<th class="mark">合計価格：</th>\
<td><span class="total">1,886,760</span>円</td>\
</tr>\
<tr>\
<th>車両本体価格：</th>\
<td><span class="vehicle">1,886,760</span>円</td>\
</tr>\
<tr>\
<th>付属品：</th>\
<td><span class="acce">0</span>円</td>\
</tr>\
<tr>\
<th class="mark">頭金：</th>\
<td><span class="down">500,000</span>円</td>\
</tr>\
<tr>\
<th class="mark">割賦元金：</th>\
<td><span class="principal">1,386,760</span>円</td>\
</tr>\
</table>\
</div>\
\
<table>\
<tr>\
<th class="bgGray">お支払い回数</th>\
<td class="bgGray"><em><span class="pay_number">60</span>回</em>(<span class="pay_period">5</span>年)</td>\
</tr>\
<tr>\
<th>金利（実質年率）</th>\
<td><span class="rate">3.9</span>％</td>\
</tr>\
<tr>\
<th>初回お支払い額</th>\
<td><span class="f_price">10,525</span>円×<span class="f_number">1</span>回(<span class="f_month">9</span>月)</td>\
</tr>\
</table>\
\
<table>\
<tr>\
<th class="bgRed">2回目以降お支払い額</th>\
<td class="bgRed"><strong><span class="s_price">9,300</span>円</strong>×<span class="s_number">48</span>回</td>\
</tr>\
<tr>\
<th>ボーナス時お支払い額</th>\
<td><span class="b_price">70,000</span>円×<span class="b_number">10</span>回</td>\
</tr>\
<tr>\
<th>最終回支払額</th>\
<th>&nbsp;</th>\
</tr>\
<tr>\
<th class="sub">(1)新車乗換えの場合</th>\
<td><span class="case1">0</span>円</td>\
</tr>\
<tr>\
<th class="sub">(2)クルマ返却の場合</th>\
<td><span class="case2">0</span>円</td>\
</tr>\
<tr>\
<th class="sub">(3)クルマ買取の場合</th>\
<td><span class="case3">410,000</span>円×<span>1</span>回</td>\
</tr>\
<tr>\
<th class="sub">総支払額(1)(2)の場合</th>\
<td><span class="result1">1,656,925</span>円</td>\
</tr>\
<tr>\
<th class="sub">総支払額(3)の場合</th>\
<td><span class="result2">2,066,925</span>円</td>\
</tr>\
</table>\
\
</div>\
<div class="left">\
<p><img src="img/fig_plan01.gif" width="474" height="237"></p>\
<div class="warnList">\
<ul class="warn">\
<li>掲載の価格には取付費は含まれません。</li>\
<li>保険料、税金（除く消費税）、登録料などの諸費用は別途申し受けます。</li>\
<li>自動車リサイクル法の施行により、リサイクル料金が別途必要になります。</li>\
<li>掲載プランは、お支払い方法の一例となります。</li>\
<li>詳しくは営業スタッフまでおたずねください。</li>\
<p class="ti">※お支払い終了時のライフスタイル、使用状況により、「お乗り換え」「お買い取り（一括またはローン）」「ご返却」の選択ができます。</p>\
<p class="ti">※車両返却および新車にお乗り換えの場合、基本的に最終回のお支払いは必要ありませんが、車両状態が事前に定めた規定外の場合には別途差額をいただきます。</p>\
<p class="ti">※お乗り続けになる場合には再割賦がご利用いただけますが、金利（実質年率）等はその時点での当社の基準が適用されます。</p>\
</li>\
</ul>\
</div>\
</div>\
</div>\
</div>\
<!-- /plan01a -->\
\
\
\
\
\
');


}