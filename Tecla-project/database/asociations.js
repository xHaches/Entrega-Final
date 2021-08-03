const {
    Category,
    Pay_Method,
    Product,
    Purchase,
    Status,
    User,
} = require('../models');

// Uno a uno
User.hasOne(Status);

Product.hasOne(Status);
Product.hasOne(Category);

Purchase.hasOne(Pay_Method);

