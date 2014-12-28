/*
 * ngKookies - relpacer for built-in $cookieStore
 * Details why - https://github.com/angular/angular.js/issues/950
 * http://github.com/voronianski/ngKookies
 * (c) 2014 MIT License, https://pixelhunter.me
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(root.angular);
    }
}(this, function (angular, undefined) {
    'use strict';

    angular.module('ngKookies', [])

    .provider('ngKookies', function () {
        var defaults = {};

        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = [function () {

            var privateMethods = {};
            var publicMethods = {};

            publicMethods.get = function (key, converter) {
                var result = key ? void 0 : {};
                var cookies = document.cookie ? document.cookie.split('; ') : [];

                for (var i = 0, l = cookies.length; i < l; i++) {
                    var parts = cookies[i].split('=');
                    var name = privateMethods.decode(parts.shift());
                    var cookie = parts.join('=');

                    if (key && key === name) {
                    // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
            };

            publicMethods.set = function (key, value, options) {
                options = angular.extend(options, defaults);

                if (typeof options.expires === 'number') {
                    var days = options.expires;
                    var time = options.expires = new Date();
                    time.setTime(+time + days * 864e+5);
                }

                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    // use expires attribute, max-age is not supported by IE
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
            };

            publicMethods.remove = function (key) {

            };

            return publicMethods;
        }];
    });
}));
