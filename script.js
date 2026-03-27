// ─── ELEMENTS ────────────────────────────────────────────────────────────────
const nameInput     = document.querySelector('input[type="text"]');
const emailInput    = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const submitBtn     = document.querySelector('.btn-primary');


// ─── HELPER: show / clear inline error under a field ─────────────────────────
function setError(input, msg) {
  // Remove existing error for this input
  const existing = input.parentElement.querySelector('.field-error');
  if (existing) existing.remove();

  input.style.borderColor = msg ? '#e05c5c' : '';
  input.style.boxShadow   = msg ? '0 0 0 3px rgba(224,92,92,0.12)' : '';

  if (msg) {
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'font-size:0.78rem; color:#e05c5c; margin-top:4px; display:block;';
    err.textContent = msg;
    input.insertAdjacentElement('afterend', err);
  }
}

function clearError(input) {
  setError(input, '');
  input.style.borderColor = '#7fcec8';
  input.style.boxShadow   = '';
}


// ─── REAL-TIME VALIDATION ─────────────────────────────────────────────────────
nameInput.addEventListener('blur', () => {
  nameInput.value.trim().length >= 2
    ? clearError(nameInput)
    : setError(nameInput, 'Please enter your full name');
});

emailInput.addEventListener('blur', () => {
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())
    ? clearError(emailInput)
    : setError(emailInput, 'Please enter a valid email address');
});

passwordInput.addEventListener('blur', () => {
  passwordInput.value.length >= 8
    ? clearError(passwordInput)
    : setError(passwordInput, 'Password must be at least 8 characters');
});


// ─── PASSWORD STRENGTH ────────────────────────────────────────────────────────
// Inject strength bar directly after the password input
const strengthWrap = document.createElement('div');
strengthWrap.style.cssText = 'margin-top:6px;';
strengthWrap.innerHTML = `
  <div style="height:4px; background:#eee; border-radius:4px; overflow:hidden;">
    <div id="strength-bar" style="height:100%; width:0%; border-radius:4px;
      transition: width 0.3s ease, background 0.3s ease;"></div>
  </div>
  <span id="strength-label" style="font-size:0.75rem; font-weight:600; min-height:14px; display:block; margin-top:3px;"></span>
`;
passwordInput.insertAdjacentElement('afterend', strengthWrap);

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let score = 0;
  if (val.length >= 8)            score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { label: '',       color: '#d8d8e8', width: '0%'   },
    { label: 'Weak',   color: '#e05c5c', width: '25%'  },
    { label: 'Fair',   color: '#f5c518', width: '50%'  },
    { label: 'Good',   color: '#7fcec8', width: '75%'  },
    { label: 'Strong', color: '#2e5c59', width: '100%' },
  ];

  const level = levels[score];
  const bar   = document.getElementById('strength-bar');
  const label = document.getElementById('strength-label');
  bar.style.width      = level.width;
  bar.style.background = level.color;
  label.textContent    = level.label;
  label.style.color    = level.color;
});


// ─── PASSWORD SHOW / HIDE ─────────────────────────────────────────────────────
const toggleBtn = document.createElement('button');
toggleBtn.type      = 'button';
toggleBtn.textContent = '👁️';
toggleBtn.style.cssText = `
  position:absolute; right:12px; top:50%; transform:translateY(-50%);
  background:none; border:none; cursor:pointer; font-size:1rem;
  opacity:0.6; transition:opacity 0.2s;
`;
toggleBtn.addEventListener('mouseover', () => toggleBtn.style.opacity = '1');
toggleBtn.addEventListener('mouseout',  () => toggleBtn.style.opacity = '0.6');

// Wrap password input in a relative-positioned div
const passWrapper = document.createElement('div');
passWrapper.style.cssText = 'position:relative;';
passwordInput.parentElement.insertBefore(passWrapper, passwordInput);
passWrapper.appendChild(passwordInput);
passWrapper.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  const isHidden       = passwordInput.type === 'password';
  passwordInput.type   = isHidden ? 'text' : 'password';
  toggleBtn.textContent = isHidden ? '🙈' : '👁️';
});


// ─── FORM SUBMIT ──────────────────────────────────────────────────────────────
submitBtn.addEventListener('click', () => {
  const nameOk  = nameInput.value.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  const passOk  = passwordInput.value.length >= 8;

  if (!nameOk)  setError(nameInput,     'Please enter your full name');
  if (!emailOk) setError(emailInput,    'Please enter a valid email address');
  if (!passOk)  setError(passwordInput, 'Password must be at least 8 characters');

  if (!nameOk || !emailOk || !passOk) return;

  // Loading state
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Creating account…';

  setTimeout(() => {
    submitBtn.textContent      = '✓ Account Created!';
    submitBtn.style.background = '#2e5c59';

    // Success banner
    const banner = document.createElement('p');
    banner.style.cssText = `
      text-align:center; font-size:0.9rem; font-weight:600; color:#2e5c59;
      background:#e8f7f6; padding:12px 16px; border-radius:10px; margin-top:4px;
    `;
    banner.innerHTML = '✅ Account created! <a href="landing.html" style="color:#5bb8b1; font-weight:700; text-decoration:none;">Go to home →</a>';
    submitBtn.insertAdjacentElement('afterend', banner);
  }, 1200);
});