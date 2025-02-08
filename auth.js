document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // Login Function
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const storedUser = JSON.parse(localStorage.getItem(email));

            if (storedUser && storedUser.password === password) {
                alert("Login successful!");
                localStorage.setItem("loggedInUser", JSON.stringify({ name: storedUser.name, email })); // Store full user info
                window.location.href = "profile.html"; // Redirect to profile page
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Signup Function (Save User)
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            if (localStorage.getItem(email)) {
                alert("Email is already registered!");
            } else {
                localStorage.setItem(email, JSON.stringify({ name, email, password }));
                alert("Account created successfully!");
                window.location.href = "login.html"; // Redirect to login page
            }
        });
    }
});
