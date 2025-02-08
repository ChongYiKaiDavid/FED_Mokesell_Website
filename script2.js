document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.banner-image');

    // Function to show the current image
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    // Function to show the previous image
    function prevImage() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
        resetAutoSlide(); // Reset timer when user interacts
    }

    // Function to show the next image
    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
        resetAutoSlide(); // Reset timer when user interacts
    }

    // Auto-slide function
    function autoSlide() {
        nextImage();
    }

    // Set auto-slide to run every 3 seconds
    let slideInterval = setInterval(autoSlide, 3000);

    // Reset auto-slide timer when user interacts
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 3000);
    }

    // Any other code that might interact with elements on page load can go here.
});
