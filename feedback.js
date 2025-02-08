const API_URL = "https://userinfo-4b8c.restdb.io/rest/feedback";
const API_KEY = "86732fdabf20175fb904e6d9adb6e191f67f9";

// Get logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

let userEmail = loggedInUser.email;
let userId = loggedInUser._id;

// Function to Submit Feedback
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

// Function to Load Feedback
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
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        }
    } catch (error) {
        console.error("Error loading feedback:", error);
    }
}

// Load Feedback on Page Load
document.addEventListener("DOMContentLoaded", loadFeedback);
