const path = require('path')
const fs = require('fs')
const { getUserConfig } = require('./user.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 获取开发路由 */
async function getDevRoute() {
  let routers = []
  const config = await getUserConfig()
  if (!config.routes) return routers
  Object.keys(config.routes).map(key => {
    routers.push({
      from: `${key}`,
      to: `/${config.routes[key]}.html`
    })
  })
  return routers
}
/* 输出基本配置 */
async function getBaseConfig() {
  const entry = await getEntry()
  const output = await getOutput()
  const loaderPath = path.join(__dirname, '..', 'node_modules')
  const htmlPlugins = await getHtmlPlugins()
  const routes = await getDevRoute()
  return {
    mode: 'production',
    entry,
    output,
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      ...htmlPlugins
    ],
    resolveLoader: {
      alias: {
        'css-loader': `${loaderPath}/css-loader/dist`,
        'sass-loader': `${loaderPath}/sass-loader/dist`,
        'file-loader': `${loaderPath}/file-loader/dist`,
        'url-loader': `${loaderPath}/url-loader/dist`,
        'img-loader': `${loaderPath}/img-loader`,
        'html-loader': `${loaderPath}/html-loader/dist`,
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /.(jpg|png|png|jpeg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                name: '[name].[ext]',
                outputPath: 'images/',
              },
            },
            {
              loader: 'img-loader',
              options: {
                pngquant: {
                  quality: 80
                }
              }
            }
            // {
            //   loader: 'file-loader',
            //   options: {
            //     name: 'images/[name].[ext]',
            //     publicPath:'..',
            //     outputPath: '',
            //   }
            // }
          ],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(eot|woff2|woff|ttf|svg)/,
          use: [
            {

              loader: 'url-loader',
              options: {
                outputPath: 'font/',
                limit: 100,
                name: '[name].[ext]',
              }
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.join(process.cwd(), ''),
      historyApiFallback: {
        rewrites: [
          ...routes
        ]
      }
    }
  }
}
/* 获取html模板 */
async function getHtmlPlugins() {
  const config = await getUserConfig()
  /* 注入公共模块 */
  let globalChunks = []
  if (Object.keys(config.globalModules).length > 0) {
    globalChunks = Object.keys(config.globalModules)
  }
  let htmlPlugins = []
  let pagesPath = path.join(process.cwd(), 'pages')
  const files = await fs.readdirSync(pagesPath)
  if (files.length > 0) {
    files.map(file => {
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          filename: `./${file}.html`,
          template: `./pages/${file}/${file}.html`,
          chunks: [`${file}`, ...globalChunks]
        })
      )
    })
  }
  return htmlPlugins
}
/* 入口 */
async function getEntry() {
  let entry = {}
  let pagesPath = path.join(process.cwd(), 'pages')
  const files = await fs.readdirSync(pagesPath)
  if (files.length > 0) {
    files.map(file => {
      entry[file] = `./pages/${file}/${file}.js`
    })
  }
  /* 打包公共模块 */
  const config = await getUserConfig()
  if (Object.keys(config.globalModules).length > 0) {
    entry = Object.assign(entry, config.globalModules)
  }
  return entry
}
/* 出口 */
async function getOutput() {
  const config = await getUserConfig()
  const outputPath = path.join(process.cwd(), config.output || 'dist')
  let output = {
    filename: 'js/[name].js',
    path: outputPath,
    publicPath: config.publicPath || '/'
  }
  return output
}
module.exports = {
  getBaseConfig
}