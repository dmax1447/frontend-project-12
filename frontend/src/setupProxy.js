const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setup(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://frontend-chat-ru.hexlet.app',
      changeOrigin: true,
    }),
  );
};
