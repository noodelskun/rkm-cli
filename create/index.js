const path = require("path");
const mkdirp = require("mkdirp");
const ora = require('ora');
const chalk = require('chalk');
const { initTemplate } = require("./initTemplate")
/* 初始化项目 */
module.exports = function (name) {
  spinner = ora(chalk.greenBright('正在创建项目...'))
  spinner.start(chalk.greenBright('正在创建项目...'))
  const projectDir = path.join(process.cwd(), name);
  mkdirp(projectDir).then(err => {
    if (!err) spinner.warn(chalk.red('创建失败'))
    else {
      spinner.text = chalk.greenBright('创建项目成功，正在初始化...');
      initTemplate(name,spinner)
    }
  });
};