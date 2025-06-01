require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use(errorHandler);

app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    // Для других типов ошибок, например, если что-то не предусмотрено
    return res.status(500).json({ message: 'Что-то пошло не так!' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log(e)
    }
}

start()
