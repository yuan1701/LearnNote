/**
 * 实现静态资源管理: 可以访问demo下的所有目录
 * 
 * 
 */

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    // 得到用户路径
    const pathname = url.parse(req.url).pathname
    // 默认index.html
    if (pathname === '/') pathname = 'index.html'
    // 拓展名
    extname = path.extname(pathname)
    // 读取这个文件
    fs.readFile('./demo/' + pathname, (err, data) => {
        if (err) {
            // 如果文件不存在，返回err.html
            fs.readFile('./demo/err.html', (err, data) => {
                res.writeHead(404, { 'Content-type': 'text/html;charset=UTF8' })
                res.end(data)
            })
            return
        }

        /**
         * 如果是图片的话就不能返回text/html了,所以要设置MIME类型
         * 网页文件：text/html
         * jpg文件：image/jpg
         * 所以要获得文件扩展名
         * 
         */
        
        res.writeHead(200, { 'Content-type': getMime(extname)+';charset=UTF8' })

        res.end(data)
    })
}).listen(3000, '127.0.0.1', () => {
    console.log('Http server is listening at port 3000')
})


function getMime(extname){
    switch(extname){
        case '.css': 
            return 'text/css';
            break;
        case '.html':
            return 'text/html';
            break;
        case '.jpg': 
            return 'image/jpg';
            break;
        
    }

}

