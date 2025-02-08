const API_URL = "https://mokesell-d690.restdb.io/rest/userinfo"; // Updated RESTdb URL
const API_KEY = "67a777184d8744758f828036"; // Your API Key

// Get logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

// ✅ Submit Feedback to RESTdb
document.getElementById("submit-feedback").addEventListener("click", async function () {
    let category = document.getElementById("category").value;
    let feedbackText = document.getElementById("feedback-text").value;

    if (!feedbackText) {
        alert("Please enter your feedback.");
        return;
    }

    let feedbackData = {
        user: userEmail,
        category: category,
        feedback: feedbackText,
        status: "Pending",
        supportStaff: "Not Assigned",
        rating: null
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        });

        if (response.ok) {
            alert("Feedback submitted successfully!");
            document.getElementById("feedback-text").value = "";
            loadFeedback();
        } else {
            alert("Failed to submit feedback.");
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
    }
});

// ✅ Load Feedback from RESTdb
async function loadFeedback() {
    try {
        let response = await fetch(`${API_URL}?q={"user": "${userEmail}"}`, {
            method: "GET",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            }
        });

        let feedbacks = await response.json();
        let feedbackContainer = document.getElementById("assigned-feedback");
        feedbackContainer.innerHTML = "";

        if (feedbacks.length === 0) {
            feedbackContainer.innerHTML = "<p>No assigned feedback yet.</p>";
        } else {
            feedbacks.forEach((feedback) => {
                let feedbackItem = document.createElement("div");
                feedbackItem.classList.add("feedback-item");
                feedbackItem.innerHTML = `
                    <p><strong>Category:</strong> ${feedback.category}</p>
                    <p><strong>Feedback:</strong> ${feedback.feedback}</p>
                    <p><strong>Status:</strong> ${feedback.status}</p>
                    <p><strong>Assigned Staff:</strong> ${feedback.supportStaff}</p>
                    <p><strong>Rating:</strong> ${feedback.rating !== null ? feedback.rating : "Not Rated Yet"}</p>
                    ${feedback.status === "Resolved" ? `<button onclick="rateFeedback('${feedback._id}')">Rate Support</button>` : ""}
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        }
    } catch (error) {
        console.error("Error loading feedback:", error);
    }
}

// ✅ Rate Feedback (Only If Resolved)
async function rateFeedback(feedbackId) {
    let rating = prompt("Rate the support (1-5):");
    rating = parseInt(rating);

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
    }

    try {
        let response = await fetch(`${API_URL}/${feedbackId}`, {
            method: "PATCH",
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rating: rating })
        });

        if (response.ok) {
            alert("Thank you for your feedback!");
            loadFeedback();
        } else {
            alert("Failed to submit rating.");
        }
    } catch (error) {
        console.error("Error submitting rating:", error);
    }
}

// ✅ Load Feedback on Page Load
document.addEventListener("DOMContentLoaded", loadFeedback);
