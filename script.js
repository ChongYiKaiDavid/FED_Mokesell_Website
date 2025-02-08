//search bar
document.getElementById("searchButton").addEventListener("click", function () {
  let query = document.getElementById("searchInput").value.toLowerCase();
  alert("You searched for: " + query);
});

//Reviews
const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -220, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 220, behavior: "smooth" });
});
  


const testimonials = [
    {
        text: "“I've tried countless moisturizers, but this one is a game-changer! My skin feels softer, smoother, and stays hydrated all day without feeling greasy. It's the perfect balance!”",
        name: "Emilia Murray",
        img: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        text: "“Absolutely love this product! It made my skin glow and feel amazing. Highly recommend to anyone looking for quality skincare!”",
        name: "Sophia Williams",
        img: "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        text: "“This is the best serum I've ever used! It absorbs quickly and leaves my skin feeling refreshed and hydrated. A must-have!”",
        name: "Olivia Carter",
        img: "https://randomuser.me/api/portraits/women/32.jpg"
    }
];

let currentIndex = 0;

function showTestimonial(index) {
    const testimonialText = document.getElementById("testimonial");
    const profileImg = document.getElementById("profileImg");
    const name = document.getElementById("name");
    const dots = document.querySelectorAll(".dot");

    if (index >= testimonials.length) {
        index = 0;
    } else if (index < 0) {
        index = testimonials.length - 1;
    }

    currentIndex = index;

    testimonialText.innerHTML = testimonials[index].text;
    profileImg.src = testimonials[index].img;
    name.innerHTML = testimonials[index].name;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

document.getElementById("prevBtn").addEventListener("click", () => {
    showTestimonial(currentIndex - 1);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    showTestimonial(currentIndex + 1);
});

// Auto Slide Every 5 Seconds
setInterval(() => {
    showTestimonial(currentIndex + 1);
}, 3000);

document.addEventListener("DOMContentLoaded", function () {
    const bannerText = document.querySelector(".banner-text");
    
    // Smooth fade-in effect
    bannerText.style.opacity = "0";
    bannerText.style.transition = "opacity 1.5s ease-in-out";
    
    setTimeout(() => {
        bannerText.style.opacity = "1";
    }, 500);
});

//search bar
document.getElementById("searchButton").addEventListener("click", function () {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let products = document.querySelectorAll(".product-card, .product-card2");

  products.forEach((product) => {
      let productName = product.getAttribute("data-name");
      
      if (productName.includes(query)) {
          product.style.display = "block"; // Show matching products
      } else {
          product.style.display = "none"; // Hide non-matching products
      }
  });
});
