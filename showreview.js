document.addEventListener("DOMContentLoaded", function () {
    const reviewsContainer = document.getElementById("reviews-container");

    // Retrieve reviews from LocalStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
        return;
    }

    reviews.forEach(review => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review-item");
        reviewElement.innerHTML = `
            <p><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
            <p><strong>Quality:</strong> ${review.quality}</p>
            <p><strong>Appearance:</strong> ${review.appearance}</p>
            <p><strong>General:</strong> ${review.general}</p>
            <p><em>Reviewed on: ${review.date}</em></p>
            <hr>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
});
