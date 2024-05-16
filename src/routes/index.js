const express = require('express');
const router = express.Router();
const productCategoryRoutes = require('./productCategoryRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const stockInfoRoutes = require('./stockInfoRoutes');
const verifyToken = require('../middleware/verifyToken')

router.use('/product-categories', verifyToken, productCategoryRoutes);
router.use('/users', userRoutes);
router.use('/products', verifyToken, productRoutes);
router.use('/stock-info', verifyToken, stockInfoRoutes);

module.exports = router;
