// 1. Grab the navigation bar from our HTML page
const navbar = document.getElementById('navbar');

// 2. Listen for when the user scrolls the page
window.addEventListener('scroll', () => {
    // If the page is scrolled down more than 50 pixels
    if (window.scrollY > 50) {
        // Add the 'scrolled' class (turns it black and shrinks it)
        navbar.classList.add('scrolled');
    } else {
        // Remove the 'scrolled' class if we are back at the top
        navbar.classList.remove('scrolled');
    }
});