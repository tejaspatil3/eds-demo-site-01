
export default function decorate(block) {
  const rows = [...block.children];
  const getCells = (row) => [...row.children];

  const heading = getCells(rows[0] || document.createElement('div'))[0];
  const description = getCells(rows[1] || document.createElement('div'))[0];
  const categories = getCells(rows[2] || document.createElement('div'))[0]
    ?.textContent.split(',').map((item) => item.trim()).filter(Boolean) || [];

  const section = document.createElement('div');
  section.className = 'gallery-content';

  const intro = document.createElement('div');
  intro.className = 'gallery-intro';

  const title = document.createElement('h2');
  title.textContent = heading?.textContent.trim() || 'Our Support Gallery';

  const desc = document.createElement('p');
  desc.textContent = description?.textContent.trim() || '';

  intro.append(title, desc);

  const filters = document.createElement('div');
  filters.className = 'gallery-filters';

  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  const cards = rows.slice(3).map((row) => {
    const cells = getCells(row);
    const image = cells[0]?.querySelector('img');
    const cardTitle = cells[1]?.textContent.trim() || '';
    const category = cells[2]?.textContent.trim() || '';

    if (!image) return null;

    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.dataset.category = category.toLowerCase();

    const picture = document.createElement('div');
    picture.className = 'gallery-image';

    const img = image.cloneNode(true);
    img.loading = 'lazy';
    img.alt = image.alt || cardTitle;
    picture.append(img);

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';

    const icon = document.createElement('span');
    icon.className = 'gallery-overlay-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>';

    const text = document.createElement('div');
    text.className = 'gallery-overlay-text';

    const name = document.createElement('h3');
    name.textContent = cardTitle;

    const type = document.createElement('p');
    type.textContent = category;

    text.append(name, type);
    overlay.append(icon, text);
    picture.append(overlay);
    card.append(picture);

    return card;
  }).filter(Boolean);

  const filterNames = ['All Work', ...categories];

  filterNames.forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-filter';
    button.textContent = category;
    button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

    if (index === 0) button.classList.add('active');

    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        card.hidden = index !== 0
          && card.dataset.category !== category.toLowerCase();
      });
    });

    filters.append(button);
  });

  grid.append(...cards);
  section.append(intro, filters, grid);
  block.replaceChildren(section);
}
