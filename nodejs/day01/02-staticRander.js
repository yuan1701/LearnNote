/**
 * nodejs没有根目录的概念，没有web容器
 * 让nodejs提供一个静态服务都非常难
 * 
 * nodejs最适合做顶层路由设计
 * 
 * nodejs的api：http://nodejs.cn/api/
 * 
 * node里面为什么用require()??
 */

// require表示引包，就是引用自己一个特殊的功能
var http = require('http')
var fs = require('fs')
// 创建服务器，参数是一个回调函数，表示如果有请求进来做什么,req是请求，res是返回
var server = http.createServer(function (req, res) {
  console.log(req.url)

  /**
   * 1.如何加载不同的html
   * 2.如何加载html里面的图片
   * 3.如何加载html里面的css文件
   */
  if (req.url === '/rect') {
    fs.readFile('./demo/01.html', (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      if (err) throw err;
    });
  } else if (req.url === '/cricle') {
    fs.readFile('./demo/02.html', (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      if (err) throw err;
    });
  } else if(req.url === '/01.jpg'){
    fs.readFile('./demo/01.jpg', (err, data) => {
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.end(data);
      if (err) throw err;
    });
  } else if(req.url === '/01.css') {
    fs.readFile('./demo/01.css', (err, data) =>{
      res.writeHead(200, { "Content-Type": "text/css" });

      res.end(data);
    })

  } else {
    fs.readFile('./demo/err.html', (err, data) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data);
      if (err) throw err;
    });

  }

})
// 运行服务器，监听端口
server.listen(3000);
console.log("Http server is listening at port 3000");