// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  
  // ─── NEWSLETTER VALIDATION ───────────────────────────────────────────────────
  const subscribeBtn = document.querySelector('.btn-subscribe');
  const emailInput   = document.querySelector('.email-input input');
  
  subscribeBtn.addEventListener('click', () => {
    const val   = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  
    const existing = document.querySelector('.newsletter-feedback');
    if (existing) existing.remove();
  
    const feedback = document.createElement('p');
    feedback.className = 'newsletter-feedback';
    feedback.style.cssText = 'margin-top:12px; font-size:0.88rem; font-weight:600;';
  
    if (!val) {
      feedback.textContent = 'Please enter your email address.';
      feedback.style.color = '#e05c5c';
      subscribeBtn.closest('.newsletter').appendChild(feedback);
      return;
    }
    if (!valid) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = '#e05c5c';
      subscribeBtn.closest('.newsletter').appendChild(feedback);
      return;
    }
  
    subscribeBtn.disabled    = true;
    subscribeBtn.textContent = 'Subscribing…';
  
    setTimeout(() => {
      feedback.textContent  = "🎉 You're subscribed! Welcome aboard.";
      feedback.style.color  = '#2e5c59';
      subscribeBtn.closest('.newsletter').appendChild(feedback);
      emailInput.value         = '';
      subscribeBtn.disabled    = false;
      subscribeBtn.textContent = 'Subscribe';
    }, 1000);
  });
  
  
  // ─── DESTINATION CARD MODAL ───────────────────────────────────────────────────
  const destinations = [
    {
      img:   'destination1.png',
      name:  'Rome, Italy',
      days:  '10 Days Trip',
      price: '$3.8k',
      desc:  'Walk through ancient history at the Colosseum, toss a coin in the Trevi Fountain, and savour authentic pasta in a sun-drenched piazza.'
    },
    {
      img:   'destination2.jpg',
      name:  'London, UK',
      days:  '12 Days Trip',
      price: '$4.2k',
      desc:  'From Big Ben to the Thames, London blends world-class museums, royal palaces, and a vibrant food scene unlike anywhere else on earth.'
    },
    {
      img:   'destination3.png',
      name:  'Full Europe',
      days:  '28 Days Trip',
      price: '$15k',
      desc:  'The ultimate grand tour — Paris, Amsterdam, Prague, Rome, and beyond. Tick off an entire continent in one unforgettable adventure.'
    }
  ];
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    display:none; position:fixed; inset:0;
    background:rgba(26,26,46,0.55); backdrop-filter:blur(4px);
    z-index:200; align-items:center; justify-content:center;
  `;
  modal.innerHTML = `
    <div style="background:white; border-radius:24px; max-width:480px; width:90%;
                overflow:hidden; position:relative; animation:modalIn 0.25s ease;">
      <style>@keyframes modalIn {
        from { opacity:0; transform:scale(0.92) translateY(16px); }
        to   { opacity:1; transform:scale(1)    translateY(0); }
      }</style>
      <button id="modal-close" style="position:absolute; top:14px; right:16px;
        background:rgba(255,255,255,0.85); border:none; border-radius:50%;
        width:32px; height:32px; font-size:0.85rem; cursor:pointer; z-index:10;">✕</button>
      <img id="modal-img" src="" alt=""
        style="width:100%; height:220px; object-fit:cover;" />
      <div style="padding:24px 28px 28px;">
        <h2 id="modal-name" style="font-size:1.4rem; font-weight:800; margin-bottom:6px; color:#1a1a2e;"></h2>
        <p  id="modal-meta" style="font-size:0.85rem; color:#5bb8b1; font-weight:600; margin-bottom:14px;"></p>
        <p  id="modal-desc" style="font-size:0.9rem; color:#555; line-height:1.7; margin-bottom:24px;"></p>
        <a href="index.html" style="background:#f5c518; color:#1a1a2e; padding:14px 28px;
           border-radius:30px; font-weight:700; text-decoration:none; font-size:0.95rem;">Book Now</a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  
  document.querySelectorAll('.dest-card').forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const d = destinations[i];
      document.getElementById('modal-img').src          = d.img;
      document.getElementById('modal-img').alt          = d.name;
      document.getElementById('modal-name').textContent = d.name;
      document.getElementById('modal-meta').textContent = `✈ ${d.days}  ·  ${d.price}`;
      document.getElementById('modal-desc').textContent = d.desc;
      modal.style.display          = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeModal() {
    modal.style.display          = 'none';
    document.body.style.overflow = '';
  }
  
  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  
  
  // SCROLL-REVEAL
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-hidden { opacity:0; transform:translateY(28px);
      transition: opacity 0.5s ease, transform 0.5s ease; }
    .revealed { opacity:1; transform:translateY(0); }
  `;
  document.head.appendChild(revealStyle);
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.service-card, .dest-card').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });