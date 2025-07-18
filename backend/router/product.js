const express = require('express');
const productRouter = express.Router();
const productcontroller = require('../contoller/productcontroller');

productRouter.get('/allproducts',productcontroller.getAllProducts);
productRouter.get('/getproduct/:id',productcontroller.getProductById);
productRouter.post('/addproduct',productcontroller.addProduct);
productRouter.put('/updateproduct/:id',productcontroller.updateProduct);
productRouter.delete('/delproduct/:id',productcontroller.deleteProduct);


module.exports= productRouter