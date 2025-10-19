// Simple lightbox for gallery images
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery .thumb').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lb.classList.add('show');
    lb.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox(){
  lb.classList.remove('show');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
