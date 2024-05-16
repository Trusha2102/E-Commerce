const db = require('../../models');
const ProductCategory = db.ProductCategory;
const upload = require('../services/multerConfig').single('cover_image');
const path = require('path');

// Create and Save a new Product Category
exports.create = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const { name, description, is_active } = req.body;
            const cover_image = req.file ? `uploads/Product/${req.file.filename}` : null; // Use forward slashes
            const productCategory = await ProductCategory.create({ name, description, cover_image, is_active });
            res.status(201).json(productCategory);
        } catch (error) {
            res.status(500).json({ message: error.message || "Some error occurred while creating the Product Category." });
        }
    });
};

// Retrieve all Product Categories
exports.findAll = async (req, res) => {
    try {
        const productCategories = await ProductCategory.findAll();
        res.status(200).json(productCategories);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while retrieving Product Categories." });
    }
};

// Find a single Product Category by Id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const productCategory = await ProductCategory.findByPk(id);
        if (productCategory) {
            res.status(200).json(productCategory);
        } else {
            res.status(404).json({ message: `Cannot find Product Category with id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving Product Category with id=${id}.` });
    }
};

// Update a Product Category by the Id
exports.update = async (req, res) => {
    const { id } = req.params;
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const { name, description, is_active } = req.body;
            const cover_image = req.file ? `uploads/Product/${req.file.filename}` : null; // Use forward slashes
            const [updated] = await ProductCategory.update(
                { name, description, cover_image, is_active },
                { where: { id } }
            );
            if (updated) {
                const updatedProductCategory = await ProductCategory.findByPk(id);
                res.status(200).json(updatedProductCategory);
            } else {
                res.status(404).json({ message: `Cannot update Product Category with id=${id}. Maybe Product Category was not found or req.body is empty!` });
            }
        } catch (error) {
            res.status(500).json({ message: error.message || `Error updating Product Category with id=${id}.` });
        }
    });
};

// Delete a Product Category by the Id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ProductCategory.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: "Product Category was deleted successfully!" });
        } else {
            res.status(404).json({ message: `Cannot delete Product Category with id=${id}. Maybe Product Category was not found!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Could not delete Product Category with id=${id}.` });
    }
};
