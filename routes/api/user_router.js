import Router from 'koa-router';
const router = new Router();
import { getUsers, saveUser } from './../../app/controllers/user_controller';
router.get('/get/users', getUsers);
router.post('/save/user', saveUser);

export default router;