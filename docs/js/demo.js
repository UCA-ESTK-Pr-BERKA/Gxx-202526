/* docs/js/demo.js — Logique de démonstration statique (Améliorée) */

// ── Menu Hamburger ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Stockage local (LocalStorage) ───────────────────────────
// Récupère les données sauvegardées ou utilise une liste par défaut
let items = JSON.parse(localStorage.getItem('flask_app_items')) || [
  { id: 1, title: 'Exemple A', description: 'Ceci est un élément de démo stocké localement.', created_at: new Date().toISOString() },
  { id: 2, title: 'Exemple B', description: 'Vos données restent ici même après actualisation !', created_at: new Date().toISOString() },
];
let nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

function saveToLocal() {
  localStorage.setItem('flask_app_items', JSON.stringify(items));
}

// ── Références DOM ──────────────────────────────────────────
const itemForm  = document.getElementById('item-form');
const itemList  = document.getElementById('item-list');
const itemCount = document.getElementById('item-count');
const itemTitle = document.getElementById('item-title');
const itemDesc  = document.getElementById('item-desc');

function updateCount() {
  if (itemCount) itemCount.textContent = items.length;
}

function syncEmptyState() {
  let empty = document.getElementById('empty-state');
  if (items.length === 0) {
    if (!empty) {
      empty = document.createElement('li');
      empty.id = 'empty-state';
      empty.className = 'empty-state';
      empty.textContent = 'Aucun élément pour le moment. Ajoutez-en un !';
      itemList.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

function buildItemElement(item) {
  const li = document.createElement('li');
  li.className = 'item fade-in';
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
  // Affichage de la date au format français
  ts.textContent = new Date(item.created_at).toLocaleString('fr-FR');
  body.appendChild(ts);

  const btn = document.createElement('button');
  btn.className = 'btn btn-danger btn-sm delete-btn';
  btn.dataset.id = item.id;
  btn.textContent = '✕';
  btn.setAttribute('aria-label', `Supprimer ${item.title}`);

  li.appendChild(body);
  li.appendChild(btn);
  return li;
}

function renderAll() {
  if (!itemList) return;
  itemList.innerHTML = '';
  items.forEach(item => itemList.appendChild(buildItemElement(item)));
  syncEmptyState();
  updateCount();
  saveToLocal();
}

// ── Ajouter un élément ──────────────────────────────────────
if (itemForm) {
  itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = itemTitle.value.trim();
    const description = itemDesc ? itemDesc.value.trim() : '';

    if (title.length < 2) {
      alert("Le titre doit contenir au moins 2 caractères !");
      return;
    }

    const item = { 
      id: nextId++, 
      title, 
      description, 
      created_at: new Date().toISOString() 
    };
    
    items.unshift(item);
    renderAll();
    itemForm.reset();
  });
}

// ── Supprimer un élément ────────────────────────────────────
if (itemList) {
  itemList.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-btn');
    if (!btn) return;
    
    const id = Number(btn.dataset.id);
    if (confirm('Voulez-vous vraiment supprimer cet élément ?')) {
      items = items.filter(i => i.id !== id);
      renderAll();
    }
  });

  // Premier rendu au chargement
  renderAll();
}
