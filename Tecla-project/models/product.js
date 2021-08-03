const {DataTypes, Deferrable} = require('sequelize');

const sequelize = require('../database/connection');
const Category = require('./category');
const Status = require('./status');
const User = require('./user');

const Product = sequelize.define('Product', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    description_: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_status: {
        type: DataTypes.INTEGER,
        default: 2,
        allowNull: false,
        references: {
            model: Status,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
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
    }  
);

module.exports = Product;