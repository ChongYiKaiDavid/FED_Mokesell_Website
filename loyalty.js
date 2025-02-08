document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let usernameElement = document.getElementById("username");
    let pointsElement = document.getElementById("user-points");

    // Set default values
    if (!loggedInUser) {
        loggedInUser = { email: "guest@example.com", points: 0, rewards: [] };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }

    usernameElement.innerText = loggedInUser.email;
    pointsElement.innerText = loggedInUser.points;

    loadRedeemedRewards();
});

// ✅ Redeem Rewards
function redeemReward(cost, rewardName) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser.points >= cost) {
        loggedInUser.points -= cost;
        loggedInUser.rewards.push(rewardName);

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        document.getElementById("user-points").innerText = loggedInUser.points;
        alert(`You've redeemed: ${rewardName}`);
        loadRedeemedRewards();
    } else {
        alert("Not enough points to redeem this reward!");
    }
}

// ✅ Load Redeemed Rewards from `localStorage`
function loadRedeemedRewards() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let redeemedList = document.getElementById("redeemed-list");

    redeemedList.innerHTML = ""; // Clear previous list

    if (loggedInUser.rewards.length === 0) {
        redeemedList.innerHTML = "<p>No rewards claimed yet.</p>";
        return;
    }

    loggedInUser.rewards.forEach((reward) => {
        let listItem = document.createElement("li");
        listItem.innerText = reward;
        redeemedList.appendChild(listItem);
    });
}
