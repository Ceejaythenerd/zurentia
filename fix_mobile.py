
import os

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix grids
content = content.replace('minmax(200px, 1fr)', 'minmax(min(100%, 200px), 1fr)')
content = content.replace('minmax(280px, 1fr)', 'minmax(min(100%, 280px), 1fr)')

# Fix footer links on mobile
if '.footer-links {' in content and 'flex-direction: column;' not in content.split('@media (max-width: 900px) {')[1]:
    # We will append mobile fixes for footer links and other potential overflowers
    content += '''
@media (max-width: 480px) {
    .footer-links {
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }
    .hero-text-box h1 {
        font-size: 2.5rem;
    }
}
'''

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed grid overflows and footer')

