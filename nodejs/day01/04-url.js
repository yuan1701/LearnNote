/**
 * nodejs的url模块:http://nodejs.cn/api/url.html
 * 
 * req.url:表示用户请求的url
 * 
 * url.parse()可以将url分为很多部分：
 * protocol
 * username
 * password
 * host
 * search
 * hostname
 * port
 * path
 * pathname
 * hash
 * 
 */
const http = require('http')
const url = require('url')

http.createServer((req, res) => {
    if(req.url === '/favicon.ico'){return}
    // 若访问的地址为：http://127.0.0.1:3000/path/name?id=1212&name=lili&lili
    pathname = url.parse(req.url).pathname
    query1 = url.parse(req.url).query
    // 第二个参数如果为true,返回为一个Object
    query2 = url.parse(req.url, true).query  


    console.log(pathname)
    // /path/name
    console.log(query1)
    // id=1212&name=lili&lili
    console.log(query2)
    // [Object: null prototype] { id: '1212', name: 'lili', lili: '' }


    res.writeHead(200, { "Content-Type": "text/html" });
    res.end()

}).listen(3000, '127.0.0.1', () => {
    console.log('Http server is listening at port 3000')
})