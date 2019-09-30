const express = require('express')
const session = require('express-session')
 
const app = express()
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/login', function (req, res, next) {
    req.session.login = true //设置这个session
    req.session.username = 'vun'
    res.send("你已经成功登录")
   
})
 
app.get('/', function (req, res, next) {
    console.log(req.session);
    
    if(req.session.login){
        res.send(req.session.username+"已经登陆.")
    }else {
        res.send("请登录")
    }
})
app.listen(3000)
