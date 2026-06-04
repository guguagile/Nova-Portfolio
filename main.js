/* ════════════════════════════════════════════════
   GOLIDE INVESTMENTS — main.js
   ════════════════════════════════════════════════ */

/* ── MOBILE NAV ── */
const navToggle  = document.getElementById('nav-toggle');
const navMenu    = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');
const mainNav    = document.querySelector('nav');

function openNav() {
  navMenu.classList.add('open');
  navOverlay.style.display = 'block';
  requestAnimationFrame(() => navOverlay.classList.add('show'));
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navMenu.classList.remove('open');
  navOverlay.classList.remove('show');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  // Hide overlay after transition
  setTimeout(() => { navOverlay.style.display = ''; }, 320);
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeNav() : openNav();
  });
}
if (navOverlay) navOverlay.addEventListener('click', closeNav);

// Close on link tap
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });


/* ── NAV SCROLL SHADOW ── */
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ── SCROLL REVEAL ── */
const revealTargets = document.querySelectorAll(
  '.approach-item, .region-item, .sector-card, ' +
  '.about-text, .about-visual, .regions-header, ' +
  '.contact-info, .contact-form-wrap, .sectors-header'
);

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealTargets.forEach(el => { el.classList.add('reveal'); io.observe(el); });
} else {
  // Fallback: show everything immediately
  revealTargets.forEach(el => el.classList.add('reveal', 'visible'));
}


/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.classList.add('sent');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Send Enquiry →';
      submitBtn.classList.remove('sent');
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}


/* ── REFLOW NAV on resize (desktop ↔ mobile) ── */
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeNav();
}, { passive: true });

// Close mobile menu when orientation changes
window.addEventListener('orientationchange', () => {
  closeNav();
});