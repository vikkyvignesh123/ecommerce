const express = require('express');
const app = express();
const cors = require('cors');
const mongoose =require('mongoose');
const bakeneddata =require('./datamodels/backenddatas')
const cartrouter = require('./router/cartrouter');
const router = require('./router/router');
const path = require('path');
const fs =require('fs');
app.use(express.json());
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
const userSchema= new mongoose.Schema({
  userId: Number,
    cartId: Number,
    productQuantity: Number,
    productId: Number, 
    productname: String,
    productprice: Number,
      
})
const user = mongoose.model('user',userSchema);
user.find({

})
.then((users)=>{
    console.log(users);
    
})
.catch(err=>{
    console.error("error on fetching user",err.message);
})
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