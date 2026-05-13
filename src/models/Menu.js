const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('menus', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    menu_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = Menu;