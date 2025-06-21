const highlight=document.getElementById('highlight');
const productList=document.getElementById('productList');

const categery=[
    {
    img:"elctronic.jpg",
    text:"electronic",
    

},
   {
    img:"women.jpg",
    text:"Womens",
    

},
   {
    img:"mens.jpg",
    text:"Mens",
    

}
]

function displayhigh(arrays){

arrays.forEach(images=>{
const categeryProduct=document.createElement('div');
categeryProduct.setAttribute('class','boxsize');
const categeryimage= document.createElement('img');
categeryimage.setAttribute('class',"elecimage");
const categerytext=document.createElement('p');
categerytext.setAttribute('class',"text");
categeryimage.src=`../img/${images.img}`;
categerytext.textContent=images.text;

categeryProduct.appendChild(categeryimage);
categeryProduct.appendChild(categerytext);
highlight.appendChild(categeryProduct);

})



}

displayhigh(categery);


const productdetais=
[
    {
        img:"airpods.jpg",
        productName:"airpods",
        productPrice:"PRICE RS.300/-"

    },
     {
        img:"laptop.jpg",
        productName:"laptop",
        productPrice:"PRICE RS.300/-"

    },
     {
        img:"phone.jpg",
        productName:"phone",
        productPrice:"PRICE RS.500/-"

    },
     {
        img:"shoe.jpg",
        productName:"shoe",
        productPrice:"PRICE RS.700/-"

    },
     {
        img:"watchmodel.jpg",
        productName:"watch",
        productPrice:"PRICE RS.1300/-"

    },
     {
        img:"makeup.jpg",
        productName:"makeup",
        productPrice:"PRICE RS.3300/-"

    },
     {
        img:"tv.jpg",
        productName:"tv",
        productPrice:"PRICE RS.3500/-"

    },
     {
        img:"womendress.jpg",
        productName:"clothes",
        productPrice:"PRICE RS.24300/-"

    }


]

let allDetails="";
productdetais.forEach(list=>{
    allDetails+=`
    <div class="cover">
        <img src="../img/${list.img}">
        <h3>${list.productName}</h3>
        <h1>${list.productPrice}</h1>
    </div>
    `
})

 productList.innerHTML=allDetails;