# ngKookies

[![build status](http://img.shields.io/travis/voronianski/ngKookies.svg?style=flat)](https://travis-ci.org/voronianski/ngKookies)

> Small provider to deal with cookies in Angular.js apps. It supports useful [options](https://github.com/voronianski/ngKookies#options) and [converter functions](https://github.com/voronianski/ngKookies#converters), replaces default [`$cookieStore`](https://docs.angularjs.org/api/ngCookies/service/$cookieStore) due to well-known limitations (https://github.com/angular/angular.js/issues/950).

## Install

You can download `ngKookies` manually or install it via [bower](http://bower.io):

```bash
bower install ngkookies
```

or via [npm](https://www.npmjs.org)

```bash
npm install ngkookies
```

## Usage

### Create cookies

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    // 1. create session cookie
    $kookies.set('name', 'value');

    // 2. create expiring cookie
    $kookies.set('name', 'value', {expires: 7});

    // 3. Create expiring cookie, valid across entire site
    $kookies.set('name', 'value', {expires: 7, path: '/'});
});
```

### Read cookies

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    $kookies.set('name', 'value');

    // read cookie
    $kookies.get('name'); // "value"
    $kookies.get('nothing'); // undefined

    // read all available cookies
    $kookies.get();
});
```

### Delete cookies

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    $kookies.set('name', 'value');

    // delete cookie
    $kookies.remove('name'); // true
    $kookies.remove('nothing'); // false
});
```

It is necessary to pass the exact same path, domain and secure options that were used to set the cookie, unless you're relying on the default options:

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    $kookies.set('name', 'value', {path: '/'});

    $kookies.remove('name'); // false
    // use the same options (path, domain) as what the cookie was written with
    $kookies.remove('name', {path: '/'}); // true
});
```

## Configuration

##### `raw {Boolean}`

By default the cookie value is encoded/decoded when writing/reading, using `encodeURIComponent`/`decodeURIComponent`. Bypass this by setting raw to `true`.

```javascript
var app = angular.module('exampleApp', ['ngKookies'])

.config(['$kookiesProvider', 
    function ($kookiesProvider) {
        $kookiesProvider.config.raw = true;
    }
]);
```

##### `json {Boolean}`

Turn on automatic storage of JSON objects passed as the cookie value with angular's [`fromJson`](https://docs.angularjs.org/api/ng/function/angular.fromJson)/[`toJson`](https://docs.angularjs.org/api/ng/function/angular.toJson).

```javascript
var app = angular.module('exampleApp', ['ngKookies'])

.config(['$kookiesProvider', 
    function ($kookiesProvider) {
        $kookiesProvider.config.json = true;
    }
]);
```

## Options

Cookie options can be set globally by setting properties of the `$kookiesProvider.config` object or individually for each call to `$kookies.set()` by passing a plain object to the options argument. Per-call options override the default options.

##### `expires {Number|Date}` 

Define lifetime of the cookie. Value can be a `Number` which will be interpreted as days from time of creation or a `Date` object. If omitted, the cookie becomes a session cookie.

##### `path {String}`

Define the path where the cookie is valid. *By default the path of the cookie is the path of the page where the cookie was created (standard browser behavior).* If you want to make it available for instance across the entire domain use `path: '/'`.

**Note regarding Internet Explorer:**

> Due to an obscure bug in the underlying WinINET InternetGetCookie implementation, IE’s document.cookie will not return a cookie if it was set with a path attribute containing a filename.

(From [Internet Explorer Cookie Internals (FAQ)](http://blogs.msdn.com/b/ieinternals/archive/2009/08/20/wininet-ie-cookie-internals-faq.aspx))

This means one cannot set a path using `path: window.location.pathname` in case such pathname contains a filename like so: `/check.html` (or at least, such cookie cannot be read correctly).

##### `domain {String}`

Define the domain where the cookie is valid. Defaults to domain of page where the cookie was created.

##### `secure {Boolean}`

If `true` the cookie transmission requires a secure protocol (https). Defaults to `false`.

## Converters

Provide a conversion function as optional last argument for reading, in order to change the cookie's value to a different representation on the fly.

Example for parsing a value into a `Number`:

```javascript
$kookies.set('foo', '42');
$kookies.get('foo', Number); // 42
```

## References

- initially ported from [jquery-cookie](https://github.com/carhartl/jquery-cookie).

## License

MIT Licensed

Copyright (c) 2014 Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
