#!/usr/bin/env node
const program = require("commander");
const version = require("../package.json").version
const create = require("../create")
const { addPage, addComponent } = require('../add')
const { build } = require('../build')
const { dev } = require('../dev')
program.version(version, "-v, --version")
const chalk = require('chalk');
/* 创建项目 */
program
  .usage('<command> [options]')
  .command("create <name>")
  .description(chalk.blue("使用 km-cli 创建一个新的项目"))
  .action(name => {
    create(name);
  })
/* 新增 */
program
  .command('add <name>')
  .description(chalk.blue('使用 km-cli 添加页面或组件'))
  .option('-c', '添加一个组件')
  .option('-p', '添加一个页面')
  .action((name, cm) => {
    if (cm.c) {
      addComponent(name)
    } else if (cm.p) {
      addPage(name)
    }
  })
/* 打包 */
program.command('build')
  .description(chalk.blue('使用 km-cli 进行项目打包'))
  .action(() => {
    build()
  })
/* 启动本地服务器 */
program.command('dev')
  .description(chalk.blue('使用 km-cli 启动调试服务器'))
  .action(() => {
    dev()
  })
program.parse(process.argv);