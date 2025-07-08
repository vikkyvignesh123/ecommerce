const express = require('express');
const cartrouter = express.Router();
const cartcontroller = require('../contoller/cartcontroller');
// cartrouter.get("/getcart/:userid",cartcontroller.getcart)
// cartrouter.put("/putcart/:cartid",cartcontroller.putcart)
cartrouter.post('/postcart',cartcontroller.postcart)




module.exports = cartrouter;
