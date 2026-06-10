import os

files = ['index.html', 'shop.html', 'faq.html', 'shipping.html', 'terms.html', 'privacy.html']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Revert Cart Header
        old_header = '<div style="display: flex; gap: 15px; align-items: center;"><button id="clear-cart-btn" style="background: none; border: none; font-size: 0.8rem; text-decoration: underline; color: var(--clr-text-muted); cursor: pointer; padding: 0;">Empty</button><button class="cart-close" id="cart-close" aria-label="Close cart">&times;</button></div>'
        new_header = '<button class="cart-close" id="cart-close" aria-label="Close cart">&times;</button>'
        content = content.replace(old_header, new_header)
        
        # 2. Add Clear Cart under Proceed to Checkout
        old_footer = '<button class="btn btn-primary checkout-btn" id="go-to-checkout-btn">PROCEED TO CHECKOUT</button>\n            </div>'
        new_footer = '<button class="btn btn-primary checkout-btn" id="go-to-checkout-btn" style="margin-bottom: 0.5rem;">PROCEED TO CHECKOUT</button>\n                <button id="clear-cart-btn" style="width: 100%; background: none; border: none; font-size: 0.85rem; text-decoration: underline; color: var(--clr-text-muted); cursor: pointer; padding: 0.5rem 0; display: block; text-align: center;">Empty Cart</button>\n            </div>'
        content = content.replace(old_footer, new_footer)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
