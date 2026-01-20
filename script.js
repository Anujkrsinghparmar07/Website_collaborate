// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const isHidden = menu.classList.contains('-translate-x-full');

    if (isHidden) {
        menu.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        menu.classList.add('-translate-x-full');
        document.body.style.overflow = '';
    }
}

// HTMX Response Mocking (Client-side)
// Since we don't have a backend, we intercept the HTMX requests and swap content manually
// or just let HTMX fail gracefully, but for a "Replica", we want some interaction.
// I'll add a simple event listener to handle the "tabs" without actual server requests if needed,
// but HTMX expects a server. I'll make the buttons just switch visibility via JS for now
// to ensure it works without a server, while keeping HTMX attributes for "flavor" as requested.

document.body.addEventListener('htmx:beforeRequest', function(evt) {
    evt.preventDefault(); // Stop the actual request

    const targetId = evt.detail.elt.getAttribute('hx-target');
    const path = evt.detail.elt.getAttribute('hx-get');
    const target = document.querySelector(targetId);

    // Simple mock router
    if (path === '/products/all') {
        // Show all products
        // (In a real app, this would fetch HTML)
        console.log("Loading All");
        // Reset visibility (mock)
        const products = target.children;
        for (let p of products) {
            p.style.display = 'block';
        }
    } else if (path === '/products/patio') {
        console.log("Loading Patio");
        // Hide others (mock)
        const products = target.children;
        for (let i=0; i<products.length; i++) {
             // Mock logic: every 2nd item is patio
             if (i % 2 === 0) products[i].style.display = 'block';
             else products[i].style.display = 'none';
        }
    } else if (path === '/products/market') {
        console.log("Loading Market");
        const products = target.children;
        for (let i=0; i<products.length; i++) {
             if (i % 2 !== 0) products[i].style.display = 'block';
             else products[i].style.display = 'none';
        }
    }

    // Update active state on buttons
    const buttons = evt.detail.elt.parentElement.children;
    for (let btn of buttons) {
        btn.classList.remove('border-b-2', 'border-black', 'text-black');
        btn.classList.add('text-gray-400');
    }
    evt.detail.elt.classList.remove('text-gray-400');
    evt.detail.elt.classList.add('border-b-2', 'border-black', 'text-black');
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});
