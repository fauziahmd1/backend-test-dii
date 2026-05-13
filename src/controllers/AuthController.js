const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    User,
    Role
} = require('../models');

class AuthController {
    
    static async login (req, res){
        try{
            const {username, password} = req.body;

            //Check user
            const user = await User.findOne({
                where: {username},
                include: {
                    model:Role,
                    through: {attributes: []}
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if(!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                })
            }

            const roles = user.roles;

            if (roles.length > 1){
                return res.status(200).json({
                    success: true,
                    message: 'Choose Role',
                    user_id: user.id,
                    roles
                });                
            }

            const token = jwt.sign(
                {
                    user_id: user.id,
                    role_id: roles[0].id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login success',
                token
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async selectRole(req, res) {
        try {
            const {user_id, role_id} = req.body;

            const token = jwt.sign(
                {
                    user_id,
                    role_id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Role selected',
                token
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}

module.exports = AuthController;