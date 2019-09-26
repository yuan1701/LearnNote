/**
 * 
 * app.use('./app',(req.res)=>{
 *  res.write(req.originalUrl+'\n')
 *  res.write(req.baseUrl+'\n')
 *  res.write(req.path)
 * })
 *  
 *  
 */
const express = require('express')

const app = express()



/**
 * 当你不写路径的时候，实际上就相当于"./",就是所有的网址
 */
app.use(haha)

function haha(){
    console.log('我匹配到了很多路由')
}