const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

router.post('/', productCategoryController.create);
router.get('/', productCategoryController.findAll);
router.get('/:id', productCategoryController.findOne);
router.put('/:id', productCategoryController.update);
router.delete('/:id', productCategoryController.delete);

module.exports = router;
