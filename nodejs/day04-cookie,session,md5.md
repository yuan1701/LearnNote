[TOC]
#### cookie

特点：
- cookie无跨域限制
- 存储量小
- cookie不加密，用户可以自由看到
- 用户可以删除或者禁用
- 可以被篡改
- 可以用于攻击

http是无状态协议，也就是说当你浏览一个页面，然后跳转到同一个网站的另一个页面，服务器是无法认识的这是同一个浏览器在访问同一个网站，因为每一次的访问都是没有关系的
> 那么就会出现，每次访问都会提示登录，那么如何解决这个问题呢？
 
 cookie是一个简单到爆的想法：当访问一个页面的时候，服务器在下行HTTP报文中存储一个字符串，当浏览器再访问同一个域的时候将把这个字符串携带到上行HTTP请求中

第一次访问服务器，不可能携带cookie，必须是服务器得到这个请求，在下行响应报头中携带cookie信息，此后每一次浏览器忘这个服务器发出的请求，都会携带这个cookie

安装[cookie-parse](https://www.npmjs.com/package/cookie-parser "cookie-parse")
```javascript
npm install cookie-parser
```
使用（获取用户喜好）
```javascript
const express = require('express')
const cookieParser = require('cookie-parser')
 
const app = express()
/** 使用cookie必须使用cookie-parse中间件 */
app.use(cookieParser())

// http://127.0.0.1:3000/like?favirate=app
app.get('/like',(req,res)=>{
    /** 得到get请求，得到用户喜欢 */
    const like = req.query.favirate

    /** 查询cookie，将新的like添加到cookie中,并设置新的cookie */
    let likes = req.cookies.likes || []
    likes.push(like)
    /** maxAge 在express中以毫秒为单位 */
    res.cookie('likes',likes,{maxAge: 900000, httpOnly:true})
    res.send(like+'攻略')

})
 
app.get('/', (req, res)=> {
    res.send('猜你喜欢：'+ req.cookies.likes||'暂无喜欢')
})
app.listen(3000)

```
> PS：req用来获取cookie  : req.cookies
  res设置cookie：   res.cookie(key,value)


#### session
- 会话，session不是一个天生的技术，而是依赖cookie，专门用来实现“登陆”，表示某一次用户的访问
- 会话是特殊的cookie，用户在第一次登陆之后，服务器往客户端的cookie发送一个的字符串，但是此字符串是经过服务器加密的，服务器会缓存cookie文本和用户信息；再次访问之后，如果这个加密字符串与服务器的缓存匹配，那么判断是一个用户。

- 当一个浏览器禁用cookie的时候，登陆效果消失，或者用户清除了cookie，登陆效果也消失

- 所以，一个乱码可以对应无线大的数据
- 任何语言中，session的使用，是“机理透明”的，他是帮你设置cookie的，但是足够方便，让你感觉不到这事儿跟cookie有关

- express中，使用`express-session`中间件来使用session

安装
```javascript
npm install express-session
```
使用

```javascript
const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/login', function (req, res, next) {
    req.session.login = true //设置这个session
    req.session.username = 'vun'
    res.send("你已经成功登录")
})

app.get('/', function (req, res, next) {
    if(req.session.login){
        res.send(req.session.username+"已经登陆.")
    }else {
        res.send("请登录")
    }
})
app.listen(3000)
```

#### MD5加密
MD5是一种哈希算法，用来保证信息的完整性，是不可逆的，在nodejs中使用crypto

安装
```javascript
npm i crypto
```
使用

```javascript
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('md5', secret)
                   .update('hello')
                   .digest('hex');
console.log(hash);//32为的字符串
```
> ps: update()是干啥滴？










