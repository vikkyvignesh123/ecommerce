const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller2');
// const allcartmiddleware = require('../middleware/allcart');
// POST to add item to cart
cartrouter.post('/createuser', cartcontroller.postcart);

// GET to display cart.jade
cartrouter.get('/getallcart', cartcontroller.getCartPage);


cartrouter.delete('/deletecart/:id', cartcontroller.deleteCartitem);

cartrouter.put('/alterproductname/:userid/:productid/:productprice', cartcontroller.alterCartitem);

cartrouter.post('/addproduct/:userid', cartcontroller.addProduct);

cartrouter.post('/register', cartcontroller.register);

cartrouter.post('/login', cartcontroller.login);



// cartrouter.get('/getdashboard', cartcontroller.getdashboardPage);


module.exports = cartrouter;
