
/*! jQuery.equalHeightResponsive | v.1.6 | 24.04.2015 | http://git.io/OwM7Ow */
/**
 * Плагин     : jQuery.equalHeightResponsive
 * Версия     : 1.6 (24.04.2015)
 * Репозиторий: http://git.io/OwM7Ow
 * Автор      : ПафНутиЙ
 * Twitter    : @pafnuty_name
 * Назначение : Автоматическое выравнивание высоты блоков (в каждом ряду своя высота) для адаптивных сайтов. Плагин срабатывает при событиях window:
 * load
 * resize
 * equal-refresh
 *
 * Плагин основан на коде из поста: http://css-tricks.com/equal-height-blocks-in-rows/
 *
 *
 * Использование:
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
 * Для повторной инициализации делаем так:
 * $('.element').equalHeightResponsive('refresh');
 * или
 * $('.element').trigger('equal-refresh.equalHeightResponsive');
 * или
 * $('.element').trigger('equal-refresh');
 *
 * Так же возможно устанавливать обрабатываемым блокам свойство line-height, равное высоте.
 * Предусмотрена возможность влиять на line-height (иногда нужно на её уменьшить/увеличить.)
 * Для этого нужно "активировать" опцию setLineHeight, вот так:
 * $('.element').equalHeightResponsive({
 *     setLineHeight : true,
 *     lineHeightOffset: 0
 * });
 *
 *
 */


;(function ($, window, document, undefined) {
	'use strict';
	var maxHeight = 0,
		currentRowStart = 0,
		rowEls = [],
		topPostion = 0,
		$el,
		currentEl,
		defaults = {
			setLineHeight: false,
			lineHeightOffset: -4
		},
		methods = {
			init: function (options) {

				var props = $.extend({}, defaults, options),
					_this = this,
					$window = $(window),
					winWidth = $window.width(), // IE8 loop resize fix
					winHeight = $window.height(), // IE8 loop resize fix
					_run = function (e) {
						var winNewWidth = $window.width(), // IE8 loop resize fix
							winNewHeight = $window.height(); // IE8 loop resize fix
						// IE8 loop resize fix
						if ((winWidth != winNewWidth || winHeight != winNewHeight) || e.type == 'load' || e.type == 'equal-refresh') {
							methods.run(_this, props);
						}
						// IE8 loop resize fix
						winWidth = winNewWidth;
						winHeight = winNewHeight;
					};

				$window.on('load.equalHeightResponsive resize.equalHeightResponsive equal-refresh.equalHeightResponsive', _this, _run);

				// Bitrix composite fix
				if (window.frameCacheVars !== undefined) {
					methods.run(_this, props);
				}

				return this;

			},
			run: function (elements, options) {

				$.each(elements, function () {
					$el = $(this);
					$($el).height('auto');
					topPostion = $el.offset().top;
					if ($el.is(':visible')) {
						if (currentRowStart != topPostion) {
							for (currentEl = 0; currentEl < rowEls.length; currentEl++) {
								rowEls[currentEl].height(maxHeight);
							}
							rowEls.length = 0;
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
							if (options.setLineHeight) {
								rowEls[currentEl].css({
									'line-height': maxHeight + options.lineHeightOffset + 'px'
								});
							}
						}
					}
				});

				return this;
			},
			refresh: function () {
				$(window).trigger('equal-refresh.equalHeightResponsive');
				return this;
			}
		};

	$.fn.equalHeightResponsive = function (method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Метод с именем ' + method + ' не существует для jQuery.equalHeightResponsive');
		}

	};

})(jQuery, window, document);