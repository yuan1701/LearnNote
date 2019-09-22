/**
 * nodejs没有根目录的概念，没有web容器
 * 
 */ 

// require表示引包，就是引用自己一个特殊的功能
var http = require('http')
// 创建服务器，参数是一个回调函数，表示如果有请求进来做什么,req是请求，res是返回
var server = http.createServer(function(req,res){
  res.writeHead(200,{"Content-Type":"text/html"});
  res.end("<p>Hello World2</p>");
})
// 运行服务器，监听端口
server.listen(3000);
console.log("Http server is listening at port 3000");