var logger = require('../logger');

describe('test logger', function () {
    it('logger', function () {
        expect(typeof logger.logger('test')).toBe('object');
    });

});