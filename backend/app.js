const express = require('express');
const cors = require('cors');
const mongoose =require('mongoose');
const bakeneddata =require('./datamodels/backenddatas')
const cartrouter = require('./router/cartrouter');
const router = require('./router/router');
const path = require('path');
const fs =require('fs');
const app = express();
const authrouter = require('../backend/router/authendicate');
const userRouter = require('./router/userrouter');
const productRouter = require('./router/product');
const newrouter = require('./router/newrouter');


app.use(express.json()); // ✅ To parse JSON input
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("view engine","jade")
app.set("views",path.join(__dirname,"views"))

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>{
console.log("mongodb connected");
})
.catch((err=>{
    console.erroe("mongodb connection failed",err.message)
}));

//render webpage
app.get('/webpage',(req,res)=>{
    res.render('dashboard.jade');
});

app.use('/api/v1/new',newrouter);
//cart api
app.use('/api/v1/cart', cartrouter);

app.use('/api/v1/dashboard', router);
//register and login api
app.use('/api/v1/auth', authrouter);
//
app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);

app.use("/static",express.static(path.join(__dirname,"public")));


// Serve images from frontend/img folder
app.use('/img', express.static(path.resolve(__dirname, '../frontend/img')));


const port = bakeneddata.contentType.PORT;
app.listen(port,()=>
{
    console.log(`app server is running ${port}`);
})