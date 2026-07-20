document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOBILE HAMBURGER MENU
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburgerBtn.querySelectorAll('span');
        if (hamburgerBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburgerBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ==========================================================================
    // 2. ACTIVE NAV ON SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));



    // ==========================================================================
    // 4. PATIENT REVIEWS (CAROUSEL)
    // ==========================================================================
    const track = document.getElementById('reviewsTrack');
    const reviewSlides = document.querySelectorAll('.review-slide');
    const prevReviewBtn = document.getElementById('prevReview');
    const nextReviewBtn = document.getElementById('nextReview');
    const carouselDotsContainer = document.getElementById('carouselDots');
    let currentReview = 0;

    // Create carousel dots
    reviewSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('c-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToReview(index));
        carouselDotsContainer.appendChild(dot);
    });

    const cDots = document.querySelectorAll('.c-dot');

    function updateReviews() {
        track.style.transform = `translateX(-${currentReview * 100}%)`;
        cDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentReview) {
                dot.classList.add('active');
            }
        });
    }

    function nextReview() {
        currentReview = (currentReview + 1) % reviewSlides.length;
        updateReviews();
    }

    function prevReview() {
        currentReview = (currentReview - 1 + reviewSlides.length) % reviewSlides.length;
        updateReviews();
    }

    function goToReview(index) {
        currentReview = index;
        updateReviews();
    }

    nextReviewBtn.addEventListener('click', nextReview);
    prevReviewBtn.addEventListener('click', prevReview);

    // Responsive adaptation: recalculate carousel sizes on resize
    window.addEventListener('resize', updateReviews);
});
