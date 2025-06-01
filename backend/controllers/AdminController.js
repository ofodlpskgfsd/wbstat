const { User } = require('../models/models');
const ApiError = require('../error/ApiError');

class AdminController {
    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'role', 'name', 'phone', 'apiKey', 'banned'],
                order: [['createdAt', 'DESC']]
            });
            res.json(users);
        } catch (e) {
            next(ApiError.internal('Ошибка получения пользователей'));
        }
    }

    async toggleBan(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));

            user.banned = !user.banned;
            await user.save();
            res.json({ message: `Пользователь ${user.banned ? 'забанен' : 'разбанен'}` });
        } catch (e) {
            next(ApiError.internal('Ошибка при изменении статуса'));
        }
    }

    async updateUserApiKey(req, res, next) {
        try {
            const { apiKey } = req.body;
            const user = await User.findByPk(req.params.id);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));

            user.apiKey = apiKey;
            await user.save();
            res.json({ message: 'API-ключ успешно обновлён' });
        } catch (e) {
            next(ApiError.internal('Ошибка обновления API-ключа'));
        }
    }
}

module.exports = new AdminController();
