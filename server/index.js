import koa from 'koa'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
//引入路由文件
import router from './routes/index'
//连接数据库
import query from './utils/query'
const app = new koa()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())

app.listen(3000,()=>{
    console.log('node is OK')
})
