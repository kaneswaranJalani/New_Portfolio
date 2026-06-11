// ─── Typing Animation ────────────────────────────────────────────────────────
const heroText = "Hi, I'm Jalani Kaneswaran";
let idx = 0;
const typedSpan = document.getElementById("typed-line");

function typeWriter() {
  if (idx < heroText.length) {
    typedSpan.innerHTML += heroText.charAt(idx);
    idx++;
    setTimeout(typeWriter, 70);
  }
}
typeWriter();

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const win = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (win / h) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + "%";
});

// ─── Active Nav Link on Scroll ────────────────────────────────────────────────
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActive() {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (pageYOffset >= top) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute("href") === `#${current}`) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActive);
window.addEventListener('load', updateActive);

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObs.observe(el));

// ─── Skill Progress Bars ──────────────────────────────────────────────────────
const fillElements = document.querySelectorAll('.progress-fill');
let filled = false;
const skillSection = document.querySelector('#skills');

const fillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !filled) {
    fillElements.forEach(el => {
      const percent = el.getAttribute('data-progress');
      el.style.width = percent + '%';
    });
    filled = true;
  }
}, { threshold: 0.3 });
if (skillSection) fillObserver.observe(skillSection);

// ─── Contact Form — Floating Labels + Toast ───────────────────────────────────
const form = document.getElementById('premiumContactForm');
const toast = document.getElementById('toastMsg');
const floatingGroups = document.querySelectorAll('.form-floating-group');

floatingGroups.forEach(group => {
  const input = group.querySelector('input, textarea');
  if (input) {
    input.addEventListener('focus', () => group.classList.add('focused'));
    input.addEventListener('blur',  () => group.classList.remove('focused'));
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name  = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  if (name && email) {
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 3000);
    form.reset();
    floatingGroups.forEach(g => g.classList.remove('focused'));
  } else {
    alert("Please fill in all required fields.");
  }
});

// ─── Mobile Hamburger Menu ────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('.nav-link').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('active'))
);

// ─── Download CV (simulation) ─────────────────────────────────────────────────
document.getElementById('downloadCV').addEventListener('click', (e) => {
  e.preventDefault();
  toast.innerText = "📄 CV download simulation";
  toast.style.opacity = '1';
  setTimeout(() => toast.style.opacity = '0', 2000);
  setTimeout(() => toast.innerText = "✨ Message sent! Thank you.", 2100);
});

// ─── Parallax Orbs on Mouse Move ─────────────────────────────────────────────
const orbs = document.querySelectorAll('.gradient-orb');
document.addEventListener('mousemove', (e) => {
  const mx = e.clientX / window.innerWidth;
  const my = e.clientY / window.innerHeight;
  orbs.forEach((orb, i) => {
    const sp = (i + 1) * 14;
    const tx = (mx - 0.5) * sp;
    const ty = (my - 0.5) * sp;
    orb.style.transform = `translate(${tx}px, ${ty}px)`;
  });
});

// ─── Particle Canvas ──────────────────────────────────────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
let mouse = { x: null, y: null, radius: 130 };

function resize() {
  w = canvas.width  = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
for (let i = 0; i < 90; i++) {
  particles.push({
    x:      Math.random() * w,
    y:      Math.random() * h,
    vx:     (Math.random() - 0.5) * 0.35,
    vy:     (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 2 + 1.2,
    color:  `rgba(6,182,212,${Math.random() * 0.5 + 0.2})`
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  // Move & draw each particle
  for (let p of particles) {
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const ang   = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        p.vx += Math.cos(ang) * force * 1.2;
        p.vy += Math.sin(ang) * force * 1.2;
      }
    }
    p.x  += p.vx;
    p.y  += p.vy;
    p.vx *= 0.99;
    p.vy *= 0.99;
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  // Connect nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(6,182,212,${0.2 * (1 - dist / 110)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  // Connect particles near mouse
  if (mouse.x && mouse.y) {
    for (let p of particles) {
      if (Math.hypot(p.x - mouse.x, p.y - mouse.y) < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "rgba(6,182,212,0.35)";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove',  (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', ()  => { mouse.x = null; mouse.y = null; });