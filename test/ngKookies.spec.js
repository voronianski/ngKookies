describe('ngKookies module', function () {
    var $kookies;

    beforeEach(module('ngKookies'));

    beforeEach(function () {
        inject(function ($injector) {
            $kookies = $injector.get('$kookies');
        });
    });

    describe('when saving cookie value', function() {
        beforeEach(function () {
            $kookies.set('testKey', 'testValue');
        });
    });
});
