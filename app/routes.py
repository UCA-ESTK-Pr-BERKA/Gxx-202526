from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from . import db
from .models import Item

main = Blueprint('main', __name__)


@main.route('/')
def index():
    items = Item.query.order_by(Item.created_at.desc()).all()
    return render_template('index.html', items=items)


@main.route('/about')
def about():
    return render_template('about.html')


# ---------- API endpoints (consumed by JavaScript) ----------

@main.route('/api/items', methods=['GET'])
def api_get_items():
    items = Item.query.order_by(Item.created_at.desc()).all()
    return jsonify([item.to_dict() for item in items])


@main.route('/api/items', methods=['POST'])
def api_create_item():
    data = request.get_json()
    if not data or not data.get('title'):
        return jsonify({'error': 'title is required'}), 400
    item = Item(title=data['title'], description=data.get('description', ''))
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@main.route('/api/items/<int:item_id>', methods=['DELETE'])
def api_delete_item(item_id):
    item = db.session.get(Item, item_id)
    if item is None:
        return jsonify({'error': 'not found'}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'deleted'}), 200
