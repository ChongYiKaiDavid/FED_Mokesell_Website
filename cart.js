document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    let userEmail = loggedInUser.email;
    let cart = JSON.parse(localStorage.getItem(`${userEmail}_cart`)) || [];

    displayCart(cart);

    document.getElementById("cart-items").addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            let index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem(`${userEmail}_cart`, JSON.stringify(cart));
            displayCart(cart);
        }
    });
});

function addToCart(item) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userEmail = loggedInUser.email;
    let cart = JSON.parse(localStorage.getItem(`${userEmail}_cart`)) || [];

    cart.push(item);
    localStorage.setItem(`${userEmail}_cart`, JSON.stringify(cart));

    alert("Item added to cart!");
}

function displayCart(cart) {
    let cartContainer = document.getElementById("cart-items");
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
                <button data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }
}

// Initialize cart if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to update the cart icon count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

// Function to add items to the cart
function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Add new product if not in cart
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in the header
    updateCartCount();

    // Display alert or log a message for testing
    console.log('Item added to cart:', productName);
}

// Function to render cart items on the cart page
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Call the function to update cart count when the page loads
updateCartCount();

// Call the function to render cart items when the page loads
renderCartItems();
