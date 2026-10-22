import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isTeam = block.classList.contains('team');
  const isNews = block.classList.contains('news');
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    [...li.children].forEach((div, index) => {
      const image = div.querySelector('picture');

      if (div.children.length === 1 && image) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';

        if (isTeam) {
          if (index === 1) div.classList.add('team-name');
          if (index === 2) div.classList.add('team-role');

          if (index === 3) {
            div.classList.add('team-socials');

            [...div.querySelectorAll('a')].forEach((link) => {
              const label = link.textContent.trim()
                || link.querySelector('img')?.alt
                || 'Social link';

              link.setAttribute('aria-label', label);
              link.setAttribute('title', label);
            });
          }
        }
      }
    });

    if (isTeam) {
      li.classList.add('team-card');
    }

    if (isNews) {
      li.classList.add('news-card');

      const image = li.querySelector('.cards-card-image');
      const bodies = [...li.querySelectorAll('.cards-card-body')];

      if (image && bodies.length >= 4) {
        const category = bodies[0];
        category.classList.add('news-category');
        image.append(category);

        bodies[1].classList.add('news-title');
        bodies[2].classList.add('news-description');
        bodies[3].classList.add('news-link');
      }
    }

    ul.append(li);
  });

  ul.querySelectorAll('.cards-card-image picture > img').forEach((img) => {
    const picture = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }],
    );

    img.closest('picture').replaceWith(picture);
  });

  block.replaceChildren(ul);
}
