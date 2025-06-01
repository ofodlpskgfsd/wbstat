const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/users', authMiddleware, checkAdmin, adminController.getAllUsers);
router.patch('/users/:id/ban', authMiddleware, checkAdmin, adminController.toggleBan);
router.patch('/users/:id/api-key', authMiddleware, checkAdmin, adminController.updateUserApiKey);

module.exports = router;
