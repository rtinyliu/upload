import Koa from 'koa';
import { db, port } from './config';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import { connect } from 'mongoose';
// import uuidv1 from 'uuid/v1';
// import userModel from './app/models/user';

const app = new Koa();

connect(db, {useNewUrlParser:true}, (err) => {
    if (err) {
        console.error('Failed to connect to database');
    } else {
        console.log('Connecting database successfully');
    }
});

// const users = ['胡山江', '周明', '周怀俊', '谢扬辉', '杨沁宽', '肖土观', '庄宇洲', '刘林伟', '梁秋焕', '何浩', '李彬', '张仰光',
//  '赖志文', '罗辉', '雷贵州', '张小龙', '黄浩仪', '王雨', '夏鹏宇', '毛福江', '段谱松', '韩孝龙', '周途广', '林学开', '石马', '刘志敏',
//  '王乐永', '孟晓维', '石宝辉', '苏克秋']
// users.map(async (item) => {
//     console.log(item)
//     const userId = uuidv1();
//     await userModel.create({
//         userId,
//         name: item
//     })
// })
// import historyApiFallback from 'koa2-connect-history-api-fallback'
// app.use(historyApiFallback({ rewrites: [
//     { from: /^\/client\/.*$/, to:  '/client/index.html'},
// ] }))
// app.use(historyApiFallback({ whiteList: ['uploads/*'] }))

app.use(cors());
app.use(bodyParser());
import user_router from './routes/api/user_router'
import dailyupload_router from './routes/api/dailyupload_router'
import upload_router from './routes/api/upload_router'
// import clientRedirect_router from './routes/api/clientRedirect_router'
// console.log(user_router)

app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(dailyupload_router.routes()).use(dailyupload_router.allowedMethods())
app.use(upload_router.routes()).use(upload_router.allowedMethods())
// app.use(clientRedirect_router.routes()).use(clientRedirect_router.allowedMethods())
app.use(require('koa-static')(__dirname))

app.listen(port);