console.log("hello World");
const http=require('http');
const protocol = 'http://'
let host = 'localhost';
let baseUrl = '';
const backenddata=require('./datamodels/backenddatas');
const frontenddata = require('./datamodels/frontenddatas');


const server=http.createServer((req,res)=>
{
    host=req.headers.host;
    res.writeHead(200,{
        "ContentType":backenddata.contentType.TEXTPLAIN,
    })
    res.end("hello World");
}
);

const port = 3000;

server.listen(port,()=>{
    console.log(`server is running at ${protocol} ${host}: ${port}`)
});