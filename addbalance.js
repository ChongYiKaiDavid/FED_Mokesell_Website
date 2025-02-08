document.addEventListener("DOMContentLoaded", async function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    let userId = loggedInUser._id;
    let userBalance = await getUserBalance(userId);

    document.getElementById("balance").innerText = `$${userBalance.toFixed(2)}`;

    document.getElementById("proceed-btn").addEventListener("click", async function () {
        let amount = parseFloat(document.getElementById("amount").value);

        if (!amount || amount <= 0) {
            alert("Please enter a valid amount!");
            return;
        }

        let newBalance = userBalance + amount;
        await updateUserBalance(userId, newBalance);

        window.location.href = "payment.html";
    });
});
