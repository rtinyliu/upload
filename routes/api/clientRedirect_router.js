import Router from 'koa-router';
const router = new Router();
router.get('/client/*', (ctx) => {
    ctx.redirect('/client/')
})

export default router;