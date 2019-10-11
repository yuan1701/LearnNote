
/**
 * 1.res.render()会根据views中的模板文件进行内容渲染
 * 2.如果要自己写一个文件夹app.set('views','a') a为自己的文件夹名字
 * 3.如果用于测试可以写res.send(),自动帮我们设置了Content-Type和200状态码
 * 4.要使用不同的状态码：res.status(404).send('Sorry, we cannot find that')
 * 5.不同的Content-Type：res.set('Content-type':'text/html')
 */
const express = require('express')

const app = express()

app.set('views','public')

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('05',{a:'express',news:[]})
})

app.get('/check',(req,res)=>{
    res.send({user:'lili'})
})

app.listen('3000')
