[TOC]
# websocket 和 socket.io

#### HTTP无法轻松实现实时应用
1.http是无状态的，服务器只会响应客户端的请求，但是他与客户端之间不具备持续连接
2.当我们（ajax）主动向服务器发起请求时可以获取服务器的数据，但是服务器不能将信息**主动**发给客户端
但是聊天室确实存在：
1.长轮询，客户端每隔几秒获取一下数据，只要轮询速度足够快给人实时的错觉，会造成大量的性能浪费
2.长连接，客户端只发起一次请求，但是服务器会将连接保存，不返回结果（就像不写res.end()）,等服务器有了数据在返回...一直保持连接状态，曹成性能浪费

#### Websocket协议
能够让浏览器和服务器**全双工实时通信**，这样服务器也能主动通知客户端了

原理很简单，就是利用http请求产生握手，http头部含义websocket协议的请求，所以握手之后转用TCP协议交流（QQ）
 所以需要浏览器和服务器都支持
- 支持的服务器：Chrome4 火狐4 IE10 Safari5
- 支持的浏览器：Node0 Apach7.0.2 Nginx13

#### socket.io
1.下载
```c
npm i socket.io
```
**2.服务端配置：**
写原生的NODEJS，搭建一个服务器，server创建好之后，创建一个io对象：`require('socket.io')(server)`
```javascript
const  http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{

    /** 静态文件功能 */
    if(req.url == '/'){
        fs.readFile('./index.html',(err,data)=>{
            res.end(data)
        })
    }
})

// 创建io对象
const io = require('socket.io')(server)
// 监听拦截事件
io.on("connection", ()=>{
    console.log('1个服务器连接')
})

server.listen(3000,'127.0.0.1')
```
当访问 http://127.0.0.1:3000/socket.io/socket.io.js 的时候发现是一个js文件

**3.客户端配置**

PS：
- html页面必须运行在服务器，不能在本地
- 必须引入socket,并得到socket对象，
- socket对象有emit on方法，emit()发送自定义事件，on()监听服务器发送的自定义事件

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>我引入了socket.io/socket.io.js</h1>
    <!-- 引包 -->
    <script src="socket.io/socket.io.js"></script>
    <script>
        const socket = io()
		socket.emit('Q','你吃了吗')
        socket.on('A',(msg)=>{
            alert(msg)
        })
    </script>
</body>
</html>

```
至此，当访问http://127.0.0.1:3000/ 可以在服务器控制台看见打印信息，服务器和客户端的连接已经建立好了，接下来看看是如何交流的

4.
```javascript
// 监听拦截事件
io.on("connection", (socket)=>{
    socket.on('Q',(msg)=>{
        console.log('我 get 了一个question：'+msg)
        socket.emit('A','吃了')
    })
    console.log('1个服务器连接')
})
```
每一个连接的用户都有自己的socket

广播：就是给当前所有连接的用户发送信息
```javascript
// 监听拦截事件
io.on("connection", (socket)=>{
    socket.on('Q',(msg)=>{
        console.log('我 get 了一个question：'+msg)
        io.emit('A','吃了') //广播
    })
    console.log('1个服务器连接')
})
```


聊天室源码:
