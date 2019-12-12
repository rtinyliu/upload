import dailyUploadModel from './../models/dailyUpload';
import { formatDate } from './../../lib/util'
import uuidv1 from 'uuid/v1';


const getDailyUpload = async (ctx, next) => {
  const now = formatDate('yyyy-MM-dd', new Date())
  const list = await dailyUploadModel.find({uploadTime: {$regex: new RegExp(now, 'i')}});

  ctx.status = 200;
  if (list) {
    ctx.body = {
      code: '1000',
      data: list
    }
  } else {
    ctx.body = {
      code: '0000',
      msg: 'err'
    }
  }
}

const save = async (du) => {
    await dailyUploadModel.create(du)
}
const updateOne = async (uploadId, du) => {
    await dailyUploadModel.updateOne({ uploadId }, du)
}
const getOne = async (name) => {
    const now = formatDate('yyyy-MM-dd', new Date())
    const record = await dailyUploadModel.findOne( {name, uploadTime: {$regex: new RegExp(now, 'i')}} )
    return record
}

const saveDailyUpload = async (ctx, next) => {
  const req = ctx.request.body;

  ctx.status = 200;
  
  // 插入新记录
  const uploadId = uuidv1();
  save({
    uploadId,
    name: req.name,
    uploadTime: formatDate('yyyy-MM-dd hh:mm:ss', new Date()),
    imgUrl: req.imgUrl
  })
  ctx.body = {
    code: '1000',
    msg: '创建成功'
  }
}

export {
    getDailyUpload,
    save,
    updateOne,
    getOne,
    saveDailyUpload
}