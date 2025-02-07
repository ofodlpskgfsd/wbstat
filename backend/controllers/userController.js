const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

// Функция для генерации JWT
const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '12h' }
    );
};
const getUserProfile = (req, res) => {
    console.log('Запрос профиля пользователя');
    const user = req.user;

    if (!user) {
        return res.status(404).send('Пользователь не найден');
    }

    res.json(user);
};
class UserController {
    // Регистрация нового пользователя
    async registration(req, res, next) {
        const {email, password, role, name, phone} = req.body;

        // Проверка на обязательные поля
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            name,
            phone
        });
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    }

    // Вход пользователя
    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        res.json({message: ''});
    }

}
    module.exports = new UserController();