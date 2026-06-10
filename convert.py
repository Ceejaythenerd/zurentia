import os
from PIL import Image

def convert_to_webp(folder_path):
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(folder_path, filename)
            # Create a new filename with .webp extension
            name_without_ext = os.path.splitext(filename)[0]
            webp_file_path = os.path.join(folder_path, name_without_ext + '.webp')
            
            try:
                # Open image and convert
                with Image.open(file_path) as img:
                    img.save(webp_file_path, 'webp', quality=80)
                print(f"Converted {filename} to WebP.")
            except Exception as e:
                print(f"Error converting {filename}: {e}")

convert_to_webp('assets')
