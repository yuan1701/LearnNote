
const express = require('express')

const router = require("./controller")


const app = express()

/** 设置模板引擎 */
app.set('view engine','ejs')

/** 路由中间件 静态文件服务 */
app.use(express.static('./public'))

/** 首页 */
app.get('/',router.showIndex)

/** 相册目录 */

app.get('/:albumName',router.showAlbum)

app.listen(3000)