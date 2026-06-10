import os
import re

# Update index.html products
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

if 'class="product-rating"' not in content:
    content = re.sub(r'(<h3>.*?</h3>)', r'\1\n                    <div class="product-rating"><span class="stars">★★★★★</span><span class="count">(24)</span></div>', content)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

# Update main.js
with open('main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 1. Update Keep Shopping button in Empty Cart
old_empty_cart = '<p class="empty-cart-msg" style="margin-top: 0.5rem;">Your bag is currently empty.</p>'
new_empty_cart = '<p class="empty-cart-msg" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">Your bag is currently empty.</p><a href="shop.html" class="btn btn-primary" style="display: block; text-align: center; max-width: 200px; margin: 0 auto;" onclick="document.getElementById(\'cart-close\').click();">KEEP SHOPPING</a>'
js_content = js_content.replace(old_empty_cart, new_empty_cart)

# 2. Update renderShopProducts with Star Ratings
old_card_html = '''        card.innerHTML = `
            <div class="product-image">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <h3>${p.name.toUpperCase()}.</h3>
            <p class="price">R ${p.price}</p>
            <button class="btn btn-primary smart-add-btn" data-id="${p.id}">ADD TO CART</button>
        `;'''

new_card_html = '''        const starCount = Math.floor(Math.random() * 40) + 12;
        card.innerHTML = `
            <div class="product-image">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <h3>${p.name.toUpperCase()}.</h3>
            <div class="product-rating"><span class="stars">★★★★★</span><span class="count">(${starCount})</span></div>
            <p class="price">R ${p.price}</p>
            <button class="btn btn-primary smart-add-btn" data-id="${p.id}">ADD TO CART</button>
        `;'''

if 'product-rating' not in js_content:
    js_content = js_content.replace(old_card_html, new_card_html)

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Updated Stars and Cart.')
