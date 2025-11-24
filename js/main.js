/* script.js
  - Profile data (edit jika perlu)
  - Nav toggle
  - Animated roles in hero
  - Scroll reveal (IntersectionObserver)
  - Portfolio lightbox
  - Contact form handling (client-side)
  - Profile modal & contact modal (booking)
  - "Lihat Karya" scroll + highlight
*/

/* === EDIT PROFILE DATA HERE (optional) === */
const profileData = {
  fullName: "Anafiki Hidayatul Maula",
  roleLine: "Mahasiswi SISTEM INFORMASI — UNIVERSITAS KOMPUTAMA",
  placeAndDob: "Kota, 2004-05-15",
  dateOfBirth: "2004-05-15",
  hobbies: ["Fotografi", "Videografi", "Design UI/UX"],
  motto: "Kreativitas dimulai dari rasa ingin tahu"
};
/* ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Populate profile mini info
  function formatHobbies(arr){ return (arr && arr.length) ? arr.join(', ') : '-'; }
  function calcAge(dobString){
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob)) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  document.getElementById('miniName').textContent = profileData.fullName;
  document.getElementById('pmName').textContent = profileData.fullName;
  document.getElementById('miniRole').textContent = profileData.roleLine;
  document.getElementById('pmRole').textContent = profileData.roleLine;

  const birthPlaceEl = document.getElementById('birthPlace');
  const pmBirthPlaceEl = document.getElementById('pmBirthPlace');
  if (profileData.placeAndDob && profileData.placeAndDob !== "") {
    birthPlaceEl.textContent = profileData.placeAndDob;
    pmBirthPlaceEl.textContent = profileData.placeAndDob;
  } else {
    birthPlaceEl.textContent = "-";
    pmBirthPlaceEl.textContent = "-";
  }

  const age = calcAge(profileData.dateOfBirth);
  const ageEl = document.getElementById('age');
  const pmAgeEl = document.getElementById('pmAge');
  ageEl.textContent = age !== null ? `${age} tahun` : "-";
  pmAgeEl.textContent = age !== null ? `${age} tahun` : "-";

  const hobbiesStr = formatHobbies(profileData.hobbies);
  document.getElementById('hobbies').textContent = hobbiesStr;
  document.getElementById('pmHobbies').textContent = hobbiesStr;

  document.getElementById('motto').textContent = profileData.motto || "-";
  document.getElementById('pmMotto').textContent = profileData.motto || "-";

  // Set modal photo same as profile
  const profilePhotoSrc = document.getElementById('profilePhoto').src;
  document.getElementById('pmPhoto').src = profilePhotoSrc;

  /* NAV TOGGLE (mobile) */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? '' : 'flex';
  });

  /* HERO ROLE ROTATION */
  (function roleRotation(){
    const roles = Array.from(document.querySelectorAll('.animated-roles .role'));
    let idx = 0;
    if (!roles.length) return;
    roles.forEach((r,i)=>{ if(i!==0) { r.style.opacity=0; r.style.transform='translateY(8px)'} else { r.classList.add('show')}});
    setInterval(()=> {
      roles[idx].classList.remove('show');
      roles[idx].style.opacity = 0;
      roles[idx].style.transform = 'translateY(8px)';
      idx = (idx+1) % roles.length;
      roles[idx].classList.add('show');
      roles[idx].style.opacity = 1;
      roles[idx].style.transform = 'translateY(0)';
    }, 2200);
  })();

  /* SCROLL REVEAL using IntersectionObserver */
  (function scrollReveal(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal, .reveal-hero').forEach(el => observer.observe(el));
  })();

  /* Smooth scrolling for in-page links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          if (navToggle && window.getComputedStyle(navToggle).display !== 'none') {
            navList.style.display = '';
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  /* PORTFOLIO LIGHTBOX */
  const lightbox = document.getElementById('lightbox');
  const lbStage = document.getElementById('lbStage');
  const lbClose = document.getElementById('lbClose');

  function openLightbox(type, src){
    lbStage.innerHTML = '';
    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Portfolio image';
      lbStage.appendChild(img);
    } else if (type === 'video') {
      const v = document.createElement('video');
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.src = src;
      v.style.maxHeight = '80vh';
      lbStage.appendChild(v);
    }
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden', 'true');
    lbStage.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.port-item').forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.type;
      const src = item.dataset.src;
      openLightbox(type, src);
    });
    const vid = item.querySelector('video');
    if (vid) {
      item.addEventListener('mouseenter', () => { try{ vid.currentTime = 0; vid.play(); }catch(e){} });
      item.addEventListener('mouseleave', () => { try{ vid.pause(); vid.currentTime = 0; }catch(e){} });
    }
  });

  lbClose && lbClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox(); });

  /* CONTACT FORM (main page) */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (!name || !email || !message) {
      formStatus.textContent = 'Mohon isi semua field terlebih dahulu.';
      formStatus.style.color = '#ff8fb1';
      return;
    }
    formStatus.textContent = 'Mengirim...';
    formStatus.style.color = 'var(--muted)';
    const sendBtn = form.querySelector('button[type="submit"]');
    sendBtn.disabled = true; sendBtn.style.opacity = .6;
    setTimeout(()=> {
      form.reset();
      sendBtn.disabled = false; sendBtn.style.opacity = 1;
      formStatus.textContent = 'Terima kasih! Pesan Anda telah terkirim (simulasi). Saya akan menghubungi Anda segera.';
      formStatus.style.color = 'var(--accent-pink-soft)';
      setTimeout(()=> formStatus.textContent = '', 7000);
    }, 1200);
  });

  /* Accessibility: keyboard outlines */
  (function focusStyleToggle(){
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  })();

  /* PROFILE MODAL (Selengkapnya) */
  const openProfileBtn = document.getElementById('openProfileBtn');
  const profileModal = document.getElementById('profileModal');
  const pmClose = document.getElementById('pmClose');

  function openProfile(e){
    profileModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // entrance animation
    const content = profileModal.querySelector('.pm-content');
    content.style.opacity = 0; content.style.transform = 'translateY(12px)';
    setTimeout(()=> {
      content.style.transition = 'transform 420ms cubic-bezier(.22,.9,.35,1), opacity 420ms';
      content.style.opacity = 1; content.style.transform = 'translateY(0)';
    }, 18);
  }

  function closeProfile(){
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openProfileBtn && openProfileBtn.addEventListener('click', openProfile);
  pmClose && pmClose.addEventListener('click', closeProfile);
  profileModal && profileModal.addEventListener('click', (e) => { if (e.target === profileModal) closeProfile(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && profileModal.getAttribute('aria-hidden') === 'false') closeProfile(); });

  /* CONTACT MODAL (Booking) */
  const bookingBtn = document.getElementById('bookingBtn');
  const contactModal = document.getElementById('contactModal');
  const contactModalClose = document.getElementById('contactModalClose');
  const contactModalForm = document.getElementById('contactModalForm');
  const modalFormStatus = document.getElementById('modalFormStatus');

  function openContactModal(e){
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // small entrance animation
    const content = contactModal.querySelector('.pm-content');
    content.style.opacity = 0; content.style.transform = 'translateY(10px)';
    setTimeout(()=> {
      content.style.transition = 'transform 360ms cubic-bezier(.22,.9,.35,1), opacity 360ms';
      content.style.opacity = 1; content.style.transform = 'translateY(0)';
      // focus first input for accessibility
      const first = contactModal.querySelector('#m_name');
      first && first.focus();
    }, 18);

    // cute sparkles
    if (e && e.clientX) {
      for (let i=0;i<6;i++){
        setTimeout(()=> spawnSparkle(e.clientX + (Math.random()*80-40), e.clientY + (Math.random()*80-40)), i*70);
      }
    }
  }

  function closeContactModal(){
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // clear status & form
    modalFormStatus.textContent = '';
    contactModalForm.reset();
  }

  bookingBtn && bookingBtn.addEventListener('click', openContactModal);
  contactModalClose && contactModalClose.addEventListener('click', closeContactModal);
  contactModal && contactModal.addEventListener('click', (e) => { if (e.target === contactModal) closeContactModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && contactModal.getAttribute('aria-hidden') === 'false') closeContactModal(); });

  contactModalForm && contactModalForm.addEventListener('submit', function(e){
    e.preventDefault();
    const n = document.getElementById('m_name').value.trim();
    const em = document.getElementById('m_email').value.trim();
    const msg = document.getElementById('m_message').value.trim();
    if (!n || !em || !msg) {
      modalFormStatus.textContent = 'Mohon isi semua field.';
      modalFormStatus.style.color = '#ff8fb1';
      return;
    }
    modalFormStatus.textContent = 'Mengirim...'; modalFormStatus.style.color = 'var(--muted)';
    const btn = contactModalForm.querySelector('button[type="submit"]');
    btn.disabled = true; btn.style.opacity = .6;
    setTimeout(()=> {
      contactModalForm.reset();
      btn.disabled = false; btn.style.opacity = 1;
      modalFormStatus.textContent = 'Booking terkirim (simulasi). Terima kasih!';
      modalFormStatus.style.color = 'var(--accent-pink-soft)';
      setTimeout(()=> { modalFormStatus.textContent = ''; closeContactModal(); }, 1400);
    }, 1200);
  });

  /* LIHAT KARYA button behavior */
  const lihatKaryaBtn = document.getElementById('lihatKaryaBtn');
  const portfolioGrid = document.getElementById('portfolioGrid');

  function highlightPortfolio(){
    if (!portfolioGrid) return;
    portfolioGrid.classList.remove('highlight');
    // force reflow to restart animation
    void portfolioGrid.offsetWidth;
    portfolioGrid.classList.add('highlight');
    // remove after duration
    setTimeout(()=> portfolioGrid.classList.remove('highlight'), 1600);
  }

  lihatKaryaBtn && lihatKaryaBtn.addEventListener('click', (e) => {
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // small delay then highlight
      setTimeout(highlightPortfolio, 600);
    }
  });

  // small sparkle util (reused)
  function spawnSparkle(x, y){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = (x - 6) + 'px';
    s.style.top = (y - 6) + 'px';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 950);
  }
  const sparkleStyle = document.createElement('style');
  sparkleStyle.innerHTML = `
    .sparkle{
      position:fixed;width:12px;height:12px;border-radius:50%;
      background: radial-gradient(circle at 30% 30%, #fff 0%, rgba(255,255,255,0.9) 10%, rgba(255,77,166,0.9) 40%, transparent 70%);
      transform:translateY(0) scale(0.2);
      animation: spark 900ms forwards;
      z-index:200;pointer-events:none;
    }
    @keyframes spark{
      0%{opacity:1;transform:translateY(0) scale(0.3)}
      60%{opacity:1;transform:translateY(-18px) scale(1)}
      100%{opacity:0;transform:translateY(-30px) scale(0.6)}
    }`;
  document.head.appendChild(sparkleStyle);

  /* small enhancement: fade-in wave divider */
  const divider = document.querySelector('.section-divider .wave');
  if (divider) {
    divider.style.opacity = 0;
    divider.style.transition = 'opacity 900ms ease';
    setTimeout(()=> divider.style.opacity = 1, 200);
  }

});