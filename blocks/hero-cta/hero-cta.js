
export default function decorate(block) {
  const rows = [...block.children];

  const eyebrow = rows[0]?.textContent.trim() || '';
  const heading = rows[1]?.textContent.trim() || '';
  const link = rows[2]?.querySelector('a');
  const image = rows[3]?.querySelector('img');

  const banner = document.createElement('div');
  banner.className = 'hero-cta-content';

  const copy = document.createElement('div');
  copy.className = 'hero-cta-copy';

  const label = document.createElement('p');
  label.className = 'hero-cta-eyebrow';
  label.textContent = eyebrow;

  const title = document.createElement('h1');
  title.textContent = heading;

  copy.append(label, title);
  banner.append(copy);

  if (link) {
    const button = document.createElement('a');
    button.className = 'hero-cta-button';
    button.href = link.href;
    button.textContent = link.textContent.trim();
    banner.append(button);
  }

  if (image) {
    block.style.setProperty(
      '--hero-cta-background',
      `url("${image.src}")`,
    );
    image.remove();
  }

  block.replaceChildren(banner);
}
