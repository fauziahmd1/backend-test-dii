const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoleMenu = sequelize.define('role_menus', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    menu_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = RoleMenu;