const express = require('express');
const router = express.Router();
const productCategoryRoutes = require('./productCategoryRoutes');
const userRoutes = require('./userRoutes');

router.use('/product-categories', productCategoryRoutes);
router.use('/users', userRoutes);

module.exports = router;
