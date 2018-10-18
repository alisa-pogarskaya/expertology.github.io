'use strict';

/**
 * Polifyll v1.0.0
 * Copyright 2018 Evgeniy Kozirev
 */

/**
 * Polifyll Object.assign
 *
 * @param {object} Объект, в который произойдет копирование
 *
 * @param {object} ...arg Объекты, которые будут скопированны
 *
 * @return {object} Новый объект
 */
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target, firstSource) {
            'use strict';

            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

/**
 * Element hasClass
 *
 * @param {string} className селектор
 *
 * @return {boolean}
 *  - Возвращает true, если есть класс с указанным именем,
 *  - Возвращает false, если нет класса с указанным именем
 */
if (!Element.hasClass) {
    Object.defineProperty(Element.prototype, 'hasClass', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function value(className) {
            if (this.classList) return this.classList.contains(className);else return new RegExp('(^|\\s)' + className.split(' ').join('|') + '(\\s|$)', 'gi').test(this.className);
        }
    });
}

/**
 * Element addClass
 *
 * @param {string} className селектор
 *
 * @return {Element} Element, Возвращает элемент, которому был(и) добавлен(ы) класс(ы)
 */
if (!Element.addClass) {
    Object.defineProperty(Element.prototype, 'addClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(className) {
            if (this.classList) this.classList.add(className);else this.className += ' ' + className;

            return this;
        }
    });
}

/**
 * NodeList addClass
 *
 * @param {string} className селектор
 *
 * @return {NodeList} NodeList, Возвращает элементы, которому был(и) добавлен(ы) класс(ы)
 */
if (!NodeList.addClass) {
    Object.defineProperty(NodeList.prototype, 'addClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(className) {
            Array.prototype.forEach.call(this, function (item) {
                if (item.classList) item.classList.add(className);else item.className += ' ' + className;
            });
            return this;
        }
    });
}

/**
 * Element removeClass
 *
 * @param {string} className селектор
 *
 * @return {Element} Element, Возвращает элемент, в котором был(и) удален(ы) класс(ы)
 */
if (!Element.removeClass) {
    Object.defineProperty(Element.prototype, 'removeClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(className) {
            if (this.classList) this.classList.remove(className);else this.className = this.className.replace(new RegExp('(^|\\s)(' + className.split(' ').join('|') + ')(\\s|$)', 'gi'), '');

            return this;
        }
    });
}

/**
 * NodeList removeClass
 *
 * @param {string} className селектор
 *
 * @return {NodeList} NodeList, Возвращает элементы, в котором был(и) удален(ы) класс(ы)
 */
if (!NodeList.removeClass) {
    Object.defineProperty(NodeList.prototype, 'removeClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(className) {
            Array.prototype.forEach.call(this, function (item) {
                if (item.classList) item.classList.remove(className);else item.className = this.className.replace(new RegExp('(^|\\s)(' + className.split(' ').join('|') + ')(\\s|$)', 'gi'), '');
            });
            return this;
        }
    });
}

/**
 * NodeList addEventListener
 * Добавляет возможность подписаться на события из NodeList
 *
 * @param {string} _event Event name, 'click', 'mouseup' ...
 *
 * @param {function} fn обработчик события
 *
 * @return {Element} Element, Возвращает элемент, в котором произошло событие
 */
if (!NodeList.addEventListener) {
    Object.defineProperty(NodeList.prototype, 'addEventListener', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function addEventListener(_event, fn) {
            Array.prototype.forEach.call(this, function (item) {
                item.addEventListener(_event, fn);
            });
            return this;
        }
    });
}

/**
 * Element offset
 * Определение смещения
 *
 * @return {Element} Element, Возвращает объект с длинами. { top: 10, left: 10 }
 */
if (!Element.offset) {
    Object.defineProperty(Element.prototype, 'offset', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value() {
            var rect = this.getBoundingClientRect();
            return {
                top: rect.top + (window.pageYOffset || document.body.scrollTop),
                left: rect.left + (window.pageYOffset || document.body.scrollLeft)
            };
        }
    });
}

/**
 * Element closest
 * Определение смещения
 *
 * @return {Element} Element, Возвращает найденный элемент или null
 */
if (!Element.closest) {
    Element.prototype.matches = Element.prototype.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

    Object.defineProperty(Element.prototype, 'closest', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function closest(selector) {
            if (!this) return null;
            if (this.matches(selector)) return this;
            if (!this.parentElement) {
                return null;
            } else return this.parentElement.closest(selector);
        }
    });
}

/**
 * Установка зависимостей
 *  - Ассинхронная загрузка зависимостей, после которых можно выполнить callback - функцию
 *    или подписаться на событие 'vendorinstall', которое срабатывает после загрузки.
 *
 * @param type (string|array)
 *  - путь к зависимости
 *
 * @param type (function)
 *  - callback - функция
 *
 * @return type (Element)
 *  - возращает script элемент, к которому можно подписаться на событие
 *
 */
function installVendor(vendor, fn) {

    if (vendor.forEach) {
        vendor.forEach(function (el, i, arr) {
            var vendorScript = document.createElement('script');
            vendorScript.type = "text/javascript";
            vendorScript.src = el;
            if (i == arr.length) {
                vendorScript.onload = function () {
                    if (typeof fn === 'function') fn();
                    EventLoad(vendorScript);
                };
            }
            document.head.appendChild(vendorScript);
        });
    } else {
        var vendorScript = document.createElement('script');
        vendorScript.type = "text/javascript";
        vendorScript.src = vendor;
        vendorScript.onload = function () {
            if (typeof fn === 'function') fn();
            EventLoad(vendorScript);
        };
        document.head.appendChild(vendorScript);
    }

    function EventLoad(el) {
        try {
            var event = new Event('vendorinstall', {
                cancelable: true
            });
            if (!el.dispatchEvent(event)) {}
        } catch (e) {
            var event = document.createEvent("Event");
            event.initEvent('vendorinstall', false, true);
            if (!el.dispatchEvent(event)) {}
        }
    }

    return vendorScript;
}
/*******************************************************************************************************/

