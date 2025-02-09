document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // Update cart count in header when page loads

    if (document.getElementById("cart-items")) {
        renderCartItems(); // Render cart items if on the cart page
    }

    // Handle item removal in the cart
    document.getElementById("cart-items")?.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            let index = event.target.dataset.index;
            removeFromCart(index);
        }
    });

    // Handle checkout
    document.getElementById("checkout-btn")?.addEventListener("click", function () {
        localStorage.removeItem("cart");
        updateCartCount();
        window.location.href = "payment.html";
    });
});

// Function to update the cart icon count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

// Function to add items to the cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already exists
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Add new product
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Update cart if user is on the cart page
    if (document.getElementById("cart-items")) {
        renderCartItems();
    }

    alert(`${productName} added to cart!`);
}

// Function to remove items from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartCount();
    renderCartItems();
}

// Function to render cart items on the cart page
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Clear existing cart display
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerText = "0.00";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}
