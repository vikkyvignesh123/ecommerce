const express = require('express');
const app = express()

app.use(express.json());

app.use('/',(req,res,next)=>{
    next()
    // res.json({
    //     success:true,
    //     message:'hello world'
    // })
})

app.post("/submit",(req,res)=>{
    console.log(req.body);
    res.json({
        message:"post request sucesfull",
    });
});



app.listen(3000,()=>{
    console.log("server is running");
})