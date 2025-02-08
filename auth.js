const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // Login Function
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                let response = await fetch(`${API_URL}?q={"email": "${email}"}`, {
                    method: "GET",
                    headers: {
                        "x-apikey": API_KEY,
                        "Content-Type": "application/json"
                    }
                });

                let users = await response.json();

                if (users.length > 0 && users[0].password === password) {
                    alert("Login successful!");
                    localStorage.setItem("loggedInUser", JSON.stringify(users[0])); // Store user data
                    window.location.href = "profile.html"; // Redirect to profile
                } else {
                    alert("Invalid email or password.");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Login failed. Try again.");
            }
        });
    }

    // Signup Function (Save User)
    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            try {
                let checkResponse = await fetch(`${API_URL}?q={"email": "${email}"}`, {
                    method: "GET",
                    headers: { "x-apikey": API_KEY, "Content-Type": "application/json" }
                });

                let existingUsers = await checkResponse.json();

                if (existingUsers.length > 0) {
                    alert("Email is already registered!");
                } else {
                    let response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                            "x-apikey": API_KEY,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, email, password, balance: 0 })
                    });

                    if (response.ok) {
                        alert("Account created successfully!");
                        window.location.href = "login.html"; // Redirect to login
                    } else {
                        alert("Failed to create account.");
                    }
                }
            } catch (error) {
                console.error("Error signing up:", error);
                alert("Signup failed. Try again.");
            }
        });
    }
});
