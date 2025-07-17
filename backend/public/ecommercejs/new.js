window.addEventListener('DOMContentLoaded', () => {
  const highlight = document.getElementById("highlight");
  const productList = document.getElementById("productList");

  const categery = [
    { img: "/static/img/elctronic.jpg", text: "electronic" },
    { img: "/static/img/women.jpg", text: "Womens" },
    { img: "/static/img/mens.jpg", text: "Mens" },
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
      categeryimage.src = images.img;

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



//register and login popup
const registerPopup = document.getElementById('Regpopup');
const loginPopup = document.getElementById('background');

const gotoLogin = document.getElementById('gotoLogin');
const gotoRegister = document.getElementById('gotoRegister');

const regCloseBtn = document.getElementById('regclosebtn');
const loginCloseBtn = document.getElementById('loginclosebtn');

// Menu -> Login Button Click → Open Register Form
document.getElementById('loginstatus').addEventListener('click', (e) => {
  e.preventDefault();
  registerPopup.classList.remove('hidden');
  registerPopup.classList.add('show');
  loginPopup.classList.add('hidden');
  loginPopup.classList.remove('show');
});

// Inside Register -> Login click
gotoLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerPopup.classList.add('hidden');
  registerPopup.classList.remove('show');
  loginPopup.classList.remove('hidden');
  loginPopup.classList.add('show');
});

// Inside Login -> Register click
gotoRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginPopup.classList.add('hidden');
  loginPopup.classList.remove('show');
  registerPopup.classList.remove('hidden');
  registerPopup.classList.add('show');
});

// Close buttons
regCloseBtn.addEventListener('click', () => {
  registerPopup.classList.add('hidden');
  registerPopup.classList.remove('show');
});

loginCloseBtn.addEventListener('click', () => {
  loginPopup.classList.add('hidden');
  loginPopup.classList.remove('show');
});



// -------------------- Registration Popup --------------------
document.getElementById('openRegPopupBtn').addEventListener('click', () => {
  document.getElementById('Regpopup').classList.remove('hidden');
  document.getElementById('Regpopup').classList.add('show');
});

document.getElementById('regclosebtn').addEventListener('click', () => {
  document.getElementById('Regpopup').classList.remove('show');
  document.getElementById('Regpopup').classList.add('hidden');
});

// Submit registration form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regemail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('username', result.username);
      showAlert('Registration successful! 🎉', '#4caf50');

      document.getElementById('logoname').textContent = `Welcome, ${result.username}`;
      document.getElementById('loginstatus').textContent = 'Logout';

      setTimeout(() => {
        window.location.href = '/webpage';
      }, 2000);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);
    alert('Registration failed. Try again.');
  }
});

// -------------------- Login Popup --------------------
document.getElementById('loginclosebtn').addEventListener('click', () => {
  document.getElementById('background').classList.remove('show');
  document.getElementById('background').classList.add('hidden');
});

// Submit login form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('username', result.username);
      showAlert('Login successful! 👋', '#4caf50');

      document.getElementById('logoname').textContent = `Welcome, ${result.username}`;
      document.getElementById('loginstatus').textContent = 'Logout';

      setTimeout(() => {
        window.location.href = '/webpage';
      }, 2000);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);
    alert('Login error. Please try again.');
  }
});

// -------------------- Login/Logout Toggle --------------------
// Open Register Popup on Menu Login Click
document.getElementById('loginstatus').addEventListener('click', () => {
  const username = localStorage.getItem('username');

  if (username) {
    // Logout logic
    localStorage.removeItem('username');
    document.getElementById('logoname').textContent = 'Welcome, Guest';
    document.getElementById('loginstatus').textContent = 'Login';
    showAlert('Logged out successfully 👋', '#f44336');
  } else {
    // Login logic: Show Register form by default
    document.getElementById('Regpopup').classList.remove('hidden');
    document.getElementById('background').classList.add('hidden');
  }
});


// Switch to Login
document.getElementById('gotoLogin').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('Regpopup').classList.add('hidden');
  document.getElementById('background').classList.remove('hidden');
});

// Switch to Register
document.getElementById('gotoRegister').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('background').classList.add('hidden');
  document.getElementById('Regpopup').classList.remove('hidden');
});

// Close Popups
document.getElementById('regclosebtn').addEventListener('click', () => {
  document.getElementById('Regpopup').classList.add('hidden');
});

document.getElementById('loginclosebtn').addEventListener('click', () => {
  document.getElementById('background').classList.add('hidden');
});

// -------------------- Initialize on Page Load --------------------
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');

  if (username) {
    document.getElementById('logoname').textContent = `Welcome, ${username}`;
    document.getElementById('loginstatus').textContent = 'Logout';
  } else {
    document.getElementById('logoname').textContent = 'Welcome, Guest';
    document.getElementById('loginstatus').textContent = 'Login';
  }
});

// -------------------- Alert Utility --------------------
function showAlert(message, color) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.position = 'fixed';
  alertBox.style.top = '20px';
  alertBox.style.right = '20px';
  alertBox.style.background = color;
  alertBox.style.color = 'white';
  alertBox.style.padding = '10px 20px';
  alertBox.style.borderRadius = '5px';
  alertBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
  alertBox.style.zIndex = 9999;
  document.body.appendChild(alertBox);

  setTimeout(() => alertBox.remove(), 3000);
}


// // register submit
// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const username = document.getElementById('regUsername').value;
//   const email = document.getElementById('regemail').value;
//   const password = document.getElementById('regPassword').value;

//   try {
//     const res = await fetch('/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, email, password })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert('Registration Successful ✅');
//       document.getElementById('Regpopup').classList.add('hidden');
//       document.getElementById('Regpopup').classList.remove('show');
//     } else {
//       alert(data.message || 'Registration Failed ❌');
//     }

//   } catch (err) {
//     console.error(err);
//     alert('Server Error ❌');
//   }
// });





//login form submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login Successful ✅');
      document.getElementById('background').classList.add('hidden');
      document.getElementById('background').classList.remove('show');
    } else {
      alert(data.message || 'Login Failed ❌');
    }

  } catch (err) {
    console.error(err);
    alert('Server Error ❌');
  }
});



