/*
 * @Author: rkm
 * @Date: 2020-11-13 10:15:33
 * @LastEditTime: 2020-11-13 10:39:41
 * @FilePath: \rkm-cli\config\user.config.js
 * @LastEditors: rkm
 */
const path = require('path')
const fs = require('fs')
    /* 获取用户定义配置 */
async function getUserConfig() {
    let config = {
        globalModules: []
    }
    try {
        const res = await fs.readFileSync(path.join(process.cwd(), 'km.config.js'))
        if (res) {
            config = require(path.join(process.cwd(), 'km.config.js'))
        }
    } catch (e) {
        console.log('err', e)
    }
    return config
}
module.exports = {
    getUserConfig
}