const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = User;