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
        },
        {
            sequelize,
            modelName: 'ProductCategory',
        }
    );
    return ProductCategory;
};
