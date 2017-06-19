/**
 * Flatten height to the same height as the highest element for each row.
 *
 * Copyright (c) 2011 Hayato Takenaka
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: Hayato Takenaka (http://urin.take-uma.net)
 * @version: 0.0.0
 *
 * Usage:
 * $().tile(columns)
 *  The columns is number of columns to be flatten.
 *  If omit columns, flatten to the heighest element in all elements.
**/
(function(jQuery) {
	jQuery.fn.tile = function(columns) {
		var tiles = [], max, c, last = this.length - 1;
		if(columns == null) columns = this.length;
		return this.each(function(i) {
			c = i % columns;
			tiles[c] = jQuery(this);
			if(c == 0 || tiles[c].height() > max) max = tiles[c].height();
			if(i == last || c == columns - 1) jQuery.each(tiles, function(i, t) { t.height(max); });
		});
	}
})(jQuery);
