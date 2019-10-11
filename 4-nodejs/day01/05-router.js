/**
 * 当用户访问/student/2019000001 的查询该学号的学生信息
 * 当用户访问/teacher/201901 ,查询该工号的教师信息
 * 其他其实错误
 */
const http = require('http')

http.createServer((req, res) => {
    if(req.url === '/favicon.ico'){return}
    console.log(req.url.substr(0,9))
    // substr(start,length)
    usearType = req.url.substr(0,9)
    usearNumber = req.url.substr(9)

    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

    if(usearType === '/student/'&&usearNumber.length === 10){
        res.end('以下是学生'+usearNumber+'的信息')
    } else if(usearType === '/teacher/'&&usearNumber.length === 6){
        res.end('以下是教师'+usearNumber+'的信息')
    }else {
        res.end('请求有误')
    }

    res.end()

}).listen(3000, '127.0.0.1', () => {
    console.log('Http server is listening at port 3000')
})