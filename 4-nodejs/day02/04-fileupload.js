/**
 * ps: http为什么会被canceled掉
 * 实现文件上传，保存，更改文件名称
 * 
 * https://www.npmjs.com/formidable
 */
const formidable = require("formidable")
const http = require('http');
const util = require("util")
const fs = require("fs")
const sd = require("silly-datetime")
const path = require('path')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.url == '/dopost' && req.method.toLowerCase() === 'post') {

        /**
         * parse a file upload
         */
        const form = new formidable.IncomingForm()

        /** 文件上传的地址*/

        form.uploadDir = './upload'

        /**
         * fields  所有的文本域，单选框都在filedls
         * 
         * files 所有的文件域
         */
        form.parse(req, function (err, fields, files) {
            if(err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF8' })
            res.write('received upload:\n\n');
            console.log(fields, files)
            
           /** 获取201909210922ss这种格式的时间 */
            const ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')

            /** 获取一个6位随机数 */
            const ran = parseInt(Math.random()*9999 + 10000) 

            const extname = path.extname(files.tupian.name)

            /** 获取当前文件路径 */
            const oldname = __dirname + '/'+ files.tupian.path 

            /** 新的文件名称 时间+随机数+拓展名 */
            const newname = __dirname + '/upload/'+ ttt + ran + extname

             /** 改名 */
            fs.rename(oldname,newname,(err)=>{
                if(err) throw err
            })

            /** util.inspect()将{}里面的内容展开 */
            res.end(util.inspect({ fields: fields,files:files}));
        });


    }else{
        res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"});
        res.end("找不到该页面！");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

