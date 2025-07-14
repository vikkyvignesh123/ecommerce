const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller');
// const allcartmiddleware = require('../middleware/allcart');
// POST to add item to cart
cartrouter.post('/postcart', cartcontroller.postcart);

// GET to display cart.jade
cartrouter.get('/getallcart', cartcontroller.getCartPage);


cartrouter.delete('/deletecart/:id', cartcontroller.deleteCartitem);

cartrouter.put('/alterproductname/:userid/:productid/:productprice', cartcontroller.alterCartitem);

cartrouter.get('/getdashboard', cartcontroller.getdashboardPage);


module.exports = cartrouter;
