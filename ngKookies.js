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
        this.$get = [function () {

        }];
    });
}));
