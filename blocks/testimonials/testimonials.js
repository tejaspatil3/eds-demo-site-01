
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'testimonials-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 5) return;

    const sourceImage = cells[0].querySelector('picture, img');
    const name = cells[1].textContent.trim();
    const role = cells[2].textContent.trim();
    const rating = Math.max(
      0,
      Math.min(5, Number(cells[3].textContent.trim()) || 0),
    );
    const review = cells[4].textContent.trim();

    const card = document.createElement('article');
    card.className = 'testimonial-card';

    const header = document.createElement('div');
    header.className = 'testimonial-header';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'testimonial-photo-wrap';

    if (sourceImage) {
      const picture = sourceImage.closest('picture');
      const photo = picture
        ? picture.cloneNode(true)
        : sourceImage.cloneNode(true);

      const img = photo.matches('img') ? photo : photo.querySelector('img');

      if (img) {
        img.className = 'testimonial-photo';
        img.alt = name;
        img.loading = 'lazy';
        img.width = 66;
        img.height = 66;
        photoWrap.append(photo);
      }
    }

    const details = document.createElement('div');
    details.className = 'testimonial-details';

    const person = document.createElement('h3');
    person.textContent = name;

    const designation = document.createElement('p');
    designation.className = 'testimonial-role';
    designation.textContent = role;

    details.append(person, designation);
    header.append(photoWrap, details);

    const ratingRow = document.createElement('div');
    ratingRow.className = 'testimonial-rating';
    ratingRow.setAttribute('aria-label', `${rating} out of 5 stars`);

    const stars = document.createElement('span');
    stars.className = 'testimonial-stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const label = document.createElement('span');
    label.className = 'testimonial-rating-label';
    label.textContent = rating === 5 ? 'Excellent' : rating >= 4 ? 'Very Good' : rating >= 3 ? 'Good' : 'Rated';

    ratingRow.append(stars, label);

    const text = document.createElement('p');
    text.className = 'testimonial-review';
    text.textContent = review;

    card.append(header, ratingRow, text);
    grid.append(card);
  });

  block.replaceChildren(grid);
}
