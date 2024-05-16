'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {
        static associate(models) {
            ProductCategory.hasMany(models.Product, {
                foreignKey: 'categoryId',
                as: 'products',
            });
        }
    }
    ProductCategory.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            cover_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: 'ProductCategory',
        }
    );
    return ProductCategory;
};
