function sortTable(table, target) {
  const header = table.querySelector('thead tr');
  const rows = Array.from(table.querySelectorAll('tbody tr'));

  const index = Array.from(header.children).indexOf(target);
  const isDescending = target.dataset.order === 'desc';

  rows.sort((a, b) => {
    const aValue = new Date(a.children[index].textContent);
    const bValue = new Date(b.children[index].textContent);

    return isDescending ? bValue - aValue : aValue - bValue;
  });

  table.querySelector('tbody').append(...rows);

  header.querySelectorAll('[data-order]').forEach((element) => {
    element.removeAttribute('data-order');
    const button = element.querySelector('button');
    button.textContent = '-';
  });

  target.dataset.order = isDescending ? 'asc' : 'desc';
  const button = target.querySelector('button');
  button.textContent = isDescending ? '↑' : '↓';
}

function makeTableSortable(table) {
  const dateTh = table.querySelector('thead tr th:first-child');

  const button = document.createElement('button');
  button.textContent = '-';
  button.addEventListener('click', () => sortTable(table, dateTh));
  dateTh.append(button);
  sortTable(table, dateTh);
}

document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('table');

  if (table) {
    makeTableSortable(table);
  }
});
