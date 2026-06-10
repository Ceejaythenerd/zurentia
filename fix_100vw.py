
import os

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all 100vw with 100% where it's used for width, unless it's a known full-bleed pseudo element.
# Actually, the safest way to prevent horizontal scroll from 100vw is to add overflow-x: hidden to html as well.
if 'html {' not in content:
    content = 'html { overflow-x: hidden; }\n' + content
elif 'overflow-x: hidden;' not in content.split('html {')[1].split('}')[0]:
    content = content.replace('html {', 'html {\n    overflow-x: hidden;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed HTML overflow')

