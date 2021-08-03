const {DataTypes, Deferrable} = require('sequelize');

const sequelize = require('../database/connection');
const User = require('./user');
const Product = require('./product');
const Pay_Method = require('./pay_method')

const Purchase = sequelize.define('Purchase', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_pay_method: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pay_Method,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
},
{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
} );

module.exports = Purchase;