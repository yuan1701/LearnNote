/**
 * 实现文件上传，保存，更改文件名称
 * 
 * https://www.npmjs.com/formidable
 */
const formidable = require("formidable")
const http = require('http');
const util = require("util")

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  if (req.url == '/dopost' && req.method.toLowerCase() === 'post') {

    /**
     * parse a file upload
     */
    const form = new formidable.IncomingForm()

    form.uploadDir = './upload'
    /**
     * fields  文本域
     * files 所有上传文件
     */
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      console.log(fields,files)
      res.end(util.inspect({fields: fields, files: files}));

      console.log()

      // res.end('success')
    });


    form.parse(req,'')
   
  }

  // res.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' })


  // res.end('<h1>Hello World</h2>\n');
  // PS： 在end之后就不能write了
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

