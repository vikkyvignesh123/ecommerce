const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    cartId: String,
    productId: { type: mongoose.Schema.ObjectId, ref: "Product" }, // ✅ Use camelCase exactly!
    productQuantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("UserCart", userCartSchema);
