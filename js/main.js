// Modular vanilla JS: reveal on scroll, nav toggle, skill animation, simple form handler
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// NAV TOGGLE (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle && navList) {
  // ensure aria attributes exist
  navToggle.setAttribute('aria-expanded', 'false');
  navList.setAttribute('aria-hidden', 'true');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    const visible = !expanded;
    navList.style.display = visible ? 'flex' : 'none';
    navList.setAttribute('aria-hidden', String(!visible));
  });
  // Close nav when clicking link (mobile)
  navList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth < 880) {
      navList.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
      navList.setAttribute('aria-hidden', 'true');
    }
  });
}

// SMOOTH SCROLL for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// HEADER: keep visible when scrolling — add .scrolled class after small threshold
const header = document.querySelector('.site-header');
if (header) {
  const SCROLL_THRESHOLD = 20;
  const onScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  // run on load in case page opens scrolled (deep link)
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// INTERSECTION OBSERVER: reveal and skill bars
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // animate any skill bars inside the revealed section
        entry.target.querySelectorAll?.('.skill-bar')?.forEach(bar=>{
          const value = bar.getAttribute('data-value') || bar.dataset.value || 0;
          const fill = bar.querySelector('.fill');
          if (fill) fill.style.width = value + '%';
        });
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Basic form handler (Fetch to Formspree or fallback to mailto)
// NOTE: Replace FORM_ENDPOINT with your Formspree endpoint if available.
const FORM_ENDPOINT = ''; // e.g. "https://formspree.io/f/moqprk...";

const contactForm = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = 'Pesan berhasil dikirim. Terima kasih!';
          contactForm.reset();
        } else {
          statusEl.textContent = 'Terjadi kesalahan saat mengirim. Coba lagi nanti.';
        }
      } catch (err) {
        statusEl.textContent = 'Gagal mengirim pesan.';
      }
    } else {
      // Fallback: prepare mailto link (not ideal for production)
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const mailto = `mailto:ana@example.com?subject=${encodeURIComponent('Contact from website: ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      window.location.href = mailto;
    }
  });
}