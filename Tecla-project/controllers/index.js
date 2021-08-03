const {
    getProducts,
    getProduct,
    getProductsByCategory,
    postProduct,
    putProduct,
    deleteProduct,
    searchProduct,
    getCategories
}
    = require('./products');

const {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('./users');

const {
    login
} = require('./auth');

const {
    newPurchase
} = require('./purchase');

module.exports = {
    // Product controllers
    getProducts,
    getProduct,
    getProductsByCategory,
    postProduct,
    putProduct,
    deleteProduct,
    searchProduct,
    getCategories,
    // User controllers
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
    // Auth controllers
    login,
    // Purchase controllers
    newPurchase
}