const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  productId: String,
  productname: String,
  productprice: String,
  productImage: String
});

const userSchema = new mongoose.Schema({
  userId: String,               
  username: String,
  useremail: String,
  userpassword: String,
  cartId: String,            
  productQuantity: Number,
  productDetails: [productDetailSchema]  // product details array
});

const UserCart = mongoose.model('UserCart', userSchema);

module.exports = UserCart;
