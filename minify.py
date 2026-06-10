import re

def minify_css(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    # Remove comments
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    # Remove whitespace
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([\{\}\:;,])\s*', r'\1', css)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(css.strip())
    print(f"Minified {file_path} to {output_path}")

def minify_js(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Remove single line comments
    js = re.sub(r'//.*', '', js)
    # Remove multi line comments
    js = re.sub(r'/\*[\s\S]*?\*/', '', js)
    # Remove excessive whitespace but be careful with JS
    # For a basic approach, just strip empty lines and leading/trailing spaces
    lines = [line.strip() for line in js.split('\n') if line.strip()]
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Minified {file_path} to {output_path}")

minify_css('styles.css', 'styles.min.css')
minify_js('main.js', 'main.min.js')
