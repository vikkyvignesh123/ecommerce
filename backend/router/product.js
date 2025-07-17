const express = require('express');
const productRouter = express.Router();
const productcontroller = require('../contoller/productcontroller');

productRouter.get('/allproducts',productcontroller.getAllProducts);
productRouter.get('/product/:id',productcontroller.getProductById);
productRouter.post('/product',productcontroller.addProduct);
productRouter.put('/product/:id',productcontroller.updateProduct);
productRouter.delete('/product/:id',productcontroller.deleteProduct);


module.exports= productRouter