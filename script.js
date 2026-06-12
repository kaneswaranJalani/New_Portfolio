/* ─── Custom Cursor + Mouse Trail ──────────────────────────────── */
const cursorRing = document.getElementById('cursor-ring');
const cursorDot  = document.getElementById('cursor-dot');
let mouseX = -300, mouseY = -300, ringX = -300, ringY = -300;

const TRAIL_COUNT = 16;
const trailPool = [];
for (let i = 0; i < TRAIL_COUNT; i++) {
  const el = document.createElement('div');
  el.className = 'trail-dot';
  const sz = Math.random() * 5 + 3;
  el.style.cssText = `width:${sz}px;height:${sz}px;background:rgba(6,182,212,${(Math.random()*.5+.2).toFixed(2)});transition:none;`;
  document.body.appendChild(el);
  trailPool.push(el);
}
let trailIdx = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  const el = trailPool[trailIdx % TRAIL_COUNT];
  el.style.left = mouseX + 'px';
  el.style.top  = mouseY + 'px';
  el.style.opacity = '1';
  el.style.transform = 'translate(-50%,-50%) scale(1)';
  el.style.transition = 'none';
  setTimeout(() => {
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    el.style.opacity = '0';
    el.style.transform = 'translate(-50%,-50%) scale(.2)';
  }, 30);
  trailIdx++;
});

(function cursorLoop() {
  ringX += (mouseX - ringX) * .13;
  ringY += (mouseY - ringY) * .13;
  if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
  if (cursorDot)  { cursorDot.style.left  = mouseX + 'px'; cursorDot.style.top  = mouseY + 'px'; }
  requestAnimationFrame(cursorLoop);
})();

/* Cursor hover scale */
document.querySelectorAll('a, button, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursorRing){ cursorRing.style.width='50px'; cursorRing.style.height='50px'; cursorRing.style.borderColor='rgba(6,182,212,.4)'; }});
  el.addEventListener('mouseleave', () => { if(cursorRing){ cursorRing.style.width='34px'; cursorRing.style.height='34px'; cursorRing.style.borderColor='rgba(6,182,212,.85)'; }});
});


/* ─── Typing Animation ─────────────────────────────────────────── */
const heroText  = "Hi, I'm Jalani Kaneswaran";
let tIdx = 0;
const typedSpan = document.getElementById('typed-line');
(function typeWriter() {
  if (tIdx < heroText.length) { typedSpan.innerHTML += heroText[tIdx++]; setTimeout(typeWriter, 70); }
})();


/* ─── Scroll Progress ──────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const s = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollProgress').style.width = (s / h * 100) + '%';
});


/* ─── Active Nav ───────────────────────────────────────────────── */
const sections = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.nav-link');
function updateActive() {
  let cur = '';
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === `#${cur}`) l.classList.add('active'); });
}
window.addEventListener('scroll', updateActive);
window.addEventListener('load', updateActive);


/* ─── Scroll Reveal ────────────────────────────────────────────── */
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ─── Skills — Category Tag Layout ────────────────────────────── */
const skillCategories = [
  {
    label: 'Design Tools',
    icon: 'fas fa-pen-ruler',
    skills: [
      { name: 'Figma',    icon: 'fas fa-pen-fancy' },
      { name: 'Adobe XD', icon: 'fas fa-paintbrush' },
      { name: 'Canva',    icon: 'fas fa-palette' },
    ]
  },
  {
    label: 'Frontend',
    icon: 'fas fa-code',
    skills: [
      { name: 'HTML5',        icon: 'fab fa-html5' },
      { name: 'CSS3',         icon: 'fab fa-css3-alt' },
      { name: 'Tailwind CSS', icon: 'fas fa-wind' },
      { name: 'JavaScript',   icon: 'fab fa-js' },
      { name: 'React.js',     icon: 'fab fa-react' },
    ]
  },
  {
    label: 'Backend & Database',
    icon: 'fas fa-server',
    skills: [
      { name: 'Python',  icon: 'fab fa-python' },
      { name: 'Flask',   icon: 'fas fa-flask' },
      { name: 'MongoDB', icon: 'fas fa-database' },
    ]
  },
  {
    label: 'UX & Process',
    icon: 'fas fa-users',
    skills: [
      { name: 'Wireframing',   icon: 'fas fa-vector-square' },
      { name: 'Prototyping',   icon: 'fas fa-object-group' },
      { name: 'User Research', icon: 'fas fa-search' },
      { name: 'Responsive Design', icon: 'fas fa-mobile-alt' },
    ]
  },
];

