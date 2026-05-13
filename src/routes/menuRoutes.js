const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const MenuController = require('../controllers/MenuController');

router.get('/', authMiddleware, MenuController.getMenusByRole);

module.exports = router;