/**
 * 
 * post请求的接受
 * 
 * nodejs的post请求爱较为复杂，因为nodejs认为post的数据比较多
 * 
 * 为了追求极致效率，他将数据拆分了很多数据块，然后通过特定事件，将这些小数据有序传递给回调函数
 * 
 * nodejs的api文档：https://nodejs.org/dist/latest-v10.x/docs/api/querystring.html
 * 
 * 第三方模块查找地址：https://www.npmjs.com/
 * 
 */
const http = require('http')
const querystring = require('querystring')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return
    
    console.log(req.url, req.method)
    /**
     * 如果请求为.dopost 且 method为post
     */
    if (req.url === '/dopost' && req.method.toLowerCase() === 'post') {

        /**
         * 这是一个post请求的公式
         * 
         * addListender是node的一个方法
         * 
         * node为了追求极致，他是一个小段一个小段接受的
         * 
         * 接受了一小段可能就去给别人服务了，防止一个过大的表单阻塞了整个进程
         */
        let allData = ''
        req.addListener('data', (chunk) => {
            allData += chunk
            console.log(chunk)
        })

        /** 全部传输完毕执行 */
        req.addListener('end', () => {
            /**   可以得到一个用and符号链接的字符串eg:name=12&password=12 */
            const dataString =allData.toString()
            /**   如何将上面的字符串转成一个对象 */
            const dataObj = querystring.parse(dataString)

            console.log(dataObj)

            res.end("success")
        })
    }

})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})



/**
 * a()--异步
 * b()--同步，需要依赖a()的数据
 *
 * 正常情况下先执行b()再执行a(),但是b()要依赖a()的方法我要怎么处理？回调
 *
 */
