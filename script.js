(function () {

  /* ========== TYPING EFFECT ========== */
  const typedEl = document.getElementById('typed-line');
  const phrases = ["Jalani Kaneswaran", "UI/UX Designer", "Full Stack Developer", "Design. Code. Deliver."];
  let idx = 0, charIdx = 0, isDeleting = false;

  function typeEffect() {
    const current = phrases[idx];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }
    if (!isDeleting && charIdx === current.length) isDeleting = true;
    else if (isDeleting && charIdx === 0) { isDeleting = false; idx = (idx + 1) % phrases.length; }
    setTimeout(typeEffect, isDeleting ? 70 : 120);
  }
  typeEffect();


  /* ========== SKILLS CHIPS GENERATION ========== */
  const skillCategories = [
    {
      label: 'Design Tools', icon: 'fas fa-pen-ruler',
      skills: [
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'Adobe XD', icon: 'fas fa-pen-fancy' },
        { name: 'Canva', icon: 'fas fa-palette' },
        { name: 'Sketch', icon: 'fas fa-paintbrush' }
      ]
    },
    {
      label: 'Frontend', icon: 'fas fa-code',
      skills: [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'Tailwind CSS', icon: 'fas fa-wind' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'React.js', icon: 'fab fa-react' },
        { name: 'Next.js', icon: 'fas fa-code-branch' }
      ]
    },
    {
      label: 'Backend & Database', icon: 'fas fa-server',
      skills: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Flask', icon: 'fas fa-flask' },
        { name: 'MongoDB', icon: 'fas fa-database' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'PostgreSQL', icon: 'fas fa-database' }
      ]
    },
    {
      label: 'UX & Process', icon: 'fas fa-users',
      skills: [
        { name: 'Wireframing', icon: 'fas fa-vector-square' },
        { name: 'Prototyping', icon: 'fas fa-object-group' },
        { name: 'User Research', icon: 'fas fa-search' },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt' },
        { name: 'Usability Testing', icon: 'fas fa-chart-line' }
      ]
    }
  ];

  const wrapper = document.getElementById('skillsWrapper');
  if (wrapper) {
    wrapper.innerHTML = '';
    skillCategories.forEach((cat, ci) => {
      const block = document.createElement('div');
      block.className = 'skills-category-block reveal';
      block.style.transitionDelay = (ci * 0.1) + 's';
      const chips = cat.skills
        .map(s => `<div class="skill-chip"><div class="chip-icon"><i class="${s.icon}"></i></div><span class="chip-name">${s.name}</span></div>`)
        .join('');
      block.innerHTML = `<div class="skills-cat-label"><i class="${cat.icon}"></i> ${cat.label}</div><div class="skills-tag-row">${chips}</div>`;
      wrapper.appendChild(block);
    });
  }


  /* ========== BLOG POSTS GENERATION ========== */
  const blogPosts = [
    {
      tag: "UI/UX",
      title: "Design systems that scale: Atomic approach",
      excerpt: "Breaking down reusable components and how to maintain consistency across products.",
      date: "May 12, 2025", readTime: "5 min read", author: "Jalani K",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      cover: "https://picsum.photos/id/20/400/200"
    },
    {
      tag: "Full Stack",
      title: "From Figma to production: seamless workflow",
      excerpt: "How to bridge design and code with modern tools like Storybook and Tailwind.",
      date: "Apr 28, 2025", readTime: "7 min read", author: "Jalani K",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      cover: "https://picsum.photos/id/26/400/200"
    },
    {
      tag: "Performance",
      title: "Optimizing React apps for blazing speed",
      excerpt: "Lazy loading, memoization, and best practices for production-grade apps.",
      date: "Apr 10, 2025", readTime: "4 min read", author: "Jalani K",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      cover: "https://picsum.photos/id/0/400/200"
    }
  ];

  const blogsGrid = document.getElementById('blogsGrid');
  if (blogsGrid) {
    blogsGrid.innerHTML = blogPosts.map(blog => `
      <div class="blog-card reveal">
        <div class="blog-cover-wrap"><img class="blog-cover" src="${blog.cover}" alt="blog cover"></div>
        <div class="blog-body">
          <div class="blog-meta">
            <span class="blog-tag">${blog.tag}</span>
            <div class="blog-date"><i class="far fa-calendar-alt"></i> ${blog.date}</div>
          </div>
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-excerpt">${blog.excerpt}</p>
          <div class="blog-read-time"><i class="far fa-clock"></i> ${blog.readTime}</div>
          <div class="blog-footer">
            <div class="blog-author">
              <img class="blog-avatar" src="${blog.avatar}" alt="author">
              <span class="blog-author-name">${blog.author}</span>
            </div>
            <a href="#" class="blog-read-more">Read more <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }


  /* ========== SCROLL PROGRESS BAR ========== */
  window.addEventListener('scroll', () => {
    const s = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const prog = document.getElementById('scrollProgress');
    if (prog) prog.style.width = (s / h * 100) + '%';
  });


  /* ========== ACTIVE NAV LINK ON SCROLL ========== */
  const sections = document.querySelectorAll('section');
  const navLinksAll = document.querySelectorAll('.nav-link');

  function updateActive() {
    let cur = '';
    sections.forEach(s => { if (pageYOffset >= s.offsetTop - 100) cur = s.id; });
    navLinksAll.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${cur}`) l.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActive);
  window.addEventListener('load', updateActive);


  /* ========== REVEAL ON SCROLL (IntersectionObserver) ========== */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  document.querySelectorAll('.skills-category-block.reveal, .blog-card').forEach(el => revealObs.observe(el));


  /* ========== CUSTOM CURSOR ========== */
  const cursorRing = document.getElementById('cursor-ring');
  const cursorDot  = document.getElementById('cursor-dot');
  let mouseX = -300, mouseY = -300, ringX = -300, ringY = -300;

  // Trail dots
  const TRAIL_COUNT = 16;
  const trailPool = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'trail-dot';
    const sz = Math.random() * 5 + 3;
    el.style.cssText = `width:${sz}px;height:${sz}px;background:rgba(6,182,212,${(Math.random() * .5 + .2).toFixed(2)});transition:none;`;
    document.body.appendChild(el);
    trailPool.push(el);
  }
  let trailIdx = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    const el = trailPool[trailIdx % TRAIL_COUNT];
    el.style.left = mouseX + 'px'; el.style.top = mouseY + 'px';
    el.style.opacity = '1'; el.style.transform = 'translate(-50%,-50%) scale(1)'; el.style.transition = 'none';
    setTimeout(() => {
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      el.style.opacity = '0'; el.style.transform = 'translate(-50%,-50%) scale(.2)';
    }, 30);
    trailIdx++;
  });

  (function cursorLoop() {
    ringX += (mouseX - ringX) * .13;
    ringY += (mouseY - ringY) * .13;
    if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
    if (cursorDot)  { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
    requestAnimationFrame(cursorLoop);
  })();

  document.querySelectorAll('a, button, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) { cursorRing.style.width = '50px'; cursorRing.style.height = '50px'; cursorRing.style.borderColor = 'rgba(6,182,212,.4)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) { cursorRing.style.width = '34px'; cursorRing.style.height = '34px'; cursorRing.style.borderColor = 'rgba(6,182,212,.85)'; }
    });
  });


  /* ========== PARTICLE CANVAS ========== */
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let w, h;
  const pmouse = { x: null, y: null, radius: 130 };

  function resizeCanvas() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    r: Math.random() * 2 + 1.2,
    c: `rgba(6,182,212,${(Math.random() * .5 + .2).toFixed(2)})`
  }));

  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      // Mouse repulsion
      if (pmouse.x) {
        let dx = p.x - pmouse.x, dy = p.y - pmouse.y, d = Math.hypot(dx, dy);
        if (d < pmouse.radius) {
          let a = Math.atan2(dy, dx), f = (pmouse.radius - d) / pmouse.radius;
          p.vx += Math.cos(a) * f * 1.2; p.vy += Math.sin(a) * f * 1.2;
        }
      }
      p.x += p.vx; p.y += p.vy;
      p.vx *= .99; p.vy *= .99;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c; ctx.fill();
    });

    // Particle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.hypot(dx, dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6,182,212,${(0.2 * (1 - d / 110)).toFixed(3)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    }

    // Mouse connections
    if (pmouse.x) {
      particles.forEach(p => {
        if (Math.hypot(p.x - pmouse.x, p.y - pmouse.y) < 140) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pmouse.x, pmouse.y);
          ctx.strokeStyle = 'rgba(6,182,212,.35)'; ctx.lineWidth = .8; ctx.stroke();
        }
      });
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
  window.addEventListener('mousemove', e => { pmouse.x = e.clientX; pmouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { pmouse.x = null; pmouse.y = null; });


  /* ========== CONTACT FORM ========== */
  const form  = document.getElementById('premiumContactForm');
  const toast = document.getElementById('toastMsg');
  const fGroups = document.querySelectorAll('.form-floating-group');

  fGroups.forEach(g => {
    const inp = g.querySelector('input, textarea');
    if (inp) {
      inp.addEventListener('focus', () => g.classList.add('focused'));
      inp.addEventListener('blur',  () => g.classList.remove('focused'));
    }
  });

  if (form) {
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
  }


  /* ========== MOBILE HAMBURGER MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('active')));
  }


  /* ========== DOWNLOAD CV BUTTON ========== */
  document.getElementById('downloadCV').addEventListener('click', e => {
    e.preventDefault();
    toast.innerText = '📄 Downloading CV...';
    toast.style.opacity = '1';
    setTimeout(() => toast.style.opacity = '0', 2000);
    setTimeout(() => toast.innerText = '✨ Message sent! Thank you.', 2200);
  });

})();