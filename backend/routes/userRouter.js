const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/get-data', authMiddleware, userController.getData);
router.patch('/profile/api-key', authMiddleware, userController.updateApiKey);
router.get('/astana-data', authMiddleware, userController.getAstanaData);




module.exports = router
