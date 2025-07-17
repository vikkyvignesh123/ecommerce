const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  productId: String,
  productname: String,
  productprice: String,
  productImage: String,
  createdat:{type:Date,default:Date.now()}
});



const productdetails = mongoose.model('UserCart', productDetailSchema);

module.exports = productdetail;
