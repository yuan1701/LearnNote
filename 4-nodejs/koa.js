const Koa = require("koa")
const app = new Koa()

app.use(async(ctx,next)=>{
    ctx.body='hello world'
    next()
})
app.listen(3000)