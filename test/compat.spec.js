const { Koae } = require("../");
const expect = require("unexpected").clone().use(require("unexpected-koa"));

it("should work as koa", () => {
  const app = new Koae();

  app.use(async (ctx, next) => {
    ctx.status = 418;
    ctx.body = "Foobar";
  });

  return expect(app, "to yield exchange", {
    request: "GET /",
    response: {
      statusCode: 418,
      body: "Foobar"
    }
  });
});
