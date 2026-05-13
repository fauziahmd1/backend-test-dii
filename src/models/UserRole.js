const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('user_roles', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = UserRole;