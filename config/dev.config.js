/**
 * 开发环境注入组件路由
 * 以及alias
 */
const path = require('path')
const fs = require('fs')
const { getUserConfig } = require('./user.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 获取组件html */
async function getComponentHtmlPlugins() {
    const config = await getUserConfig()
    /* 注入公共模块 */
    let globalChunks = []
    if (Object.keys(config.globalModules).length > 0) {
        globalChunks = Object.keys(config.globalModules)
    }
    let componentsHtmlPlugins = []
    let componentsPath = path.join(process.cwd(), 'components')
    const files = await fs.readdirSync(componentsPath)
    if (files.length > 0) {
        files.map(file => {
            componentsHtmlPlugins.push(
                new HtmlWebpackPlugin({
                    filename: `./${file}.html`,
                    template: `./components/${file}/${file}.html`,
                    chunks: [`${file}`, ...globalChunks]
                })
            )
        })
    }
    return componentsHtmlPlugins
}
/* 获取组件入口 */
async function getComponentEntry() {
    let componentEntry = {}
    let componentPath = path.join(process.cwd(), 'components')
    const files = await fs.readdirSync(componentPath)
    if (files.length > 0) {
        files.map(file => {
            componentEntry[file] = `./components/${file}/${file}.js`
        })
    }
    /* 打包公共模块 */
    const config = await getUserConfig()
    if (Object.keys(config.globalModules).length > 0) {
        componentEntry = Object.assign(componentEntry, config.globalModules)
    }
    return componentEntry
}
/* 获取组件路由 */
async function getComponentRoute() {
    let routers = []
    let componentPath = path.join(process.cwd(), 'components')
    const files = await fs.readdirSync(componentPath)
    if (files.length > 0) {
        routers = files.map(file => {
            return {
                from: `/c_${file}`,
                to: `/${file}.html`
            }
        })
    }
    return routers
}
/* 输出dev配置 */
async function getDevConfig() {
    const componentEntry = await getComponentEntry()
    const componentHtmlPlugins = await getComponentHtmlPlugins()
    const componentRoutes = await getComponentRoute()
    return {
        entry: componentEntry,
        plugins: componentHtmlPlugins,
        devServer: {
            historyApiFallback: {
                rewrites: [...componentRoutes]
            }
        }
    }
}
module.exports = {
    getDevConfig
}