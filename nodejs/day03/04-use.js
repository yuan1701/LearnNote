/**
 * 
 * 
 *  
 *  
 */
const express = require('express')

const app = express()

/**
 * 写在前面,下面的demo可以匹配到任何以/app/开头的路由
 * 以http://127.0.0.1:3000/app/aa为例
 */

/** 
app.use('/app',(req,res,next)=>{
 res.write(req.originalUrl+'\n')  //  /app/aa
 res.write(req.baseUrl+'\n') // /app
 res.write(req.path) //  /aa
 next()
})
*/

/**---two---------------------------------
 * 当你不写路径的时候，实际上就相当于"/",就是所有的网址
 */

/** 这个中间件在每次接受到请求是会被执行 */
app.use((err,data,next)=>{
    console.log('Time: %d',Date.now());
    next()
 })


 /**---three---------------------------
  *中间件函数是按顺序执行的，因此中间件的执行顺序也很重要 
  * 
  */


// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
    console.log('Hello World');
    next()
})
// requests will never reach this route 
app.get('/', function (req, res) {
    console.log('Welcome');
})

/** ------four--------------------------------
 * 静态服务(注意写在最前面,防止跟现有的文件名称冲突,一般不需要自己写)
 */
app.use(express.static('./public'))
/** 或 */
app.use('/static',express.static('./public'))

app.listen('3000')
