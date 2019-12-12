import userModel from './../models/user';
import uuidv1 from 'uuid/v1';


const getUsers = async (ctx, next) => {
  const users = await userModel.find();

  ctx.status = 200;
  if (users) {
    ctx.body = {
      code: '1000',
      data: users
    }
  } else {
    ctx.body = {
      code: '0000',
      msg: 'err'
    }
  }
}

const saveUser = async (ctx, next) => {
  const req = ctx.request.body;

  ctx.status = 200;
  
  // 插入新用户
  const userId = uuidv1();
  await userModel.create({
    userId,
    name: req.name
  })
  ctx.body = {
    code: '1000',
    msg: '创建成功'
  }
}

export {
  getUsers,
  saveUser
}