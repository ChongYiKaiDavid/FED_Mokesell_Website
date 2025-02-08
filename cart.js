document.addEventListener("DOMContentLoaded", async function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    let userId = loggedInUser._id;
    let cart = await getUserCart(userId);

    displayCart(cart);

    document.getElementById("cart-items").addEventListener("click", async function (event) {
        if (event.target.tagName === "BUTTON") {
            let index = event.target.dataset.index;
            cart.splice(index, 1);
            await updateUserCart(userId, cart);
            displayCart(cart);
        }
    });
});

async function addToCart(item) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userId = loggedInUser._id;
    let cart = await getUserCart(userId);

    cart.push(item);
    await updateUserCart(userId, cart);

    alert("Item added to cart!");
}

function displayCart(cart) {
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
                <button data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price;
        });
    }

    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}
