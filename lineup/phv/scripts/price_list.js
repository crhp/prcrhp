$(function() {

    var priceNormal   = ['4,222,800', '3,910,000', '4,066,200', '3,765,000', '3,807,000', '3,525,000', '3,666,600', '3,395,000', '3,261,600', '3,020,000'],
        priceHokkaido = ['4,241,160', '3,927,000', '4,084,560', '3,782,000', '3,825,360', '3,542,000', '3,684,960', '3,412,000', '3,285,360', '3,042,000'],
        priceOkinawa  = ['4,249,800', '3,935,000', '4,093,200', '3,790,000', '3,834,000', '3,550,000', '3,693,600', '3,420,000', '3,288,600', '3,045,000']


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

    var price_html_hokkaido = "";
    price_html_hokkaido += '<ul class="lineup_type clearfix">';
    price_html_hokkaido += '<li><p class="lineup--title">Aプレミアム</p><p class="lineup--value">' + priceHokkaido[0] + '円<span>' + priceHokkaido[1] + '円（消費税抜き）</span></p></li>';
    price_html_hokkaido += '<li><p class="lineup--title">A “レザーパッケージ”</p><p class="lineup--value">' + priceHokkaido[2] + '円<span>' + priceHokkaido[3] + '円（消費税抜き）</span></p></li>';
    price_html_hokkaido += '<li><p class="lineup--title">A</p><p class="lineup--value">' + priceHokkaido[4] + '円<span>' + priceHokkaido[5] + '円（消費税抜き）</span></p></li>';
    price_html_hokkaido += '</ul>';
    price_html_hokkaido += '<ul class="lineup_type clearfix">';
    price_html_hokkaido += '<li><p class="lineup--title">S “ナビパッケージ”</p><p class="lineup--value">' + priceHokkaido[6] + '円<span>' + priceHokkaido[7] + '円（消費税抜き）</span></p></li>';
    price_html_hokkaido += '<li><p class="lineup--title">S</p><p class="lineup--value">' + priceHokkaido[8] + '円<span>' + priceHokkaido[9] + '円（消費税抜き）</span></p></li>';
    price_html_hokkaido += '</ul>';

    var price_html_okinawa = "";
    price_html_okinawa += '<ul class="lineup_type clearfix">';
    price_html_okinawa += '<li><p class="lineup--title">Aプレミアム</p><p class="lineup--value">' + priceOkinawa[0] + '円<span>' + priceOkinawa[1] + '円（消費税抜き）</span></p></li>';
    price_html_okinawa += '<li><p class="lineup--title">A “レザーパッケージ”</p><p class="lineup--value">' + priceOkinawa[2] + '円<span>' + priceOkinawa[3] + '円（消費税抜き）</span></p></li>';
    price_html_okinawa += '<li><p class="lineup--title">A</p><p class="lineup--value">' + priceOkinawa[4] + '円<span>' + priceOkinawa[5] + '円（消費税抜き）</span></p></li>';
    price_html_okinawa += '</ul>';
    price_html_okinawa += '<ul class="lineup_type clearfix">';
    price_html_okinawa += '<li><p class="lineup--title">S “ナビパッケージ”</p><p class="lineup--value">' + priceOkinawa[6] + '円<span>' + priceOkinawa[7] + '円（消費税抜き）</span></p></li>';
    price_html_okinawa += '<li><p class="lineup--title">S</p><p class="lineup--value">' + priceOkinawa[8] + '円<span>' + priceOkinawa[9] + '円（消費税抜き）</span></p></li>';
    price_html_okinawa += '</ul>';

    var $lineupWrap = $(".lineup-wrap");
    $lineupWrap.html("");

    if ($lineupWrap.hasClass('price-coldregion')) {
        $lineupWrap.append(price_html_hokkaido);
    } else if ($lineupWrap.hasClass('price-warmregions')) {
        $lineupWrap.append(price_html_okinawa);
    } else {
        $lineupWrap.append(price_html_normal);

    }
});
