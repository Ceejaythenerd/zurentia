import os

files = ['index.html', 'shop.html', 'faq.html', 'shipping.html', 'terms.html', 'privacy.html']

whatsapp_html = '''
    <!-- WhatsApp Float Widget -->
    <a href="https://wa.me/27730908780" class="whatsapp-float" target="_blank" aria-label="Chat with us on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </a>
'''

newsletter_html = '''
    <!-- Newsletter Section -->
    <section class="newsletter-section">
        <div class="container text-center">
            <h2>Subscribe for 10% Off</h2>
            <p>Join our botanical community and receive exclusive offers, wellness tips, and early access to new releases.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing to Zurentia!');">
                <input type="email" placeholder="Enter your email address" required>
                <button type="submit" class="btn btn-primary">SUBSCRIBE</button>
            </form>
        </div>
    </section>
'''

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'newsletter-section' not in content:
            content = content.replace('<footer class="site-footer">', newsletter_html + '\n    <footer class="site-footer">')
        
        if 'whatsapp-float' not in content:
            content = content.replace('</body>', whatsapp_html + '\n</body>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated HTML in {file}')
