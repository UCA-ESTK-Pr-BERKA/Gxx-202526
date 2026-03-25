/* docs/js/demo.js — static demo logic (no backend) */

// ── Hamburger ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── In-memory item store ──────────────────────────────────────
let items = [
  { id: 1, title: 'Sample item A', description: 'This is a demo item stored in memory.', created_at: new Date().toISOString() },
  { id: 2, title: 'Sample item B', description: 'In the real app items are persisted to SQLite.', created_at: new Date().toISOString() },
];
let nextId = 3;

// ── DOM refs ─────────────────────────────────────────────────
const itemForm  = document.getElementById('item-form');
const itemList  = document.getElementById('item-list');
const itemCount = document.getElementById('item-count');
const itemTitle = document.getElementById('item-title');
const itemDesc  = document.getElementById('item-desc');

function updateCount() {
  if (itemCount) itemCount.textContent = itemList.querySelectorAll('.item').length;
}

function syncEmptyState() {
  const hasItems = itemList.querySelector('.item') !== null;
  let empty = document.getElementById('empty-state');
  if (!hasItems) {
    if (!empty) {
      empty = document.createElement('li');
      empty.id = 'empty-state';
      empty.className = 'empty-state';
      empty.textContent = 'No items yet. Add one above!';
      itemList.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

function buildItemElement(item) {
  const li = document.createElement('li');
  li.className = 'item';
  li.dataset.id = item.id;

  const body = document.createElement('div');
  body.className = 'item-body';

  const strong = document.createElement('strong');
  strong.textContent = item.title;
  body.appendChild(strong);

  if (item.description) {
    const p = document.createElement('p');
    p.textContent = item.description;
    body.appendChild(p);
  }

  const ts = document.createElement('small');
  ts.className = 'timestamp';
  ts.textContent = new Date(item.created_at).toLocaleString();
  body.appendChild(ts);

  const btn = document.createElement('button');
  btn.className = 'btn btn-danger btn-sm delete-btn';
  btn.dataset.id = item.id;
  btn.textContent = '✕';
  btn.setAttribute('aria-label', `Delete ${item.title}`);

  li.appendChild(body);
  li.appendChild(btn);
  return li;
}

function renderAll() {
  itemList.innerHTML = '';
  items.forEach(item => itemList.appendChild(buildItemElement(item)));
  syncEmptyState();
  updateCount();
}

// ── Add item ─────────────────────────────────────────────────
if (itemForm) {
  itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title       = itemTitle.value.trim();
    const description = itemDesc ? itemDesc.value.trim() : '';
    if (!title) return;

    const item = { id: nextId++, title, description, created_at: new Date().toISOString() };
    items.unshift(item);
    renderAll();
    itemForm.reset();
  });
}

// ── Delete item (event delegation) ─────────────────────────
if (itemList) {
  itemList.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (!confirm('Delete this item?')) return;
    items = items.filter(i => i.id !== id);
    renderAll();
  });

  // Initial render
  renderAll();
}