const wrapper = document.getElementById('skillsWrapper');

skillCategories.forEach((cat, ci) => {
  const block = document.createElement('div');
  block.className = 'skills-category-block reveal';
  block.style.transitionDelay = (ci * 0.1) + 's';

  const chips = cat.skills.map(s =>
    `<div class="skill-chip">
       <div class="chip-icon"><i class="${s.icon}"></i></div>
       <span class="chip-name">${s.name}</span>
     </div>`
  ).join('');

  block.innerHTML = `
    <div class="skills-cat-label"><i class="${cat.icon}"></i> ${cat.label}</div>
    <div class="skills-tag-row">${chips}</div>`;
  wrapper.appendChild(block);
});

/* Re-observe newly created reveal elements */
document.querySelectorAll('.skills-category-block.reveal').forEach(el => revealObs.observe(el));

/* Re-attach cursor hover for skill chips */
document.querySelectorAll('.skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursorRing){ cursorRing.style.width='50px'; cursorRing.style.height='50px'; }});
  el.addEventListener('mouseleave', () => { if(cursorRing){ cursorRing.style.width='34px'; cursorRing.style.height='34px'; }});
});


/* ─── Contact Form ─────────────────────────────────────────────── */
const form   = document.getElementById('premiumContactForm');
const toast  = document.getElementById('toastMsg');
const fGroups = document.querySelectorAll('.form-floating-group');

fGroups.forEach(g => {
  const inp = g.querySelector('input, textarea');
  if (inp) {
    inp.addEventListener('focus', () => g.classList.add('focused'));
    inp.addEventListener('blur',  () => g.classList.remove('focused'));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  if (name && email) {
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 3000);
    form.reset();
    fGroups.forEach(g => g.classList.remove('focused'));
  } else {
    alert('Please fill in all required fields.');
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
  toast.innerText = '📄 CV download simulation';
  toast.style.opacity = '1';
  setTimeout(() => toast.style.opacity = '0', 2000);
  setTimeout(() => toast.innerText = '✨ Message sent! Thank you.', 2200);
});


/* ─── Parallax Orbs ────────────────────────────────────────────── */
const orbs = document.querySelectorAll('.gradient-orb');
document.addEventListener('mousemove', e => {
  const mx = e.clientX / window.innerWidth, my = e.clientY / window.innerHeight;
  orbs.forEach((o, i) => {
    const sp = (i + 1) * 14;
    o.style.transform = `translate(${(mx-.5)*sp}px,${(my-.5)*sp}px)`;
  });
});


/* ─── Particle Canvas ──────────────────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let w, h;
const pmouse = { x: null, y: null, radius: 130 };

function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

const particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * (window.innerWidth  || 800),
  y: Math.random() * (window.innerHeight || 600),
  vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
  r: Math.random()*2+1.2,
  c: `rgba(6,182,212,${(Math.random()*.5+.2).toFixed(2)})`
}));

(function loop() {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    if (pmouse.x) {
      const dx=p.x-pmouse.x, dy=p.y-pmouse.y, d=Math.hypot(dx,dy);
      if (d < pmouse.radius) { const a=Math.atan2(dy,dx), f=(pmouse.radius-d)/pmouse.radius; p.vx+=Math.cos(a)*f*1.2; p.vy+=Math.sin(a)*f*1.2; }
    }
    p.x+=p.vx; p.y+=p.vy; p.vx*=.99; p.vy*=.99;
    if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.c; ctx.fill();
  }
  for (let i=0;i<particles.length;i++) {
    for (let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.hypot(dx,dy);
      if (d<110) {
        ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(6,182,212,${(0.2*(1-d/110)).toFixed(3)})`; ctx.lineWidth=.6; ctx.stroke();
      }
    }
  }
  if (pmouse.x) {
    for (const p of particles) {
      if (Math.hypot(p.x-pmouse.x,p.y-pmouse.y)<140) {
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(pmouse.x,pmouse.y);
        ctx.strokeStyle='rgba(6,182,212,.35)'; ctx.lineWidth=.8; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(loop);
})();

window.addEventListener('mousemove',  e => { pmouse.x=e.clientX; pmouse.y=e.clientY; });
window.addEventListener('mouseleave', ()  => { pmouse.x=null; pmouse.y=null; });