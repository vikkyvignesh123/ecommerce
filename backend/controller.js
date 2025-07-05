const frontend = require('./datamodels/frontenddatas')


function navimgtext()

{
    return new Promise((resolve,reject)=>{
        try{
            resolve(frontend.logo)
        }
        catch(err)
        {
            reject(err);
        }
    })
}

function navcontent()
{
    return new Promise((resolve,reject)=>
    {
        try{
        resolve(frontend.sidebar)
        }
        catch(err)
        {
          reject(err)
        }
    });
}

function productlist()
{
    return new Promise((resolve,reject)=>{
        try{
        resolve(frontend.productdetais)
    }
    catch(err)
    {
        reject(err)
    }
    })
}
    


module.exports={
    navimgtext,
    navcontent,
    productlist,
}