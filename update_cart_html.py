import os

files = ['index.html', 'shop.html', 'faq.html', 'shipping.html', 'terms.html', 'privacy.html']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Update Cart Header
        old_header = '<button class="cart-close" id="cart-close" aria-label="Close cart">&times;</button>'
        new_header = '<div style="display: flex; gap: 15px; align-items: center;"><button id="clear-cart-btn" style="background: none; border: none; font-size: 0.8rem; text-decoration: underline; color: var(--clr-text-muted); cursor: pointer; padding: 0;">Empty</button><button class="cart-close" id="cart-close" aria-label="Close cart">&times;</button></div>'
        content = content.replace(old_header, new_header)
        
        # 2. Add Order Notes
        old_address = '<textarea id="customer-address" rows="3" placeholder="123 Main St..."></textarea>\n                    </div>'
        new_address = '<textarea id="customer-address" rows="3" placeholder="123 Main St..."></textarea>\n                    </div>\n                    <div class="form-group">\n                        <label for="customer-notes">Order Notes (Optional)</label>\n                        <textarea id="customer-notes" rows="2" placeholder="Gift wrapping, special instructions..."></textarea>\n                    </div>'
        content = content.replace(old_address, new_address)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
