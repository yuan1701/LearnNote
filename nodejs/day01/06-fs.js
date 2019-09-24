/**
 * 给每一个用户添加一个id,可以探索事件循环机制
 * 
 * 
 * fs提供的方法大都是异步的
 * 
 * 如何读取文件fs.readfile(path,callback)
 * 如何检测文件状态fs.stat(path,callback)
 * 文件是否为文件夹 .isDirectory()
 * 创建文件夹fs.mkdir(path,callback)
 * 创建文件
 *
 * fs.rename(oldname,newname) 会将路径一起改掉
 *
 *
 */
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return
    const userid = parseInt((Math.random()*89999)+10000)
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    
    console.log('welcome'+userid)

    /**
     * 读取文件
     * 第一个参数：路径，当前路径./
     * 第二个参数：回调函数，表示文件读取成功之后的处理
     */

    fs.readFile('./demo/01.html', (err, data) => {
        return
        if (err) throw err;
        console.log(data)
    })

    /**
     * 检测文件状态
     * 
     */

    fs.stat('./demo/01.html', (err, data) => {
        return
        if (err) throw err;
        // 是不是一个文件夹
        console.log(data.isDirectory())
        // 是不是一个文件
        console.log(data.isFile())
    })

    /**
     * 读取目录下的所有文件和文件夹(不包含文件夹下面的内容)
     * 
     * readdir(path,(err,files)=>{})
     * path不是文件夹会报错
     * files为一个数组
     * 
     */

    fs.readdir('./demo', (err, files) => {
        return
        if (err) throw err;
        console.log(files)
    })

    /**
     * 如何只读取目录下的文件夹
     */
    const folder = []
    fs.readdir('./demo', (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length; i++) {
            fs.stat('./demo/' + files[i], (err, stats) => {
                // console.log('./demo/' + files[i])
                // ps:这里的files为什么是undefined,用let代替var才能正常输出
                if (err) throw err
                if (stats.isDirectory()) {
                    folder.push(files[i])
                }
                console.log(folder)
            })
        }
    })

    /**
     * 如何创建文件夹
     */
    fs.mkdir('./demo/nullfile1',()=>{})

    /**
     * 删除文件夹
     */
    fs.rmdir('./demo/nullfile1',()=>{})

        






    res.end()

}).listen(3000, '127.0.0.1', () => {
    console.log('Http server is listening at port 3000')
})
