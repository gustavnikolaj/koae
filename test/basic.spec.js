const Koae = require('../');
const expect = require('unexpected');

it('should export a function api as an alternative', () => {
    expect(Koae.koae, 'to be a function');
});

it('should return an instance of Koae when called', () => {
    expect(Koae.koae(), 'to be a', Koae);
});
