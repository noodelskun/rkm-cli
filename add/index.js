const pageTemplate = require('./page')
const componentTemplate = require('./component')
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
function createFiles({ isdir, hasFiles, dir, name, children, template, files }, cpPath) {
  const dirPath = path.join(process.cwd(), cpPath, dir, name);
  /* 如果是文件夹 */
  if(isdir) {
    mkdirp(dirPath).then(err =>{
      /* 如果有子文件夹 */
      if(children) {
        children.map(child =>{
          createFiles(child,cpPath)
        })
      }
      /* 如果有子文件 */
      if(hasFiles) {
        files.map(file =>{
          const FilePath = path.join(dirPath, file.name)
          fs.writeFile(FilePath, file.template, function (err) {
            if (err) console.log(`创建${file.name}失败`)
          })
        })
      }
    })
  }
}
function addPage(name) {
  createFiles(pageTemplate(name),'pages')
}
function addComponent(name) {
  createFiles(componentTemplate(name),'components')
}
module.exports = {
  addPage,
  addComponent
}