const koae = require('../');
const expect = require('unexpected');

it('should export the constructor', () => {
    const { Koae } = koae;
    expect(Koae, 'to be a function');
    expect(new Koae(), 'to be a', Koae);
});
