const express = require('express');
const app = express();

async function allcartmiddleware()
{
    app.use('/',(req,res,next)=>{
 const url = 'http://localhost:3000//api/v1/cart/getallcart'
 if(!req.url===url)
 {
 return res.json({
        status:200,
        message:"Not match url",
        success:false
    })
 }
 return next()
})
}

module.exports = allcartmiddleware;
