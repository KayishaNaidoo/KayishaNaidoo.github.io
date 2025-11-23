document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const timelineItems = document.querySelectorAll(".timeline-item");

  const checkVisibility = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    timelineItems.forEach((item) => {
      const boxTop = item.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });

    sections.forEach((section) => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (sectionPosition < screenPosition) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();

  document
    .querySelector(".dropdown-toggle")
    .addEventListener("click", function () {
      const menuItems = document.querySelector(".menu-items");
      menuItems.classList.toggle("active");
    });

  const canvas = document.getElementById("starsCanvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const numStars = 200;
  const stars = [];

  // init stars
  function initStars() {
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        velocityX: (Math.random() * 0.5 - 0.25) * 0.5,
        velocityY: (Math.random() * 0.5 - 0.25) * 0.5,
        alpha: Math.random(),
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "#fff";
    stars.forEach((star) => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateStars() {
    stars.forEach((star) => {
      star.x += star.velocityX;
      star.y += star.velocityY;

      if (star.x > canvas.width) star.x = 0;
      else if (star.x < 0) star.x = canvas.width;

      if (star.y > canvas.height) star.y = 0;
      else if (star.y < 0) star.y = canvas.height;

      star.alpha = Math.random();
    });
  }

  function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    initStars();
  });

  initStars();
  animate();

  // Sparkle cursor trail effect
  let lastSparkleTime = 0;
  const sparkleDelay = 30; // milliseconds between sparkles

  document.addEventListener("mousemove", function (e) {
    const currentTime = Date.now();

    // Only create sparkles if enough time has passed
    if (currentTime - lastSparkleTime > sparkleDelay) {
      createSparkle(e.pageX, e.pageY);
      lastSparkleTime = currentTime;
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    // Random star symbol
    const stars = ["💜", "🪐", "✨"];
    sparkle.textContent = stars[Math.floor(Math.random() * stars.length)];

    // Random size
    const size = Math.random() * 10 + 10;
    sparkle.style.fontSize = size + "px";

    // Position at cursor
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    // Random rotation
    sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(sparkle);

    // Remove sparkle after animation completes
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }
});
