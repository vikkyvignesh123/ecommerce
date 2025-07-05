const express = require('express');
//export router
const router = express.Router();


const {navimgtext,navcontent,productlist} = require('./controller')

router.get( '/imgtext', async(req,res)=>{
    try{
             await navimgtext()
             .then((response)=>{
              res.json(response);
                    console.log(response);
             })
             .catch(error=>console.log(" data cannot retrive",error))
    }
    catch(err)
        {
            console.log(err);
        }


})

router.get('/navbarcontent', async (req,res)=>{
    try{

       await navcontent()
       .then((rese)=>
    {
        res.json(rese);
        console.log(rese)
    })
    .catch(err=>{
        console.log("nav content cannot fetch",err);
    })

    }
    catch(err)
    {
        console.log(err);
    }
})

router.get('/productlist',async(req,res)=>{
    
    try{
        await productlist()
        .then((listresponse)=>
            {
            res.json(listresponse);
            console.log(listresponse);
        })
        .catch(err=>{
            console.log("cannot reach product list data",err);
        })
    }

    catch(err){
        console.log(err);
    }
})
 

module.exports=router;
