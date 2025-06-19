function goToProductPage(productdetails) {
  window.location.href = productdetails;
}
let cartCount = 0;

function toggleCart(element) {
  // const cartIcon = document.getElementById("cart");
  const cartCountElement = document.getElementById("cart-count");

  // Toggle active class to track state
  if (!element.classList.contains("active")) {
    cartCount++;
    element.classList.add("active");
    // Optional: change heart color when added
    element.style.color = "red";
  } else {
    cartCount--;
    element.classList.remove("active");
    element.style.color = "black"; // Optional: reset heart color when removed
  }

  cartCountElement.innerText = cartCount;
}

