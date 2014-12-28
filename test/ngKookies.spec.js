describe('ngKookies module', function () {
    var $kookies;

    beforeEach(module('ngKookies'));

    beforeEach(function () {
        inject(function ($injector) {
            $kookies = $injector.get('$kookies');
        });
    });

    describe('when saving cookie value', function() {
        var testKey = 'testKey';
        var testValue = 'testValue';

        beforeEach(function () {
            $kookies.set(testKey, testValue);
        });

        it('should save value to cookies', function () {
            expect($kookies.get(testKey)).toBe(testValue);
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
