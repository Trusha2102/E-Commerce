const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');

// Define user-related routes here
router.post('/', users.create);
router.get('/', users.findAll);
router.get('/:id', users.findOne);
router.put('/:id', users.update);
router.delete('/:id', users.delete);

module.exports = router;
