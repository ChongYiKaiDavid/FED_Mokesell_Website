document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

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
