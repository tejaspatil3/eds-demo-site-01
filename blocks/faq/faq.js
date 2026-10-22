
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const firstRow = [...rows[0].children];

  const image = firstRow[0]?.querySelector('img');
  const heading = firstRow[1]?.textContent.trim() || '';
  const description = firstRow[2]?.textContent.trim() || '';

  const faqs = rows.map((row) => {
    const cells = [...row.children];

    return {
      question: cells[3]?.textContent.trim() || '',
      answer: cells[4]?.innerHTML.trim() || '',
    };
  }).filter((item) => item.question);

  block.textContent = '';

  const layout = document.createElement('div');
  layout.className = 'faq-layout';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'faq-image';

  if (image) {
    const picture = document.createElement('picture');
    const img = document.createElement('img');

    img.src = image.src;
    img.alt = image.alt || 'FAQ illustration';
    img.loading = 'lazy';

    picture.append(img);
    imageContainer.append(picture);
  }

  const content = document.createElement('div');
  content.className = 'faq-content';

  const label = document.createElement('p');
  label.className = 'faq-label';
  label.textContent = 'Faq';

  const title = document.createElement('h2');
  title.textContent = heading;

  const intro = document.createElement('p');
  intro.className = 'faq-description';
  intro.textContent = description;

  const accordion = document.createElement('div');
  accordion.className = 'faq-accordion';

  faqs.forEach((item) => {
    const details = document.createElement('details');
    details.className = 'faq-item';

    const summary = document.createElement('summary');
    summary.textContent = item.question;

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.innerHTML = item.answer;

    details.append(summary, answer);
    accordion.append(details);
  });

  content.append(label, title, intro, accordion);
  layout.append(imageContainer, content);
  block.append(layout);
}