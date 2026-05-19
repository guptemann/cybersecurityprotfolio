/* ══════════════════════════════════════
   CIPHERSEC — MAIN JAVASCRIPT
   script.js
══════════════════════════════════════ */

/* ─── LOADER ─────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAnimations();
  }, 2500);
});

/* ─── CUSTOM CURSOR ──────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    // Smooth ring follows
    rx += (e.clientX - rx) * 0.14;
    ry += (e.clientY - ry) * 0.14;
  });

  // Smooth ring animation loop
  function animRing() {
    const tx = parseFloat(dot.style.left) || 0;
    const ty = parseFloat(dot.style.top)  || 0;
    rx += (tx - rx) * 0.14;
    ry += (ty - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Hover effects
  document.querySelectorAll('a, button, .service-card, .project-card, .blog-card, input, textarea, select')
    .forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });
})();

/* ─── NAVBAR ────────────────────────── */
(function initNavbar() {
  const nav  = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ─── MATRIX RAIN ───────────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]/\\|#@$%&';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    cols  = Math.floor(W / 16);
    drops = Array(cols).fill(1).map(() => Math.random() * H);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5,5,5,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '14px Share Tech Mono, monospace';

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      // Leading char is bright green
      ctx.fillStyle = '#00ff9f';
      ctx.fillText(char, i * 16, drops[i]);

      // Trail chars in dim green
      ctx.fillStyle = 'rgba(0,255,159,0.3)';
      const trail = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(trail, i * 16, drops[i] - 16);

      if (drops[i] > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 16;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 60);
})();

/* ─── PARTICLES ─────────────────────── */
(function initParticles() {
  const container = document.getElementById('particles-container');
  const COLORS = ['#00ff9f', '#00e5ff', '#b44fff'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const dur   = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const left  = Math.random() * 100;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${left}%;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      box-shadow:0 0 ${size*3}px ${color};
    `;
    container.appendChild(p);
  }
})();

/* ─── TYPING EFFECT ─────────────────── */
(function initTyping() {
  const el = document.getElementById('typedText');
  const words = [
    'Penetration Tester',
    'Security Researcher',
    'Bug Bounty Hunter',
    'Ethical Hacker',
    'Red Team Operator',
    'Malware Analyst'
  ];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    if (!deleting && ci === word.length + 1) {
      setTimeout(() => { deleting = true; }, 1800);
    }
    if (deleting && ci === -1) {
      deleting = false;
      ci = 0;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  type();
})();

/* ─── SCROLL REVEAL ─────────────────── */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        // Skill bars
        e.target.querySelectorAll && e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-right, .reveal-delay').forEach(el => observer.observe(el));

  // Skill bars triggered separately
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.querySelector('.skills-bars');
  if (skillsSection) skillObs.observe(skillsSection);

  // Stats counter
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
        statsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) statsObs.observe(statsGrid);
}

/* ─── COUNTER ANIMATION ─────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

/* ─── BLOG DATA & RENDER ─────────────── */
const blogPosts = [
  {
    id: 1,
    cat: 'writeup',
    catLabel: 'Write-Up',
    title: 'CVE-2024-XXXX: RCE in Popular CMS via Deserialization',
    date: 'Nov 12, 2024',
    excerpt: 'How I discovered an unauthenticated remote code execution vulnerability affecting over 2 million installations worldwide.',
    tags: ['RCE', 'PHP', 'Deserialization', 'CVE'],
    icon: '🔓',
    thumbBg: 'linear-gradient(135deg,rgba(255,60,92,0.15),rgba(180,79,255,0.1))'
  },
  {
    id: 2,
    cat: 'tutorial',
    catLabel: 'Tutorial',
    title: 'Building a Custom C2 Framework from Scratch',
    date: 'Oct 28, 2024',
    excerpt: 'Step-by-step guide to implementing a command-and-control framework with encrypted comms and EDR evasion techniques.',
    tags: ['C2', 'Red Team', 'Python', 'Evasion'],
    icon: '⚡',
    thumbBg: 'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(0,255,159,0.08))'
  },
  {
    id: 3,
    cat: 'research',
    catLabel: 'Research',
    title: 'Attacking Active Directory: A Modern Approach',
    date: 'Oct 15, 2024',
    excerpt: 'Deep dive into current AD attack chains — Kerberoasting, AS-REP Roasting, DCSync, and defensive countermeasures.',
    tags: ['Active Directory', 'Kerberos', 'BloodHound'],
    icon: '🏰',
    thumbBg: 'linear-gradient(135deg,rgba(255,107,53,0.1),rgba(255,202,40,0.08))'
  },
  {
    id: 4,
    cat: 'news',
    catLabel: 'Threat Intel',
    title: 'APT Group Analysis: Tactics of BlackNet Syndicate',
    date: 'Sep 30, 2024',
    excerpt: 'Forensic analysis of a sophisticated APT campaign targeting financial institutions across Southeast Asia.',
    tags: ['APT', 'Threat Intel', 'Forensics', 'IOC'],
    icon: '🎯',
    thumbBg: 'linear-gradient(135deg,rgba(255,60,92,0.1),rgba(255,107,53,0.08))'
  },
  {
    id: 5,
    cat: 'tutorial',
    catLabel: 'Tutorial',
    title: 'Web Application Fuzzing with Custom Wordlists',
    date: 'Sep 14, 2024',
    excerpt: 'Techniques for generating context-aware wordlists and maximizing fuzzing coverage in bug bounty programs.',
    tags: ['Fuzzing', 'Bug Bounty', 'FFUF', 'OWASP'],
    icon: '🔍',
    thumbBg: 'linear-gradient(135deg,rgba(0,255,159,0.1),rgba(0,229,255,0.08))'
  },
  {
    id: 6,
    cat: 'writeup',
    catLabel: 'Write-Up',
    title: 'HackTheBox — Compromising the Infinity Machine',
    date: 'Aug 22, 2024',
    excerpt: 'Full walkthrough of an Insane-rated HackTheBox machine involving kernel exploitation and container escape.',
    tags: ['HTB', 'Kernel Exploit', 'Container Escape'],
    icon: '🏴',
    thumbBg: 'linear-gradient(135deg,rgba(180,79,255,0.15),rgba(0,229,255,0.08))'
  },
];

(function renderBlog() {
  const grid = document.getElementById('blogGrid');
  blogPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card reveal';
    card.dataset.cat = post.cat;
    card.innerHTML = `
      <div class="blog-thumb" style="--thumb-bg:${post.thumbBg}">
        <span style="position:relative;z-index:1;font-size:52px">${post.icon}</span>
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span class="blog-cat">${post.catLabel}</span>
          <span>${post.date}</span>
        </div>
        <h3>${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-tags">
          ${post.tags.map(t => `<span class="blog-tag">#${t}</span>`).join('')}
        </div>
        <a href="#" class="blog-read">Read More <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    grid.appendChild(card);
  });
})();

