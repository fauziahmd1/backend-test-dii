require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./src/config/database');

const authRoutes = require('./src/routes/authRoutes');
const menuRoutes = require('./src/routes/menuRoutes'); 
require('./src/models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/menus', menuRoutes); // 🔥 INI YANG KAMU BELUM TAMBAH

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend DII API Running'
    });
});

sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected');
    })
    .catch((err) => {
        console.error('❌ Database connection error:', err);
    });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database synced');
    })
    .catch((err) => {
        console.error('❌ Database sync error:', err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});