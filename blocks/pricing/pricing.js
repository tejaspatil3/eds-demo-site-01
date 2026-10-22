
export default function decorate(block) {
  const rows = [...block.children];
  const getCells = (row) => [...row.children];

  const headingCell = getCells(rows[0] || document.createElement('div'))[0];
  const descriptionCell = getCells(rows[1] || document.createElement('div'))[0];

  const section = document.createElement('div');
  section.className = 'pricing-content';

  const intro = document.createElement('div');
  intro.className = 'pricing-intro';

  const heading = document.createElement('h2');
  heading.textContent = headingCell?.textContent.trim() || '';

  const description = document.createElement('p');
  description.textContent = descriptionCell?.textContent.trim() || '';

  intro.append(heading, description);

  const grid = document.createElement('div');
  grid.className = 'pricing-grid';

  rows.slice(2).forEach((row) => {
    const cells = getCells(row);
    if (cells.length < 5) return;

    const planName = cells[0].textContent.trim();
    const priceText = cells[1].textContent.trim();
    const billingText = cells[2].textContent.trim();

    if (
      planName.toLowerCase() === 'plan name'
      || priceText.toLowerCase() === 'price'
    ) return;

    const card = document.createElement('article');
    card.className = 'pricing-card';

    const plan = document.createElement('h3');
    plan.textContent = planName;

    const price = document.createElement('div');
    price.className = 'pricing-price';

    const amount = document.createElement('span');
    amount.className = 'pricing-amount';
    amount.textContent = priceText;

    const period = document.createElement('span');
    period.className = 'pricing-period';
    period.textContent = billingText;

    price.append(amount, period);

    const features = document.createElement('ul');
    features.className = 'pricing-features';

    const featureNodes = cells[3].querySelectorAll('li, p');

    featureNodes.forEach((node) => {
      const text = node.textContent.trim();
      if (!text) return;

      const item = document.createElement('li');
      item.textContent = text;
      features.append(item);
    });

    const link = cells[4].querySelector('a');
    let button;

    if (link) {
      button = document.createElement('a');
      button.className = 'pricing-button';
      button.href = link.href;
      button.textContent = link.textContent.trim() || 'Read More';
    } else {
      const linkText = cells[4].textContent.trim();

      if (linkText) {
        button = document.createElement('a');
        button.className = 'pricing-button';
        button.href = '#';
        button.textContent = linkText;
      }
    }

    card.append(plan, price, features);

    if (button) card.append(button);

    grid.append(card);
  });

  section.append(intro, grid);
  block.replaceChildren(section);
}
