import json

data = [
    ('Bath Bomb', 'cat_bath_bomb_1781047428531.png', [
        ('Active', 35), ('Bamboo', 35), ('Black Lotus', 35), ('Cashmere', 35), ('Cotton Candy', 35), ('Cucumber', 35), ('Cupcake', 69), ('Dino', 69), ('Donut', 69), ('Earth', 35), ('Easter Egg', 72), ('For Boys', 45), ('For Girls', 45), ('Ice-Cream Stick', 69), ('Jojoba', 35), ('Lavender', 35), ('Magnolia', 35), ('Milk, Honey & Oats', 35), ('Passion Fruit', 35), ('Pearl', 35), ('Pomegranate', 35), ('Pop Rocket', 35), ('Rabbit', 69), ('Rain', 35), ('Rainbow Cloud', 80), ('Rocket', 69), ('Rose', 35), ('Shooting Star', 69), ('Snowball', 35), ('Snuggle Paw', 69), ('Star Burst', 35), ('Strawberry Ice Cream Ball', 35), ('Sunny Bloom', 72), ('Surprise Inside (for Boys)', 45), ('Surprise Inside (for Girls)', 45), ('Teddy Bear', 80), ('Toy Car (2 Random types)', 80), ('Tropical Island', 35), ('Tropical Paradise', 35), ('Tropicana', 35), ('Unicorn Poop', 69), ('Viooltjie', 35), ('Watermelon Slice', 72)
    ]),
    ('Plant', 'cat_plant_1781047439075.png', [
        ('Dill', 45), ('Rosemary', 45), ('Guava', 120), ('Cilantro', 45), ('Parsley', 45), ('mint', 45), ('Aloe', 120), ('Lavender', 95), ('Snake Plant', 225), ('Succulent', 125), ('Mathithibala', 125), ('Rue', 150), ('Umhlonyana', 95), ('Peace Planet', 135), ('Strawberries', 80), ('Spider Plant', 95)
    ]),
    ('Herb', 'cat_herbs_1781047449948.png', [
        ('Hibiscus (100g)', 30), ('Hibiscus (500g)', 150), ('Moringa (100g)', 31), ('Moringa (500g)', 150), ('Bay leaves (100g)', 32), ('Bay leaves (500g)', 150), ('Thyme (100g)', 33), ('Thyme (500g)', 150), ('Cloves (100g)', 34), ('Cloves (500g)', 150), ('Cinamon (100g)', 35), ('Cinamon (500g)', 150), ('Star Anice (100g)', 36), ('Star Anice (500g)', 150), ('Rosemary (100g)', 37), ('Rosemary (500g)', 150), ('Cilantro (100g)', 38), ('Cilantro (500g)', 150), ('Parsley (100g)', 39), ('Parsley (500g)', 150), ('Dill (100g)', 40), ('Dill (500g)', 150), ('Green Tea (pack of 40)', 41), ('Green Tea (pack of 150)', 150)
    ]),
    ('SkinCare', 'cat_skincare_1781047461950.png', [
        ('Luxurious Hand & Body Lotion (200ml)', 37), ('Luxurious Hand & Body Lotion (500ml)', 37), ('Golden Tumeric Body Lotion (200ml)', 144), ('Golden Tumeric Body Lotion (500ml)', 144), ('Luxurious Body shower gel (200ml)', 37), ('Luxurious Body shower gel (500ml)', 37), ('body wash with herbs (200ml)', 54), ('body wash with herbs (500ml)', 54), ('Natures Secret Gel (200ml)', 45), ('shower gel with herbs (200ml)', 54), ('Joint Rub oil (100ml)', 155), ('Skin Glow Oil (100ml)', 144), ('Skin Glow Oil (200ml)', 144), ('stretchmarks lotion (200ml)', 89)
    ]),
    ('Hair', 'cat_hair_1781047472878.png', [
        ('nZuri Hairfood (125ml)', 150), ('nZuri Hairfood (250ml)', 225), ('Zurentia hair oil (100ml)', 185), ('Zurentia hair oil (200ml)', 325), ('Hair shampoo (200ml)', 43), ('Hair shampoo (500ml)', 89), ('Hair conditioner (200ml)', 43), ('Hair conditioner (500ml)', 89), ('Natures Secret Gel (200ml)', 45), ('shampoo with herbs (200ml)', 47), ('shampoo with herbs (500ml)', 92)
    ])
]

out = '    const productsDb = {\\n'
for cat_name, img, items in data:
    for name, price in items:
        id_str = name
        out += f'        "{id_str}": {{ id: "{id_str}", name: "{name}", price: {price}, img: "assets/{img}", type: "{cat_name}" }},\n'
out = out.rstrip(',\n') + '\n    };'
with open('products_code.js', 'w', encoding='utf-8') as f:
    f.write(out)
