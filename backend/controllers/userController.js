const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const db = require('../db');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '12h' }
    );
};

class UserController {
    // Регистрация нового пользователя
    async registration(req, res, next) {
        const { email, password, role, name, phone, apiKey } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            name,
            phone,
            apiKey
        });
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        res.json({ message: '' });
    }

    async getProfile(req, res, next) {
        try {
            const user = await User.findOne({
                where: { id: req.user.id },
                attributes: ['email', 'name', 'phone', 'apiKey']
            });

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            return res.json(user);
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера'));
        }
    }


    async updateApiKey(req, res, next) {
        try {
            const { apiKey } = req.body;

            if (!apiKey) {
                return next(ApiError.badRequest('API ключ не может быть пустым'));
            }

            const user = await User.findByPk(req.user.id);
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            user.apiKey = apiKey;
            await user.save();

            return res.json({ message: 'API ключ обновлён успешно' });
        } catch (error) {
            console.error('Ошибка обновления API ключа:', error);
            return next(ApiError.internal('Ошибка сервера при обновлении API ключа'));
        }
    }


    async getData(req, res, next) {
        try {
            const { city } = req.params;

            const tableName = `eyJhbGciOi__unit_${city}`;

            // Проверяем, что город предоставлен корректно
            if (!city) {
                return next(ApiError.badRequest('Город не указан'));
            }

            // Динамическое создание SQL-запроса для получения данных из таблицы
            const query = `SELECT * FROM \`${tableName}\``;

            // Выполняем запрос к базе данных
            const [rows] = await db.promise().query(query);

            if (!rows.length) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }

            return res.json(rows);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            return next(ApiError.internal('Ошибка сервера'));
        }
    }
    async getAstanaData(req, res, next) {
        try {
            const tableName = 'eyJhbGciOi__unit_Астана_Карагандинское_шоссе';

            const query = `SELECT * FROM \`${tableName}\``;

            const [rows, metadata] = await db.query(query);


            if (!rows.length) {
                return res.status(404).json({ message: 'Данные не найдены' });
            }

            return res.json(rows);
        } catch (error) {
            console.error('Ошибка получения данных из таблицы:', error);
            return next(ApiError.internal('Ошибка сервера'));
        }
    }
// Получение всех пользователей
    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'role', 'name', 'phone', 'apiKey', 'banned']
            });
            return res.json(users);
        } catch (e) {
            return next(ApiError.internal('Ошибка получения пользователей'));
        }
    }

    async toggleBanUser(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await User.findByPk(userId);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));

            user.banned = !user.banned;
            await user.save();

            return res.json({ message: `Пользователь ${user.banned ? 'забанен' : 'разбанен'}` });
        } catch (e) {
            return next(ApiError.internal('Ошибка при изменении статуса блокировки'));
        }
    }

// Изменение API ключа
    async adminUpdateApiKey(req, res, next) {
        try {
            const { userId } = req.params;
            const { apiKey } = req.body;

            const user = await User.findByPk(userId);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));

            user.apiKey = apiKey;
            await user.save();

            return res.json({ message: 'API ключ обновлен администратором' });
        } catch (e) {
            return next(ApiError.internal('Ошибка обновления ключа'));
        }
    }






}

module.exports = new UserController();
