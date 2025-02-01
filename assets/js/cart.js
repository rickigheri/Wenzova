document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCart = () => {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.title}</h3>
          <p>$${item.price}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      total += item.price;
    });

    cartTotalContainer.innerHTML = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      });
    });
  };

  updateCart();
});