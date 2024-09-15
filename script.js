// Detect sections as they come into view
document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (sectionPosition < screenPosition) {
            section.classList.add('visible');
        }
    });
});

// Toggle mobile menu visibility
document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        timelineItems.forEach(item => {
            const boxTop = item.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); 
});



// script.js
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star properties
    const numStars = 100; // Number of stars
    const stars = [];

    // Initialize stars
    function initStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                velocityX: Math.random() * 0.5 - 0.25,
                velocityY: Math.random() * 0.5 - 0.25,
                alpha: Math.random()
            });
        }
    }

    // Draw stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        stars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Update star positions
    function updateStars() {
        stars.forEach(star => {
            star.x += star.velocityX;
            star.y += star.velocityY;

            if (star.x > canvas.width || star.x < 0) star.velocityX *= -1;
            if (star.y > canvas.height || star.y < 0) star.velocityY *= -1;

            // Adjust star opacity for twinkling effect
            star.alpha = Math.random();
        });
    }

    // Animate stars
    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Initialize and start animation
    initStars();
    animate();
});


