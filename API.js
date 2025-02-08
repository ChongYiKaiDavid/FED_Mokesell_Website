const API_URL = "https://userinfo-4b8c.restdb.io/rest/userinfo";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

// **Helper function to handle API requests**
async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method: method,
        headers: {
            "x-apikey": API_KEY,
            "Content-Type": "application/json"
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        return response.ok ? await response.json() : Promise.reject("API request failed");
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}

// **User Authentication API**
async function getUserByEmail(email) {
    let users = await apiRequest(`?q={"email": "${email}"}`);
    return users.length > 0 ? users[0] : null;
}

async function registerUser(userData) {
    return await apiRequest("", "POST", userData);
}

// **Balance API**
async function getUserBalance(userId) {
    let userData = await apiRequest(userId);
    return userData ? userData.balance : 0;
}

async function updateUserBalance(userId, newBalance) {
    return await apiRequest(userId, "PATCH", { balance: newBalance });
}

// **Cart API**
async function getUserCart(userId) {
    let userData = await apiRequest(userId);
    return userData ? userData.cart || [] : [];
}

async function updateUserCart(userId, cart) {
    return await apiRequest(userId, "PATCH", { cart: cart });
}
