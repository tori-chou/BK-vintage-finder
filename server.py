from flask import Flask, render_template, request, jsonify, redirect, url_for
from data import data

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html', data=data)   

@app.route('/search', methods=["GET", "POST"])
def results():
    query = request.args.get("query", "").strip().lower()
    results = []
    for store in data:
        if query in store["title"].lower() or query in store["desc"].lower() or query in store["address"].lower():
            results.append(store)
    num_results = len(results)
    return render_template('search_results.html', query=query, results=results, num_results=num_results)  

@app.route('/view/<int:item_id>')
def view_item(item_id):
    item = next((store for store in data if store["id"] == item_id), None)
    if not item:
        return "Item not found", 404
    return render_template("view.html", item=item)

@app.route('/add_item', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        item = request.get_json()

        title = item.get('title', '').strip()
        desc = item.get('desc', '').strip()
        img = item.get('img', '').strip()
        agg_rating = item.get('agg_rating')
        address = item.get('address', '').strip()
        notes = item.get('notes', '').strip()
        reviews = item.get('reviews', [])

        if not title or not desc or not img or not agg_rating or not address or not notes:
            return jsonify({'error': 'All fields are required!'}), 400

        try:
            agg_rating = float(agg_rating) 
        except ValueError:
            return jsonify({'error': 'Rating must be a number!'}), 400

        new_item = {
            'id': len(data) + 1,
            'title': title,
            'desc': desc,
            'img': img,
            'agg_rating': agg_rating,
            'address': address,
            'notes': notes,
            'reviews': reviews
        }
        data.append(new_item)

        return jsonify({"message": "Store added successfully!", "item_id": new_item['id']})

    return render_template('add_item.html')

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_store(id):
    store = next((s for s in data if s["id"] == id), None)
    if not store:
        return "Store not found", 404
    
    if request.method == 'POST':
        req = request.get_json() 
        store["title"] = req["title"]
        store["desc"] = req["desc"]
        store["img"] = req["img"]
        store["agg_rating"] = float(req["agg_rating"])
        store["address"] = req["address"]
        store["notes"] = req["notes"]
        return jsonify({"message": "Store updated successfully!", "redirect_url": url_for('view_item', item_id=id)}), 200  # Send redirect URL

    return render_template('edit.html', store=store, store_id=id)

if __name__ == '__main__':
   app.run(debug = True, port=5001)