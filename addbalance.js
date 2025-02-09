document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://mokesell-d690.restdb.io/rest/userinfo";
    const API_KEY = "67a777184d8744758f828036";
    
    const proceedBtn = document.getElementById("proceed-btn");
    const balanceDisplay = document.getElementById("balance");
    const emailInput = document.getElementById("email");

    async function fetchAndDisplayBalance(email) {
        if (!email) {
            console.warn("⚠️ No email provided, cannot fetch balance.");
            return;
        }

        try {
            let response = await fetch(`${API_URL}?q={"email":"${email}"}`, {
                method: "GET",
                headers: { "x-apikey": API_KEY }
            });

            let userData = await response.json();
            if (userData.length > 0) {
                let updatedBalance = userData[0].balance || 0;
                balanceDisplay.textContent = `$${updatedBalance.toFixed(2)}`;
                console.log("💰 Updated Balance Displayed:", updatedBalance);
            } else {
                console.warn("⚠️ User data not found.");
            }
        } catch (error) {
            console.error("❌ Error fetching balance:", error);
        }
    }

    if (proceedBtn) {
        proceedBtn.addEventListener("click", async function () {
            const name = document.getElementById("name").value.trim();
            const email = emailInput.value.trim();
            const password = document.getElementById("password").value.trim();
            const amount = document.getElementById("amount").value;

            if (!name || !email || !password || !amount || amount <= 0) {
                alert("Please fill in all fields correctly.");
                return;
            }

            console.log("⚡ Proceeding to update balance...");
            
            try {
                let existingUserResponse = await fetch(`${API_URL}?q={"email":"${email}"}`, {
                    method: "GET",
                    headers: { "x-apikey": API_KEY }
                });

                let existingUserData = await existingUserResponse.json();

                if (!existingUserData.length) {
                    alert("User not found. Please register first.");
                    return;
                }

                let userId = existingUserData[0]._id;
                let updatedUserData = {
                    name: existingUserData[0].name || name,
                    email: existingUserData[0].email || email,
                    password: existingUserData[0].password || password,
                    balance: Number(existingUserData[0].balance) + Number(amount)
                };

                let response = await fetch(`${API_URL}/${userId}`, {
                    method: "PUT",
                    headers: {
                        "x-apikey": API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedUserData)
                });

                let result = await response.json();
                console.log("🔍 API Response:", result);

                if (response.ok) {
                    alert("✅ Balance updated successfully!");
                    await fetchAndDisplayBalance(email);
                    window.location.href = `payment.html?amount=${amount}`;
                } else {
                    console.error("❌ API Error:", result);
                    alert(`Failed to update balance. Error: ${result.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error("🔥 Fetch error:", error);
                alert(`An error occurred: ${error.message}. Check console logs.`);
            }
        });
    }

    // Fetch balance on page load if email exists in input field
    if (emailInput) {
        emailInput.addEventListener("input", function () {
            fetchAndDisplayBalance(emailInput.value.trim());
        });
    }

    if (emailInput && emailInput.value.trim()) {
        fetchAndDisplayBalance(emailInput.value.trim());
    }
});
