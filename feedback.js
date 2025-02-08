document.getElementById("submit-feedback").addEventListener("click", function () {
    let category = document.getElementById("category").value;
    let feedbackText = document.getElementById("feedback-text").value;
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Please log in first!");
        return;
    }

    if (!feedbackText) {
        alert("Please enter your feedback.");
        return;
    }

    let userEmail = loggedInUser.email;
    let feedbackList = JSON.parse(localStorage.getItem(`${userEmail}_feedback`)) || [];

    let feedbackData = {
        category: category,
        feedback: feedbackText,
        status: "Pending",
        supportStaff: "Not Assigned",
        rating: null
    };

    feedbackList.push(feedbackData);
    localStorage.setItem(`${userEmail}_feedback`, JSON.stringify(feedbackList));

    alert("Feedback submitted successfully!");
    loadFeedback();
});

function loadFeedback() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let userEmail = loggedInUser.email;
    let feedbacks = JSON.parse(localStorage.getItem(`${userEmail}_feedback`)) || [];

    let feedbackContainer = document.getElementById("assigned-feedback");
    feedbackContainer.innerHTML = "";

    feedbacks.forEach(feedback => {
        feedbackContainer.innerHTML += `
            <p><strong>Category:</strong> ${feedback.category}</p>
            <p><strong>Feedback:</strong> ${feedback.feedback}</p>
            <p><strong>Status:</strong> ${feedback.status}</p>
        `;
    });
}
