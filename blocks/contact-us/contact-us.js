export default function decorate(block) {
  const rows = [...block.children];

  const contacts = rows.slice(0, 3).map((row) => {
    const cells = [...row.children];
    return {
      title: cells[0]?.textContent.trim() || '',
      details: cells[1]?.textContent.trim() || '',
      icon: cells[2]?.textContent.trim() || '●',
    };
  });

  block.textContent = '';

  const layout = document.createElement('div');
  layout.className = 'contact-layout';

  const sidebar = document.createElement('div');
  sidebar.className = 'contact-sidebar';

  contacts.forEach((contact) => {
    const card = document.createElement('div');
    card.className = 'contact-info-card';

    const icon = document.createElement('span');
    icon.className = 'contact-info-icon';
    icon.textContent = contact.icon;

    const content = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = contact.title;

    const details = document.createElement('p');
    details.textContent = contact.details;

    content.append(title, details);
    card.append(icon, content);
    sidebar.append(card);
  });

  const formArea = document.createElement('div');
  formArea.className = 'contact-form-area';

  const heading = document.createElement('h2');
  heading.textContent = 'If you have any problem, please contact us';

  const form = document.createElement('form');
  form.className = 'contact-form';

  const fields = [
    { name: 'name', placeholder: 'Name', type: 'text', required: true },
    { name: 'phone', placeholder: 'Phone', type: 'tel' },
    { name: 'email', placeholder: 'Email', type: 'email', required: true },
    { name: 'subject', placeholder: 'Subject', type: 'text' },
  ];

  fields.forEach((field) => {
    const input = document.createElement('input');
    input.type = field.type;
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.setAttribute('aria-label', field.placeholder);
    input.required = Boolean(field.required);
    form.append(input);
  });

  const message = document.createElement('textarea');
  message.name = 'message';
  message.placeholder = 'Message';
  message.setAttribute('aria-label', 'Message');
  message.rows = 5;
  message.required = true;

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Submit Request';

  form.append(message, submit);
  formArea.append(heading, form);
  layout.append(sidebar, formArea);
  block.append(layout);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Connect this form to a backend or form service
    // before collecting or sending submissions.
    alert('The form layout is ready. Submission service is not configured yet.');
  });
}