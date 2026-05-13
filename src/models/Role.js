const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = Role;