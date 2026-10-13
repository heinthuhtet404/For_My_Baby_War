// ===== LOADING =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});


// ===== FADE IN OBSERVER =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .photo-hero, .photo-small, .single-photo, .strip-item, .scatter-item, .grid-item').forEach(el => {
  observer.observe(el);
});


// ===== CHAT BUBBLE REVEAL =====
const chatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rows = entry.target.querySelectorAll('.chat-row');
      rows.forEach((row, index) => {
        setTimeout(() => {
          row.classList.add('visible');
        }, index * 300);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.chat-container').forEach(container => {
  chatObserver.observe(container);
});


// ===== SCROLL PROGRESS =====
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });


// ===== LIGHTBOX =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="lightbox-close">×</span>
  <img src="" alt="preview" />
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.photo-hero img, .photo-small img, .single-photo img, .strip-item img, .scatter-item img, .grid-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ===== PARALLAX CLOUDS =====
let cloudTicking = false;
window.addEventListener('scroll', () => {
  if (!cloudTicking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.cloud').forEach((cloud, i) => {
        cloud.style.transform = `translateY(${scrolled * (0.05 + i * 0.03)}px)`;
      });
      cloudTicking = false;
    });
    cloudTicking = true;
  }
}, { passive: true });

// ===== FEEDBACK FORM (Formspree) =====
const heartForm = document.getElementById('heartForm');
const sendBtn = document.getElementById('sendBtn');
const successMessage = document.getElementById('successMessage');

if (heartForm) {
  heartForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Button loading state
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = '<span>ပို့နေသည်… ⏳</span>';
    sendBtn.disabled = true;

    // Hide previous success message if any
    successMessage.classList.remove('show');

    const formData = new FormData(heartForm);

    try {
      const response = await fetch(heartForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message (form ကို မဖျောက်)
        successMessage.classList.add('show');

        // Vibrate if supported
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 30, 50]);
        }

        // Scroll to success message (form အောက်မှာ)
        setTimeout(() => {
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);

        // Button ကို ပြန်ယူ
        sendBtn.innerHTML = '<span>ထပ်ပို့မယ် 💌</span>';
        sendBtn.disabled = false;
      } else {
        throw new Error('Send failed');
      }
    } catch (error) {
      sendBtn.innerHTML = '<span>ပြန်စမ်းကြည့်ပါ 🙏</span>';
      sendBtn.disabled = false;
      setTimeout(() => {
        sendBtn.innerHTML = originalText;
      }, 3000);
    }
  });
}

// ===== COUNTDOWN TIMER =====
// Target date: 25 November 2026 (00:00)
const targetDate = new Date('2026-11-25T00:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownMessage = document.getElementById('countdownMessage');
const countdownSection = document.querySelector('.countdown-section');

function pad(num) {
  return num < 10 ? '0' + num : num.toString();
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    // Countdown completed
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';

    if (countdownSection) {
      countdownSection.classList.add('completed');
    }
    if (countdownMessage) {
      countdownMessage.textContent = 'ဒီနေ့ပဲနော်… ကိုယ်တို့ ပြန်တွေ့ရပြီ 🤍';
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = pad(days);
  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);

  // Dynamic message
  if (countdownMessage) {
    if (days > 100) {
      countdownMessage.textContent = 'တစ်နေ့ချင်း နီးလာနေပြီနော်… 🤍';
    } else if (days > 30) {
      countdownMessage.textContent = 'မကြာတော့ဘူးနော်… 🌷';
    } else if (days > 7) {
      countdownMessage.textContent = 'တစ်လအတွင်းမှာ တွေ့ရတော့မယ်… 💕';
    } else if (days > 1) {
      countdownMessage.textContent = 'ရက်အနည်းငယ်ပဲ လိုတော့တယ်နော်… 💗';
    } else if (days === 1) {
      countdownMessage.textContent = 'မနက်ဖြန်ပဲနော်… 🥰';
    } else {
      countdownMessage.textContent = 'ဒီနေ့ပဲ… 🤍';
    }
  }
}

// Initial call
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);
// ===== BACKGROUND MUSIC =====
const bgMusic = document.getElementById('bgMusic');
const musicPlayer = document.getElementById('musicPlayer');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const volumeSlider = document.getElementById('volumeSlider');

if (bgMusic && musicToggle) {
  // Initial volume
  bgMusic.volume = 0.5;

  // Load saved volume only (not playing state, not time)
  const savedVolume = localStorage.getItem('bgMusicVolume');
  if (savedVolume !== null) {
    bgMusic.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  }

  // ===== MUSIC ICON CLICK =====
  // - expand if collapsed
  // - toggle play/pause
  // - if collapsed and playing → just expand (keep playing)
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    const isExpanded = musicPlayer.classList.contains('expanded');

    // Always expand on click
    if (!isExpanded) {
      musicPlayer.classList.add('expanded');
    }

    // Toggle play/pause
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        updatePlayingUI(true);
      }).catch((err) => {
        console.log('Play failed:', err);
      });
    } else {
      bgMusic.pause();
      updatePlayingUI(false);
    }
  });

  // ===== TAP OUTSIDE = COLLAPSE ONLY (music keeps playing) =====
  document.addEventListener('click', (e) => {
    if (!musicPlayer.contains(e.target)) {
      musicPlayer.classList.remove('expanded');
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (!musicPlayer.contains(e.target)) {
      musicPlayer.classList.remove('expanded');
    }
  }, { passive: true });

  // ===== VOLUME CONTROL =====
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      const vol = parseFloat(e.target.value);
      bgMusic.volume = vol;
      localStorage.setItem('bgMusicVolume', vol);
    });

    // Prevent player from collapsing while dragging slider
    volumeSlider.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    volumeSlider.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  // ===== UI UPDATE =====
  function updatePlayingUI(isPlaying) {
    if (isPlaying) {
      musicPlayer.classList.add('playing');
      musicIcon.textContent = '🎵';
    } else {
      musicPlayer.classList.remove('playing');
      musicIcon.textContent = '🔇';
    }
  }

  // ===== LOOP =====
  // audio tag မှာ 'loop' attribute ရှိပြီးသား — သီချင်းဆုံးရင် ပြန်စ
  // Refresh လုပ်ရင် အစကနေ ပြန်စ — localStorage မသိမ်း

  // Initial UI state
  updatePlayingUI(!bgMusic.paused);
}

// ===== VISIT TRACKER =====
// Page ဝင်တိုင်း Formspree ဆီ notification ပို့
(function trackVisit() {
  // Session check — တစ်ခါ ဝင်ပြီး refresh လုပ်ရင် ထပ်မပို့
  const sessionKey = 'visitTracked_' + new Date().toDateString();
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, 'true');

  // Collect info
  const visitData = {
    time: new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Yangon',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? '📱 Mobile' : '💻 Desktop',
    browser: navigator.userAgent.includes('Chrome') ? 'Chrome' :
             navigator.userAgent.includes('Safari') ? 'Safari' :
             navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other',
    language: navigator.language || 'unknown',
    screen: window.screen.width + 'x' + window.screen.height,
    referrer: document.referrer || 'direct'
  };

  // Send to Formspree
  fetch('https://formspree.io/f/xaeqpplk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(visitData)
  }).catch(() => {
    // Silent fail — don't break the site
  });
})();