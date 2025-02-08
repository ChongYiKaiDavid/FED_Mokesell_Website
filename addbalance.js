const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "67a777184d8744758f828036";

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
    window.location.href = "login.html";
}
let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

document.addEventListener("DOMContentLoaded", function () {
    const proceedBtn = document.getElementById("proceed-btn");
    
    if (proceedBtn) {
        proceedBtn.addEventListener("click", async function () {
            const amount = document.getElementById("amount").value;
            
            if (!amount || amount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }
            
            try {
                let response = await fetch(`${API_URL}/${userId}`, {
                    method: "PUT",
                    headers: {
                        "x-apikey": API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        balance: parseFloat(amount) // Assuming balance field exists
                    })
                });

                if (response.ok) {
                    alert("Balance updated successfully!");
                    window.location.href = `payment.html?amount=${amount}`;
                } else {
                    alert("Failed to update balance.");
                }
            } catch (error) {
                console.error("Error updating balance:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }
});
