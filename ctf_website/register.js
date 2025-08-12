// ===== Particle Background =====
function spawnParticles(N = 12) {
  const sizes = [44, 60, 80, 100, 130, 56, 90];
  const pcontainer = document.getElementById('particles');
  if (!pcontainer) return;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = sizes[Math.floor(Math.random() * sizes.length)] + Math.floor(Math.random() * 22);
    p.style.width = sz + 'px';
    p.style.height = sz + 'px';
    p.style.left = Math.random() * 94 + '%';
    p.style.top = Math.random() * 86 + '%';
    p.style.animationDelay = (Math.random() * 10).toFixed(2) + 's';
    pcontainer.appendChild(p);
  }
}
spawnParticles(10);

// ===== Text Animation Effects =====
function typewriter(msgElem, text, speed = 59) {
  msgElem.textContent = '';
  msgElem.className = 'message terminal';
  msgElem.style.opacity = 1;
  let i = 0;
  (function type() {
    if (i < text.length) {
      msgElem.textContent += text[i++];
      setTimeout(type, speed + Math.random() * 50);
    }
  })();
}

function showGlitch(msgElem, text) {
  msgElem.textContent = text;
  msgElem.className = 'message glitch';
  msgElem.style.opacity = 1;
  setTimeout(() => {
    msgElem.style.opacity = 0;
    msgElem.className = 'message';
  }, 2000);
}

// ===== Password Visibility Toggle =====
function togglePasswordVisibility(toggleId, fieldId, eyeOpenId, eyeClosedId) {
  const toggle = document.getElementById(toggleId);
  const field = document.getElementById(fieldId);
  const eyeOpen = document.getElementById(eyeOpenId);
  const eyeClosed = document.getElementById(eyeClosedId);

  if (!toggle || !field) return;

  function toggleFunc() {
    const isHidden = field.type === 'password';
    field.type = isHidden ? 'text' : 'password';
    if (eyeOpen && eyeClosed) {
      eyeOpen.style.display = isHidden ? 'none' : 'block';
      eyeClosed.style.display = isHidden ? 'block' : 'none';
    }
  }

  toggle.addEventListener('click', toggleFunc);

  // Also toggle on Enter/Space for accessibility
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFunc();
    }
  });
}

togglePasswordVisibility('toggleRegPassword', 'regPassword', 'eyeOpenReg', 'eyeClosedReg');
togglePasswordVisibility('toggleConfirmPassword', 'confirmPassword', 'eyeOpenConfirm', 'eyeClosedConfirm');

// ===== REGISTER Form Logic (with duplicate check) =====
const registerForm = document.getElementById('ctfRegister');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('confirmPassword').value.trim();
    const msg = document.getElementById('registerMsg');

    msg.style.opacity = 0;
    msg.className = 'message';

    // Retrieve stored users or empty array
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    if (!name || !email || !password || !confirm) {
      showGlitch(msg, 'ERROR: All fields required');
    } 
    else if (password !== confirm) {
      showGlitch(msg, 'ERROR: Passwords do not match');
    }
    else if (users.some(user => user.email === email)) {
      showGlitch(msg, 'ERROR: Account already exists');
    }
    else {
      // Save new user
      users.push({ name, email, password });
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      typewriter(msg, 'Registration Successful! You can now log in...');
      registerForm.reset();
    }
  });
}
