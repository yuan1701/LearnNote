/**
 * 在express中不能直接使用express
 * 
 * req.query 获取get请求？后面的参数
 * 
 * app.get('/',(req,res)=>{
 *   res.send({query:req.query})
 * })
 * 
 * 
 * 如何获取post请求的参数？
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
