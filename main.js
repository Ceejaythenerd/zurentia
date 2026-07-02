document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

    // 2. Sticky Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('header-scrolled');
        else header.classList.remove('header-scrolled');
    });

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

    // 3. Product Data & Cart State Management (ZAR)
    const productsDb = {
        "Active": { id: "Active", name: "Active", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Bamboo": { id: "Bamboo", name: "Bamboo", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Black Lotus": { id: "Black Lotus", name: "Black Lotus", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Cashmere": { id: "Cashmere", name: "Cashmere", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Cotton Candy": { id: "Cotton Candy", name: "Cotton Candy", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Cucumber": { id: "Cucumber", name: "Cucumber", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Cupcake": { id: "Cupcake", name: "Cupcake", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Dino": { id: "Dino", name: "Dino", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Donut": { id: "Donut", name: "Donut", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Earth": { id: "Earth", name: "Earth", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Easter Egg": { id: "Easter Egg", name: "Easter Egg", price: 72, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "For Boys": { id: "For Boys", name: "For Boys", price: 45, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "For Girls": { id: "For Girls", name: "For Girls", price: 45, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Ice-Cream Stick": { id: "Ice-Cream Stick", name: "Ice-Cream Stick", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Jojoba": { id: "Jojoba", name: "Jojoba", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Lavender": { id: "Lavender", name: "Lavender", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Magnolia": { id: "Magnolia", name: "Magnolia", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Milk, Honey & Oats": { id: "Milk, Honey & Oats", name: "Milk, Honey & Oats", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Passion Fruit": { id: "Passion Fruit", name: "Passion Fruit", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Pearl": { id: "Pearl", name: "Pearl", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Pomegranate": { id: "Pomegranate", name: "Pomegranate", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Pop Rocket": { id: "Pop Rocket", name: "Pop Rocket", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Rabbit": { id: "Rabbit", name: "Rabbit", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Rain": { id: "Rain", name: "Rain", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Rainbow Cloud": { id: "Rainbow Cloud", name: "Rainbow Cloud", price: 80, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Rocket": { id: "Rocket", name: "Rocket", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Rose": { id: "Rose", name: "Rose", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Shooting Star": { id: "Shooting Star", name: "Shooting Star", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Snowball": { id: "Snowball", name: "Snowball", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Snuggle Paw": { id: "Snuggle Paw", name: "Snuggle Paw", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Star Burst": { id: "Star Burst", name: "Star Burst", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Strawberry Ice Cream Ball": { id: "Strawberry Ice Cream Ball", name: "Strawberry Ice Cream Ball", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Sunny Bloom": { id: "Sunny Bloom", name: "Sunny Bloom", price: 72, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Surprise Inside (for Boys)": { id: "Surprise Inside (for Boys)", name: "Surprise Inside (for Boys)", price: 45, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Surprise Inside (for Girls)": { id: "Surprise Inside (for Girls)", name: "Surprise Inside (for Girls)", price: 45, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Teddy Bear": { id: "Teddy Bear", name: "Teddy Bear", price: 80, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Toy Car (2 Random types)": { id: "Toy Car (2 Random types)", name: "Toy Car (2 Random types)", price: 80, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Tropical Island": { id: "Tropical Island", name: "Tropical Island", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Tropical Paradise": { id: "Tropical Paradise", name: "Tropical Paradise", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Tropicana": { id: "Tropicana", name: "Tropicana", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Unicorn Poop": { id: "Unicorn Poop", name: "Unicorn Poop", price: 69, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Viooltjie": { id: "Viooltjie", name: "Viooltjie", price: 35, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Watermelon Slice": { id: "Watermelon Slice", name: "Watermelon Slice", price: 72, img: "assets/cat_bath_bomb_new.webp", type: "Bath Bomb" },
        "Dill": { id: "Dill", name: "Dill", price: 45, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Rosemary": { id: "Rosemary", name: "Rosemary", price: 45, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Guava": { id: "Guava", name: "Guava", price: 120, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Cilantro": { id: "Cilantro", name: "Cilantro", price: 45, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Parsley": { id: "Parsley", name: "Parsley", price: 45, img: "assets/cat_plant_new.webp", type: "Plant" },
        "mint": { id: "mint", name: "mint", price: 45, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Aloe": { id: "Aloe", name: "Aloe", price: 120, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Lavender": { id: "Lavender", name: "Lavender", price: 95, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Snake Plant": { id: "Snake Plant", name: "Snake Plant", price: 225, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Succulent": { id: "Succulent", name: "Succulent", price: 125, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Mathithibala": { id: "Mathithibala", name: "Mathithibala", price: 125, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Rue": { id: "Rue", name: "Rue", price: 150, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Umhlonyana": { id: "Umhlonyana", name: "Umhlonyana", price: 95, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Peace Planet": { id: "Peace Planet", name: "Peace Planet", price: 135, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Strawberries": { id: "Strawberries", name: "Strawberries", price: 80, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Spider Plant": { id: "Spider Plant", name: "Spider Plant", price: 95, img: "assets/cat_plant_new.webp", type: "Plant" },
        "Hibiscus (100g)": { id: "Hibiscus (100g)", name: "Hibiscus (100g)", price: 30, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Hibiscus (500g)": { id: "Hibiscus (500g)", name: "Hibiscus (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Moringa (100g)": { id: "Moringa (100g)", name: "Moringa (100g)", price: 31, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Moringa (500g)": { id: "Moringa (500g)", name: "Moringa (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Bay leaves (100g)": { id: "Bay leaves (100g)", name: "Bay leaves (100g)", price: 32, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Bay leaves (500g)": { id: "Bay leaves (500g)", name: "Bay leaves (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Thyme (100g)": { id: "Thyme (100g)", name: "Thyme (100g)", price: 33, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Thyme (500g)": { id: "Thyme (500g)", name: "Thyme (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cloves (100g)": { id: "Cloves (100g)", name: "Cloves (100g)", price: 34, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cloves (500g)": { id: "Cloves (500g)", name: "Cloves (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cinnamon (100g)": { id: "Cinnamon (100g)", name: "Cinnamon (100g)", price: 35, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cinnamon (500g)": { id: "Cinnamon (500g)", name: "Cinnamon (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Star Anise (100g)": { id: "Star Anise (100g)", name: "Star Anise (100g)", price: 36, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Star Anise (500g)": { id: "Star Anise (500g)", name: "Star Anise (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Rosemary (100g)": { id: "Rosemary (100g)", name: "Rosemary (100g)", price: 37, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Rosemary (500g)": { id: "Rosemary (500g)", name: "Rosemary (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cilantro (100g)": { id: "Cilantro (100g)", name: "Cilantro (100g)", price: 38, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Cilantro (500g)": { id: "Cilantro (500g)", name: "Cilantro (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Parsley (100g)": { id: "Parsley (100g)", name: "Parsley (100g)", price: 39, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Parsley (500g)": { id: "Parsley (500g)", name: "Parsley (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Dill (100g)": { id: "Dill (100g)", name: "Dill (100g)", price: 40, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Dill (500g)": { id: "Dill (500g)", name: "Dill (500g)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Green Tea (pack of 40)": { id: "Green Tea (pack of 40)", name: "Green Tea (pack of 40)", price: 41, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Green Tea (pack of 150)": { id: "Green Tea (pack of 150)", name: "Green Tea (pack of 150)", price: 150, img: "assets/cat_herbs_new.webp", type: "Herb" },
        "Luxurious Hand & Body Lotion (200ml)": { id: "Luxurious Hand & Body Lotion (200ml)", name: "Luxurious Hand & Body Lotion (200ml)", price: 37, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Luxurious Hand & Body Lotion (500ml)": { id: "Luxurious Hand & Body Lotion (500ml)", name: "Luxurious Hand & Body Lotion (500ml)", price: 37, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Golden Tumeric Body Lotion (200ml)": { id: "Golden Tumeric Body Lotion (200ml)", name: "Golden Tumeric Body Lotion (200ml)", price: 144, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Golden Tumeric Body Lotion (500ml)": { id: "Golden Tumeric Body Lotion (500ml)", name: "Golden Tumeric Body Lotion (500ml)", price: 144, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Luxurious Body shower gel (200ml)": { id: "Luxurious Body shower gel (200ml)", name: "Luxurious Body shower gel (200ml)", price: 37, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Luxurious Body shower gel (500ml)": { id: "Luxurious Body shower gel (500ml)", name: "Luxurious Body shower gel (500ml)", price: 37, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "body wash with herbs (200ml)": { id: "body wash with herbs (200ml)", name: "body wash with herbs (200ml)", price: 54, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "body wash with herbs (500ml)": { id: "body wash with herbs (500ml)", name: "body wash with herbs (500ml)", price: 54, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Natures Secret Gel (200ml)": { id: "Natures Secret Gel (200ml)", name: "Natures Secret Gel (200ml)", price: 45, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "shower gel with herbs (200ml)": { id: "shower gel with herbs (200ml)", name: "shower gel with herbs (200ml)", price: 54, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Joint Rub oil (100ml)": { id: "Joint Rub oil (100ml)", name: "Joint Rub oil (100ml)", price: 155, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Skin Glow Oil (100ml)": { id: "Skin Glow Oil (100ml)", name: "Skin Glow Oil (100ml)", price: 144, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "Skin Glow Oil (200ml)": { id: "Skin Glow Oil (200ml)", name: "Skin Glow Oil (200ml)", price: 144, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "stretchmarks lotion (200ml)": { id: "stretchmarks lotion (200ml)", name: "stretchmarks lotion (200ml)", price: 89, img: "assets/cat_skincare_new.webp", type: "SkinCare" },
        "nZuri Hairfood (125ml)": { id: "nZuri Hairfood (125ml)", name: "nZuri Hairfood (125ml)", price: 150, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "nZuri Hairfood (250ml)": { id: "nZuri Hairfood (250ml)", name: "nZuri Hairfood (250ml)", price: 225, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Zurentia hair oil (100ml)": { id: "Zurentia hair oil (100ml)", name: "Zurentia hair oil (100ml)", price: 185, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Zurentia hair oil (200ml)": { id: "Zurentia hair oil (200ml)", name: "Zurentia hair oil (200ml)", price: 325, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Hair shampoo (200ml)": { id: "Hair shampoo (200ml)", name: "Hair shampoo (200ml)", price: 43, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Hair shampoo (500ml)": { id: "Hair shampoo (500ml)", name: "Hair shampoo (500ml)", price: 89, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Hair conditioner (200ml)": { id: "Hair conditioner (200ml)", name: "Hair conditioner (200ml)", price: 43, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Hair conditioner (500ml)": { id: "Hair conditioner (500ml)", name: "Hair conditioner (500ml)", price: 89, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "Natures Secret Gel (200ml)": { id: "Natures Secret Gel (200ml)", name: "Natures Secret Gel (200ml)", price: 45, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "shampoo with herbs (200ml)": { id: "shampoo with herbs (200ml)", name: "shampoo with herbs (200ml)", price: 47, img: "assets/cat_hair_1781047472878.webp", type: "Hair" },
        "shampoo with herbs (500ml)": { id: "shampoo with herbs (500ml)", name: "shampoo with herbs (500ml)", price: 92, img: "assets/cat_hair_1781047472878.webp", type: "Hair" }
    };

    // SEO/AEO: Inject Product JSON-LD Schema
    const injectProductSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": Object.values(productsDb).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product",
                    "name": product.name,
                    "image": "https://www.zurentia.co.za/" + product.img,
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "ZAR",
                        "price": product.price,
                        "availability": "https://schema.org/InStock"
                    }
                }
            }))
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    };
    injectProductSchema();

    let cart = JSON.parse(localStorage.getItem('zurentia_cart')) || [];
    let currentQuickViewProduct = null;
    let currentQuickViewQuantity = 1;

    // DOM Elements
    const cartCountEl = document.getElementById('cart-count');
    const cartCountMobileEl = document.getElementById('cart-count-mobile');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const cartTrigger = document.getElementById('cart-trigger');
    const cartClose = document.getElementById('cart-close');
    const addToBagBtn = document.querySelector('.add-to-cart-btn');

    // Drawer Views
    const drawerTitle = document.getElementById('drawer-title');
    const cartView = document.getElementById('cart-view');
    const checkoutView = document.getElementById('checkout-view');
    const goToCheckoutBtn = document.getElementById('go-to-checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Checkout Form Elements
    const checkoutForm = document.getElementById('whatsapp-checkout-form');
    const addressGroup = document.getElementById('address-group');
    const deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');

    // Quick View Modal Elements
    const modal = document.getElementById('quick-view-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalQtyVal = document.getElementById('modal-qty-val');
    const modalQtyInc = document.getElementById('modal-qty-inc');
    const modalQtyDec = document.getElementById('modal-qty-dec');

    // Drawer View Toggles
    const showCartView = () => {
        checkoutView.classList.remove('active');
        cartView.classList.add('active');
        drawerTitle.textContent = "Your Bag";
    };

    const showCheckoutView = () => {
        if (cart.length === 0) return; // Prevent checkout with empty cart
        cartView.classList.remove('active');
        checkoutView.classList.add('active');
        drawerTitle.textContent = "Checkout Details";
    };

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCountEl) cartCountEl.textContent = count;
        if (cartCountMobileEl) cartCountMobileEl.textContent = count;
        localStorage.setItem('zurentia_cart', JSON.stringify(cart));
    }

    // Cart Functions
    const saveCart = () => {
        localStorage.setItem('zurentia_cart', JSON.stringify(cart));
        updateCartCount();
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="empty-cart-icon" style="text-align: center; margin-top: 2rem;"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="color: var(--clr-text-muted);"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div><p class="empty-cart-msg" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">Your bag is currently empty.</p><a href="shop.html" class="btn btn-primary" style="display: block; text-align: center; max-width: 200px; margin: 0 auto;" onclick="document.getElementById('cart-close').click();">KEEP SHOPPING</a>`;
            goToCheckoutBtn.style.display = 'none';
            if (clearCartBtn) clearCartBtn.style.display = 'none';
        } else {
            goToCheckoutBtn.style.display = 'block';
            if (clearCartBtn) clearCartBtn.style.display = 'block';
            cart.forEach(item => {
                const product = productsDb[item.id];
                if(!product) return;
                
                total += product.price * item.quantity;
                count += item.quantity;

                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${product.name}</div>
                        <div class="cart-item-price">R ${product.price}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="qty-btn dec" data-id="${item.id}">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn inc" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-btn" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        if (cartCountEl) cartCountEl.textContent = count;
        if (cartCountMobileEl) cartCountMobileEl.textContent = count;
        cartTotalPriceEl.textContent = `R ${total}`;
        
        // Add event listeners to newly created buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const isInc = e.target.classList.contains('inc');
                changeQuantity(id, isInc ? 1 : -1);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                removeFromCart(e.target.getAttribute('data-id'));
            });
        });
    };

    const addToCart = (productId, quantity = 1) => {
        const existingItem = cart.find(i => i.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            if (existingItem.quantity > 20) {
                existingItem.quantity = 20;
                showToast(`Maximum quantity of 20 reached for this item.`, true);
            }
        } else {
            cart.push({ id: productId, quantity: Math.min(quantity, 20) });
        }
        
        saveCart();
        renderCart();
        
        // Show a sleek toast instead of aggressively opening the cart
        const product = productsDb[productId];
        showToast(`Added ${product.name} to bag!`);
        
        // Pulse animation on the cart count
        cartCountEl.parentElement.style.animation = 'none';
        cartCountEl.parentElement.offsetHeight; // trigger reflow
        cartCountEl.parentElement.style.animation = 'toast-in 0.3s ease';
    };

    const changeQuantity = (productId, delta) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity > 20) {
                item.quantity = 20;
                showToast(`Maximum quantity of 20 reached.`, true);
            }
            if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId);
            saveCart();
            renderCart();
            if (cart.length === 0) showCartView();
        }
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(i => i.id !== productId);
        saveCart();
        renderCart();
        if (cart.length === 0) showCartView();
    };

    // Focus Trap Helper
    const trapFocus = (element) => {
        const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        if (focusableEls.length === 0) return () => {};
        const firstFocusableEl = focusableEls[0];  
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        
        const handleFocus = (e) => {
            if (e.key === 'Tab' || e.keyCode === 9) {
                if (e.shiftKey) { 
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            }
        };
        
        element.addEventListener('keydown', handleFocus);
        return () => element.removeEventListener('keydown', handleFocus);
    };

    let activeTrapCleanup = null;

    const openCart = () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        cartDrawer.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            if (activeTrapCleanup) activeTrapCleanup();
            activeTrapCleanup = trapFocus(cartDrawer);
        }, 400);
    };

    const closeCart = () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        cartDrawer.setAttribute('aria-hidden', 'true');
        setTimeout(showCartView, 400); // Reset to cart view when drawer finishes closing
        if (activeTrapCleanup) { activeTrapCleanup(); activeTrapCleanup = null; }
    };

    // Global Keydown Listeners (Escape Key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartDrawer.classList.contains('active')) closeCart();
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
            const journalModalEl = document.getElementById('journal-modal');
            if (journalModalEl && journalModalEl.classList.contains('active')) {
                journalModalEl.classList.remove('active');
                journalModalEl.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
            const shopSidebar = document.getElementById('shop-sidebar');
            if (shopSidebar && shopSidebar.classList.contains('active')) {
                shopSidebar.classList.remove('active');
                cartOverlay.classList.remove('active');
            }
        }
    });

    // Toast System
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const showToast = (message, isError = false) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) toast.classList.add('error');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    // Quick View Logic
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.smart-add-btn')) return;

            const productKey = card.getAttribute('data-product');
            if (!productKey) return;
            const price = card.getAttribute('data-price');
            const imgPath = card.getAttribute('data-img');

            currentQuickViewProduct = productKey;
            currentQuickViewQuantity = 1;
            if (modalQtyVal) modalQtyVal.textContent = currentQuickViewQuantity;
            modalTitle.textContent = productKey;
            modalPrice.textContent = price;
            modalImg.src = imgPath;
            modalImg.alt = productKey;

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modal.querySelector('.modal-close').focus();
                if (activeTrapCleanup) activeTrapCleanup();
                activeTrapCleanup = trapFocus(modal);
            }, 100);
        });
    });

    document.querySelectorAll('.smart-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productKey = btn.getAttribute('data-product');
            if (productKey) {
                addToCart(productKey, 1);
                openCart();
            }
        });
    });

    if (modalQtyInc && modalQtyDec) {
        modalQtyInc.addEventListener('click', () => {
            currentQuickViewQuantity++;
            modalQtyVal.textContent = currentQuickViewQuantity;
        });
        modalQtyDec.addEventListener('click', () => {
            if (currentQuickViewQuantity > 1) {
                currentQuickViewQuantity--;
                modalQtyVal.textContent = currentQuickViewQuantity;
            }
        });
    }

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentQuickViewProduct = null;
        if (activeTrapCleanup) { activeTrapCleanup(); activeTrapCleanup = null; }
    };

    // Checkout Logic
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Delivery') {
                addressGroup.style.display = 'block';
                document.getElementById('customer-address').required = true;
            } else {
                addressGroup.style.display = 'none';
                document.getElementById('customer-address').required = false;
            }
        });
    });

    const whatsappForm = document.getElementById('whatsapp-checkout-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('customer-name').value;
            const phone = document.getElementById('customer-phone').value;
            const method = document.querySelector('input[name="delivery-method"]:checked').value;
            const address = document.getElementById('customer-address').value;

            // Form Validation
            if (method === 'Delivery' && address.trim().length < 10) {
                showToast('Please enter a full delivery address (at least 10 characters).', true);
                return;
            }
            if (phone.trim().length < 10) {
                showToast('Please enter a valid phone number.', true);
                return;
            }

            let message = `*NEW ORDER - ZURENTIA*\n\n`;
            message += `*Customer:* ${name}\n`;
            message += `*Phone:* ${phone}\n`;
            message += `*Method:* ${method}\n`;
            if (method === 'Delivery') {
                message += `*Address:* ${address}\n`;
            }
            message += `\n*Order Details:*\n`;
            
            let total = 0;
            cart.forEach(item => {
                const p = productsDb[item.id];
                const subtotal = p.price * item.quantity;
                total += subtotal;
                message += `- ${item.quantity}x ${p.name} (R ${subtotal})\n`;
            });
            
            let deliveryFee = (method === 'Delivery') ? 100 : 0;
            let finalTotal = total + deliveryFee;
            if (deliveryFee > 0) {
                message += `\n*Subtotal: R ${total}*`;
                message += `\n*Delivery Fee: R ${deliveryFee}*`;
            }
            message += `\n\n*Total Due: R ${finalTotal}*\n`;
            
            const notesEl = document.getElementById('customer-notes');
            if (notesEl && notesEl.value.trim()) {
                message += `\n*Order Notes:*\n${notesEl.value.trim()}\n`;
            }
            
            const whatsappNumber = "27730908780"; // Zurentia contact number
            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(url, '_blank');

            // Clear cart after checkout attempt
            cart = [];
            saveCart();
            renderCart();
            closeCart();
        });
    }

    // Event Listeners
    cartTrigger.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            saveCart();
            renderCart();
            showCartView();
        });
    }
    
    goToCheckoutBtn.addEventListener('click', showCheckoutView);
    backToCartBtn.addEventListener('click', showCartView);
    
    addToBagBtn.addEventListener('click', () => {
        if (currentQuickViewProduct) {
            addToCart(currentQuickViewProduct, currentQuickViewQuantity);
            closeModal();
        }
    });

    document.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) closeModal();
            if (cartDrawer.classList.contains('active')) closeCart();
        }
    });

    // Initial render
    renderCart();

    // ==========================================
    // Shop Page Filtering & Mobile Drawer Logic
    // ==========================================
    const shopGrid = document.getElementById('shop-product-grid');
    if (shopGrid) {
        const searchInput = document.getElementById('shop-search');
        const typeFilters = document.querySelectorAll('input[name="filter-type"]');
        const priceFilters = document.querySelectorAll('input[name="filter-price"]');
        const clearBtn = document.getElementById('clear-filters-btn');
        const sortDropdown = document.getElementById('sort-dropdown');
        const activeFiltersContainer = document.getElementById('active-filters');
        
        // Mobile Drawer Elements
        const mobileFilterBtn = document.getElementById('mobile-filter-btn');
        const shopSidebar = document.getElementById('shop-sidebar');
        const sidebarClose = document.getElementById('sidebar-close');

        if (mobileFilterBtn && shopSidebar) {
            mobileFilterBtn.addEventListener('click', () => {
                shopSidebar.classList.add('active');
                cartOverlay.classList.add('active'); // Reusing cart overlay for background dim
            });

            sidebarClose.addEventListener('click', () => {
                shopSidebar.classList.remove('active');
                cartOverlay.classList.remove('active');
            });

            cartOverlay.addEventListener('click', () => {
                if (shopSidebar.classList.contains('active')) {
                    shopSidebar.classList.remove('active');
                    cartOverlay.classList.remove('active');
                }
            });
        }

        const renderShopProducts = (products) => {
            shopGrid.innerHTML = '';
            if (products.length === 0) {
                shopGrid.innerHTML = '<p class="no-results">No products match your criteria.</p>';
                return;
            }

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card animate-on-scroll visible';
                card.style.cursor = 'pointer';
                card.setAttribute('data-product', product.id);
                card.setAttribute('data-price', `R ${product.price}`);
                card.setAttribute('data-img', product.img);
                card.innerHTML = `
                    <div class="product-image">
                        <img src="${product.img}" alt="${product.name}" loading="lazy">
                    </div>
                    <h3>${product.name.toUpperCase()}</h3>
                    <p class="price">R ${product.price}</p>
                    <button class="btn btn-primary smart-add-btn" data-product="${product.id}">ADD TO CART</button>
                `;
                shopGrid.appendChild(card);
            });

            // Re-attach listeners
            shopGrid.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.smart-add-btn')) return;
                    
                    const productKey = card.getAttribute('data-product');
                    if (!productKey) return;
                    const price = card.getAttribute('data-price');
                    const imgPath = card.getAttribute('data-img');

                    currentQuickViewProduct = productKey;
                    currentQuickViewQuantity = 1;
                    if (modalQtyVal) modalQtyVal.textContent = currentQuickViewQuantity;
                    modalTitle.textContent = productKey;
                    modalPrice.textContent = price;
                    modalImg.src = imgPath;
                    modalImg.alt = productKey;

                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                    setTimeout(() => {
                        modal.querySelector('.modal-close').focus();
                        if (activeTrapCleanup) activeTrapCleanup();
                        activeTrapCleanup = trapFocus(modal);
                    }, 100);
                });
            });

            shopGrid.querySelectorAll('.smart-add-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const productKey = btn.getAttribute('data-product');
                    if (productKey) {
                        addToCart(productKey, 1);
                        openCart();
                    }
                });
            });
        };

        const renderActiveFilters = (searchTerm, selectedTypes, selectedPrice) => {
            if (!activeFiltersContainer) return;
            activeFiltersContainer.innerHTML = '';
            
            const createPill = (text, onClick) => {
                const pill = document.createElement('div');
                pill.className = 'filter-pill animate-on-scroll visible';
                pill.innerHTML = `<span>${text}</span> <button class="filter-pill-close">&times;</button>`;
                pill.querySelector('.filter-pill-close').addEventListener('click', onClick);
                return pill;
            };

            if (searchTerm) {
                activeFiltersContainer.appendChild(createPill(`Search: "${searchTerm}"`, () => {
                    searchInput.value = '';
                    filterProducts();
                }));
            }

            selectedTypes.forEach(type => {
                const inputElement = document.querySelector(`input[name="filter-type"][value="${type}"]`);
                if (inputElement) {
                    const labelElement = inputElement.parentElement.textContent.trim();
                    activeFiltersContainer.appendChild(createPill(labelElement, () => {
                        inputElement.checked = false;
                        filterProducts();
                    }));
                }
            });

            if (selectedPrice !== 'all') {
                const inputElement = document.querySelector(`input[name="filter-price"][value="${selectedPrice}"]`);
                if (inputElement) {
                    const priceLabel = inputElement.parentElement.textContent.trim();
                    activeFiltersContainer.appendChild(createPill(priceLabel, () => {
                        document.getElementById('price-all').checked = true;
                        filterProducts();
                    }));
                }
            }
        };

        const filterProducts = () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            // Get selected types
            const selectedTypes = Array.from(typeFilters)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // Get selected price range
            const selectedPrice = Array.from(priceFilters)
                .find(rb => rb.checked)?.value || 'all';

            let filtered = Object.values(productsDb);

            // Filter by Search
            if (searchTerm) {
                filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
            }

            // Filter by Type
            if (selectedTypes.length > 0) {
                filtered = filtered.filter(p => selectedTypes.includes(p.type));
            }

            // Filter by Price
            if (selectedPrice !== 'all') {
                filtered = filtered.filter(p => {
                    if (selectedPrice === 'under-50') return p.price < 50;
                    if (selectedPrice === '50-100') return p.price >= 50 && p.price <= 100;
                    if (selectedPrice === 'over-100') return p.price > 100;
                    return true;
                });
            }

            // Sort
            if (sortDropdown) {
                const sortVal = sortDropdown.value;
                if (sortVal === 'Price: Low to High') {
                    filtered.sort((a, b) => a.price - b.price);
                } else if (sortVal === 'Price: High to Low') {
                    filtered.sort((a, b) => b.price - a.price);
                }
            }

            renderActiveFilters(searchTerm, selectedTypes, selectedPrice);
            renderShopProducts(filtered);
        };

        // Event Listeners for Filters
        searchInput.addEventListener('input', filterProducts);
        typeFilters.forEach(cb => cb.addEventListener('change', filterProducts));
        priceFilters.forEach(rb => rb.addEventListener('change', filterProducts));
        if (sortDropdown) sortDropdown.addEventListener('change', filterProducts);

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            typeFilters.forEach(cb => cb.checked = false);
            const defaultPrice = document.getElementById('price-all');
            if (defaultPrice) defaultPrice.checked = true;
            if (sortDropdown) sortDropdown.value = 'Recommended';
            filterProducts();
        });

        // Initial render & handle URL search params
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearch = urlParams.get('q');
        const urlType = urlParams.get('type');
        
        if (urlType) {
            const typeCheckbox = Array.from(typeFilters).find(cb => cb.value === urlType);
            if (typeCheckbox) {
                typeCheckbox.checked = true;
            }
            filterProducts();
        } else if (urlSearch) {
            searchInput.value = urlSearch;
            filterProducts();
        } else {
            renderShopProducts(Object.values(productsDb));
        }
    }

    // ==========================================
    // Journal Modal Logic
    // ==========================================
    const journalModal = document.getElementById('journal-modal');
    if (journalModal) {
        const journalContent = {
            'botanicals': {
                title: "The Power of Botanicals",
                text: "<p>Botanicals have been used for centuries to heal the body and soothe the mind. Our careful selection of organic herbs like Chamomile, Lavender, and Eucalyptus work synergistically to penetrate the skin and deliver profound natural healing.</p><p>Every flower, leaf, and root is harvested at peak potency to ensure maximum therapeutic benefit.</p>"
            },
            'rituals': {
                title: "Daily Healing Rituals",
                text: "<p>Transforming your daily routine into a sacred practice of self-care is essential for holistic health. Taking just 20 minutes to soak in a warm, herbal-infused bath can reset your nervous system and dramatically lower cortisol levels.</p><p>We recommend creating a quiet space, dimming the lights, and letting the botanical aromas guide you to deep relaxation.</p>"
            },
            'sourcing': {
                title: "Sustainable Sourcing",
                text: "<p>We believe that true healing cannot come at the expense of the earth. That is why every ingredient in our alchemy is sustainably sourced from ethical farms.</p><p>By respecting the earth's natural cycles and supporting small-scale herbalists, we ensure that our products are as good for the planet as they are for your body.</p>"
            }
        };

        document.querySelectorAll('.journal-card').forEach(card => {
            card.addEventListener('click', () => {
                const key = card.getAttribute('data-journal');
                if (journalContent[key]) {
                    document.getElementById('journal-modal-title').textContent = journalContent[key].title;
                    document.getElementById('journal-modal-text').innerHTML = journalContent[key].text;
                    document.getElementById('journal-modal-img').src = card.querySelector('img').src;
                    
                    journalModal.classList.add('active');
                    journalModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                    setTimeout(() => {
                        journalModal.querySelector('.modal-close').focus();
                        if (activeTrapCleanup) activeTrapCleanup();
                        activeTrapCleanup = trapFocus(journalModal);
                    }, 100);
                }
            });
            // Accessibility: Enter key triggers click
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') card.click();
            });
        });

        const closeBtn = journalModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                journalModal.classList.remove('active');
                journalModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                if (activeTrapCleanup) { activeTrapCleanup(); activeTrapCleanup = null; }
            });
        }
    }

    // ==========================================
    // Newsletter Logic
    // ==========================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showToast("Thank you for joining our Ritual Circle!");
                emailInput.value = '';
            }
        });
    }

    // ==========================================
    // Scroll To Top Button
    // ==========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // Cookies Prompt
    // ==========================================
    if (!localStorage.getItem('zurentia_cookies_accepted')) {
        const cookiesBanner = document.createElement('div');
        cookiesBanner.id = 'cookies-banner';
        cookiesBanner.className = 'cookies-banner';
        cookiesBanner.setAttribute('role', 'dialog');
        cookiesBanner.setAttribute('aria-label', 'Cookie consent');
        
        cookiesBanner.innerHTML = `
            <div class="cookies-content">
                <p>We use cookies to elevate your experience on our site, analyze traffic, and provide personalized botanical recommendations.</p>
                <p>Read our <a href="#">Privacy Policy</a> for more details.</p>
            </div>
            <div class="cookies-actions">
                <button class="btn btn-outline" id="decline-cookies-btn" style="border-color: var(--clr-text-light); color: var(--clr-text-light); margin-bottom: 0; width: auto;">Decline</button>
                <button class="btn btn-primary" id="accept-cookies-btn" style="margin-bottom: 0; width: auto;">Accept All</button>
            </div>
        `;
        document.body.appendChild(cookiesBanner);

        // Slight delay to allow CSS transition
        setTimeout(() => {
            cookiesBanner.classList.add('visible');
        }, 500);

        document.getElementById('accept-cookies-btn').addEventListener('click', () => {
            localStorage.setItem('zurentia_cookies_accepted', 'true');
            cookiesBanner.classList.remove('visible');
            setTimeout(() => cookiesBanner.remove(), 500);
        });

        document.getElementById('decline-cookies-btn').addEventListener('click', () => {
            localStorage.setItem('zurentia_cookies_accepted', 'declined');
            cookiesBanner.classList.remove('visible');
            setTimeout(() => cookiesBanner.remove(), 500);
        });
    }
});
