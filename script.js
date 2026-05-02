// Password Protection
const PASSWORD = 'pierre';

const passwordModal = document.getElementById('passwordModal');
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const siteContent = document.getElementById('siteContent');

// Check if already authenticated in this session
function initAuth() {
  const isAuthenticated = sessionStorage.getItem('weddingAuth');
  if (isAuthenticated) {
    unlockSite();
  } else {
    passwordModal.classList.add('active');
    passwordInput.focus();
  }
}

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = passwordInput.value;

  if (input === PASSWORD) {
    sessionStorage.setItem('weddingAuth', 'true');
    unlockSite();
  } else {
    passwordError.textContent = 'Incorrect password. Please try again.';
    passwordError.classList.add('show');
    passwordInput.value = '';
    passwordInput.focus();
    setTimeout(() => {
      passwordError.classList.remove('show');
    }, 3000);
  }
});

function unlockSite() {
  passwordModal.classList.add('hidden');
  setTimeout(() => {
    passwordModal.style.display = 'none';
  }, 300);
  siteContent.classList.remove('hidden');
}

// Navigation between sections
const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.section-content');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;

    // Remove active state from all buttons and hide all sections
    navButtons.forEach((btn) => btn.classList.remove('active'));
    sections.forEach((section) => section.classList.add('hidden'));

    // Add active state to clicked button and show target section
    button.classList.add('active');
    document.getElementById(targetSection).classList.remove('hidden');
  });
});

// FAQ Accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.faq-item');
    faqItem.classList.toggle('open');
  });
});

// Gallery / Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

const galleryImages = document.querySelectorAll('.clickable');

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

// Initialize authentication on page load
initAuth();
