describe('ngKookies module', function () {
    var $kookies;

    describe('when using default config', function () {
        beforeEach(module('ngKookies'));

        beforeEach(function () {
            inject(function ($injector) {
                $kookies = $injector.get('$kookies');
            });
        });

        describe('when saving a String cookie value', function() {
            var testKey = 'testKey';
            var testValue = 'testValue';
            var testOptions = {path: '/'};

            beforeEach(function () {
                $kookies.set(testKey, testValue, testOptions);
            });

            it('should save value to cookies', function () {
                expect($kookies.get(testKey)).toBe(testValue);
            });

            describe('when removing a cookie', function () {
                beforeEach(function () {
                    $kookies.remove(testKey, testOptions);
                });

                it('should return empty cookies', function () {
                    expect($kookies.get(testKey)).toBeUndefined();
                });
            });
        });

        describe('when saving a raw Number cookie and using converter', function() {
            var testKey = 'testKey';
            var testValue = 123;

            beforeEach(function () {
                $kookies.set(testKey, testValue);
            });

            it('should save value to cookies', function () {
                expect($kookies.get(testKey, Number)).toBe(testValue);
            });

            describe('when removing a cookie', function () {
                beforeEach(function () {
                    $kookies.remove(testKey);
                });

                it('should return empty cookies', function () {
                    expect($kookies.get(testKey)).toBeUndefined();
                });
            });
        });

        describe('when saving an object cookie without JSON parser', function() {
            var testKey = 'testKey';
            var testValue = {foo: 'bar'};

            beforeEach(function () {
                $kookies.set(testKey, testValue);
            });

            it('should save value to cookies', function () {
                expect($kookies.get(testKey)).toBe('[object Object]');
            });

            describe('when removing a cookie', function () {
                beforeEach(function () {
                    $kookies.remove(testKey);
                });

                it('should return empty cookies', function () {
                    expect($kookies.get(testKey)).toBeUndefined();
                });
            });
        });
    });

    describe('when using JSON parsing in provider config', function () {
        beforeEach(module('ngKookies', function ($kookiesProvider) {
            $kookiesProvider.setConfig({json: true});
        }));

        beforeEach(function () {
            inject(function ($injector) {
                $kookies = $injector.get('$kookies');
            });
        });

        describe('when saving an object cookie', function() {
            var testKey = 'testKey';
            var testValue = {foo: 'bar'};

            beforeEach(function () {
                $kookies.set(testKey, testValue);
            });

            it('should save value to cookies', function () {
                expect($kookies.get(testKey)).toEqual(testValue);
            });

            describe('when removing a cookie', function () {
                beforeEach(function () {
                    $kookies.remove(testKey);
                });

                it('should return empty cookies', function () {
                    expect($kookies.get(testKey)).toBeUndefined();
                });
            });
        });
    });

});
