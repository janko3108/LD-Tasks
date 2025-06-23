document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.image-text-section');
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      section.classList.add('image-text-section--visible');
    }
  }, { threshold: 0.3 });

  observer.observe(section);
});
