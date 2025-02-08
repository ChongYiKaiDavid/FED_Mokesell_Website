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
