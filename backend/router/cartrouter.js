const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller2');
// const allcartmiddleware = require('../middleware/allcart');
// POST to add item to cart
cartrouter.post('/addcart', cartcontroller.postcart);
cartrouter.post('/updatecart', cartcontroller.postcart);
// GET to display cart.jade
cartrouter.get('/getmycart', cartcontroller.getCartPage);


// cartrouter.delete('/deletecart/:id', cartcontroller.deleteCartitem);

// cartrouter.put('/alterproductname/:userid/:productid/:productprice', cartcontroller.alterCartitem);

// cartrouter.post('/addproduct/:userid', cartcontroller.addProduct);





// cartrouter.get('/getdashboard', cartcontroller.getdashboardPage);


module.exports = cartrouter;
