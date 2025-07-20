window.addEventListener("DOMContentLoaded", () => {
  // Burger Menu Toggle
  const burgerButton = document.getElementById("burgerbutton");
  const buttonDetails = document.getElementById("buttondetails");
  burgerButton.addEventListener("click", () => {
    buttonDetails.style.display = buttonDetails.style.display === "block" ? "none" : "block";
  });

  // Open Login Popup from Menu
  const loginStatus = document.getElementById("loginstatus");
  const background = document.getElementById("background");
  loginStatus.addEventListener("click", (e) => {
    e.preventDefault();
    background.classList.remove("hidden");
    buttonDetails.style.display = "none";
  });

  // Register/Login Popup Toggles
  const Regpopup = document.getElementById("Regpopup");
  const gotoLogin = document.getElementById("gotoLogin");
  const gotoRegister = document.getElementById("gotoRegister");
  const regclosebtn = document.getElementById("regclosebtn");
  const loginclosebtn = document.getElementById("loginclosebtn");

  gotoLogin.addEventListener("click", (e) => {
    e.preventDefault();
    Regpopup.classList.add("hidden");
    background.classList.remove("hidden");
  });

  gotoRegister.addEventListener("click", (e) => {
    e.preventDefault();
    background.classList.add("hidden");
    Regpopup.classList.remove("hidden");
  });

  regclosebtn.addEventListener("click", () => {
    Regpopup.classList.add("hidden");
  });

  loginclosebtn.addEventListener("click", () => {
    background.classList.add("hidden");
  });

  // Register Form
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      username: document.getElementById("regUsername").value,
      email: document.getElementById("regemail").value,
      password: document.getElementById("regPassword").value
    };

    fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          Regpopup.classList.add("hidden");
          background.classList.remove("hidden");
        } else {
          alert(data.message || "Registration failed");
        }
      })
      .catch(err => console.error("Register Error:", err));
  });

  // Login Form
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    };

    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          const userData = {
            username: data.username,
            email: data.email,
            userId: data.userId
          };
          localStorage.setItem("userData", JSON.stringify(userData)); // Use consistent key

          background.classList.add("hidden");

          // Update navbar welcome text
          document.getElementById("logoname").innerText = `Welcome, ${data.username}`;
          location.reload(); // optional reload
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch(err => console.error("Login Error:", err));
  });

  // Fetch Products
  const productList = document.getElementById("productList");
  fetch("http://localhost:3000/api/v1/product/allproducts")
    .then((res) => res.json())
    .then((data) => {
      const products = data.data;

      products.forEach((d) => {
        const div = document.createElement("div");
        div.classList.add("productCard");

        div.innerHTML = `
          <i class="cartlogo" style="cursor: pointer; font-size: 24px; color: black;" data-added="false">🛒</i>
          <img src="${d.productImage}" class="productdetailsimg">
          <h4 class="productName">${d.productname}</h4>
          <h6 class="productPrice">${d.productprice}</h6>
          <button class="shopNowBtn">Shop Now</button>
        `;

        productList.appendChild(div);

        const cartIcon = div.querySelector(".cartlogo");
        cartIcon.addEventListener("click", () => {
          const userData = JSON.parse(localStorage.getItem("user"));

          if (!userData || !userData.userId) {
            alert("Please login first to add items to cart!");
            return;
          }

          const payload = {
            userId: userData.userId,
            productId: d._id,
            quantity: 1
          };
          console.log(payload);
          fetch("http://localhost:3000/api/v1/new/addtocart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          })
            .then(res => res.json())
            .then(response => {
              alert(response.message);
              cartIcon.style.color = "green";
              cartIcon.setAttribute("data-added", "true");
            })
            .catch(err => console.error("Add to cart error:", err));
        });

        const shopNowBtn = div.querySelector(".shopNowBtn");
        shopNowBtn.addEventListener("click", () => {
          alert(`You clicked Shop Now for ${d.productname}`);
        });
      });
    })
    .catch((err) => console.error("Error loading products:", err));
});
