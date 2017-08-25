const Koa = require('koa');
const mount = require('koa-mount');

class Koe extends Koa {
  constructor(...args) {
    super(...args);
  }

  use(target) {
    if (target instanceof Koe) {
      return super.use(mount(target));
    }

    return super.use(target);
  }
}

module.exports = Koe;
