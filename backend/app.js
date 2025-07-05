const express = require('express');
const app = express();
const cors = require('cors');
const bakeneddata =require('./datamodels/backenddatas')
const router = require('./router');
const path = require('path');
app.use(express.json());
app.use(cors());
app.use('/api',router)


// Serve images from frontend/img folder
app.use('/img', express.static(path.resolve(__dirname, '../frontend/img')));







const port = bakeneddata.contentType.PORT;
app.listen(port,()=>
{
    console.log(`app server is running ${port}`);
})