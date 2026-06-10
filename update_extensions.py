import os
import re

files_to_update = ['index.html', 'shop.html', 'main.js']

for filename in files_to_update:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace occurrences in assets path
        content = re.sub(r'(assets/[a-zA-Z0-9_\-]+)\.(jpg|png)', r'\1.webp', content)
        
        # For hero image preload
        if filename == 'index.html':
            if '<link rel="preload"' not in content:
                preload_tag = '    <link rel="preload" as="image" href="assets/hero_bg.webp">\n'
                content = content.replace('    <link rel="stylesheet" href="styles.css">', preload_tag + '    <link rel="stylesheet" href="styles.css">')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
