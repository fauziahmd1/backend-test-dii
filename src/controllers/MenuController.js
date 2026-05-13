const { Menu, Role } = require('../models');

class MenuController {

    static async getMenusByRole(req, res) {
        try {

            const { role_id } = req.user;

            const menus = await Menu.findAll({
                include: [
                    {
                        model: Role,
                        where: { id: role_id },
                        through: { attributes: [] }
                    }
                ],
                order: [['sort_order', 'ASC']]
            });

            const buildTree = (data, parentId = null) => {
                return data
                    .filter(item => item.parent_id == parentId)
                    .map(item => ({
                        id: item.id,
                        menu_name: item.menu_name,
                        url: item.url,
                        sort_order: item.sort_order,
                        children: buildTree(data, item.id)
                    }));
            };

            const tree = buildTree(menus);

            return res.json({
                success: true,
                data: tree
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = MenuController;