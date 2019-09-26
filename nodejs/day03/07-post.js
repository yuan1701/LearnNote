/**
 * 在express中不能直接使用express
 * 
 * 
 * 
 * 如何获取get请求？后面的参数
 * 1.在原生node中,需要使用url模块来识别参数字符串
 * 2.在express中用req.query()
 * 
 * app.get('/',(req,res)=>{
 *   res.send({query:req.query})
 * })
 * 
 * 
 * 如何获取post请求的参数？
 * 
 * 1.在原生node中如何获取？
 * 
 * 2.post请求在express中无法直接获取，需要使用body-parser模块，然后使用req.body得到如果有文件上传还是需要formidable模块
 * 
 * npm install --save body-parser（可以处理简单的文本信息）
 * 
 */

const express = require('express')
/** 1.引入 */
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use((req,res)=>{
    res.send(req.body)
    res.end('test express post ')

})


app.listen('3000')
