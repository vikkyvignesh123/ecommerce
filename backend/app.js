const express = require('express');
const cors = require('cors');
const mongoose =require('mongoose');
const bakeneddata =require('./datamodels/backenddatas')
const cartrouter = require('./router/cartrouter');
const router = require('./router/router');
const path = require('path');
const fs =require('fs');
const app = express();

app.use(express.json()); // ✅ To parse JSON input

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
app.get('/webpage',(req,res)=>{
    res.render('dashboard.jade');
});

app.use('/api/v1/cart', cartrouter);
app.use('/api/v1/dashboard', router);




app.use("/static",express.static(path.join(__dirname,"public")));



// app.use('/img', express.static(path.join(__dirname, '../frontend/img')));
// app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
// app.use('/ecommercejs', express.static(path.join(__dirname, '../frontend/ecommercejs')));





// Serve images from frontend/img folder
app.use('/img', express.static(path.resolve(__dirname, '../frontend/img')));


const port = bakeneddata.contentType.PORT;
app.listen(port,()=>
{
    console.log(`app server is running ${port}`);
})