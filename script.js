document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.testimonials-scroll');
  const track = document.querySelector('.testimonials-track');

  if (!wrapper || !track) return;

  const SCROLL_MULTIPLIER = 3;
  let horizontalDistance = 0;
  let verticalDistance = 0;

  function getSectionHeight() {
    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 72;
    return window.innerHeight - navHeight;
  }

  function setupTestimonialsScroll() {
    const sectionHeight = getSectionHeight();
    horizontalDistance = Math.max(track.scrollWidth - window.innerWidth, 0);
    verticalDistance = horizontalDistance * SCROLL_MULTIPLIER;
    wrapper.style.height = `${sectionHeight + verticalDistance}px`;
    updateTestimonialsScroll();
  }

  function updateTestimonialsScroll() {
    if (horizontalDistance === 0) {
      track.style.transform = 'translateX(0)';
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / verticalDistance, 0), 1);
    track.style.transform = `translateX(-${progress * horizontalDistance}px)`;
  }

  window.addEventListener('scroll', updateTestimonialsScroll, { passive: true });
  window.addEventListener('resize', setupTestimonialsScroll);

  setupTestimonialsScroll();
});
