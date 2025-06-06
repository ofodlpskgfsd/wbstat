const jwt = require("jsonwebtoken");
const ApiError = require('../error/ApiError');
const { Session } = require('../models/models');

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") return next();

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Токен не предоставлен" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Не авторизован" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        // Обновляем активность сессии
        if (req.user.sessionId) {
            const session = await Session.findOne({ where: { id: req.user.sessionId, userId: req.user.id } });
            if (!session) return next(ApiError.unauthorized('Сессия не найдена'));

            session.lastActive = new Date();
            await session.save();
        }

        next();
    } catch (error) {
        console.error("Ошибка при верификации токена:", error);
        return res.status(401).json({ message: "Токен недействителен" });
    }
};
