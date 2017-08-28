/* global beforeAll */

const koae = require('../');
const expect = require('unexpected').clone().use(require('unexpected-koa'));

describe('params', () => {
    it('should pass params in opts', () => {
        const app = koae();

        app.get('/user/:id', (ctx, ...restArgs) => {
            ctx.headers['Content-Type'] = 'application/json';
            ctx.body = restArgs.map(
                x => (typeof x === 'function' ? 'function' : x)
            );
        });

        return expect(app, 'to yield exchange', {
            request: 'GET /user/foo',
            response: {
                body: ['foo', 'function']
            }
        });
    });
});

describe('GET', () => {
    let app;
    beforeAll(() => {
        app = koae();

        app.get('/foo', async (ctx, next) => {
            ctx.status = 418;
            ctx.body = 'Foobar';
        });
    });

    it('should serve the content when matching the route', () => {
        return expect(app, 'to yield exchange', {
            request: 'GET /foo',
            response: {
                statusCode: 418,
                body: 'Foobar'
            }
        });
    });

    it('should handle a HEAD request on a GET route', () => {
        return expect(app, 'to yield exchange', {
            request: 'HEAD /foo',
            response: 418
        });
    });

    it('should return a 404 when not matching the route', () => {
        return expect(app, 'to yield exchange', {
            request: 'GET /foobar',
            response: 404
        });
    });

    it('should return a 404 when POSTing the route', () => {
        return expect(app, 'to yield exchange', {
            request: 'POST /foo',
            response: 404
        });
    });
});

for (const method of koae.Koae.methods.filter(method => method !== 'get')) {
    describe(method.toUpperCase(), () => {
        let app;
        beforeAll(() => {
            app = koae();

            app[method]('/foo', async (ctx, next) => {
                ctx.status = 418;
                ctx.body = `${method} handler`;
            });
        });

        it('should serve the content when matching the route', () => {
            return expect(app, 'to yield exchange', {
                request: `${method.toUpperCase()} /foo`,
                response: {
                    statusCode: 418,
                    body: `${method} handler`
                }
            });
        });

        it('should return a 404 when not matching the route', () => {
            return expect(app, 'to yield exchange', {
                request: `${method.toUpperCase()} /foobar`,
                response: 404
            });
        });

        it('should return a 404 when GETing the route', () => {
            return expect(app, 'to yield exchange', {
                request: 'GET /foo',
                response: 404
            });
        });
    });
}
