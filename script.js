/* ─── Custom Cursor + Mouse Trail ──────────────────────────────── */
const cursorRing = document.getElementById('cursor-ring');
const cursorDot  = document.getElementById('cursor-dot');

let mouseX = -200, mouseY = -200;
let ringX  = -200, ringY  = -200;

/* Trail sparks */
const TRAIL_COUNT = 18;
const trailPool = [];
for (let i = 0; i < TRAIL_COUNT; i++) {
  const el = document.createElement('div');
  el.className = 'trail-dot';
  const size = Math.random() * 5 + 3;
  el.style.cssText = `width:${size}px;height:${size}px;background:rgba(6,182,212,${(Math.random()*0.5+0.2).toFixed(2)});`;
  document.body.appendChild(el);
  trailPool.push({ el, x: -200, y: -200, life: 0 });
}

let trailIdx = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  /* Spawn trail spark */
  const t = trailPool[trailIdx % TRAIL_COUNT];
  t.x = mouseX;
  t.y = mouseY;
  t.life = 1;
  t.el.style.left = mouseX + 'px';
  t.el.style.top  = mouseY + 'px';
  t.el.style.opacity = '1';
  t.el.style.transform = `translate(-50%,-50%) scale(1)`;
  trailIdx++;

  /* Fade out after brief delay */
  setTimeout(() => {
    t.el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    t.el.style.opacity = '0';
    t.el.style.transform = `translate(-50%,-50%) scale(0.3)`;
  }, 40);
});

/* Smooth cursor ring lerp */
function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseleave', () => {
  if (cursorRing) cursorRing.style.opacity = '0';
  if (cursorDot)  cursorDot.style.opacity  = '0';
});
document.addEventListener('mouseenter', () => {
  if (cursorRing) cursorRing.style.opacity = '1';
  if (cursorDot)  cursorDot.style.opacity  = '1';
});


/* ─── Typing Animation ─────────────────────────────────────────── */
const heroText = "Hi, I'm Jalani Kaneswaran";
let idx = 0;
const typedSpan = document.getElementById("typed-line");
function typeWriter() {
  if (idx < heroText.length) {
    typedSpan.innerHTML += heroText.charAt(idx++);
    setTimeout(typeWriter, 70);
  }
}
typeWriter();


/* ─── Scroll Progress Bar ──────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const win = document.documentElement.scrollTop;
  const h   = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollProgress').style.width = (win / h) * 100 + "%";
});


/* ─── Active Nav Link ──────────────────────────────────────────── */
const sections = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.nav-link');
function updateActive() {
  let current = "";
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute("href") === `#${current}`) l.classList.add('active');
  });
}
window.addEventListener('scroll', updateActive);
window.addEventListener('load',   updateActive);


/* ─── Scroll Reveal ────────────────────────────────────────────── */
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ─── Skills — Circular Ring Animation ────────────────────────── */
const skillData = [
  { name: 'Figma',        icon: 'fa-pen-fancy',  cat: 'Design',    pct: 92 },
  { name: 'Adobe XD',     icon: 'fa-paintbrush', cat: 'Design',    pct: 88 },
  { name: 'Canva',        icon: 'fa-dice-d6',    cat: 'Design',    pct: 85 },
  { name: 'HTML5',        icon: 'fa-html5',      cat: 'Frontend',  pct: 95 },
  { name: 'CSS3',         icon: 'fa-css3-alt',   cat: 'Frontend',  pct: 90 },
  { name: 'Tailwind CSS', icon: 'fa-wind',       cat: 'Frontend',  pct: 89 },
  { name: 'JavaScript',   icon: 'fa-js',         cat: 'Language',  pct: 88 },
  { name: 'React.js',     icon: 'fa-react',      cat: 'Frontend',  pct: 85 },
  { name: 'Python',       icon: 'fa-python',     cat: 'Backend',   pct: 82 },
  { name: 'MongoDB',      icon: 'fa-database',   cat: 'Database',  pct: 78 },
];

/* Build the SVG-ring cards */
const CIRC = 113; /* 2π × 18 ≈ 113 */
const grid = document.getElementById('skillsGrid');

