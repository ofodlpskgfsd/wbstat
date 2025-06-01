const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter');


app.use('/api/admin', adminRouter);
router.use('/user', userRouter)
module.exports = router
