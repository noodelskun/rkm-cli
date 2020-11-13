const webpack = require("webpack");
const ora = require('ora');
const chalk = require('chalk');
const { getBaseConfig } = require('../config/base.config.js')
async function build() {
    spinner = ora(chalk.greenBright('building....'))
    spinner.start(chalk.greenBright('building....'))
    const config = await getBaseConfig()
    webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) {
            spinner.warn(chalk.red(stats.compilation.errors))
        } else {
            spinner.warn(chalk.greenBright('build success'))
        }
    })
}
module.exports = {
    build
}