/* Blog filter */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.blog-card').forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hidden', !match);
      // Re-trigger reveal if now visible
      if (match && !card.classList.contains('revealed')) {
        card.classList.add('revealed');
      }
    });
  });
});

/* ─── TESTIMONIAL CAROUSEL ───────────── */
(function initTestimonial() {
  const track  = document.getElementById('testimonialTrack');
  const dotsEl = document.getElementById('tDots');
  const cards  = track.querySelectorAll('.testimonial-card');
  let current  = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 't-dot-btn' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.t-dot-btn').forEach((d, i) => d.classList.toggle('active', i === current));
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('tPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('tNext').addEventListener('click', () => goTo(current + 1));

  // Swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  resetAuto();
})();

/* ─── CONTACT FORM VALIDATION ────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const fields = {
    name:    { el: document.getElementById('name'),    errEl: document.getElementById('nameError'),    validate: v => v.trim().length >= 2 ? '' : 'Name must be at least 2 characters.' },
    email:   { el: document.getElementById('email'),   errEl: document.getElementById('emailError'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.' },
    subject: { el: document.getElementById('subject'), errEl: document.getElementById('subjectError'), validate: v => v ? '' : 'Please select a service.' },
    message: { el: document.getElementById('message'), errEl: document.getElementById('messageError'), validate: v => v.trim().length >= 20 ? '' : 'Message must be at least 20 characters.' },
  };

  function validateField(key) {
    const { el, errEl, validate } = fields[key];
    const error = validate(el.value);
    errEl.textContent = error;
    el.classList.toggle('invalid', !!error);
    return !error;
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('invalid')) validateField(key);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Secure Message';
        const success = document.getElementById('formSuccess');
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 5000);
      }, 1800);
    }
  });
})();

/* ─── BACK TO TOP ───────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─── RADAR CHART (Canvas) ───────────── */
(function initRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = W * 0.38;
  const labels = ['Hacking', 'Linux', 'Python', 'Networking', 'Web Sec', 'RevEng', 'Forensics'];
  const values = [0.95, 0.92, 0.90, 0.88, 0.93, 0.80, 0.85];
  const n = labels.length;

  function polarPoint(angle, r) {
    return {
      x: cx + r * Math.cos(angle - Math.PI / 2),
      y: cy + r * Math.sin(angle - Math.PI / 2)
    };
  }

  let progress = 0;
  function draw(p) {
    ctx.clearRect(0, 0, W, H);
    const rings = 5;

    // Grid
    for (let r = 1; r <= rings; r++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const pt = polarPoint(angle, (R * r) / rings);
        i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0,255,159,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Spokes
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const pt = polarPoint(angle, R);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = 'rgba(0,255,159,0.12)';
      ctx.stroke();
    }

    // Data fill
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const pt = polarPoint(angle, R * values[i] * p);
      i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,255,159,0.12)';
    ctx.fill();
    ctx.strokeStyle = '#00ff9f';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff9f';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dots
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const pt = polarPoint(angle, R * values[i] * p);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff9f';
      ctx.shadowColor = '#00ff9f';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Labels
    ctx.shadowBlur = 0;
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      const pt = polarPoint(angle, R + 28);
      ctx.font = '11px Share Tech Mono, monospace';
      ctx.fillStyle = '#aaaaaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], pt.x, pt.y);
    }
  }

  // Animate in
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let start = null;
      function animate(ts) {
        if (!start) start = ts;
        progress = Math.min((ts - start) / 1200, 1);
        draw(progress);
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(canvas);

  draw(0);
})();

