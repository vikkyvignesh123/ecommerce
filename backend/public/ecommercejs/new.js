window.addEventListener('DOMContentLoaded', () => {
  const highlight = document.getElementById("highlight");
  const productList = document.getElementById("productList");

  const categery = [
    { img: "elctronic.jpg", text: "electronic" },
    { img: "women.jpg", text: "Womens" },
    { img: "mens.jpg", text: "Mens" },
  ];

  let cart = [];
  let count = 0;
  const display = document.getElementById("cart-count");

  // Display category images
  function displayhigh(arrays) {
    arrays.forEach((images) => {
      const categeryProduct = document.createElement("div");
      categeryProduct.setAttribute("class", "boxsize");

      const categeryimage = document.createElement("img");
      categeryimage.setAttribute("class", "elecimage");
      categeryimage.src = `../img/${images.img}`;

      const categerytext = document.createElement("p");
      categerytext.setAttribute("class", "text");
      categerytext.textContent = images.text;

      categeryProduct.appendChild(categeryimage);
      categeryProduct.appendChild(categerytext);
      highlight.appendChild(categeryProduct);
    });
  }

  displayhigh(categery);

  // Fetch product list
  fetch("http://localhost:3000/api/v1/dashboard/productlist")
    .then((res) => res.json())
    .then((data) => {
      cart = data;

      data.forEach(d => {
        const allDetails = document.createElement("div");
        allDetails.classList.add("cover");

        allDetails.innerHTML = `
          <i class="toggleButton cartlogo" style="cursor: pointer; font-size: 24px;" data-added="false">🛒</i>
          <img src="${d.img}" class="productdetailsimg">
          <h4 class="productName">${d.productName}</h4>
          <h6 class="productPrice">${d.productPrice}</h6>
        `;

        productList.appendChild(allDetails);

        // Toggle cart icon
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

          // Add to cart on click
          if (!isAdded) {
            const cartItem = {
              img: d.img,
              productName: d.productName,
              productPrice: d.productPrice
            };
            addTocart(cartItem);
          }
        });

        // Product image click
        const images = allDetails.querySelector(".productdetailsimg");
        images.addEventListener("click", () => {
          productDescription(d);
        });
      });
    });

  const indualDetail = document.getElementById("indualDetails");

  function productDescription(products) {
    indualDetail.classList.remove("hidden");
    indualDetail.classList.add("show");

    let descriptionHTML = "";
    if (products.description) {
      descriptionHTML = `
        <ul>
          ${Object.entries(products.description)
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join("")}
        </ul>
      `;
    }

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

    document.querySelector(".button1").addEventListener("click", () => {
      buyPage();
    });

    document.getElementById("button2").addEventListener("click", () => {
      indualDetail.classList.remove("show");
      indualDetail.classList.add("hidden");
      productList.style.display = "grid";
      productList.scrollIntoView({ behavior: "smooth" });
    });

    indualDetail.scrollIntoView({ behavior: "smooth" });
  }

  function addTocart(cartItem) {
    fetch('http://localhost:3000/api/v1/cart/postcart', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Added to cart", data);
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }

  const paymentPage = document.getElementById("paymentPage");

  function buyPage() {
    paymentPage.classList.remove("hidden");
    paymentPage.classList.add("show");

    paymentPage.innerHTML = `
      <div class="popupBack">
        <div class="payment-container">
          <h2>Payment Page</h2>
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

    document.getElementById("backToDetails").addEventListener("click", () => {
      paymentPage.classList.add("hidden");
      paymentPage.classList.remove("show");
      indualDetail.classList.remove("hidden");
      indualDetail.classList.add("show");
    });
  }

  // Burger menu hover
  const burgerButton = document.getElementById('burgerbutton');
  const buttonDetails = document.getElementById('buttondetails');

  function showMenu() {
    buttonDetails.style.display = 'block';
  }

  function hideMenu() {
    buttonDetails.style.display = 'none';
  }

  burgerButton.addEventListener('mouseover', showMenu);
  burgerButton.addEventListener('mouseout', (e) => {
    if (!buttonDetails.contains(e.relatedTarget)) {
      hideMenu();
    }
  });

  buttonDetails.addEventListener('mouseover', showMenu);
  buttonDetails.addEventListener('mouseout', (e) => {
    if (!burgerButton.contains(e.relatedTarget)) {
      hideMenu();
    }
  });

});
