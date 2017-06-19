$(function() {

    var priceNormal = ['0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000', '0,000,000']

    var price_html_normal = "";
    price_html_normal += '<ul class="lineup_type clearfix">';
    price_html_normal += '<li><p class="lineup--title">Aプレミアム</p><p class="lineup--value">' + priceNormal[0] + '円<span>' + priceNormal[1] + '円（消費税抜き）</span></p></li>';
    price_html_normal += '<li><p class="lineup--title">A “レザーパッケージ”</p><p class="lineup--value">' + priceNormal[2] + '円<span>' + priceNormal[3] + '円（消費税抜き）</span></p></li>';
    price_html_normal += '<li><p class="lineup--title">A</p><p class="lineup--value">' + priceNormal[4] + '円<span>' + priceNormal[5] + '円（消費税抜き）</span></p></li>';
    price_html_normal += '</ul>';
    price_html_normal += '<ul class="lineup_type clearfix">';
    price_html_normal += '<li><p class="lineup--title">S “ナビパッケージ”</p><p class="lineup--value">' + priceNormal[6] + '円<span>' + priceNormal[7] + '円（消費税抜き）</span></p></li>';
    price_html_normal += '<li><p class="lineup--title">S</p><p class="lineup--value">' + priceNormal[8] + '円<span>' + priceNormal[9] + '円（消費税抜き）</span></p></li>';
    price_html_normal += '</ul>';

    var $lineupWrap = $(".lineup-wrap");

    $lineupWrap.append(price_html_normal);


});
