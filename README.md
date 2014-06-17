Плагин equalHeightResponsive
============================

jQuery-плагин для выравнивания высоты блоков на адаптивных сайтах.

[Демонстрация работы](http://git.io/OwM7Ow)

Плагин умеет:
------------

* Автоматически выравнивать высоту элементов в блоке
* Учитывать расположение элементов по рядам (строкам, линиям, называйте как угодно). Т.е. если в одной строке самый высокий элемент 200px, а в другой 100px - максимальная высота элементов во второй строке будет 100px, а не 200.
* Отслеживать изменение размера окна браузера и перерасчитывать высоту элементов.
* Так же отслеживает событие `equal-refresh`, так что если надо переинициализировать скрипт - не проблема.


Использование
-------------
HTML:
~~~~ html
<div class="container">
    <div class="element"></div>
    <div class="element"></div>
    <div class="element"></div>
    <div class="element"></div>
</div>
~~~~

js:
~~~~ javascript
jQuery(document).ready(function($) {
    $('.element').equalHeightResponsive();
});
~~~~


Для повторной инициализации делаем так (более правильный вариант):
~~~~ javascript
$('.element').equalHeightResponsive('refresh');
~~~~
или так:
~~~~ javascript
$('.element').trigger('equal-refresh');
~~~~

Можно устанавливать обрабатываемым блокам свойство line-height, равное (высота - 4px), для этого нужно "активировать" опцию setLineHeight, вот так:
~~~~ javascript
$('.element').equalHeightResponsive({setLineHeight : true});
~~~~


Демо
----
[Демонстрация работы](http://git.io/OwM7Ow)