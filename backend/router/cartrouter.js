const express = require('express'); 
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller'); // ✅ Make sure this folder is correct

cartrouter.post('/postcart', cartcontroller.postcart);

// cartrouter.get('/cart', cartcontroller.getCartPage);

module.exports = cartrouter;
