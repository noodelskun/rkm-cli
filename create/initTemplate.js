const path = require("path");
const mkdirp = require("mkdirp");
const fs = require("fs");
const ora = require('ora');
const chalk = require('chalk');
const install = require("../utils/install");
/**
 * 
 * @param {String} name 项目名称
 */
function initTemplate(name, spinner) {
  spinner.text = '正在读取模板...'
  const templatePath = path.join(__dirname, 'template');
  fs.readdir(templatePath, async function (err, files) {
    if (err) return spinner.warn(chalk.red('读取模板失败！！！'))
    else {
      for (let i = 0; i < files.length; i++) {
        const template = require(`./template/${files[i]}`)
        await createTemplate(template(name), name, spinner)
      }
      setTimeout(() => {
        spinner.succeed(chalk.greenBright('项目创建完毕,开始下载依赖'))
      }, 3000)
    }
  })
}
/**
 * 
 */
function createTemplate({ isdir, hasFiles, dir, name, children, template, files }, projectDir, spinner) {
  spinner.text = chalk.greenBright('正在创建模板...')
  /* 如果是文件夹 */
  if (isdir) {
    const dirPath = path.join(process.cwd(), projectDir, dir, name);
    mkdirp(dirPath).then(err => {
      /* 如果有子文件夹 */
      if (children) {
        children.map((child) => {
          createTemplate(child, projectDir, spinner)
        })
      }
      /* 如果有子文件 */
      if (hasFiles) {
        files.map(file => {
          const FilePath = path.join(dirPath, file.name)
          fs.writeFile(FilePath, file.template.trim(), function (err) {
            if (err) spinner.warn(chalk.red(`创建${file.name}失败`))
          })
        })
      }
      if (!err) return true
      else return false
    })
  } else {
    /* 如果是文件 */
    const FilePath = path.join(process.cwd(), projectDir, dir, name);
    fs.writeFile(FilePath, template.trim(), async function (err) {
      /* 创建package.json后安装依赖 */
      if (name === 'package.json') {
        spinner2 = ora(chalk.greenBright('正在下载依赖...'))
        await install({ cwd: projectDir })
        spinner2.succeed(chalk.greenBright('依赖下载完毕'))
      }
      if (err) spinner.warn(chalk.red(`创建${name}失败`))
      else return true
    })
  }
}
module.exports = {
  initTemplate
}