const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  userId: {type:mongoose.Schema.ObjectId,ref:"User"},               
  cartId: String,            
  productid: {type:mongoose.Schema.ObjectId,ref:"Product"},
  productQuantity: Number,

});

const UserCart = mongoose.model('UserCart', userSchema);

module.exports = UserCart;
