# G38-202526 — Mini-project Template
## Group Links

- **GitHub Repository:** [https://github.com/UCA-ESTK-Pr-BERKA/G38-202526](https://github.com/UCA-ESTK-Pr-BERKA/G38-202526)
- **GitHub Pages:** [https://uca-estk-pr-berka.github.io/G38-202526/](https://uca-estk-pr-berka.github.io/G38-202526/)

A ready-to-use template for web development mini-projects that combines **Flask**, **SQL**, **JavaScript**, **HTML** and **CSS**.

> **GitHub Pages demo** → the `docs/` folder contains a fully static version of the site hosted on GitHub Pages — no server required. The full application (with a real database) is meant to be run locally.

---

## Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | Python · Flask · Flask-SQLAlchemy |
| Database | SQLite (via SQLAlchemy ORM)       |
| Frontend | Jinja2 templates · Vanilla JS     |
| Styling  | Custom CSS with CSS variables     |

---

## Project Structure

```
Gxx-202526/
├── app/
│   ├── __init__.py       # App factory (create_app)
│   ├── models.py         # SQLAlchemy models
│   ├── routes.py         # Blueprints & JSON API
│   ├── static/
│   │   ├── css/style.css # Styles
│   │   └── js/main.js    # Client-side JS
│   └── templates/
│       ├── base.html     # Base layout
│       ├── index.html    # Home page
│       └── about.html    # About page
├── docs/                 # GitHub Pages static demo
│   ├── index.html
│   ├── about.html
│   ├── css/style.css
│   └── js/demo.js
├── config.py             # Configuration (dev / prod)
├── run.py                # Application entry point
└── requirements.txt      # Python dependencies
```

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/UCA-ESTK-Pr-BERKA/G38-202526.git
cd G38-202526

# 2. Create & activate a virtual environment
python -m venv MPWeb
source MPWeb/bin/activate      # Windows: MPWeb\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run
python run.py

# 5. Visit http://127.0.0.1:5000
```

---

## API Endpoints

| Method | Path                  | Description            |
|--------|-----------------------|------------------------|
| GET    | `/api/items`          | List all items         |
| POST   | `/api/items`          | Create a new item      |
| DELETE | `/api/items/<id>`     | Delete an item by id   |

---

## GitHub Pages

The static demo is served from the `docs/` folder. Enable it in your repository settings under **Pages → Source → Deploy from branch → `main` / `docs`**.

