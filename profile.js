document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
    loadProducts();
});

// Load the user's profile dynamically
function loadUserProfile() {
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "Guest", email: "guest@example.com" };
    
    document.getElementById("profile-name").innerText = user.name;
    document.getElementById("profile-email").innerText = user.email;
}

// Load products dynamically
function loadProducts() {
    let products = JSON.parse(localStorage.getItem("userProducts")) || [];
    let productContainer = document.getElementById("product-list");

    productContainer.innerHTML = ""; // Clear the container

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products added yet.</p>";
    } else {
        products.forEach(product => {
            let productElement = document.createElement("div");
            productElement.classList.add("product-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <span>$${product.price}</span>
            `;
            productContainer.appendChild(productElement);
        });
    }
}

// Function to simulate login and store user info
function loginUser(name, email) {
    localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));
}
