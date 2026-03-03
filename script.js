const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.querySelector('.progress-dots');
const navButtons = Array.from(document.querySelectorAll('.nav-link'));
const prevBtn = document.querySelector('.arrow-btn.prev');
const nextBtn = document.querySelector('.arrow-btn.next');

let currentIndex = 0;

function createDots(count) {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.index = String(i);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function syncActiveStates() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  document
    .querySelectorAll('.dot')
    .forEach((dot, index) =>
      dot.classList.toggle('is-active', index === currentIndex)
    );

  navButtons.forEach((btn) => {
    const target = Number(btn.dataset.slide);
    btn.classList.toggle('is-active', target === currentIndex);
  });
}

function goToSlide(index) {
  const total = slides.length;
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;
  currentIndex = index;
  syncActiveStates();
}

function handleKeydown(e) {
  if (e.key === 'ArrowRight') {
    goToSlide(currentIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    goToSlide(currentIndex - 1);
  }
}

function init() {
  if (!slides.length) return;
  createDots(slides.length);

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.slide);
      goToSlide(index);
    });
  });

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  document.addEventListener('keydown', handleKeydown);

  syncActiveStates();
}

document.addEventListener('DOMContentLoaded', init);

