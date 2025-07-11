document.addEventListener("DOMContentLoaded", () => {
  const removeButtons = document.querySelectorAll(".remove-btn");
  const items = document.querySelectorAll(".product");

function calculateTotal() {
  let total = 0;

  // Select all rows in the cart table
  const rows = document.querySelectorAll("#cartSection tbody tr");

  rows.forEach(row => {
    const priceCell = row.querySelector("td:nth-child(4)");
    const countInput = row.querySelector(".product-count");

    if (priceCell && countInput) {
      const price = parseFloat(priceCell.textContent.replace(/\D/g, ""));
      const count = parseInt(countInput.value) || 1;
      total += price * count;
    }
  });

  document.getElementById("totalPrice").textContent = `Total: ₹${total}`;
}

// Bind event listener to each quantity input
function setupQuantityListeners() {
  document.querySelectorAll(".product-count").forEach(input => {
    input.addEventListener("input", calculateTotal);
  });
}

// Call once DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  setupQuantityListeners();
  calculateTotal(); // Initial calculation
});



  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productBox = btn.closest(".product");
      const productId = productBox.getAttribute("data-id");

      fetch(`/api/deletecart/${productId}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          productBox.remove();
          calculateTotal();
        }
      })
      .catch(err => console.error("Error removing product:", err));
    });
  });

  calculateTotal();
});
