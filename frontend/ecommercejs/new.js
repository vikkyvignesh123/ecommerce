const highlight = document.getElementById("highlight");
// const highlightId="#highlight";
const productList = document.getElementById("productList");

const categery = [
  {
    img: "elctronic.jpg",
    text: "electronic",
  },
  {
    img: "women.jpg",
    text: "Womens",
  },
  {
    img: "mens.jpg",
    text: "Mens",
  },
];

    //productlist
let count = 0;
const display = document.getElementById("cart-count");

fetch("http://localhost:3000/api/productlist")
  .then((res) => res.json())
  .then((data) => {
    const productList = document.getElementById("productList");

    data.forEach(d => {
      const allDetails = document.createElement("div");
      allDetails.innerHTML = `   
        <div class="cover">
          <i class="toggleButton" style="cursor: pointer; font-size: 24px;" data-added="false">🛒</i>
          <img src="${d.img}" class="productdetailsimg">
          <h4>${d.productName}</h4>
          <h6>${d.productPrice}</h6>
        </div>
      `;

      productList.appendChild(allDetails);

      // Add toggle listener AFTER appending
      const toggleButton = allDetails.querySelector(".toggleButton");
      toggleButton.addEventListener("click", () => {
        const isAdded = toggleButton.getAttribute("data-added") === "true";

        if (!isAdded) {
          count++;
          toggleButton.setAttribute("data-added", "true");
          toggleButton.style.color = "red";
        } else {
          count--;
          toggleButton.setAttribute("data-added", "false");
          toggleButton.style.color = "black";
        }

        display.textContent = count;
      });

      // ✅ product image click
      const images = allDetails.querySelector(".productdetailsimg");
      images.addEventListener("click", () => {
        productDescription(d); 
      });
    });
  })
  .catch((err) => {
    console.error("Failed to fetch product list:", err);
  });

function displayhigh(arrays) {
  arrays.forEach((images) => {
    const categeryProduct = document.createElement("div");
    categeryProduct.setAttribute("class", "boxsize");
    const categeryimage = document.createElement("img");
    categeryimage.setAttribute("class", "elecimage");
    const categerytext = document.createElement("p");
    categerytext.setAttribute("class", "text");
    categeryimage.src = `../img/${images.img}`;
    categerytext.textContent = images.text;

    categeryProduct.appendChild(categeryimage);
    categeryProduct.appendChild(categerytext);
    highlight.appendChild(categeryProduct);
  });
}

displayhigh(categery);





const indualDetail = document.getElementById("indualDetails");

function productDescription(products) {
  indualDetail.classList.remove("hidden");
  indualDetail.classList.add("show");

  let descriptionHTML = "";
  if (products.description) {
    descriptionHTML = `
      <ul>
        ${Object.entries(products.description)
          .map(([key, value]) => {
            return `<li><strong>${key}:</strong> ${value}</li>`;
          })
          .join("")}
      </ul>
    `;
  }


  // productList.style.display = "none";
  // productList.classList.add("hidden");
  // indualDetail.style.display = "block";
  // indualDetail.classList.remove("hidden");
  indualDetail.innerHTML = `
        <div class="alter">
            <img src="${products.img}">
            <p>${products.productName}</p>
            <h3>${products.productPrice}</h3>
            ${descriptionHTML}
         
                <button class="button1">SHOP NOW</button>
                <button id="button2">BACK</button>
        </div>
        `;
  // Add SHOP NOW event listener after DOM is updated
  document.querySelector(".button1").addEventListener("click", () => {
    buyPage();
  });

  // Back Button Function

  indualDetail.scrollIntoView({ behavior: "smooth" });
  document.getElementById("button2").addEventListener("click", () => {
    indualDetail.classList.remove("show");
    indualDetail.classList.add("hidden");
    productList.style.display = "grid";
    productList.scrollIntoView({ behavior: "smooth" });
  });
}

// burger button functions

const burgerbutton = document.getElementById("burgerbutton");

const buttondetails = document.getElementById("buttondetails");

burgerbutton.addEventListener("mouseover", () => {
  buttondetails.style.display = "block";
});

burgerbutton.addEventListener("mouseout", () => {
  buttondetails.style.display = "none";
});

buttondetails.addEventListener("mouseover", () => {
  buttondetails.style.display = "block";
});

buttondetails.addEventListener("mouseout", () => {
  buttondetails.style.display = "none";
});

//payment page
const paymentPage = document.getElementById("paymentPage");

function buyPage() {
  paymentPage.classList.remove("hidden");
  paymentPage.classList.add("show");
  paymentPage.innerHTML = `
  
  
  <div class="popupBack">
       <div class="payment-container">
          <h2>Payment Page</h2>
          <p>Enter your payment details below:</p>
            <form id="paymentForm">
              <label>Name on Card: <input type="text" required></label><br><br>
              <label>Card Number: <input type="text" required></label><br><br>
              <label>Expiry Date: <input type="month" required></label><br><br>
              <button type="submit" id="paybutton">Pay Now</button>
              <button type="button" id="backToDetails">Back</button>
            </form>
        </div>
   
  </div>
  `;

  document.querySelector("#backToDetails").addEventListener("click", () => {
    paymentPage.classList.add("hidden");
    paymentPage.classList.remove("show");
    indualDetail.classList.remove("hidden");
    indualDetail.classList.add("show");
  });
}



loginstatus.addEventListener("click", () => {
  backGround.classList.toggle("show");

});
/**
 * 
 */
function register() {
  const regUserName = document.getElementById("regUsername").value;
  const regEmail = document.getElementById("regemail").value;
  const regPassword = document.getElementById("regPassword").value;

  const registerdata = {
    regname: regUserName,
    regemail: regEmail,
    regpassword: regPassword,
  };

  const regData = JSON.parse(localStorage.getItem("user")) || [];

  const DataMatch = regData.some((data) => data.regemail === regEmail);
  if (DataMatch) {
    alert("already you are Registered");
  } else {
    regData.push(registerdata);
    localStorage.setItem("user", JSON.stringify(regData));
    alert("Register Successfully ✅");
  }
}


const gotoRegister = document.getElementById("gotoRegister");
const gotoLogin = document.getElementById("gotoLogin");
const backGround = document.getElementById("background");
const Regpopup = document.getElementById("Regpopup");


//Register from login

gotoRegister.addEventListener('click', (e) => {
  e.preventDefault();
  backGround.style.display = "none"; 
  Regpopup.style.display = "block"; 
});

//Login from register
gotoLogin.addEventListener('click', (e) => {
  e.preventDefault();
  Regpopup.style.display = "none";
  backGround.style.display = "block";
});



fetch('http://localhost:3000/api/navbarcontent')
.then((response)=>response.json())
.then((data)=>{
  data.forEach((d)=>{
    const list = document.getElementById(d.id);
    if(list)
    {
      list.textContent=d.name;
    }
  })
})
.catch((err)=>
{
  console.log(err,"cant receive data");
}
)

fetch('http://localhost:3000/api/imgtext')
  .then((res) => res.json())

  .then((data) => {
    console.log(data);
    const logoImg = document.getElementById('logoimg');
    const logoName = document.getElementById('logoname');
    logoImg.src = data.imageUrl;
    logoName.textContent = data.title;
  })
  .catch((err) => {
    console.log(err, 'cannot receive logo data');
  });






