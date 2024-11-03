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
document.querySelector('.dropdown-toggle').addEventListener('click', function () {
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



document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star properties
    const numStars = 200; // Increased number of stars for more coverage
    const stars = [];

    // Initialize stars
    function initStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2, // Random radius
                velocityX: (Math.random() * 0.5 - 0.25) * 0.5, // Adjust velocity for subtle movement
                velocityY: (Math.random() * 0.5 - 0.25) * 0.5, // Adjust velocity for subtle movement
                alpha: Math.random()
            });
        }
    }

    // Draw stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
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

            // Wrap around the canvas edges
            if (star.x > canvas.width) star.x = 0;
            else if (star.x < 0) star.x = canvas.width;

            if (star.y > canvas.height) star.y = 0;
            else if (star.y < 0) star.y = canvas.height;

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
