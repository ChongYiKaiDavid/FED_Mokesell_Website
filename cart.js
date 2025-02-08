document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
});

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price;
        });
    }

    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    document.getElementById("cart-count").innerText = cart.length;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}
