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
// Get references to the search input and button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Map of product names to their corresponding HTML filenames
const productPages = {
    "belif youth creator age knockdown eye serum": "skincare-product1.html",
    "the therapy vegan blending serum": "skincare-product2.html",
    "the therapy vegan moisture blending cream": "skincare-product3.html",
    "belif prime infusion repair essence & cream": "skincare-product4.html",
    "thefaceshop the therapy vegan moisturizing sun serum": "skincare-product5.html",
    "thefaceshop the solution brightening face mask": "skincare-product6.html",
    "Geared Pants" : "clothes-product1.html",
    "Rollerblade Logo T-Shirt" : "clothes-product2.html",
    "Relaxed Pinstripe Shirt" : "clothes-product3.html",
    "DeFacto Ecru Shirt" : "clothes-product4.html",
    "Mango Structured Suit Jacket" : "clothes-product5.html",
    "calvin Klein--Monologo Crop Polo Shirt" : "clothes-product6.html",
    "Sauvage Eau de Parfum": "perfume-product1.html",
    "Bois Talisman": "perfume-product2.html",
    "Miss Dior Parfum Roller-Pearl": "perfume-product3.html",
    "Gris Dior": "perfume-product4.html",
    "J'adore l'Or": "perfume-product5.html",
    "Ambre Nuit": "perfume-product6.html",
      "[ENHYPEN] 4th ENniversary Strap": "productsdetails1.html",
      "[ENHYPEN] 4th ENniversary Instant Photo Garland": "productsdetails2.html",
      "[ENHYPEN] 4th ENniversary Photo Lamp": "productsdetails3.html",
      "[ATEEZ] 2025 Season's Greetings": "productsdetails4.html",
      "[SEVENTEEN] 2025 Season's Greetings": "productsdetails5.html",
      "[BTS] Lightstick Version 3": "productsdetails6.html",
      "UGREEN Flat Cat7 Ethernet Cable RJ45": "productsdetails7.html",
      "[BLACKPINK] Born Pink Hoodie": "productsdetails8.html",
      "Biofinest Vitamin K2 (MK7) with D3 Supplement": "productsdetails9.html",
      "Spigen Ultra Hybrid MagFit Case for Samsung Galaxy S25 Ultra": "productsdetails10.html",
      "[ATEEZ] Zero: Fever Album Vol. 3": "productsdetails11.html",
      "[NCT] WayV Logo Keychain": "productsdetails12.html",
      "[TXT] MOA Diary Notebook": "productsdetails13.html",
      "[KIRONA SCENT] Essential Oil Body Wash": "productsdetails14.html",
      "[IVE] Love Dive Mini Album": "productsdetails15.html",
  
    // Add more products and their corresponding HTML files here
};

// Add event listener for button click
searchButton.addEventListener('click', function() {
    searchAndRedirect(searchInput.value);
});

// Optionally, add event listener for Enter key press
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        searchAndRedirect(searchInput.value);
    }
});

// Function to perform the search and redirection (with case-insensitive match)
function searchAndRedirect(query) {
    if (query.trim() !== '') {
        // Convert the query to lowercase
        const queryLowerCase = query.toLowerCase();

        // Log the query for debugging
        console.log('Search query:', queryLowerCase);

        // Find the product page using the search query (case-insensitive and partial match)
        const productPage = Object.keys(productPages).find(productName => 
            productName.toLowerCase().includes(queryLowerCase)
        );

        // Log the result of the search to check the matching product page
        console.log('Matching product page:', productPage);

        if (productPage) {
            // Redirect to the product's HTML page
            window.location.href = productPages[productPage];
        } else {
            console.log('No matching product found');
            // Optionally, show an alert or a message if no match is found
            alert('No matching product found');
        }
    }
}






document.getElementById("pay-button").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;
    const cardholder = document.getElementById("cardholder").value;
    const country = document.getElementById("country").value;

    if (!email || !cardNumber || !expiry || !cvc || !cardholder) {
        alert("Please fill out all fields correctly.");
        return;
    }

    alert("Payment successful for " + cardholder + " from " + country);
});

// add to cart
// Initialize the cart in localStorage if it doesn't already exist
if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

// Function to update the cart icon count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").innerText = cartCount;
}

// Function to render cart items and total price in the cart page
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  
  // Clear current cart items
  cartItemsContainer.innerHTML = '';

  // Calculate total price
  let totalPrice = 0;

  // Loop through cart items and display them
  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <span>${item.name}</span>
          <span>Quantity: ${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(cartItem);

      // Add to total price
      totalPrice += item.price * item.quantity;
  });

  // Update the total price
  totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Function to add product to the cart
function addToCart(productName, price) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
      // If the product is already in the cart, increase the quantity
      existingProduct.quantity += 1;
  } else {
      // If the product is not in the cart, add it
      const newProduct = { name: productName, price: price, quantity: 1 };
      cart.push(newProduct);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count in the header
  updateCartCount();
}

// Call the function to update the cart count when the page loads
updateCartCount();

// Call the function to render the cart items when the page loads
renderCartItems();

