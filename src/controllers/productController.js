const db = require('../../models');
const Product = db.Product;
const ProductCategory = db.ProductCategory;
const upload = require('../services/multerConfig').array('images', 10); // Allow up to 10 images
const path = require('path');
const { Op } = require('sequelize');

// Helper function to convert backslashes to forward slashes
const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

// Create and Save a new Product
exports.create = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const { name, price, description, categoryId } = req.body;

            // Check if categoryId exists
            const category = await ProductCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Invalid categoryId. Category not found." });
            }

            const images = req.files ? req.files.map(file => normalizePath(path.join('uploads', 'Product', file.filename))) : [];

            const product = await Product.create({ name, price, description, categoryId, images });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message || "Some error occurred while creating the Product." });
        }
    });
};

// Retrieve all Products
exports.findAll = async (req, res) => {
    try {
        const { search, reviews, minPrice, maxPrice } = req.query;

        // Build the filter criteria
        const filter = {};
        if (search) {
            filter[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }
        if (reviews) {
            filter.reviews = { [Op.iLike]: `%${reviews}%` };
        }
        if (minPrice && maxPrice) {
            filter.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
        } else if (minPrice) {
            filter.price = { [Op.gte]: parseFloat(minPrice) };
        } else if (maxPrice) {
            filter.price = { [Op.lte]: parseFloat(maxPrice) };
        }

        const product = await Product.findAll({ where: filter });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while retrieving Product Categories." });
    }
};


// Find a single Product by Id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, { include: ['category'] });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Cannot find Product with id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving Product with id=${id}.` });
    }
};

// Update a Product by the Id
exports.update = async (req, res) => {
    const { id } = req.params;
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const { name, price, description, categoryId } = req.body;

            // Check if categoryId exists
            const category = await ProductCategory.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Invalid categoryId. Category not found." });
            }

            const images = req.files ? req.files.map(file => normalizePath(path.join('uploads', 'Product', file.filename))) : null;

            const [updated] = await Product.update(
                { name, price, description, categoryId, images },
                { where: { id } }
            );
            if (updated) {
                const updatedProduct = await Product.findByPk(id, { include: ['category'] });
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!` });
            }
        } catch (error) {
            res.status(500).json({ message: error.message || `Error updating Product with id=${id}.` });
        }
    });
};

// Delete a Product by the Id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: "Product was deleted successfully!" });
        } else {
            res.status(404).json({ message: `Cannot delete Product with id=${id}. Maybe Product was not found!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Could not delete Product with id=${id}.` });
    }
};
