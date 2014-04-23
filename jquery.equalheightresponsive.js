/**
 * Плагин     : jQuery.equalHeightResponsive
 * Версия     : 1.0 (23.04.2014)
 * Автор      : ПафНутиЙ 
 * Twitter    : @pafnuty_name
 * Назначение : Автоматическое выравнивание высоты блоков (в каждом ряду своя высота) для адаптивных сайтов.
 *
 * Плагин основан на коде из поста: http://css-tricks.com/equal-height-blocks-in-rows/
 *
 * Использование:
 * 
 * HTML: 
 * <div class="container">
 *     <div class="element"></div>
 *     <div class="element"></div>
 *     <div class="element"></div>
 *     <div class="element"></div>
 * </div>
 *
 * jQuery(document).ready(function($) {
 *     $('.element').equalHeightResponsive();
 * });
 * 
 */

(function ($) {
	/**
	 * Основная функция скрипта
	 * Подставляет высоту самого высокого элемента
	 * всем остальным элементам, чья позиция (ряд)
	 * является такой же, что и у текущего. Т.е. у каждого ряда будет своя высота.
	 */
	$.fn.equalheightRun = function () {
		var maxHeight = 0,
			currentRowStart = 0,
			rowEls = new Array(),
			$el,
			topPosition = 0;
		$.each(this, function () {

			$el = $(this);
			$($el).height('auto')
			topPostion = $el.offset().top;

			if (currentRowStart != topPostion) {
				for (currentEl = 0; currentEl < rowEls.length; currentEl++) {
					rowEls[currentEl].height(maxHeight);
				}
				rowEls.length = 0; // empty the array
				currentRowStart = topPostion;
				maxHeight = $el.height();
				rowEls.push($el);
			}
			else {
				rowEls.push($el);
				maxHeight = (maxHeight < $el.height()) ? ($el.height()) : (maxHeight);
			}
			for (currentEl = 0; currentEl < rowEls.length; currentEl++) {
				rowEls[currentEl].height(maxHeight);
			}
		});
		return this;
	}

	/**
	 * Функция пересчёта высоты элементов
	 * Срабатывает при загрузке и ресайзе окна.
	 */
	$.fn.equalHeightResponsive = function () {
		var _this = this;

		function equal() {
			_this.equalheightRun();
		}
		$(window).on('load resize', _this, equal);
		return this;
	}

})(jQuery);
