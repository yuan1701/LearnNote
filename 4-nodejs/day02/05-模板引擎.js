
/**
 * 实现模板引擎  <a href="<% = url>"></a> <img src="<% = imgUrl>" alt="">
 * 
 * ejs 第三方包，后台的模板引擎
 * 
 * 安装：npm i ejs
 * 
 * <% %> 流程控制标签
 * 
 * <% =  %> 出标签（原文输出 HTML 标签）
 * 
 * <%- %>输出标签（HTML 会被浏览器解析）
 * 
 * 为什么说ejs效率不高？后台是字符串处理，为了追求效率，所以有了jade，缩进有点像python
 * 
 */



const ejs = require('ejs')

/** 模板引擎使用 */
const string = "今天开始学习<%=a%>"
/** 数据 */
const data = {
    a: '模板引擎'
}
/** 数据绑定 */
const html = ejs.render(string, data)
console.log(html)


const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return

    fs.readFile("./05.ejs", (err, data) => {
        if (err) throw err


        const template = data.toString()
        const dict = { a: '模板引擎' ,news:['流程控制标签','输出标签（原文输出 HTML 标签）','输出标签（HTML 会被浏览器解析）']}

        const html = ejs.render(template, dict)

        res.write(html)
        console.log(html)
        res.end('hello world')

    })

})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})



