const express = require('express');
const app = express();
const cors = require('cors');
const bakeneddata =require('./datamodels/backenddatas')
const cartrouter = require('./router/cartrouter');
const router = require('./router/router');
const path = require('path');
app.use(express.json());
app.use(cors());
app.set("view engine","jade")
app.set("views",path.join(__dirname,"views"))
app.use('/api', cartrouter);
app.use('/api', router);




app.get("/jade",(req,res)=>{
    res.render("index.jade",{
        "title":"website",
        "h1value":"index jade"
    })
})


// Serve images from frontend/img folder
app.use('/img', express.static(path.resolve(__dirname, '../frontend/img')));


const port = bakeneddata.contentType.PORT;
app.listen(port,()=>
{
    console.log(`app server is running ${port}`);
})