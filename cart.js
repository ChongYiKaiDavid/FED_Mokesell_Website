const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

// Get logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect if no user is logged in
}

let userEmail = loggedInUser.email;
let userId = loggedInUser._id; // RESTdb user ID

// Load Cart Items from RESTdb
async function loadCartItems() {
    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let userData = await response.json();
        let cart = userData.cart || []; // Get cart from user data

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
    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

// Remove an item from the cart
async function removeItem(index) {
    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: { "x-apikey": API_KEY, "Content-Type": "application/json" }
        });

        let userData = await response.json();
        let cart = userData.cart || [];

        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1); // Remove item from cart

            // Update cart in RESTdb
            await fetch(`${API_URL}/${userId}`, {
                method: "PATCH",
                headers: {
                    "x-apikey": API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cart: cart })
            });

            loadCartItems(); // Reload the cart UI
        }
    } catch (error) {
        console.error("Error removing item:", error);
    }
}

// Add item to the cart
async function addToCart(item) {
    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: { "x-apikey": API_KEY, "Content-Type": "application/json" }
        });

        let userData = await response.json();
        let cart = userData.cart || [];
        cart.push(item); // Add new item

        // Update cart in RESTdb
        await fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cart: cart })
        });

        alert("Item added to cart!");
        loadCartItems(); // Reload the cart UI
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
}

// Load cart on page load
document.addEventListener("DOMContentLoaded", loadCartItems);
