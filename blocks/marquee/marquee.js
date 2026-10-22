
export default function decorate(block) {
  const isLogos = block.classList.contains('logos');
  const rows = [...block.children];
  const track = document.createElement('div');
  track.className = 'marquee-track';

  const group = document.createElement('div');
  group.className = 'marquee-group';

  if (isLogos) {
    rows.forEach((row) => {
      const source = row.querySelector('picture, img');
      if (!source) return;

      const item = document.createElement('div');
      item.className = 'marquee-logo';
      item.append(source.cloneNode(true));

      const img = item.querySelector('img');
      if (img) img.alt = img.alt || 'Logo';

      group.append(item);
    });

    if (!group.children.length) return;
  } else {
    const text = rows.map((row) => row.textContent.trim())
      .filter(Boolean).join(' ').replace(/\s+/g, ' ');

    if (!text) return;

    for (let i = 0; i < 6; i += 1) {
      const item = document.createElement('span');
      item.className = 'marquee-item';
      item.textContent = text;
      group.append(item);
    }
  }

  const clone = group.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');

  track.append(group, clone);
  block.replaceChildren(track);
}
