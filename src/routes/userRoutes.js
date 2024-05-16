const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken')

// Define user-related routes here
router.post('/', users.create);
router.get('/', verifyToken, users.findAll);
router.get('/:id', verifyToken, users.findOne);
router.put('/:id', verifyToken, users.update);
router.delete('/:id', verifyToken, users.delete);
router.post('/login', users.login)

module.exports = router;
