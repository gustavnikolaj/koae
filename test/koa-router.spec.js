const expect = require('unexpected').clone().use(require('unexpected-koa'));
const Router = require('koa-router');
const koae = require('../');

it('should be able to use a koa router instance', async () => {
    const app = koae();
    const router = new Router({ prefix: '/foo' });

    router
        .get('/bar', ctx => ctx.body = 'router>foo>bar')
        .get('/baz', ctx => ctx.body = 'router>foo>baz');

    app
        .get('/foo/qux', ctx => ctx.body = 'router>foo>qux');

    app.use(router.routes());

    await expect(app, 'to yield exchange', {
        request: 'GET /foo/bar',
        response: 'router>foo>bar'
    });

    await expect(app, 'to yield exchange', {
        request: 'GET /foo/baz',
        response: 'router>foo>baz'
    });

    await expect(app, 'to yield exchange', {
        request: 'GET /foo/qux',
        response: 'router>foo>qux'
    });
});
