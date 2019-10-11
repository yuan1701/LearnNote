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
io.on("connection", (socket)=>{
    socket.on('Q',(msg)=>{
        console.log('我 get 了一个question：'+msg)
        socket.emit('A',msg)
    })
    console.log('1个服务器连接')
})

server.listen(3000,'127.0.0.1')
