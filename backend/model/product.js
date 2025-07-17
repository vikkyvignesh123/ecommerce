const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  productId: String,
  productname: {type:String,unique:true},
  productprice: String,
  productImage: String,
  createdat:{type:Date,default:Date.now()}
});



const productdetails = mongoose.model('productCart', productDetailSchema);

module.exports = productdetails;
