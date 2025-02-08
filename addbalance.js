const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

// Get logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to login if no user is logged in
}

let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

// Function to fetch user's balance from RESTdb
async function getUserBalance() {
    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let userData = await response.json();
        return userData.balance || 0;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
}

// Function to update user's balance
async function updateUserBalance(newBalance) {
    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ balance: newBalance })
        });

        if (response.ok) {
            console.log("Balance updated successfully.");
        } else {
            console.error("Failed to update balance.");
        }
    } catch (error) {
        console.error("Error updating balance:", error);
    }
}

// Display user's balance
(async function displayBalance() {
    let userBalance = await getUserBalance();
    document.getElementById("balance").innerText = `$${userBalance.toFixed(2)}`;
})();

// Proceed to Payment Logic
document.getElementById("proceed-btn").addEventListener("click", async function () {
    let amount = parseFloat(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    let userBalance = await getUserBalance();
    let newBalance = userBalance + amount;

    await updateUserBalance(newBalance);

    // Redirect to Payment Page
    window.location.href = "payment.html";
});
