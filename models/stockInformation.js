'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StockInformation extends Model {
        static associate(models) {
            StockInformation.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product',
            });
        }
    }
    StockInformation.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },
            available_items: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'StockInformation',
        }
    );
    return StockInformation;
};
