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

// let allDetails="";
productdetais.forEach(list=>{
    // allDetails+=`
    const allDetails=document.createElement('div');
    allDetails.innerHTML= `   
    <div class="cover">
        <img src="../img/${list.img}" class="productdetailsimg">
        <h3>${list.productName}</h3>
       <i class="toggleButton" style="cursor: pointer; font-size: 24px;" data-added="false">♥</i>
        <h1>${list.productPrice}</h1>
    </div>
    `;
 
    
    // allDetails.onclick=()=>
    // {
    //     productDescription(list)
    // }
     productList.appendChild(allDetails);

     const images=allDetails.querySelector('.productdetailsimg')

     images.addEventListener('click',()=>
    {
        productDescription(list);

    })

})





 const indualDetail=document.getElementById('indualDetails');

function productDescription(products)
{
 indualDetail.style.display="block";
 indualDetail.innerHTML=`
 <img src="../img/${products.img}">
 <p>${products.productName}</p>
 <h3>${products.productPrice}</h3>
  <ul>
    <li>Battery Life: Up to 30 hours</li>
    <li>Connectivity: Bluetooth 5.0</li>
    <li>Weight: 180g</li>
    <li>Noise Cancellation: Yes</li>
    <li>Charging Port: USB-C</li>
  </ul>
 `;
}

const burgerbutton=document.getElementById('burgerbutton');


const buttondetails=document.getElementById('buttondetails');



burgerbutton.addEventListener('mouseover',()=>
{
    buttondetails.style.display='block';

});

burgerbutton.addEventListener('mouseout',()=>
{
    buttondetails.style.display='none';
}
)



buttondetails.addEventListener('mouseover',()=>
{
    buttondetails.style.display='block';

});

buttondetails.addEventListener('mouseout',()=>
{
    buttondetails.style.display='none';
}
)


const buttons = document.querySelectorAll('.toggleButton');
    const display = document.getElementById('cart-count');

    let count = 0;
    let isAdded = false; // Track toggle state




   buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Read the button's current state
        let isAdded = button.getAttribute('data-added') === 'true';

        if (!isAdded) {
            count++; // Increase cart count
            button.setAttribute('data-added', 'true'); // Mark this button as added
            button.style.color = 'red'; // Optional: Change color when active
        } else {
            count--; // Decrease cart count
            button.setAttribute('data-added', 'false'); // Mark this button as removed
            button.style.color = 'black'; // Optional: Change color when inactive
        }

        display.textContent = count; // Update the cart count
    });
});






