'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.ProductCategory, {
                foreignKey: 'categoryId',
                as: 'category',
            });
            Product.hasMany(models.StockInformation, {
                foreignKey: 'productId',
                as: 'stock',
            });
        }
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ProductCategories',
                    key: 'id',
                },
            },
            images: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            reviews: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );
    return Product;
};
