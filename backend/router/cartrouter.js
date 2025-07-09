const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller');

// POST to add item to cart
cartrouter.post('/postcart', cartcontroller.postcart);

// GET to display cart.jade
cartrouter.get('/cart', cartcontroller.getCartPage);

module.exports = cartrouter;
