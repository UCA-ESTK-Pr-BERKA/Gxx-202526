/* main.js — client-side logic for FlaskApp template */

// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Item CRUD (only active on the index page) ─────────────────
const itemForm    = document.getElementById('item-form');
const itemList    = document.getElementById('item-list');
const itemCount   = document.getElementById('item-count');
const itemTitle   = document.getElementById('item-title');
const itemDesc    = document.getElementById('item-desc');

if (itemForm && itemList) {

  // --- Helper: update the counter badge ---
  function updateCount() {
    if (!itemCount) return;
    const items = itemList.querySelectorAll('.item');
    itemCount.textContent = items.length;
  }

  // --- Helper: show / hide empty state ---
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

  // --- Helper: create a list-item element ---
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
    ts.textContent = item.created_at
      ? new Date(item.created_at).toLocaleString()
      : '';
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

  // --- POST new item ---
  itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title       = itemTitle.value.trim();
    const description = itemDesc ? itemDesc.value.trim() : '';
    if (!title) return;

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to add item.');
        return;
      }

      const item = await res.json();
      const li   = buildItemElement(item);

      // Remove empty-state placeholder if present
      const empty = document.getElementById('empty-state');
      if (empty) empty.remove();

      itemList.prepend(li);
      updateCount();
      itemForm.reset();
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Network error – please try again.');
    }
  });

  // --- DELETE item (event delegation) ---
  itemList.addEventListener('click', async (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    if (!confirm('Delete this item?')) return;

    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to delete item.');
        return;
      }

      const li = itemList.querySelector(`.item[data-id="${id}"]`);
      if (li) li.remove();
      syncEmptyState();
      updateCount();
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Network error – please try again.');
    }
  });
}
