import os

files = ['index.html', 'shop.html', 'faq.html', 'shipping.html', 'terms.html', 'privacy.html']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        old_button = '<button id="clear-cart-btn" style="width: 100%; background: none; border: none; font-size: 0.85rem; text-decoration: underline; color: var(--clr-text-muted); cursor: pointer; padding: 0.5rem 0; display: block; text-align: center;">Empty Cart</button>'
        new_button = '<button id="clear-cart-btn" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem;">EMPTY CART</button>'
        content = content.replace(old_button, new_button)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
