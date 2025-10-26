// Basketball Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION BAR ====================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBookBtn = document.querySelector('.btn-nav-book');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    });
    
    // Nav book button opens modal
    if (navBookBtn) {
        navBookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openBookingModal();
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (!element.classList.contains('animated-once')) {
                    // Determine animation based on element position
                    const rect = element.getBoundingClientRect();
                    const windowWidth = window.innerWidth;
                    
                    let animationName;
                    if (rect.left < windowWidth / 3) {
                        animationName = 'fadeLeft';
                    } else if (rect.left > (windowWidth * 2) / 3) {
                        animationName = 'fadeRight';
                    } else {
                        animationName = 'fadeUp';
                    }
                    
                    element.style.animationName = animationName;
                    element.classList.add('animated-once');
                    element.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== VIDEO PLAY BUTTONS ====================
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create video modal
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-overlay"></div>
                <div class="video-modal-content">
                    <button class="video-close-btn">&times;</button>
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Fade in animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Close modal handlers
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }, 300);
            };
            
            modal.querySelector('.video-close-btn').addEventListener('click', closeModal);
            modal.querySelector('.video-modal-overlay').addEventListener('click', closeModal);
            
            // Close on ESC key
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        });
    });

    // ==================== BUTTON RIPPLE EFFECT ====================
    const buttons = document.querySelectorAll('button:not(.booking-modal-close), .btn-primary, .btn-ticket, .btn-ticket-outline');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple for modal close button
            if (this.classList.contains('booking-modal-close')) return;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==================== HOVER EFFECTS ====================
    // Add hover scale effect to cards
    const cards = document.querySelectorAll('.stat-box, .news-box, .match-card, .arena-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.backgroundPositionY = -(scrolled * speed) + 'px';
        });
    });

    // ==================== COUNTER ANIMATION ====================
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

    // Animate stat numbers when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const h3 = entry.target.querySelector('h3');
                const targetNumber = parseInt(h3.textContent);
                h3.textContent = '0+';
                animateCounter(h3, targetNumber);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-box').forEach(box => {
        statObserver.observe(box);
    });

    // ==================== FORM VALIDATION ====================
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        const input = subscribeForm.querySelector('input[type="email"]');
        const button = subscribeForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
            } else if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
            } else {
                showNotification('Thank you for subscribing!', 'success');
                input.value = '';
            }
        });
    }

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ==================== BOOKING MODAL ====================
    const bookingModal = document.getElementById('bookingModal');
    const bookingButtons = document.querySelectorAll('.btn-primary, .btn-ticket');
    const closeModalBtn = document.querySelector('.booking-modal-close');
    const modalOverlay = document.querySelector('.booking-modal-overlay');
    const bookingForm = document.getElementById('bookingForm');

    // Open modal function
    function openBookingModal() {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Close modal function
    function closeBookingModal() {
        if (!bookingModal) return;
        
        bookingModal.classList.add('closing');
        bookingModal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            bookingModal.classList.remove('closing');
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    // Add click event to all booking buttons
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openBookingModal();
        });
    });

    // Close modal on close button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeBookingModal();
        });
    }

    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeBookingModal();
            }
        });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            closeBookingModal();
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const bookingData = {};
            formData.forEach((value, key) => {
                bookingData[key] = value;
            });
            
            // Log booking data (in production, send to server)
            console.log('Booking Request:', bookingData);
            
            // Show success notification
            showNotification('Booking request submitted successfully! We will contact you shortly.', 'success');
            
            // Close modal and reset form
            closeBookingModal();
            bookingForm.reset();
        });
    }

    // ==================== MOBILE MENU (if needed) ====================
    // Placeholder for mobile navigation if added later
    console.log('Basketball Landing Page Loaded Successfully! 🏀');
});

// ==================== DYNAMIC STYLES ====================
const dynamicStyles = `
    /* Video Modal Styles */
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .video-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
    }
    
    .video-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 900px;
        aspect-ratio: 16/9;
        background: #000;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .video-close-btn {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10001;
        transition: transform 0.3s ease;
    }
    
    .video-close-btn:hover {
        transform: scale(1.2);
    }
    
    /* Ripple Effect */
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background-color: #4CAF50;
    }
    
    .notification-error {
        background-color: #f44336;
    }
    
    .notification-info {
        background-color: #2196F3;
    }
    
    /* Button Styles */
    button {
        position: relative;
        overflow: hidden;
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
