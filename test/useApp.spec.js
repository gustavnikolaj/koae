const Koe = require('../');
const expect = require('unexpected').clone().use(require('unexpected-koa'));

it('should allow mounting an app as a middleware', () => {
    const app = new Koe();
    const wrapApp = new Koe();

    app.use(async (ctx, next) => {
        ctx.status = 418;
        ctx.body = 'Foobar';
    });

    wrapApp.use(app);

    return expect(wrapApp, 'to yield exchange', {
        request: 'GET /',
        response: {
            statusCode: 418,
            body: 'Foobar'
        }
    });
});

it('should mount an app with a path prefix', async () => {
    const app = new Koe();
    const wrapApp = new Koe();

    app.use(async (ctx, next) => {
        ctx.status = 418;
        ctx.body = 'Foobar';
    });

    wrapApp.use('/foo', app);

    await expect(wrapApp, 'to yield exchange', {
        request: 'GET /foo',
        response: {
            statusCode: 418,
            body: 'Foobar'
        }
    });

    await expect(wrapApp, 'to yield exchange', {
        request: 'GET /',
        response: 404
    });
});

it('should mount a middleware with a path prefix', async () => {
    const app = new Koe();

    app.use('/foo', async (ctx, next) => {
        ctx.status = 418;
        ctx.body = 'Foobar';
    });

    await expect(app, 'to yield exchange', {
        request: 'GET /foo',
        response: {
            statusCode: 418,
            body: 'Foobar'
        }
    });

    await expect(app, 'to yield exchange', {
        request: 'GET /',
        response: 404
    });
});
