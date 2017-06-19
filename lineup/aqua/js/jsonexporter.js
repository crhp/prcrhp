var JsonData;
var JsonData2;
var ShopName;
var mainArea_cvdata;
$(document).ready(function () {
	load_data("/lineup/aqua/json/common.json");
	load_data2("/lineup/aqua/json/gradetemplate.json");
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//JSONを参照し、htmlを変換
function build_html(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//title：ページタイトルの変更
	put_html('title','h_name');
	$('title').append('｜新型アクア登場。');

////////////////////////////////////////////////////////////////////////////////////////////////////
//販売チャネルの判定
/*
	var channel_check = get_single_data('channel');
	switch(channel_check){
		case "netz":
			$("body#top.netz").removeClass("netz");
			$("body#top").addClass("netz");
			break;
		case "toyopet":
			$("body#top.netz").removeClass("netz");
			$("body#top").addClass("toyopet");
			break;
		case "corolla":
			$("body#top.netz").removeClass("netz");
			$("body#top").addClass("corolla");
			break;
		case "toyota":
			$("body#top.netz").removeClass("netz");
			$("body#top").addClass("T");
			break;
	}
*/
////////////////////////////////////////////////////////////////////////////////////////////////////
//header：セクション内の要素が空だった場合、ヘッダーのページ内リンクも非表示に
	var sectiondata_check1 = get_single_data('b_select->p_zanka');
	var sectiondata_check2 = get_single_data('b_select->p_kanzen');

	if ((sectiondata_check1 == 0)||(sectiondata_check1 == "null")){
		var sectiondata_temp1 = 0;
		$()
	}
	if ((sectiondata_check2 == 0)||(sectiondata_check2 == "null")){
		var sectiondata_temp2 = 0;
	}
	var sectiondata_check = Number(sectiondata_temp1) + Number(sectiondata_temp2);
	if (sectiondata_check >= '1'){
		$('#gNavi ul li:nth-child(7)').css("display","list-item");
	}else if (sectiondata_check <= '0'){
		$('section#plan').css("display","none");
		$('#gNavi ul li:nth-child(7)').css("display","none");
		$('#gNavi ul li:nth-child(6)').css("padding-right","10px");
		$('section#price .conv').css("margin-bottom","40px");
		//sp
		$('#gNavi_sp ul li:nth-child(7)').css("display","none");
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
//01：メインビジュアルエリア, CVリンク
	change_attr('#mainArea .viewsite a', 'href', 'cv->store->url');
	var get_parentid = $('#mainArea .viewsite.pc a').parents('section').attr('id');
	var mainArea_cvdata = JsonData['cv']['store']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#mainArea .viewsite.pc a').attr('onclick', mainArea_cvdata);
//sp
	var get_parentid = $('#mainArea .viewsite.sp a').parents('section').attr('id');
	var mainArea_cvdata_sp = JsonData['cv']['store']['event_contents_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#mainArea .viewsite.sp a').attr('onclick', mainArea_cvdata_sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//02：キャンペーンエリアの各種情報の有無を取得し、表示非表示を制御
//キャンペーンタイトルの有無を判定
	var sectiondata_campaign = 0;
	var sectiondata_campaign1 = get_single_data('cp->cp_name1');
	if (sectiondata_campaign1 == 'false'){
		$('section#campagin h2').css("display","none");
		sectiondata_campaign += 1;
	}
//キャンペーン詳細の有無を判定
	var sectiondata_campaign2 = get_single_data('cp->cp_detail1');
	if (sectiondata_campaign2 == 'false'){
		$('section#campagin .catch').css("display","none");
		sectiondata_campaign += 1;
	}
//キャンペーン注釈の有無を判定
	var sectiondata_campaign3 = get_single_data('cp->cp_caution1');
	if (sectiondata_campaign3 == 'false'){
		$('section#campagin .notes').css("display","none");
		sectiondata_campaign += 1;
	}
//キャンペーンタイトルの有無を判定
	if (sectiondata_campaign == '3'){
		$('section#campagin').css("display","none");
	}
//02：キャンペーン情報エリア、タイトル
	put_html('#content #campagin h2 .phrase','cp->cp_name2');
//02：キャンペーン情報エリア、キャプション
	put_html('#content #campagin .catch','cp->cp_detail2');
//02：キャンペーン情報エリア、注釈
	var cp_caution2_line1 = JsonData['cp']['cp_caution2'][0];
	$('.notes li:nth-child(1)>span').text(cp_caution2_line1);
	var cp_caution2_line2 = JsonData['cp']['cp_caution2'][1];
	if(cp_caution2_line2 == null){
		$('.notes li:nth-child(2)').css('display','none');
	}else{
		$('.notes li:nth-child(2)>span').text(cp_caution2_line2);
	}
	var cp_caution2_line3 = JsonData['cp']['cp_caution2'][2];
	if(cp_caution2_line3 == null){
		$('.notes li:nth-child(3)').css('display','none');
	}else{
		$('.notes li:nth-child(3)>span').text(cp_caution2_line3);
	}
	var cp_caution2_line4 = JsonData['cp']['cp_caution2'][3];
	if(cp_caution2_line4 == null){
		$('.notes li:nth-child(4)').css('display','none');
	}else{
		$('.notes li:nth-child(4)>span').text(cp_caution2_line4);
	}

	var sectiondata_campaign_itemnum = get_single_data('cp->cp_img->num');
	if (sectiondata_campaign <= '1' && sectiondata_campaign_itemnum == '0'){
		$('section#campagin').addClass("one");
	}
////////////////////////////////////////////////////////////////////////////////////////////////////
//（03：新グレード紹介エリアはJSON参照データ無し）

////////////////////////////////////////////////////////////////////////////////////////////////////
//04：インテリア情報エリア、CVリンク（URL、クリック情報）
	change_attr('#interior .conv a', 'href' ,'cv->store->url');
	var get_parentid = $('#interior .conv.pc a').parents('section').attr('id');
	var interior_cvdata = JsonData['cv']['store']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#interior .conv.pc a').attr('onclick', interior_cvdata);
//sp
	var get_parentid = $('#interior .conv.sp a').parents('section').attr('id');
	var interior_cvdata_sp = JsonData['cv']['store']['event_contents_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#interior .conv.sp a').attr('onclick', interior_cvdata_sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//（05：燃費情報エリアはJSON参照データ無し）

////////////////////////////////////////////////////////////////////////////////////////////////////
//06：安全性能情報エリア、CVリンク）
	change_attr('#safety .conv a', 'href' ,'cv->try->url');
	var get_parentid = $('#safety .conv.pc a').parents('section').attr('id');
	var safety_cvdata = JsonData['cv']['try']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#safety .conv.pc a').attr('onclick', safety_cvdata);
//sp
	var get_parentid = $('#safety .conv.sp a').parents('section').attr('id');
	var safety_cvdata_sp = JsonData['cv']['try']['event_contents_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#safety .conv.sp a').attr('onclick', safety_cvdata_sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//（07：ボディカラーシミュレーションエリアはJSON参照データ無し）

////////////////////////////////////////////////////////////////////////////////////////////////////
//08：価格・グレード情報エリア、CVリンク
	change_attr('#price .conv a', 'href' ,'cv->store->url');
	var get_parentid = $('#price .conv.pc a').parents('section').attr('id');
	var price_cvdata = JsonData['cv']['store']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#price .conv.pc a').attr('onclick', price_cvdata);
//sp
	var get_parentid = $('#price .conv.sp a').parents('section').attr('id');
	var price_cvdata_sp = JsonData['cv']['store']['event_contents_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#price .conv.sp a').attr('onclick', price_cvdata_sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//09：購入（残価設定型）プラン、キャッチコピー
	put_html('.zanka1 .catch','zanka1->copy');
//09：購入（残価設定型）プラン、車種グレード
	put_html('.zanka1 .catchTitle span','zanka1->grade');
//09：購入（残価設定型）プラン、注意事項
	var zanka1_pay_caution2_check =  JsonData['zanka1']['pay_caution']['pay_caution1'];
	if (zanka1_pay_caution2_check == 'false'){
		$('.zanka1 ul.warn:nth-child(2) li').css('display','none');
	}

	var zanka1_pay_caution2_line1 = JsonData['zanka1']['pay_caution']['pay_caution2'][0];
	if (zanka1_pay_caution2_line1 == null){
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(1)').css('display','none');
	}else{
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(1) .pay_caution2').text(zanka1_pay_caution2_line1);
	}
	var zanka1_pay_caution2_line2 = JsonData['zanka1']['pay_caution']['pay_caution2'][1];
	if (zanka1_pay_caution2_line2 == null){
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(2)').css('display','none');
	}else{
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(2) .pay_caution2').text(zanka1_pay_caution2_line2);
	}
	var zanka1_pay_caution2_line3 = JsonData['zanka1']['pay_caution']['pay_caution2'][2];
	if (zanka1_pay_caution2_line3 == null){
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(3)').css('display','none');
	}else{
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(3) .pay_caution2').text(zanka1_pay_caution2_line3);
	}
	var zanka1_pay_caution2_line4 = JsonData['zanka1']['pay_caution']['pay_caution2'][3];
	if (zanka1_pay_caution2_line4 == null){
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(4)').css('display','none');
	}else{
		$('.zanka1 ul.warn:nth-child(2) li:nth-child(4) .pay_caution2').text(zanka1_pay_caution2_line4);
	}
//09：購入（残価設定型）プラン、合計価格
	put_html('.zanka1 .total','zanka1->payment->total');
//09：購入（残価設定型）プラン、車両本体価格
	put_html('.zanka1 .vehicle','zanka1->payment->vehicle');
//09：購入（残価設定型）プラン、付属品
	put_html('.zanka1 .acce','zanka1->payment->acce');
//09：購入（残価設定型）プラン、頭金
	put_html('.zanka1 .down','zanka1->payment->down');
//09：購入（残価設定型）プラン、割賦元金
	put_html('.zanka1 .principal','zanka1->payment->principal');
//09：購入（残価設定型）プラン、支払い回数（回数、年数）
	put_html('.zanka1 .pay_number','zanka1->payment->pay_number');
	put_html('.zanka1 .pay_period','zanka1->payment->pay_period');
//09：購入（残価設定型）プラン、金利実質年率
	put_html('.zanka1 .rate','zanka1->payment->rate');
//09：購入（残価設定型）プラン、初回お支払い額（金額、回数、月）
	put_html('.zanka1 .f_price','zanka1->payment->f_price');
	put_html('.zanka1 .f_number','zanka1->payment->f_number');
	put_html('.zanka1 .f_month','zanka1->payment->f_month');
//09：購入（残価設定型）プラン、2回目以降お支払い額（金額、回数）
	put_html('.zanka1 .s_price','zanka1->payment->s_price');
	put_html('.zanka1 .s_number','zanka1->payment->s_number');
//09：購入（残価設定型）プラン、ボーナス時お支払い額（金額、回数）
	put_html('.zanka1 .b_price','zanka1->payment->b_price');
	put_html('.zanka1 .b_number','zanka1->payment->b_number');
//09：購入（残価設定型）プラン、最終回支払額（新車乗換えの場合）
	put_html('.zanka1 .case1','zanka1->payment->case1');
//09：購入（残価設定型）プラン、最終回支払額（クルマ返却の場合）
	put_html('.zanka1 .case2','zanka1->payment->case2');
//09：購入（残価設定型）プラン、最終回支払額（クルマ買取の場合）
	put_html('.zanka1 .case3','zanka1->payment->case3');
//	put_html('','zanka1->payment->case1');
//09：購入（残価設定型）プラン、最終回支払額（総支払額(1)(2)の場合）
	put_html('.zanka1 .result1','zanka1->payment->result1');
//09：購入（残価設定型）プラン、最終回支払額（総支払額(3)の場合）
	put_html('.zanka1 .result2','zanka1->payment->result2');
//09：購入（残価設定型）プラン、キャッチコピー
	put_html('.zanka2 .catch','zanka2->copy');
//09：購入（残価設定型）プラン、車種グレード
	put_html('.zanka2 .catchTitle span','zanka2->grade');
//09：購入（残価設定型）プラン、注意事項
	var zanka2_pay_caution2_check =  JsonData['zanka2']['pay_caution']['pay_caution1'];
	if (zanka2_pay_caution2_check == 'false'){
		$('.zanka2 ul.warn:nth-child(2) li').css('display','none');
	}
	var zanka2_pay_caution2_line1 = JsonData['zanka2']['pay_caution']['pay_caution2'][0];
	if (zanka2_pay_caution2_line1 == null){
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(1)').css('display','none');
	}else{
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(1) .pay_caution2').text(zanka2_pay_caution2_line1);
	}
	var zanka2_pay_caution2_line2 = JsonData['zanka2']['pay_caution']['pay_caution2'][1];
	if (zanka2_pay_caution2_line2 == null){
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(2)').css('display','none');
	}else{
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(2) .pay_caution2').text(zanka2_pay_caution2_line2);
	}
	var zanka2_pay_caution2_line3 = JsonData['zanka2']['pay_caution']['pay_caution2'][2];
	if (zanka2_pay_caution2_line3 == null){
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(3)').css('display','none');
	}else{
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(3) .pay_caution2').text(zanka2_pay_caution2_line3);
	}
	var zanka2_pay_caution2_line4 = JsonData['zanka2']['pay_caution']['pay_caution2'][3];
	if (zanka2_pay_caution2_line4 == null){
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(4)').css('display','none');
	}else{
		$('.zanka2 ul.warn:nth-child(2) li:nth-child(4) .pay_caution2').text(zanka2_pay_caution2_line4);
	}
//09：購入（残価設定型）プラン、合計価格
	put_html('.zanka2 .total','zanka2->payment->total');
//09：購入（残価設定型）プラン、車両本体価格
	put_html('.zanka2 .vehicle','zanka2->payment->vehicle');
//09：購入（残価設定型）プラン、付属品
	put_html('.zanka2 .acce','zanka2->payment->acce');
//09：購入（残価設定型）プラン、頭金
	put_html('.zanka2 .down','zanka2->payment->down');
//09：購入（残価設定型）プラン、割賦元金
	put_html('.zanka2 .principal','zanka2->payment->principal');
//09：購入（残価設定型）プラン、支払い回数（回数、年数）
	put_html('.zanka2 .pay_number','zanka2->payment->pay_number');
	put_html('.zanka2 .pay_period','zanka2->payment->pay_period');
//09：購入（残価設定型）プラン、金利実質年率
	put_html('.zanka2 .rate','zanka2->payment->rate');
//09：購入（残価設定型）プラン、初回お支払い額（金額、回数、月）
	put_html('.zanka2 .f_price','zanka2->payment->f_price');
	put_html('.zanka2 .f_number','zanka2->payment->f_number');
    put_html('.zanka2 .f_month','zanka2->payment->f_month');
//09：購入（残価設定型）プラン、2回目以降お支払い額（金額、回数）
	put_html('.zanka2 .s_price','zanka2->payment->s_price');
	put_html('.zanka2 .s_number','zanka2->payment->s_number');
//09：購入（残価設定型）プラン、ボーナス時お支払い額（金額、回数）
	put_html('.zanka2 .b_price','zanka2->payment->b_price');
	put_html('.zanka2 .b_number','zanka2->payment->b_number');
//09：購入（残価設定型）プラン、最終回支払額（新車乗換えの場合）
	put_html('.zanka2 .case1','zanka2->payment->case1');
//09：購入（残価設定型）プラン、最終回支払額（クルマ返却の場合）
	put_html('.zanka2 .case2','zanka2->payment->case2');
//09：購入（残価設定型）プラン、最終回支払額（クルマ買取の場合）
	put_html('.zanka2 .case3','zanka2->payment->case3');
//	put_html('','zanka2->payment->case1');
//09：購入（残価設定型）プラン、最終回支払額（総支払額(1)(2)の場合）
	put_html('.zanka2 .result1','zanka2->payment->result1');
//09：購入（残価設定型）プラン、最終回支払額（総支払額(3)の場合）
	put_html('.zanka2 .result2','zanka2->payment->result2');
//09：購入（完全割賦）プラン、キャッチコピー
	put_html('.kanzen1 .catch','kanzen1->copy');
//09：購入（完全割賦）プラン、車種グレード
	put_html('.kanzen1 .catchTitle span','kanzen1->grade');
//09：購入（完全割賦）プラン、注意事項
	var kanzen1_pay_caution2_check = JsonData['kanzen1']['pay_caution']['pay_caution1'];
	if (kanzen1_pay_caution2_check == 'false'){
		$('.kanzen1 ul.warn:nth-child(2) li').css('display','none');
	}
	var kanzen1_pay_caution2_line1 = JsonData['kanzen1']['pay_caution']['pay_caution2'][0];
	if (kanzen1_pay_caution2_line1 == null){
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(1)').css('display','none');
	}else{
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(1) .pay_caution2').text(kanzen1_pay_caution2_line1);
	}
	var kanzen1_pay_caution2_line2 = JsonData['kanzen1']['pay_caution']['pay_caution2'][1];
	if (kanzen1_pay_caution2_line2 == null){
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(2)').css('display','none');
	}else{
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(2) .pay_caution2').text(kanzen1_pay_caution2_line2);
	}
	var kanzen1_pay_caution2_line3 = JsonData['kanzen1']['pay_caution']['pay_caution2'][2];
	if (kanzen1_pay_caution2_line3 == null){
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(3)').css('display','none');
	}else{
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(3) .pay_caution2').text(kanzen1_pay_caution2_line3);
	}
	var kanzen1_pay_caution2_line4 = JsonData['kanzen1']['pay_caution']['pay_caution2'][3];
	if (kanzen1_pay_caution2_line4 == null){
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(4)').css('display','none');
	}else{
		$('.kanzen1 ul.warn:nth-child(2) li:nth-child(4) .pay_caution2').text(kanzen1_pay_caution2_line4);
	}
//09：購入（完全割賦）プラン、合計価格
	put_html('.kanzen1 .total','kanzen1->payment->total');
//09：購入（完全割賦）プラン、車両本体価格
	put_html('.kanzen1 .vehicle','kanzen1->payment->vehicle');
//09：購入（完全割賦）プラン、付属品
	put_html('.kanzen1 .acce','kanzen1->payment->acce');
//09：購入（完全割賦）プラン、頭金
	put_html('.kanzen1 .down','kanzen1->payment->down');
//09：購入（完全割賦）プラン、割賦元金
	put_html('.kanzen1 .principal','kanzen1->payment->principal');
//09：購入（完全割賦）プラン、支払い回数（回数、年数）
	put_html('.kanzen1 .pay_number','kanzen1->payment->pay_number');
	put_html('.kanzen1 .pay_period','kanzen1->payment->pay_period');
//09：購入（完全割賦）プラン、金利実質年率
	put_html('.kanzen1 .rate','kanzen1->payment->rate');
//09：購入（完全割賦）プラン、初回お支払い額（金額、回数、月）
	put_html('.kanzen1 .f_price','kanzen1->payment->f_price');
	put_html('.kanzen1 .f_number','kanzen1->payment->f_number');
	put_html('.kanzen1 .f_month','kanzen1->payment->f_month');
//09：購入（完全割賦）プラン、2回目以降お支払い額（金額、回数）
	put_html('.kanzen1 .s_price','kanzen1->payment->s_price');
	put_html('.kanzen1 .s_number','kanzen1->payment->s_number');
//09：購入（完全割賦）プラン、ボーナス時お支払い額（金額、回数）
	put_html('.kanzen1 .b_price','kanzen1->payment->b_price');
	put_html('.kanzen1 .b_number','kanzen1->payment->b_number');
//09：購入（完全割賦）プラン、総支払額
	put_html('.kanzen1 .result1','kanzen1->payment->result1');
//09：購入（完全割賦）プラン、キャッチコピー
	put_html('.kanzen2 .catch','kanzen2->copy');
//09：購入（完全割賦）プラン、車種グレード
	put_html('.kanzen2 .catchTitle span','kanzen2->grade');
//09：購入（完全割賦）プラン、注意事項
	var kanzen2_pay_caution2_check = JsonData['kanzen2']['pay_caution']['pay_caution1'];
	if (kanzen2_pay_caution2_check == 'false'){
		$('.kanzen2 ul.warn:nth-child(2) li').css('display','none');
	}
	var kanzen2_pay_caution2_line1 = JsonData['kanzen2']['pay_caution']['pay_caution2'][0];
	if (kanzen2_pay_caution2_line1 == null){
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(1)').css('display','none');
	}else{
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(1) .pay_caution2').text(kanzen2_pay_caution2_line1);
	}
	var kanzen2_pay_caution2_line2 = JsonData['kanzen2']['pay_caution']['pay_caution2'][1];
	if (kanzen2_pay_caution2_line2 == null){
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(2)').css('display','none');
	}else{
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(2) .pay_caution2').text(kanzen2_pay_caution2_line2);
	}
	var kanzen2_pay_caution2_line3 = JsonData['kanzen2']['pay_caution']['pay_caution2'][2];
	if (kanzen2_pay_caution2_line3 == null){
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(3)').css('display','none');
	}else{
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(3) .pay_caution2').text(kanzen2_pay_caution2_line3);
	}
	var kanzen2_pay_caution2_line4 = JsonData['kanzen2']['pay_caution']['pay_caution2'][3];
	if (kanzen2_pay_caution2_line4 == null){
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(4)').css('display','none');
	}else{
		$('.kanzen2 ul.warn:nth-child(2) li:nth-child(4) .pay_caution2').text(kanzen2_pay_caution2_line4);
	}
//09：購入（完全割賦）プラン、合計価格
	put_html('.kanzen2 .total','kanzen2->payment->total');
//09：購入（完全割賦）プラン、車両本体価格
	put_html('.kanzen2 .vehicle','kanzen2->payment->vehicle');
//09：購入（完全割賦）プラン、付属品
	put_html('.kanzen2 .acce','kanzen2->payment->acce');
//09：購入（完全割賦）プラン、頭金
	put_html('.kanzen2 .down','kanzen2->payment->down');
//09：購入（完全割賦）プラン、割賦元金
	put_html('.kanzen2 .principal','kanzen2->payment->principal');
//09：購入（完全割賦）プラン、支払い回数（回数、年数）
	put_html('.kanzen2 .pay_number','kanzen2->payment->pay_number');
	put_html('.kanzen2 .pay_period','kanzen2->payment->pay_period');
//09：購入（完全割賦）プラン、金利実質年率
	put_html('.kanzen2 .rate','kanzen2->payment->rate');
//09：購入（完全割賦）プラン、初回お支払い額（金額、回数、月）
	put_html('.kanzen2 .f_price','kanzen2->payment->f_price');
	put_html('.kanzen2 .f_number','kanzen2->payment->f_number');
	put_html('.kanzen2 .f_month','kanzen2->payment->f_month');
//09：購入（完全割賦）プラン、2回目以降お支払い額（金額、回数）
	put_html('.kanzen2 .s_price','kanzen2->payment->s_price');
	put_html('.kanzen2 .s_number','kanzen2->payment->s_number');
//09：購入（完全割賦）プラン、ボーナス時お支払い額（金額、回数）
	put_html('.kanzen2 .b_price','kanzen2->payment->b_price');
	put_html('.kanzen2 .b_number','kanzen2->payment->b_number');
//09：購入（完全割賦）プラン、総支払額
	put_html('.kanzen2 .result1','kanzen2->payment->result1');
//09：購入プラン、CVリンク
	change_attr('#plan .conv a', 'href' ,'cv->shodan->url');
	var get_parentid = $('#plan .conv.pc a').parents('section').attr('id');
	var plan_cvdata = JsonData['cv']['shodan']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#plan .conv.pc a').attr('onclick', plan_cvdata);
//sp
	var get_parentid = $('#plan .conv.sp a').parents('section').attr('id');
	var plan_cvdata_sp = JsonData['cv']['shodan']['event_contents_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#plan .conv.sp a').attr('onclick', plan_cvdata_sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//footer：店舗名、及び店舗ロゴの表示・非表示
	var fcv_btn_storename = get_single_data('h_name');
	var fcv_btn_storelogo = get_single_data('h_logo');
	if (fcv_btn_storelogo == 'true'){
		$("#storeName a img").css("display","inline-block");
	}else if(fcv_btn_storelogo == 'false'){
		$("#storeName a img").css("display","none");
		$("footer #storeName a").text(fcv_btn_storename);
	}

	change_attr('footer #storeName a', 'href', 'h_url');

	if (fcv_btn_storelogo == 'false'){
	}else if(fcv_btn_storelogo == 'true'){
	}

//footer：CVボタンの有無判定
	var fcv_btn_check_try = get_single_data('cv->try->btn');
	if (fcv_btn_check_try == 'false'){
		$("#fNavi li:nth-child(1)").css("display","none");
		//06：安全性能情報エリアのCVボタンもオフに
		$("#safety .convArea").css("display","none");
	}else{
	}
	var fcv_btn_check_store = get_single_data('cv->store->btn');
	if (fcv_btn_check_store == 'false'){
		$("#fNavi li:nth-child(2)").css("display","none");
		//01：メインビジュアルエリアのCVボタンもオフに
		$(".mainConv .viewsite").css("display","none");
		//04：インテリア情報エリアのCVボタンもオフに
		$("#interior .slide-right").css("display","none");
		//08：価格・グレード情報エリアのCVボタンもオフに
		$("#price .convArea").css("display","none");
	}else{
	}
	var fcv_btn_check_catalog = get_single_data('cv->catalog->btn');
	if (fcv_btn_check_catalog == 'false'){
		$("#fNavi li:nth-child(3)").css("display","none");
		//
	}else{
	}
	var fcv_btn_check_online = get_single_data('cv->online->btn');
	if (fcv_btn_check_online == 'false'){
		$("#fNavi li:nth-child(4)").css("display","none");
		//
	}else{
	}
	var fcv_btn_check_shodan = get_single_data('cv->shodan->btn');
	if (fcv_btn_check_shodan == 'false'){
		$("#fNavi li:nth-child(5)").css("display","none");
		//09：購入プラン情報エリアのCVボタンもオフに
		$("#plan .slide-right").css("display","none");
	}else{
	}

//footer：CVリンク「試乗予約」
	change_attr('#fNavi li:nth-child(1) a','href','cv->try->url');
	var get_parentid = $('#fNavi.pc li:nth-child(1) a').parents('nav').attr('id');
	var footer_cvdata_c1 = JsonData['cv']['try']['event_footer_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.pc li:nth-child(1) a').attr('onclick', footer_cvdata_c1);
//sp
	var get_parentid = $('#fNavi.sp li:nth-child(1) a').parents('nav').attr('id');
	var footer_cvdata_c1sp = JsonData['cv']['try']['event_footer_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.sp li:nth-child(1) a').attr('onclick', footer_cvdata_c1sp);


//footer：CVリンク「店舗一覧」
	change_attr('#fNavi li:nth-child(2) a','href','cv->store->url');
	var get_parentid = $('#fNavi.pc li:nth-child(2) a').parents('nav').attr('id');
	var footer_cvdata_c2 = JsonData['cv']['store']['event_footer_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.pc li:nth-child(2) a').attr('onclick', footer_cvdata_c2);
//sp
	var get_parentid = $('#fNavi.sp li:nth-child(2) a').parents('nav').attr('id');
	var footer_cvdata_c2sp = JsonData['cv']['store']['event_footer_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.sp li:nth-child(2) a').attr('onclick', footer_cvdata_c2sp);


//footer：CVリンク「カタログ請求」
	change_attr('#fNavi li:nth-child(3) a','href','cv->catalog->url');
	var get_parentid = $('#fNavi.pc li:nth-child(3) a').parents('nav').attr('id');
	var footer_cvdata_c3 = JsonData['cv']['catalog']['event_footer_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.pc li:nth-child(3) a').attr('onclick', footer_cvdata_c3);
//sp
	var get_parentid = $('#fNavi.sp li:nth-child(3) a').parents('nav').attr('id');
	var footer_cvdata_c3sp = JsonData['cv']['catalog']['event_footer_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.sp li:nth-child(3) a').attr('onclick', footer_cvdata_c3sp);


//footer：CVリンク「オンライン見積もり」
	change_attr('#fNavi li:nth-child(4) a','href','cv->online->url');
	var get_parentid = $('#fNavi.pc li:nth-child(4) a').parents('nav').attr('id');
	var footer_cvdata_c4 = JsonData['cv']['online']['event_footer_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.pc li:nth-child(4) a').attr('onclick', footer_cvdata_c4);
//sp
	var get_parentid = $('#fNavi.sp li:nth-child(4) a').parents('nav').attr('id');
	var footer_cvdata_c4sp = JsonData['cv']['online']['event_footer_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.sp li:nth-child(4) a').attr('onclick', footer_cvdata_c4sp);


//footer：CVリンク「商談予約」
	change_attr('#fNavi li:nth-child(5) a','href','cv->shodan->url');
	var get_parentid = $('#fNavi.pc li:nth-child(5) a').parents('nav').attr('id');
	var footer_cvdata_c5 = JsonData['cv']['shodan']['event_footer_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.pc li:nth-child(5) a').attr('onclick', footer_cvdata_c5);
//sp
	var get_parentid = $('#fNavi.sp li:nth-child(5) a').parents('nav').attr('id');
	var footer_cvdata_c5sp = JsonData['cv']['shodan']['event_footer_sp']+'\#'+get_parentid+'\''+'\)'+'\;';
	$('#fNavi.sp li:nth-child(5) a').attr('onclick', footer_cvdata_c5sp);

////////////////////////////////////////////////////////////////////////////////////////////////////
//02：キャンペーン情報（アイテムの数によって条件分岐）
//cp -> cp_img -> numの数を変数[item_number]に入れ、1～4だった場合、クラスを付与（switch文）
	var campaign_check = get_single_data('cp->cp_name1');
	if (campaign_check == true) {
		$("section#campagin").css("display","none");
	}else{
		var temp_data = get_single_data('cp->cp_img->num');
		var item_number = temp_data;
		switch(item_number){
			case "0":
				$("div#itemcell").css("display","none");
				break;
			case "1":
				$("div#itemcell").addClass("single_item");
				$("#itemcell > div:nth-child(1) img").attr("src","/lineup/aqua/img/p_campaign01.png");
				$("div#itemcell.single_item").children("div:nth-child(n+2)").css("display","none");
				break;
			case "2":
				$("div#itemcell").addClass("double_item");
				$("#itemcell > div:nth-child(1) img").attr("src","/lineup/aqua/img/p_campaign01.png");
				$("#itemcell > div:nth-child(2) img").attr("src","/lineup/aqua/img/p_campaign02.png");
				$("div#itemcell.double_item").children("div:nth-child(n+3)").css("display","none");
				break;
			case "3":
				$("div#itemcell").addClass("triple_item");
				$("#itemcell > div:nth-child(1) img").attr("src","/lineup/aqua/img/p_campaign01.png");
				$("#itemcell > div:nth-child(2) img").attr("src","/lineup/aqua/img/p_campaign02.png");
				$("#itemcell > div:nth-child(3) img").attr("src","/lineup/aqua/img/p_campaign03.png");
				$("div#itemcell.triple_item").children("div:nth-child(n+4)").css("display","none");
				break;
			case "4":
				$("div#itemcell").addClass("quadruple_item");
				$("#itemcell > div:nth-child(1) img").attr("src","/lineup/aqua/img/p_campaign01.png");
				$("#itemcell > div:nth-child(2) img").attr("src","/lineup/aqua/img/p_campaign02.png");
				$("#itemcell > div:nth-child(3) img").attr("src","/lineup/aqua/img/p_campaign03.png");
				$("#content #campagin .inner > div > div:nth-child(3)").css("float","left");
				$("#itemcell > div:nth-child(4) img").attr("src","/lineup/aqua/img/p_campaign04.png");
				$("div#itemcell.quadruple_item").children("div:nth-child(n+5)").css("display","none");
				break;
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
//09：購入プラン判定
	var zanka_check = get_single_data('b_select->p_zanka');
	if ((zanka_check == 0)||(sectiondata_temp1 == 0)){
		$(".zanka1").css("display","none");
		$(".zanka2").css("display","none");
	}else if(zanka_check == '1'){
		$(".zanka2").css("display","none");
	}
	var kanzen_check = get_single_data('b_select->p_kanzen');
	if ((kanzen_check == 0)||(sectiondata_temp2 == 0)){
		$(".kanzen1").css("display","none");
		$(".kanzen2").css("display","none");
	}else if(kanzen_check == '1'){
		$(".kanzen2").css("display","none");
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
//変数渡し用
	ShopName = get_single_data('h_name');

////////////////////////////////////////////////////////////////////////////////////////////////////
//html変換終了
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//テラ側のjsonを読み込み
function build_html2(){
//meta情報の生成
	console.log(ShopName);
	meta_before = get_single_data2('meta->description1');
	meta_after = get_single_data2('meta->description2');
	var meta_descripsion = meta_before+ShopName+meta_after;
	$("meta[name=description]").attr("content",meta_descripsion);

	meta_before = get_single_data2('meta->keywords1');
	meta_after = get_single_data2('meta->keywords2');
	var meta_keywords = meta_before+ShopName+meta_after;
	$("meta[name=keywords]").attr("content",meta_keywords);

	meta_before = get_single_data2('meta->og_title1');
	meta_after = get_single_data2('meta->og_title2');
	var meta_og_title = meta_before+ShopName+meta_after;
	$("meta[property='og:title']").attr("content",meta_og_title);

	meta_before = get_single_data2('meta->og_description1');
	meta_after = get_single_data2('meta->og_description2');
	var meta_og_description = meta_before+ShopName+meta_after;
	$("meta[property='og:description']").attr("content",meta_og_description);


//GoogleAnalyticsの追加
	//01：メインビジュアルエリア、CV
/*
	shop_customcode_check = get_single_data2('h_ga->add');
	if (shop_customcode_check == 'true'){
		shop_customcode = get_single_data2('h_ga->store->event_contents_pc');
		var get_parentid = $('#mainArea .viewsite.pc a').parents('section').attr('id');
		var mainArea_cvdata = JsonData['cv']['store']['event_contents_pc']+'\#'+get_parentid+'\''+'\)'+'\;';
		var cv_temp = mainArea_cvdata+shop_customcode;
		$('#mainArea .viewsite.pc a').attr("onclick",cv_temp);
	}
*/
	$("body").fadeIn(500);
////////////////////////////////////////////////////////////////////////////////////////////////////
//html変換（build_html2）終了
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//JSONインターフェース（店舗提出データ切り出し用）
function load_data( path ){
	$.getJSON( path , function (data) {
		set_all_data( data );
		build_html();
	});
}
function get_single_data( param ){
	var splited_param = param.split('->');
	var data = get_all_data();
	for(i = 0;  splited_param.length > i; i++ ){
		var data = data[splited_param[i]];
	}
	return data;
}
function put_html( target , param){
	$(target).text(get_single_data(param));   
}
function change_attr( target , attr , param){
	$(target).attr(attr,get_single_data(param));
}
function get_all_data(){
	return JsonData;
}
function set_all_data( data ){
	JsonData = data;
}
function pick_date( target, param){
	$(target).text(get_single_data(param));   
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//JSONインターフェース（テンプレート用）
function load_data2( path2 ){
	$.getJSON( path2 , function (data2) {
		set_all_data2( data2 );
		build_html2();
	});
}
function get_single_data2( param2 ){
	var splited_param2 = param2.split('->');
	var data2 = get_all_data2();
	for(i = 0;  splited_param2.length > i; i++ ){
		var data2 = data2[splited_param2[i]];
	}
	return data2;
}
function put_html2( target2 , param2){
	$(target2).text(get_single_data2(param2));   
}
function change_attr2( target2 , attr , param2){
	$(target2).attr(attr,get_single_data2(param2));
}
function get_all_data2(){
	return JsonData2;
}
function set_all_data2( data2 ){
	JsonData2 = data2;
}
function pick_date2( target2, param2){
	$(target2).text(get_single_data2(param2));   
}

