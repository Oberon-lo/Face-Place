// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//       '/sockets/chat',
//       proxy({
//         target: 'http://localhost:2552',
//         changeOrigin: true,
//         secure: false,
//         // logLevel: 'debug',
//         ws: true
//         // followRedrects: true
//       })
//   );
// };