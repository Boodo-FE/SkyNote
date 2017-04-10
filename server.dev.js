import path from 'path'
import webpack from 'webpack'
import express from 'express'
import _debug from 'debug'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from './webpack.dev.config'

const debug = _debug('app:server')
const app = express()
const compiler = webpack(webpackConfig)
const serverOptions = { publicPath: webpackConfig.output.publicPath }

app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './src/index.html'));
})

app.listen(3001, () => {
  console.log("Webpack dev server listening on port 3001")
})

