
/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

/* ===== TYPED ROLES ===== */
const roles = ['Software Engineer','Full Stack Developer','Graphics Designer','Tech Consultant','Student Leader','Digital Creator'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typedRole');
function typeRole() {
  const current = roles[ri];
  if (!deleting) {
    el.textContent = current.slice(0, ci++);
    if (ci > current.length) { deleting = true; setTimeout(typeRole, 1400); return; }
  } else {
    el.textContent = current.slice(0, ci--);
    if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; setTimeout(typeRole, 300); return; }
  }
  setTimeout(typeRole, deleting ? 50 : 90);
}
typeRole();

/* ===== NAV SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // active link
  document.querySelectorAll('.nav-links a').forEach(a => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (sec) {
      const top = sec.offsetTop - 90, bot = top + sec.offsetHeight;
      a.classList.toggle('active', window.scrollY >= top && window.scrollY < bot);
    }
  });
});

/* ===== THEME ===== */
function toggleTheme() {
  document.body.classList.toggle('light');
  const icon = document.getElementById('themeIcon');
  icon.className = document.body.classList.contains('light') ? 'bx bx-sun' : 'bx bx-moon';
}

/* ===== MOBILE MENU ===== */
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== SKILL BARS ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-card').forEach(card => skillObserver.observe(card));

/* ===== COUNTERS ===== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.cnum').forEach(el => {
        const target = +el.dataset.target, dur = 1500;
        const step = target / (dur / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 16);
      });
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const leaderSection = document.getElementById('leadership');
if (leaderSection) counterObserver.observe(leaderSection);

/* ===== PORTFOLIO FILTER ===== */
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.opacity = show ? '1' : '0';
    item.style.pointerEvents = show ? 'auto' : 'none';
    item.style.transform = show ? '' : 'scale(0.95)';
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    item.style.display = show ? '' : 'none';
  });
}

/* ===== CONTACT FORM ===== */
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const service = document.getElementById('fservice').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  const status = document.getElementById('formStatus');
  if (!fname || !email || !msg) {
    status.textContent = 'Please fill in all required fields.';
    status.className = 'form-status error';
    return;
  }

  const recipient = 'anekethankgodc@gmail.com';
  const subject = `New message from ${fname} ${lname}`;
  const body = `Name: ${fname} ${lname}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage:\n${msg}`;
  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = 'Opening email client to send your message...';
  status.className = 'form-status success';

  window.location.href = mailtoLink;

  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('femail').value = '';
  document.getElementById('fservice').value = '';
  document.getElementById('fmessage').value = '';
  setTimeout(() => { status.textContent = ''; }, 5000);
}
