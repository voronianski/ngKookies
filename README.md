# ngKookies

> 

## Install

You can download `ngKookies.js` manually or install it via [bower]():

```bash
bower install ngKookies
```

or via [npm]()

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
    $kookies.get('name'); // "value"
    $kookies.get('nothing'); // undefined

    // Read all available cookies
    $kookies.get();
});
```

### Delete cookie

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    $kookies.remove('name'); // true
    $kookies.remove('nothing'); // false

    // Read all available cookies
    $kookies.get();
});
```

It's necessary pass the exact same path, domain and secure options that were used to set the cookie, unless you're relying on the default options:

```javascript
var app = angular.module('exampleApp', ['ngKookies']);

app.controller('MainCtrl', function ($kookies) {
    $kookies.set('name', 'value', {path: '/'});

    $kookies.remove('name'); // false
    // use the same options (path, domain) as what the cookie was written with
    $kookies.remove('name', {path: '/'}); // true
});
```

## References
