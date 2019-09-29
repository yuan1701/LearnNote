const express = require('express')
const cookieParser = require('cookie-parser')
 
const app = express()
/** 使用cookie必须使用cookie-parse中间件 */
app.use(cookieParser())
 

// http://127.0.0.1:3000/like?favirate=app
app.get('/like',(req,res)=>{
    /** 得到get请求，得到用户喜欢 */
    const like = req.query.favirate

    /** 查询cookie，将新的like添加到cookie中,并设置新的cookie */
    let likes = req.cookies.likes || []
    likes.push(like)
    /** maxAge 在express中以毫秒为单位 */
    res.cookie('likes',likes,{maxAge: 900000, httpOnly:true})
    res.send(like+'攻略')

})
 
app.get('/', (req, res)=> {
    res.send('猜你喜欢：'+ req.cookies.likes||'暂无喜欢')
})
app.listen(3000)


/**
 * 注意：req用来获取cookie
 * req.cookies
 * 
 * res设置cookie：
 * res.cookie(key,value)
 */
