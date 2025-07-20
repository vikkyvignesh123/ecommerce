const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, unique: true },
    productPrice: String,
    img: String,
    description: Object,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
