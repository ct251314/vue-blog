import Router from 'koa-router'
import UserController from '../Controller/UserController'
import {base_API} from "../config";
const router = new Router()

router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器！！！！！'
})
//所有的路由都写在这里就可以了
//前端所有的请求发送过来的时候都是http://localhost:3000/api/.....
router.prefix(`${base_API}`)
//登录
router.post('/login',UserController.login)
export default router
