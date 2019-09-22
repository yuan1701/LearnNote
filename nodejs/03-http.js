/**
 * http模块
 * 
 * 接受两个参数,req为请求，res为返回
 * 
 * 每一个请求都必须要res.end()
 * 
 * write()和end()要接受Buffer和string类型
 * 
 */


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //   同setHeader()用法
  //   res.writeHead(200,{'Content-Type':'text/plain;charset=UTF-8'})

  res.end('<h1>Hello World</h2>\n');
  // PS： 在end之后就不能write了
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});