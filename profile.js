document.addEventListener("DOMContentLoaded", () => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (!user) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        loadUserProfile();
        loadProducts();
        setupLogoutButton();
    }
});

// Load the user's profile dynamically
function loadUserProfile() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        document.getElementById("profile-name").innerText = user.name;
        document.getElementById("profile-email").innerText = user.email;
    } else {
        document.getElementById("profile-name").innerText = "Guest";
        document.getElementById("profile-email").innerText = "guest@example.com";
    }
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

// Logout function
function setupLogoutButton() {
    const logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logout";
    logoutBtn.id = "logout-btn";
    logoutBtn.style.cssText = "background-color: red; color: white; border: none; padding: 8px 15px; cursor: pointer; margin-top: 10px;";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser"); // Remove user session
        window.location.href = "login.html"; // Redirect to login page
    });

    document.querySelector(".profile-text").appendChild(logoutBtn);
}
