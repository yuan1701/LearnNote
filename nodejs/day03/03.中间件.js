/**
 * 中间件：
 * 如果我的get,post回调函数中，没有next参数，那么久匹配第一个路由，就不会往下匹配了
 * 如果想继续匹配的画就要写next()
 * 
 */
const express = require("express")

const app =express()

/**
 * 以下会打印1，还是2?如何让两个都执行？
 * 
 * 打印1
 * 1.next 会继续寻找匹配路由
 * 2.
 */
app.get('/', (req,res,next)=>{
    console.log('1')
    next()
})

app.get('/', (req,res)=>{
    console.log('2')
})

/**
 * app.get('/:username/:id', (req,res)=>{
 *  res.send('用户信息'+req.params.username)
 * })
 * app.get('/admin/login', (req,res)=>{
 *  res.send('管理员登录')
 *  console.log('2')
 * })
 * 
 * 上面两个路由似乎没有关系，但是实际上有冲突
 * 处理方法：
 * 1.交换位置，也就是说express的所有路由（中间件）的顺序是至关重要的
 * 具体的可以往上写，抽象的可以往下写
 * 2.next
 */

app.get('/:username/:id', (req,res,next)=>{
    const username = req.params.username
    /** 检索数据库，如果不存在 ，就next()*/
    if(username){
        res.send('用户信息'+username)
    }else{
        next()
    }
})

app.get('/admin/login', (req,res)=>{
    res.send('管理员登录')
    console.log('2')
})





app.listen('3000')
