function spawnParticles(N = 12) {
    const sizes = [44, 60, 80, 100, 130, 56, 90];
    const pcontainer = document.getElementById('particles');
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
  
  document.getElementById('ctfLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('loginMsg');
    msg.style.opacity = 0;
    msg.className = 'message';
  
    if (email === 'admin@ctf.com' && password === 'ctf2025') {
      typewriter(msg, 'ACCESS GRANTED. Welcome');
    } else if (!email || !password) {
      showGlitch(msg, 'ERROR: Missing credentials!');
    } else {
      showGlitch(msg, 'ACCESS DENIED');
    }
  });
  
  // Toggle password visibility with glowing eye icons
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');
  const eyeOpen = document.getElementById('eyeOpen');
  const eyeClosed = document.getElementById('eyeClosed');
  
  togglePassword.addEventListener('click', () => {
    const isHidden = passwordField.type === 'password';
    passwordField.type = isHidden ? 'text' : 'password';
    eyeOpen.style.display = isHidden ? 'none' : 'block';
    eyeClosed.style.display = isHidden ? 'block' : 'none';
  });
  
  