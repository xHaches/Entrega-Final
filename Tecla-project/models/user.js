const {DataTypes, Deferrable} = require('sequelize');

const sequelize = require('../database/connection');
const Status = require('./status');


const User = sequelize.define('User_', {
    id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    surnames: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(20),
        is:  /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){2}\d{3}|(\d{2}[\*\.\-\s]){3}\d{2}|(\d{4}[\*\.\-\s]){1}\d{4})|\d{8}|\d{10}|\d{12}$/,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_status: {
        type: DataTypes.INTEGER,
        default: 2,
        references: {
            model: Status,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
},
{
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
} );

module.exports = User;