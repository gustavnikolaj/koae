const Koa = require('koa');

class Koe extends Koa {
  constructor(...args) {
    super(...args);
  }

  use(target) {
    if (target instanceof Koe) {
      throw new Error('NYI')
    }

    return super.use(target);
  }
}

module.exports = Koe;
