const db = require('../../models');
const StockInformation = db.StockInformation;
const Product = db.Product;

// Create and Save a new StockInformation
exports.create = async (req, res) => {
    try {
        const { productId, available_items } = req.body;

        // Check if productId exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: "Invalid productId. Product not found." });
        }

        const stockInformation = await StockInformation.create({ productId, available_items });
        res.status(201).json(stockInformation);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while creating the StockInformation." });
    }
};

// Retrieve all StockInformation
exports.findAll = async (req, res) => {
    try {
        const stockInformations = await StockInformation.findAll({
            include: ['product']
        });
        res.status(200).json(stockInformations);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while retrieving StockInformations." });
    }
};

// Find a single StockInformation by Id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const stockInformation = await StockInformation.findByPk(id, { include: ['product'] });
        if (stockInformation) {
            res.status(200).json(stockInformation);
        } else {
            res.status(404).json({ message: `Cannot find StockInformation with id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving StockInformation with id=${id}.` });
    }
};

// Update a StockInformation by the Id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const { productId, available_items } = req.body;

        // Check if productId exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(400).json({ message: "Invalid productId. Product not found." });
        }

        const [updated] = await StockInformation.update(
            { productId, available_items },
            { where: { id } }
        );
        if (updated) {
            const updatedStockInformation = await StockInformation.findByPk(id, { include: ['product'] });
            res.status(200).json(updatedStockInformation);
        } else {
            res.status(404).json({ message: `Cannot update StockInformation with id=${id}. Maybe StockInformation was not found or req.body is empty!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error updating StockInformation with id=${id}.` });
    }
};

// Delete a StockInformation by the Id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await StockInformation.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: "StockInformation was deleted successfully!" });
        } else {
            res.status(404).json({ message: `Cannot delete StockInformation with id=${id}. Maybe StockInformation was not found!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Could not delete StockInformation with id=${id}.` });
    }
};
