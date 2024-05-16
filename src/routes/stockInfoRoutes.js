const express = require('express');
const router = express.Router();
const stockInformationController = require('../controllers/stockInfoController');

// Create a new StockInformation
router.post('/', stockInformationController.create);

// Retrieve all StockInformations
router.get('/', stockInformationController.findAll);

// Retrieve a single StockInformation with id
router.get('/:id', stockInformationController.findOne);

// Update a StockInformation with id
router.put('/:id', stockInformationController.update);

// Delete a StockInformation with id
router.delete('/:id', stockInformationController.delete);

module.exports = router;
