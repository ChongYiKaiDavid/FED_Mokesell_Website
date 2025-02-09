document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();

    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        renderCartItems();
    }

    const purchasesList = document.getElementById("purchases-list");
    if (purchasesList) {
        renderPurchases();
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
            purchases.push(...cart);
            localStorage.setItem("purchases", JSON.stringify(purchases));

            localStorage.removeItem("cart");
            updateCartCount();

            window.location.href = "payment.html";
        });
    }
});

// Function to update the cart icon count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
}

// Function to add items to the cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    if (document.getElementById("cart-items")) {
        renderCartItems();
    }

    alert(`${productName} added to cart!`);
}

// Function to remove items from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartCount();
    renderCartItems();
}

// Function to render cart items
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) return;

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

// Function to render previous purchases
function renderPurchases() {
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const purchasesList = document.getElementById("purchases-list");

    if (!purchasesList) return;
    purchasesList.innerHTML = "";

    if (purchases.length === 0) {
        purchasesList.innerHTML = "<p>No previous purchases found.</p>";
        return;
    }

    purchases.forEach(item => {
        const purchaseItem = document.createElement("div");
        purchaseItem.classList.add("cart-item");
        purchaseItem.innerHTML = `
            <span>${item.name}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        purchasesList.appendChild(purchaseItem);
    });
}
