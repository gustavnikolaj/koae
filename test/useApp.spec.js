const Koe = require('../')
const expect = require('unexpected')
  .clone()
  .use(require('unexpected-koa'));

it('should allow mounting an app as a middleware', () => {
  const app = new Koe();
  const wrapApp = new Koe();

  app.use(async (ctx, next) => {
    ctx.status = 418;
    ctx.body = 'Foobar';
  })

  wrapApp.use(app);

  return expect(wrapApp, 'to yield exchange', {
    request: 'GET /',
    response: {
      statusCode: 418,
      body: 'Foobar'
    }
  })
})
