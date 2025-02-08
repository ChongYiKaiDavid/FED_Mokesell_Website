const API_URL = "https://mokesell-d690.restdb.io/rest/userinfo"; // Your new RESTdb URL
const API_KEY = "67a777184d8744758f828036"; // Your new API Key

// ✅ Function to Fetch User by Email (For Login)
async function getUserByEmail(email) {
    try {
        let response = await fetch(`${API_URL}?q={"email": "${email}"}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let users = await response.json();
        return users.length > 0 ? users[0] : null; // Return the first user found
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// ✅ Function to Register New User (For Sign Up)
async function registerUser(userData) {
    try {
        console.log("Registering user:", JSON.stringify(userData, null, 2));

        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        let result = await response.json();

        if (!response.ok) {
            console.error("Failed to register user:", result);
            alert(`Error: ${result.message || "Unknown error"}`);
            return null;
        }

        console.log("User registered successfully:", result);
        return result;
    } catch (error) {
        console.error("Error registering user:", error);
        alert(`Error: ${error.message || "Registration failed"}`);
        return null;
    }
}

// ✅ Ensure Event Listeners Run
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // ✅ Login Functionality
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            let user = await getUserByEmail(email);

            if (user && user.password === password) {
                alert("Login successful!");
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "profile.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // ✅ Sign Up Functionality
    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            let existingUser = await getUserByEmail(email);

            if (existingUser) {
                alert("Email is already registered!");
            } else {
                let newUser = await registerUser({ name, email, password, balance: 0 });
                if (newUser) {
                    alert("Account created successfully!");
                    window.location.href = "login.html";
                } else {
                    alert("Failed to create account.");
                }
            }
        });
    }
});
