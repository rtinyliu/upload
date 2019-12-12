import Router from 'koa-router';
const router = new Router();
import { getDailyUpload, saveDailyUpload } from './../../app/controllers/dailyUpload_controller';
router.get('/get/dailyupload', getDailyUpload);
router.post('/save/dailyupload', saveDailyUpload);

export default router;