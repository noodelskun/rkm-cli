const webpack = require("webpack");
const { getBaseConfig } = require('../config/base.config.js')
const { getDevConfig } = require('../config/dev.config.js')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge');
async function dev() {
  const config = await getBaseConfig()
  const devConfig = await getDevConfig()
  console.log(JSON.stringify(merge(config, devConfig).devServer))
  const compiler = webpack(merge(config, devConfig))
  const devServerOptions = Object.assign({}, config.devServer, {
    open: true,
    liveReload: true,
    watchContentBase: true,
    compress: true,
    stats: {
      colors: true
    }
  })
  const server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(config.devServer.port || 8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
}
module.exports = {
  dev,
}