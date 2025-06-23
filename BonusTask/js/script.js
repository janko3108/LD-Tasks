const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const buyNow = document.getElementById("buy-now");
const confettiCanvas = document.getElementById("confetti-canvas");
const hamburger = document.getElementById("hamburger");
const navWrapper = document.querySelector(".nav-wrapper");
const backdrop = document.querySelector(".mobile-backdrop");
const cartNotif = document.getElementById("cart-notification");

let ctx = confettiCanvas.getContext("2d");
let particles = [];
let animationFrameId = null;

cartIcon.onclick = () => {
  cart.classList.add("open");
  if (cartNotif) cartNotif.style.display = "none";
};

closeCart.onclick = () => cart.classList.remove("open");

hamburger.onclick = () => {
  hamburger.classList.toggle("active");
  navWrapper.classList.toggle("active");
  backdrop.classList.toggle("active");
};

backdrop.onclick = () => {
  navWrapper.classList.remove("active");
  hamburger.classList.remove("active");
  backdrop.classList.remove("active");
};

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * Math.PI,
      speed: Math.random() * 3 + 2
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((p) => {
    p.y += p.speed;
    p.tiltAngle += 0.1;
    p.tilt = Math.sin(p.tiltAngle) * 15;

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.ellipse(p.x + p.tilt, p.y, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter((p) => p.y < window.innerHeight + 20);

  if (particles.length > 0) {
    animationFrameId = requestAnimationFrame(drawConfetti);
  } else {
    cancelAnimationFrame(animationFrameId);
    setTimeout(() => {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 100);
  }
}

buyNow.onclick = () => {
  createConfetti();
  drawConfetti();
  buyNow.disabled = true;
  buyNow.innerText = "🎉 Hired!";
};

function handleRevealAnimations() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
}

document.addEventListener("scroll", handleRevealAnimations);
window.addEventListener("load", handleRevealAnimations);

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navWrapper.classList.remove("active");
    hamburger.classList.remove("active");
    backdrop.classList.remove("active");
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("hero-intro").style.display = "none";
    const content = document.getElementById("hero-content");
    content.classList.remove("hidden");
    content.classList.add("visible");
  }, 3000);
});

let cartShown = false;

window.addEventListener("scroll", () => {
  if (!cartShown && window.scrollY > 150 && cartNotif) {
    cartNotif.style.display = "flex";
    cartShown = true;
  }
});

document.getElementById("go-to-cart").onclick = () => {
  cart.classList.add("open");
  if (cartNotif) cartNotif.style.display = "none";
};
