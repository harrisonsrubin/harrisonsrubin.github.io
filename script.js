// Nav border on scroll
const nav = document.getElementById('nav');
const heroScroll = document.getElementById('heroScroll');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  if (heroScroll) heroScroll.classList.toggle('hidden', y > 80);
}, { passive: true });

// Generic scroll-reveal for .reveal elements
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Timeline stagger
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.timeline-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), i * 100);
      });
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

const timeline = document.querySelector('.timeline');
if (timeline) timelineObserver.observe(timeline);

// Article cards stagger (inline-style only, no CSS class conflict)
const articleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.article-card').forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      });
      articleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

const writingGrid = document.querySelector('.writing-grid');
if (writingGrid) {
  writingGrid.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
  });
  articleObserver.observe(writingGrid);
}
