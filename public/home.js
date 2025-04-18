// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const wishForm = document.getElementById('wishForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('#newsletterForm');
const wishesContainer = document.getElementById('wishesContainer');

// Sample wishes data
const sampleWishes = [
    { name: 'Amine', message: 'Eid Mubarak to all members of Varphi Club! May this Eid bring joy and happiness to everyone.' },
    { name: 'Farid', message: 'Wishing everyone a blessed Eid. Looking forward to seeing you all at the club gathering!' },
    { name: 'Adel', message: 'Eid Mubarak! May Allah accept our fasting and prayers. See you at the Eid prayer.' },
    { name: 'Rania', message: 'Taqabbal Allahu minna wa minkum. Happy Eid to all club members and their families.' }
];

// Initialize the page
function initializePage() {
    // Set countdown to March 30, 2025 at 7:00 AM (Eid prayer time)
    const eidDate = new Date('2025-03-31T05:00:00Z').getTime(); // Explicit UTC format

    console.log("Eid Date:", eidDate);
console.log("Current Time:", new Date().getTime());
console.log("Time Difference:", eidDate - new Date().getTime());

    // Initialize countdown
    initCountdown(eidDate);
    
    // Load sample wishes
    loadSampleWishes();
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Create stars in the background
    createStars();
    
    // Add animation to hero text
    animateHeroText();
}

document.addEventListener('DOMContentLoaded', initializePage);

// Theme Toggle
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Enhanced Countdown Timer for March 30, 2025
function initCountdown(endDate) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.querySelector('.countdown');
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        // Time calculations
        const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));
        
        // Display results with leading zeros
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // If Eid has arrived
        if (distance <= 0) {
            showEidMessage();
            clearInterval(countdownInterval);
        }
    }

    function showEidMessage() {
        if (!document.querySelector('.eid-message')) {
            const message = document.createElement('div');
            message.className = 'eid-message';
            message.innerHTML = `
                <h3>Eid Mubarak!</h3>
                <p>May your Eid be filled with joy and blessings</p>
                <p class="prayer-time">Eid prayer at 7:00 AM</p>
            `;
            countdownContainer.appendChild(message);
            
            const title = document.querySelector('.hero-content h1');
            if (title) title.textContent = 'Eid Mubarak!';
        }
    }
    
    // Run immediately and then every second
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Load sample wishes
/* function loadSampleWishes() {
    wishesContainer.innerHTML = '';
    
    sampleWishes.forEach(wish => {
        const wishCard = document.createElement('div');
        wishCard.classList.add('wish-card');
        wishCard.innerHTML = `
            <h4>${wish.name}</h4>
            <p>${wish.message}</p>
        `;
        wishesContainer.appendChild(wishCard);
    });
} */

// Handle wish form submission
/* wishForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name && message) {
        const wishCard = document.createElement('div');
        wishCard.classList.add('wish-card');
        wishCard.innerHTML = `
            <h4>${name}</h4>
            <p>${message}</p>
        `;
        wishesContainer.insertBefore(wishCard, wishesContainer.firstChild);
        wishForm.reset();
        showToast('Your Eid wish has been shared!');
    }
});
 */
// Handle contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    if (name && email && subject && message) {
        console.log('Contact form submitted:', { name, email, subject, message });
        contactForm.reset();
        showToast('Thank you for your message! We will get back to you soon.');
    }
});

// Handle newsletter form submission
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value.trim();
    
    if (email) {
        console.log('Newsletter subscription:', email);
        this.reset();
        showToast('Thank you for subscribing to our newsletter!');
    }
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Create stars in the background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starsCount = 100;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Animate hero text
function animateHeroText() {
    const animatedText = document.querySelector('.animated-text');
    const text = animatedText.textContent;
    animatedText.innerHTML = '';
    
    Array.from(text).forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        animatedText.appendChild(span);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Add animation on scroll
window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    document.querySelectorAll('section').forEach(section => {
        if (section.getBoundingClientRect().top < windowHeight * 0.75) {
            section.classList.add('animate');
        }
    });
});