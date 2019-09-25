/**
 * 
 * 安装：npm i --save express  
 * 
 * --save 表示自动更新 packjson.json
 * 
 * 
 * 官网www.expressjs.com.cn
 * 
 * 强大之处：路由功能，静态文件处理，模板引擎
 * 
 */
const express = require("express")

const app =express()
/** 1. 路由能力 */
// app.get('/', (req,res)=>{
//     res.send('<h1>学习express</h1>')
// })

app.get('/haha', (req,res)=>{
    res.send('<h1>这是haha页面</h1>')
})

app.get(/^\/student\/([\d]{10})$/, (req,res)=>{
    res.send('<h1>这是学生信息界面，学号：</h1>'+req.params[0])
})

app.get('/teacher/:gonghao', (req,res)=>{
    res.send('<h1>这是教师信息界面，工号：</h1>'+req.params.gonghao)
})

/** 2.静态文件伺服能力 */
// app.use(express.static('./public'))

/** 3.模板引擎功能 */

app.set('view engine','ejs')   //就不需要require了，会自己去node_modules找

// 不需要加拓展名
app.get('/', (req,res)=>{
    res.render('05',{
        'a':'express',
        'news':['我是express里面的','我是express里面的1']
    })
})


app.listen('3000')
