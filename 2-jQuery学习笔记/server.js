const express = require("express")
const bodyParser = require('body-parser')


const app =express()

app.use(express.static(__dirname))

// express的获取get请求
app.get('/haha', (req,res)=>{
    res.send(req.query)
})

// express的获取post请求

app.use(bodyParser.urlencoded({extended: false}))

app.post('/haha',(req,res)=>{
    res.send(req.body)

})
 

app.listen('3000')
