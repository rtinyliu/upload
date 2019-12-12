import multer, { diskStorage } from 'koa-multer';//加载koa-multer模块
import { formatDate } from './../../lib/util'
import { save as saveDailyUpload, updateOne,  getOne} from './dailyUpload_controller'
import uuidv1 from 'uuid/v1';
import fs from 'fs'
//文件上传
//配置
const getFilePath = () => {
    const today = formatDate('yyyyMMdd', new Date())
    const filePath = `uploads/${today}`
    return filePath
}
const getSevenDaysBeforePath = () => {
    const sevenDaysBefore = formatDate('yyyyMMdd', new Date((+new Date() - 7 * 24 * 60 * 60 * 1000)))
    const filePath = `uploads/${sevenDaysBefore}`
    return filePath
}
const delDir = (path) => {
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
const storage = diskStorage({
    //文件保存路径
    destination: (req, file, cb) => {
        const filePath = getFilePath()
        const folder_exists = fs.existsSync(filePath)
        if (!folder_exists) {
            fs.mkdir(filePath, {
                recursive: true  //是否递归,默认false
              }, (err) => {
                if(err){
                  console.log(err);
                  return;
                }
            })
        }
        cb(null, filePath)
    },
    //修改文件名称
    filename: (req, file, cb) => {
        const fileFormat = (file.originalname).split(".");
        cb(null, req.body.name + "." + fileFormat[fileFormat.length - 1])
    }
})
//加载配置
const upload = multer({ storage: storage })

const uploadHandler = async (ctx, next) => {
    // console.log(ctx.req.body.name)
    let uploadId = ''
    const filePath = getFilePath()
    const name = ctx.req.body.name
    const uploadTime = formatDate('yyyy-MM-dd hh:mm:ss', new Date())
    const imgUrl = `http://172.24.8.71:9000/${filePath}/${ctx.req.file.filename}`
    const dailyUpload = await getOne(name)
    if (!dailyUpload) {
        uploadId = uuidv1()
        saveDailyUpload({ uploadId, name, uploadTime, imgUrl})
    } else {
        uploadId = dailyUpload.uploadId
        updateOne(uploadId, { uploadId, name, uploadTime, imgUrl})
    }
    
    const sevenDaysBeforePath = getSevenDaysBeforePath()
    const folder_exists = fs.existsSync(sevenDaysBeforePath)
    if (folder_exists) {
        delDir(sevenDaysBeforePath)
    }
    ctx.body = {
        code: '1000',
        data: {
            fileUrl: `http://172.24.8.71:9000/${filePath}/${ctx.req.file.filename}?timestamp=${Date.now()}`,
            filename: ctx.req.file.filename//返回文件名
        }
    }
}

export {
    upload,
    uploadHandler
}
