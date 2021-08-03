const {
    Category,
    Pay_Method,
    Product,
    Purchase,
    Status,
    User
} = require('../models');
const {getUserByEmail} = require('../services/user.service');



const productExistsById = async(id = '') => {
    const productExists = await Product.findByPk(id);
    if(!productExists){
        throw new Error(`El producto con el id: ${id} no existe`);
    }
    return true;
}

const emailExists = async (email='') => {
    const emailExists = await getUserByEmail(email);
    if(emailExists){
        throw new Error(`El correo ${email} ya está en uso.`);
    }
    return true;
}

const userExistsById = async (id = '') => {
    const userExists = await User.findByPk(id);
    if(!userExists){
        throw new Error(`El producto con el id: ${id} no existe`);
    }
    return true;
}

module.exports = {
    productExistsById, emailExists, userExistsById
}