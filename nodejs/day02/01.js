/**
 * 路径操作
 * require的路径是从当前路径开始出发
 * 
 * fs是从命令提示符开始查找
 * 
 * ps：require文件的时候将会执行这个文件
 * 
 */

/**
 * 如果我要用到b.js 在b.js中引入c.js
 */
require("./demo/b.js")

const fs = require('fs')
/**
 * 绝对路径__dirname
 */
fs.readFile(__dirname + '/demo/c.js', (err, data) => {
    if (err) throw err

    console.log(data.toString())
})
/**
 * 相对路径./
 */
fs.readFile('./demo/c.js', (err, data) => {
    if (err) throw err

    console.log(data.toString())
})
