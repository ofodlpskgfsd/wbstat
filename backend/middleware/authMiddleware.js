const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
    }


    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Ошибка при верификации токена:', error);
        return res.status(401).json({ message: 'Не авторизован' });
    }
};
