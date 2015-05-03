/*
 * ngKookies - relpacer for built-in $cookieStore
 * Porque?? - https://github.com/angular/angular.js/issues/950
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

    .provider('$kookies', function () {
        var config = this.config = {};
        var defaults = this.defaults = {};

        this.setConfig = function (newConfig) {
            angular.extend(config, newConfig);
        };

        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        this.$get = function () {

            var privateMethods = {};
            var publicMethods = {};

            privateMethods.decode = function (s) {
                return config.raw ? s : decodeURIComponent(s);
            };

            privateMethods.encode = function (s) {
                return config.raw ? s : encodeURIComponent(s);
            };

            privateMethods.parseCookie = function (s) {
                if (s.indexOf('"') === 0) {
                    // unescape quoted cookie as according to RFC2068
                    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }

                try {
                    // replace server-side written pluses with spaces.
                    s = decodeURIComponent(s.replace(/\+/g, ' '));
                    return config.json ? angular.fromJson(s) : s;
                } catch(e) {
                    // do nothing
                }
            };

            privateMethods.stringifyCookie = function (value) {
                return privateMethods.encode(config.json ? angular.toJson(value) : String(value));
            };

            privateMethods.read = function (s, converter) {
                var value = config.raw ? s : privateMethods.parseCookie(s);
                return angular.isFunction(converter) ? converter(value) : value;
            };

            publicMethods.get = function (key, converter) {
                var result = key ? undefined : {};
                var cookies = document.cookie ? document.cookie.split('; ') : [];

                for (var i = 0, l = cookies.length; i < l; i++) {
                    var parts = cookies[i].split('=');
                    var name = privateMethods.decode(parts.shift());
                    var cookie = parts.join('=');

                    if (key && key === name) {
                        result = privateMethods.read(cookie, converter);
                        break;
                    }

                    if (!key && (cookie = privateMethods.read(cookie)) !== undefined) {
                        result[name] = cookie;
                    }
                }

                return result;
            };

            publicMethods.set = function (key, value, options) {
                options = options || {};
                options = angular.extend(options, defaults);

                if (typeof options.expires === 'number') {
                    var days = options.expires;
                    var time = options.expires = new Date();
                    time.setTime(+time + days * 864e+5);
                }

                var cookies = document.cookie = [
                    privateMethods.encode(key), '=', privateMethods.stringifyCookie(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join('');

                return cookies;
            };

            publicMethods.remove = function (key, options) {
                if (publicMethods.get(key) === undefined) {
                    return false;
                }

                publicMethods.set(key, '', angular.extend({expires: -1}, options));
                return !publicMethods.get(key);
            };

            return publicMethods;
        };
    });
}));
