const API_URL = "https://mokesell-d690.restdb.io/rest/userinfo";
const API_KEY = "67a777184d8744758f828036"; // Your new API key

document.addEventListener("DOMContentLoaded", async () => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        await loadUserProfile();
        setupLogoutButton();
    }
});

// ✅ Load the User's Profile Data from RESTdb
async function loadUserProfile() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userId = loggedInUser._id;

    try {
        let response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }

        let userData = await response.json();

        document.getElementById("profile-name").innerText = userData.name;
        document.getElementById("profile-email").innerText = userData.email;

        // ✅ Update Balance Display
        if (userData.balance !== undefined) {
            document.getElementById("profile-balance").innerText = `Balance: $${userData.balance.toFixed(2)}`;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

// ✅ Logout Function (Clears Session)
function setupLogoutButton() {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser"); // Remove user session
            window.location.href = "login.html"; // Redirect to login page
        });
    }
}