/* ─── TERMINAL CONSOLE ───────────────── */
(function initTerminal() {
  const input  = document.getElementById('terminalInput');
  const body   = document.getElementById('terminalBody');
  if (!input || !body) return;

  const commands = {
    help: () => [
      '┌──────────────────────────────┐',
      '│  CIPHERSEC TERMINAL v2.0     │',
      '└──────────────────────────────┘',
      'Available commands:',
      '  <span class="t-highlight">help</span>     — Show this message',
      '  <span class="t-highlight">about</span>    — About Alex Cipher',
      '  <span class="t-highlight">skills</span>   — List technical skills',
      '  <span class="t-highlight">contact</span>  — Get contact info',
      '  <span class="t-highlight">projects</span> — List open-source projects',
      '  <span class="t-highlight">certs</span>    — Certifications',
      '  <span class="t-highlight">status</span>   — Current availability',
      '  <span class="t-highlight">clear</span>    — Clear terminal',
      '  <span class="t-highlight">whoami</span>   — Identity check',
    ],
    about: () => [
      '╔══════════════════════════════╗',
      '║   OPERATOR DOSSIER           ║',
      '╚══════════════════════════════╝',
      'Name    : Alex Cipher',
      'Role    : Senior Penetration Tester',
      'Exp     : 8+ years',
      'Location: Remote / Worldwide',
      'Focus   : Offensive Security, Red Teaming',
      'Mission : Find it before they do.',
    ],
    skills: () => [
      '[ SKILL MATRIX ]',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Ethical Hacking  ████████████ 95%',
      'Linux/Unix       ████████████ 92%',
      'Python           ███████████░ 90%',
      'Web Security     ████████████ 93%',
      'Networking       ███████████░ 88%',
      'Rev. Engineering ██████████░░ 80%',
      'Digital Forensics███████████░ 85%',
    ],
    contact: () => [
      '[ CONTACT PROTOCOLS ]',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Email   : alex@ciphersec.io',
      'Twitter : @alexcipher_sec',
      'GitHub  : github.com/alexcipher',
      'PGP     : 0xDEAD BEEF C1PH 3R5E',
      '',
      'Response time: &lt; 24 hours',
      '<span class="t-highlight">→ Scroll to contact form below ↓</span>',
    ],
    projects: () => [
      '[ OPEN SOURCE ARSENAL ]',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '01. VulnScan Pro  — CVE Scanner',
      '02. PhishGuard    — ML Phishing Detector',
      '03. PacketSpy     — Network Analyzer',
      '04. OSINTrix      — Recon Framework',
      '05. PasswdAnalyzer— Password Auditor',
      '06. CryptoAudit   — Crypto Checker',
      '',
      'All available on GitHub.',
    ],
    certs: () => [
      '[ CERTIFICATIONS ]',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '[✓] CEH    — Certified Ethical Hacker',
      '[✓] OSCP   — Offensive Security Certified',
      '[✓] CISSP  — Info Systems Security Professional',
      '[✓] Security+ — CompTIA',
      '[✓] eJPT   — eLearnSecurity Junior PenTester',
      '[✓] AWS Security Specialty',
      '',
      'Total: 12 active certifications',
    ],
    status: () => [
      '[ AVAILABILITY STATUS ]',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '<span class="t-highlight">● ONLINE — Available for hire</span>',
      '',
      'Taking new projects as of Q4 2024.',
      'Preferred: 3–6 month engagements.',
      'Remote only.',
    ],
    whoami: () => [
      'root',
      '<span class="t-highlight">You are speaking to a Level 9 Threat Actor.</span>',
      '(Just kidding. I\'m one of the good guys.)',
    ],
    clear: () => 'CLEAR',
  };

  function addLine(html, cls = '') {
    const line = document.createElement('div');
    line.className = 't-line ' + cls;
    line.innerHTML = html;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';

    // Echo command
    addLine(`<span class="t-prompt">root@ciphersec:~$</span> <span class="t-cmd">${cmd}</span>`);

    if (!cmd) return;

    if (commands[cmd]) {
      const out = commands[cmd]();
      if (out === 'CLEAR') {
        body.innerHTML = '';
        addLine('<span class="t-output">Terminal cleared.</span>');
      } else {
        out.forEach(line => addLine(`<span class="t-output">${line}</span>`));
      }
    } else {
      addLine(`<span class="t-error">bash: ${cmd}: command not found. Type 'help' for options.</span>`);
    }

    addLine('', 't-spacer');
    body.scrollTop = body.scrollHeight;
  });
})();

/* ─── SMOOTH SCROLL (additional) ────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
