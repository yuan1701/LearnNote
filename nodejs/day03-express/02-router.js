/**
 * 处理get请求
 * app.get(url,(err,data)=>{})
 * 处理post请求
 * app.post(url,(err,data)=>{})
 * 处理任何请求
 * app.all('/',(err,data)=>{})
 * 这里路由不区分大小写
 */
const express = require('express')

const app = express()

/**  如何获取到url的所有参数 ？#后面的数据会被忽略 */
/** 1. 正则,位置部分可以用()分组，然后用req.params[0],[1]获取 */
app.get(/^\/student\/([\d]{10})$/, (req,res)=>{
    res.send('<h1>这是学生信息界面，学号：</h1>'+req.params[0])
})

/** 2.使用冒号(推荐使用) */
app.get('/teacher/:id', (req,res)=>{
    const id = req.params['id']
    const reg = /^[\d]{6}/
    if(reg.test(id)){
        res.send('<h1>这是教师信息界面，工号：</h1>'+id)
    }else {
        res.send('请检查信息')
    }
})

app.listen('3000')