function DOMLoad(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function WinLoad(fn) {
    window.addEventListener('load', fn);
}

DOMLoad(function () {

    var _document = document;

    // Ассинхронная загрузка стилей
    (function (styleFiles) {
        if (styleFiles && styleFiles.length) {
            Array.prototype.forEach.call(styleFiles, function (styleFile) {
                var vendorCss = document.createElement('link');
                vendorCss.rel = 'stylesheet';
                vendorCss.href = styleFile.getAttribute('asynccss');
                _document.head.insertBefore(vendorCss, styleFile);
                _document.head.removeChild(styleFile.nextElementSibling);
                _document.head.removeChild(styleFile);
            });
        }
    })(_document.head.querySelectorAll('script[asynccss]'));
});

'use strict';

// object-fit polyfill (for img)
if ('objectFit' in document.documentElement.style === false) {
    DOMLoad(function () {
        Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
            (image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

            image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
        });
    });
}

installVendor('js/vendor/vendors.js', function () {

    svg4everybody();

    DOMLoad(function () {
        var $document = $(document);
        var media = window.matchMedia;

        // Search Menu
        var searchBlock = $('.search-header__hidden');

        $document.on('click', '[data-header="search"]', function () {
            searchBlock.slideToggle();
            return false;
        });

        // Button Menu
        (function (buttonMenu) {
            var _document = document;
            var body = _document.body;
            var menu = _document.getElementById(buttonMenu.getAttribute('data-toggle'));

            _document.addEventListener('click', function (event) {
                if (event.target.closest('#' + buttonMenu.getAttribute('data-toggle')) !== menu && event.target.closest('button[data-toggle="navigation-menu"]') !== buttonMenu) {
                    buttonMenu.removeClass('is-active');
                    menu.removeClass('is-active');
                    body.removeClass('menu-open');
                } else {
                    if (event.target.closest('#navigation-menu a') && !event.target.closest('#navigation-menu a').hasClass('down') || event.target.closest('#navigation-menu button')) {
                        buttonMenu.removeClass('is-active');
                        menu.removeClass('is-active');
                        body.removeClass('menu-open');
                    }
                }

                if (event.target.closest('button[data-toggle="navigation-menu"]') === buttonMenu) {
                    event.preventDefault();
                    toogleMenu();
                }
            });

            function toogleMenu() {
                var open = buttonMenu.hasClass('is-active');

                if (!open) {
                    buttonMenu.addClass('is-active');
                    menu.addClass('is-active');
                    body.addClass('menu-open');
                } else {
                    buttonMenu.removeClass('is-active');
                    menu.removeClass('is-active');
                    body.removeClass('menu-open');
                }
            }
        })($('button[data-toggle="navigation-menu"]')[0]);

        // Down menu
        $document.on('click', function (e) {
            if (media && media('(max-width: 1279px)').matches) {
                var $target = $(e.target).closest('li');
                var $down = $('.down').closest('li');

                if ($down.toArray().some(function (el) {
                    return el === $target[0];
                })) {
                    e.preventDefault();
                    if (!$target.hasClass('is-active')) $target.addClass('is-active');else $down.removeClass('is-active');
                }
            }
        });

        // Main slider
        (function ($container) {
            if ($container.length) {
                var $buttons = $container.find('li');
                var $slides = $container.find('[class*="__slide"]');

                $document.on('click', '.main-slider [class*="__controls"]', function (e) {
                    var $item = $(e.target).closest('li');
                    $buttons.removeClass('active');
                    $slides.removeClass('active');

                    $item.addClass('active');
                    $slides.eq($item.index()).addClass('active');
                });
            }
        })($('[data-js=\'main-slider\']'));

        // Cart carousel
        $('[data-js="cart-carousel"]').slick({
            prevArrow: '<button class="slide_prev" type="button"><svg class="icon icon-arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow"></use></svg></button>',
            nextArrow: '<button class="slide_next" type="button"><svg class="icon icon-arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow"></use></svg></button>',
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            infinite: false,
            draggable: false,
            lazyLoad: 'ondemand',
            responsive: [{
                breakpoint: 1279,
                settings: {
                    draggable: true
                }
            }, {
                breakpoint: 860,
                settings: {
                    draggable: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 767,
                settings: {
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        // Tabs
        (function ($container) {
            if ($container.length) {
                var $tabs = $container.find('[data-target]');

                if ($tabs.length) {
                    $document.on('click', function (e) {
                        var $target = $(e.target);

                        if ($tabs.toArray().some(function (el) {
                            return el === $target[0];
                        })) {
                            e.preventDefault();
                            if ($target.hasClass('is-active')) return false;

                            var $data = $('#' + $target.attr('data-target'));

                            $tabs.removeClass('is-active');
                            $target.addClass('is-active');

                            $data.parent().children().removeClass('is-active');
                            $data.addClass('is-active');
                        }
                    });
                }
            }
        })($('[data-js="tabs"]'));
    });
});

function downNext() {
    if (typeof TweenMax !== 'undefined') {
        TweenMax.to('body, html', 1, {
            scrollTop: viewport().height,
            ease: Expo.easeOut
        });
        return false;
    } else {
        if (typeof $ !== 'undefined') {
            $('body, html').animate({
                scrollTop: viewport().height
            }, 1000);
            return false;
        }
    }
};