const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const koaBody = require('koa-body')

const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

app.use(async (ctx, next) => {
  try {
    console.log(`request url is: ${ctx.path}`)
    await next()
  } catch(err) {
    console.log(err)
    ctx.staus = 500
    if(isDev) {
      ctx.body = err.message
    }else {
      ctx.body = 'plese try angin later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  pageRouter = require('./routers/ssr')
  // pageRouter = require('./routers/ssr-no-bundle')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
