const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Menu = require('./Menu');
const RoleMenu = require('./RoleMenu');

User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'user_id'
});

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'role_id'
});

Role.belongsToMany(Menu, {
    through: RoleMenu,
    foreignKey: 'role_id'
});

Menu.belongsToMany(Role, {
    through: RoleMenu,
    foreignKey: 'menu_id'
});

Menu.hasMany(Menu, {
    foreignKey: 'parent_id',
    as: 'children'
});

Menu.belongsTo(Menu, {
    foreignKey: 'parent_id',
    as: 'parent'
});

module.exports = {
    User,
    Role,
    UserRole,
    Menu,
    RoleMenu
};