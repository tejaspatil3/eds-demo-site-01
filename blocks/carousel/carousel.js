export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Create a viewport container for the carousel
  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  rows.forEach((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (index === 0) slide.classList.add('active');

    // Move row contents into the slide
    while (row.firstElementChild) {
      slide.appendChild(row.firstElementChild);
    }
    track.appendChild(slide);
    row.remove();
  });

  viewport.appendChild(track);
  block.textContent = '';
  block.appendChild(viewport);

  // Add indicators and navigation if there are multiple slides
  if (rows.length > 1) {
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-indicators';

    rows.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = 'carousel-indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);

      indicator.addEventListener('click', () => {
        updateSlide(index);
      });

      navContainer.appendChild(indicator);
    });

    block.appendChild(navContainer);

    let currentIndex = 0;
    const slides = [...track.children];
    const indicators = [...navContainer.children];

    function updateSlide(newIndex) {
      slides[currentIndex].classList.remove('active');
      indicators[currentIndex].classList.remove('active');

      currentIndex = newIndex;

      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
}