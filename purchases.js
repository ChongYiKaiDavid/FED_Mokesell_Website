document.addEventListener("DOMContentLoaded", function () {
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    const purchasesList = document.getElementById("purchases-list");

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
});
