# ngKookies

> More powerful provider to deal with cookies in Angular.js with support of different [options](https://github.com/voronianski/ngKookies#options) and [converter functions](https://github.com/voronianski/ngKookies#converters). It replaces default [`$cookieStore`]() due to well-known [limitations](https://github.com/angular/angular.js/issues/950).

## Install

You can download `ngKookies` manually or install it via [bower](http://bower.io):

```bash
bower install ngKookies
```

or via [npm](https://www.npmjs.org)

```bash
npm install ngKookies
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

## Options

Cookie options can be set globally by setting properties of the `$.cookie.defaults` object or individually for each call to `$.cookie()` by passing a plain object to the options argument. Per-call options override the default options.

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

Initially ported from [jquery-cookie](https://github.com/carhartl/jquery-cookie).
