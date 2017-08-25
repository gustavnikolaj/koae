const Koa = require('koa');
const mount = require('koa-mount');

class Koe extends Koa {
  use(path, mwOrApp) {
    if (!mwOrApp) {
      mwOrApp = path;
      path = undefined;
    }

    if (path) {
      return super.use(mount(path, mwOrApp));
    }

    if (mwOrApp instanceof Koe) {
      mwOrApp = mount(mwOrApp);
    }

    return super.use(mwOrApp);
  }
}

module.exports = Koe;
