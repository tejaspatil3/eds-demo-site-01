export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length) {
    rows[0].classList.add('top-header-left');
    if (rows[1]) rows[1].classList.add('top-header-right');
  }
}