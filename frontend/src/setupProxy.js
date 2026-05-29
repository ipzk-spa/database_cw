const { createProxyMiddleware } = require("http-proxy-middleware");

const target =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

module.exports = function (app) {
  app.use(
    ["/auth", "/users", "/alcohol", "/orders", "/order-items", "/uploads"],
    createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
};
