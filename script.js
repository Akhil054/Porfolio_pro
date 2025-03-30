document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a:not(.menu-btn):not(.theme-toggle), .mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.hash !== "") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formSuccess = document.getElementById('formSuccess');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Validate Name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate Email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate Subject
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            }
            
            // Validate Message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
        
        function showError(input, message) {
            const errorElement = input.nextElementSibling;
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
    
    // Theme Toggle Functionality
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => toggle.classList.add('active'));
    }
    
    // Toggle theme on button click
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggle.classList.toggle('active');
        });
    });
    
    // Tab functionality for About section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Activate Education tab by default
        const defaultTab = document.querySelector('.tab-btn[data-tab="education"]');
        if (defaultTab) {
            defaultTab.click();
        }
    }
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.skill-card, .project-card, .workshop-card, .about-image img, .hero-content, .hero-image'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll(
        '.skill-card, .project-card, .workshop-card, .about-image img, .hero-content, .hero-image'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.menu-btn') && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Prevent scrolling when mobile menu is open
    mobileMenu.addEventListener('touchmove', function(e) {
        if (mobileMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
});