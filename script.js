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