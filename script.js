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


// ===== CHAT BUBBLE REVEAL (Sequential) =====
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


// ===== TAKE A BREAK =====
const breakMessages = [
  "ရေသောက်ပြီးပြီလား? 💧",
  "မျက်စိလေးခဏနားပေးနော် 🤍",
  "ဒီနေ့လည်း ကြိုးစားခဲ့တယ်။",
  "ခဏလေးပဲဖြစ်ဖြစ် နားပါဦး။",
  "မင်းကိုယ်မင်းလည်း ဂရုစိုက်ဦးနော်။",
  "အသက်ပြင်းပြင်းရှူပြီး ခဏနားလိုက်နော် 🌷",
  "ဒီနေ့က မင်းအတွက်ပါ။",
  "မင်းရဲ့အပြုံးလေးက လှတယ်။",
  "အနားယူဖို့ မမေ့နဲ့နော်။"
];

const breakBtn = document.getElementById('breakBtn');
const breakMessage = document.getElementById('breakMessage');

if (breakBtn) {
  let lastIndex = -1;
  breakBtn.addEventListener('click', () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * breakMessages.length);
    } while (randomIndex === lastIndex && breakMessages.length > 1);
    lastIndex = randomIndex;

    breakMessage.textContent = breakMessages[randomIndex];
    breakMessage.classList.remove('show');
    void breakMessage.offsetWidth;
    breakMessage.classList.add('show');

    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  });
}


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