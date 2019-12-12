import Router from 'koa-router';
const router = new Router();
import { upload, uploadHandler } from './../../app/controllers/upload_controller';
router.post('/upload', upload.single('file'), uploadHandler);

export default router;