skillData.forEach(s => {
  const dots = Array.from({ length: 10 }, (_, i) => {
    const filled  = i < Math.floor(s.pct / 10);
    const partial = !filled && i === Math.floor(s.pct / 10) && s.pct % 10 > 4;
    return `<div class="skill-dot ${filled ? 'active' : partial ? 'partial' : ''}"></div>`;
  }).join('');

  const offset = CIRC - (CIRC * s.pct / 100);
  const prefix = s.icon.startsWith('fa-') ? (
    ['fa-react','fa-html5','fa-css3-alt','fa-js','fa-python','fa-wind'].some(x => s.icon === x)
      ? 'fab' : 'fas'
  ) : 'fas';
  const iconClass = prefix + ' ' + s.icon;

  const card = document.createElement('div');
  card.className = 'skill-card reveal';
  card.innerHTML = `
    <div class="skill-header">
      <div class="skill-left">
        <div class="skill-icon-wrap"><i class="${iconClass}"></i></div>
        <div>
          <div class="skill-name">${s.name}</div>
          <div class="skill-category">${s.cat}</div>
        </div>
      </div>
      <div class="skill-ring-wrap">
        <svg width="48" height="48" viewBox="0 0 40 40">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stop-color="#1E3A8A"/>
              <stop offset="100%" stop-color="#06B6D4"/>
            </linearGradient>
          </defs>
          <circle class="skill-ring-bg"   cx="20" cy="20" r="18"/>
          <circle class="skill-ring-fill" cx="20" cy="20" r="18"
                  style="stroke-dashoffset:${offset}"
                  data-offset="${offset}"/>
        </svg>
        <div class="skill-ring-label">${s.pct}%</div>
      </div>
    </div>
    <div class="skill-dots">${dots}</div>`;
  grid.appendChild(card);
});

/* Trigger ring animation when skills section enters view */
let ringsAnimated = false;
const skillSection = document.querySelector('#skills');
const ringObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !ringsAnimated) {
    ringsAnimated = true;
    document.querySelectorAll('.skill-ring-fill').forEach(el => {
      const target = el.getAttribute('data-offset');
      setTimeout(() => { el.style.strokeDashoffset = target; }, 200);
    });
  }
}, { threshold: 0.25 });
if (skillSection) ringObserver.observe(skillSection);

/* Re-observe reveals after cards are injected */
document.querySelectorAll('.skill-card.reveal').forEach(el => revealObs.observe(el));


/* ─── Contact Form ─────────────────────────────────────────────── */
const form  = document.getElementById('premiumContactForm');
const toast = document.getElementById('toastMsg');
const floatingGroups = document.querySelectorAll('.form-floating-group');

floatingGroups.forEach(group => {
  const input = group.querySelector('input, textarea');
  if (input) {
    input.addEventListener('focus', () => group.classList.add('focused'));
    input.addEventListener('blur',  () => group.classList.remove('focused'));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  if (name && email) {
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
    form.reset();
    floatingGroups.forEach(g => g.classList.remove('focused'));
  } else {
    alert("Please fill in all required fields.");
  }
});


/* ─── Mobile Menu ──────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('active')));


/* ─── Download CV ──────────────────────────────────────────────── */
document.getElementById('downloadCV').addEventListener('click', e => {
  e.preventDefault();
  toast.innerText = "📄 CV download simulation";
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2000);
  setTimeout(() => { toast.innerText = "✨ Message sent! Thank you."; }, 2200);
});


/* ─── Parallax Orbs ────────────────────────────────────────────── */
const orbs = document.querySelectorAll('.gradient-orb');
document.addEventListener('mousemove', e => {
  const mx = e.clientX / window.innerWidth;
  const my = e.clientY / window.innerHeight;
  orbs.forEach((orb, i) => {
    const sp = (i + 1) * 14;
    orb.style.transform = `translate(${(mx - 0.5) * sp}px, ${(my - 0.5) * sp}px)`;
  });
});


/* ─── Particle Canvas ──────────────────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
let mouse = { x: null, y: null, radius: 130 };

function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

const particles = Array.from({ length: 90 }, () => ({
  x:  Math.random() * w,
  y:  Math.random() * h,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  r:  Math.random() * 2 + 1.2,
  c:  `rgba(6,182,212,${(Math.random() * 0.5 + 0.2).toFixed(2)})`
}));

(function loop() {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    if (mouse.x) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < mouse.radius) {
        const a = Math.atan2(dy, dx), f = (mouse.radius - d) / mouse.radius;
        p.vx += Math.cos(a) * f * 1.2;
        p.vy += Math.sin(a) * f * 1.2;
      }
    }
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.99; p.vy *= 0.99;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c; ctx.fill();
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(6,182,212,${(0.2 * (1 - d / 110)).toFixed(3)})`;
        ctx.lineWidth = 0.6; ctx.stroke();
      }
    }
  }
  if (mouse.x) {
    for (const p of particles) {
      if (Math.hypot(p.x - mouse.x, p.y - mouse.y) < 140) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "rgba(6,182,212,0.35)"; ctx.lineWidth = 0.8; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(loop);
})();

window.addEventListener('mousemove',  e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', ()  => { mouse.x = null; mouse.y = null; });