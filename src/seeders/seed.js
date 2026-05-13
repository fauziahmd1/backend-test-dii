const bcrypt = require('bcryptjs');

const sequelize = require('../config/database');

const {
    User,
    Role,
    UserRole,
    Menu,
    RoleMenu
} = require('../models');

async function seed() {
    try {

        // =========================
        // SYNC DATABASE
        // =========================
        await sequelize.sync({ alter: true });

        console.log('Database synced');

        // =========================
        // CREATE ROLES
        // =========================
        const adminRole = await Role.create({
            role_name: 'Admin'
        });

        const hrRole = await Role.create({
            role_name: 'HR'
        });

        const staffRole = await Role.create({
            role_name: 'Staff'
        });

        console.log('Roles created');

        // =========================
        // CREATE USER
        // =========================
        const hashedPassword = await bcrypt.hash('123456', 10);

        const user = await User.create({
            username: 'ahmad',
            password: hashedPassword,
            fullname: 'Ahmad Fauzi'
        });

        console.log('User created');

        // =========================
        // ASSIGN USER ROLES
        // =========================
        await UserRole.create({
            user_id: user.id,
            role_id: adminRole.id
        });

        await UserRole.create({
            user_id: user.id,
            role_id: hrRole.id
        });

        console.log('User roles assigned');

        // =========================
        // CREATE MENUS
        // =========================

        // MENU 1
        const menu1 = await Menu.create({
            menu_name: 'Menu 1',
            parent_id: null,
            url: '/menu-1',
            sort_order: 1
        });

        const menu11 = await Menu.create({
            menu_name: 'Menu 1.1',
            parent_id: menu1.id,
            url: '/menu-1-1',
            sort_order: 1
        });

        const menu12 = await Menu.create({
            menu_name: 'Menu 1.2',
            parent_id: menu1.id,
            url: '/menu-1-2',
            sort_order: 2
        });

        const menu121 = await Menu.create({
            menu_name: 'Menu 1.2.1',
            parent_id: menu12.id,
            url: '/menu-1-2-1',
            sort_order: 1
        });

        const menu122 = await Menu.create({
            menu_name: 'Menu 1.2.2',
            parent_id: menu12.id,
            url: '/menu-1-2-2',
            sort_order: 2
        });

        // MENU 2
        const menu2 = await Menu.create({
            menu_name: 'Menu 2',
            parent_id: null,
            url: '/menu-2',
            sort_order: 2
        });

        const menu21 = await Menu.create({
            menu_name: 'Menu 2.1',
            parent_id: menu2.id,
            url: '/menu-2-1',
            sort_order: 1
        });

        console.log('Menus created');

        // =========================
        // ASSIGN ROLE MENUS
        // =========================

        const allMenus = await Menu.findAll();

        for (const menu of allMenus) {
            await RoleMenu.create({
                role_id: adminRole.id,
                menu_id: menu.id
            });
        }

        await RoleMenu.create({
            role_id: hrRole.id,
            menu_id: menu1.id
        });

        await RoleMenu.create({
            role_id: hrRole.id,
            menu_id: menu11.id
        });

        console.log('Role menus assigned');

        console.log('SEED SUCCESS');

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit();

    }
}

seed();