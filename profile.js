const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

document.addEventListener("DOMContentLoaded", async () => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        await loadUserProfile();
        setupLogoutButton();
    }
});

// Load the user's profile dynamically
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

        let userData = await response.json();

        document.getElementById("profile-name").innerText = userData.name;
        document.getElementById("profile-email").innerText = userData.email;
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

// Logout function
function setupLogoutButton() {
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser"); // Remove user session
        window.location.href = "login.html"; // Redirect to login page
    });
}
