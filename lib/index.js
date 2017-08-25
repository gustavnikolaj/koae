const Koa = require('koa');
const mount = require('koa-mount');
const route = require('koa-route');

class Koe extends Koa {
  constructor(...args) {
    super(...args);

    for (const method of Koe.methods) {
      this[method] = (path, handler) => this.use(route[method](path, handler));
    }
  }

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

Koe.methods = ['get', 'post', 'put', 'patch', 'delete'];

module.exports = Koe;
