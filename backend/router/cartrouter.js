const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller');

// POST to add item to cart
cartrouter.post('/postcart', cartcontroller.postcart);

// GET to display cart.jade
cartrouter.get('/getcart', cartcontroller.getCartPage);
cartrouter.delete('/deletecart/:id', cartcontroller.deleteCartitem);
cartrouter.put('/alterproductname/:id/:name', cartcontroller.alterCartitem);

cartrouter.get('/getdashboard', cartcontroller.getdashboardPage);


module.exports = cartrouter;
