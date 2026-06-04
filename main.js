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
        "Chamomile Bomb": { id: "Chamomile Bomb", name: "Chamomile & Calendula Bomb", price: 250, img: "assets/product_chamomile_bomb.png", type: "Bomb" },
        "Lavender Soak": { id: "Lavender Soak", name: "Lavender Sleep Soak", price: 350, img: "assets/product_lavender_soak.png", type: "Soak" },
        "Nourishing Body Oil": { id: "Nourishing Body Oil", name: "Botanical Body Oil", price: 450, img: "assets/product_oil.jpg", type: "Oil" },
        "Eucalyptus Balm": { id: "Eucalyptus Balm", name: "Eucalyptus Muscle Balm", price: 550, img: "assets/product_eucalyptus_balm.png", type: "Balm" },
        "Rosemary Mint Soak": { id: "Rosemary Mint Soak", name: "Rosemary Mint Soak", price: 320, img: "assets/product_lavender_soak.png", type: "Soak" },
        "Rosemary Cedar Oil": { id: "Rosemary Cedar Oil", name: "Rosemary Cedarwood Oil", price: 400, img: "assets/product_oil.jpg", type: "Oil" },
        "Hibiscus Rose Bomb": { id: "Hibiscus Rose Bomb", name: "Hibiscus & Rose Petal Bomb", price: 280, img: "assets/product_hibiscus_bomb.png", type: "Bomb" },
        "Thyme Lemon Soak": { id: "Thyme Lemon Soak", name: "Thyme & Lemon Purifying Soak", price: 300, img: "assets/product_thyme_soak.png", type: "Soak" },
        "Lavender Vanilla Balm": { id: "Lavender Vanilla Balm", name: "Lavender Vanilla Balm", price: 480, img: "assets/product_eucalyptus_balm.png", type: "Balm" }
    };

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
            cartItemsContainer.innerHTML = '<div class="empty-cart-icon" style="text-align: center; margin-top: 2rem;"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="color: var(--clr-text-muted);"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div><p class="empty-cart-msg" style="margin-top: 0.5rem;">Your bag is currently empty.</p>';
            goToCheckoutBtn.style.display = 'none';
        } else {
            goToCheckoutBtn.style.display = 'block';
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
        if (existingItem) existingItem.quantity += quantity;
        else cart.push({ id: productId, quantity: quantity });
        
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
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productKey = btn.getAttribute('data-product');
            const price = btn.getAttribute('data-price');
            const imgPath = btn.getAttribute('data-img');

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
            message += `\n*Total Due: R ${total}*\n`;
            
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
                card.innerHTML = `
                    <div class="product-image">
                        <img src="${product.img}" alt="${product.name}" loading="lazy">
                    </div>
                    <h3>${product.name.toUpperCase()}</h3>
                    <p class="price">R ${product.price}</p>
                    <button class="btn btn-secondary quick-view-btn" data-product="${product.id}" data-price="R ${product.price}" data-img="${product.img}">QUICK VIEW</button>
                `;
                shopGrid.appendChild(card);
            });

            // Re-attach quick view listeners to new buttons
            shopGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productKey = btn.getAttribute('data-product');
                    const price = btn.getAttribute('data-price');
                    const imgPath = btn.getAttribute('data-img');

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
                    if (selectedPrice === 'under-300') return p.price < 300;
                    if (selectedPrice === '300-500') return p.price >= 300 && p.price <= 500;
                    if (selectedPrice === 'over-500') return p.price > 500;
                    return true;
                });
            }

            renderShopProducts(filtered);
        };

        // Event Listeners for Filters
        searchInput.addEventListener('input', filterProducts);
        typeFilters.forEach(cb => cb.addEventListener('change', filterProducts));
        priceFilters.forEach(rb => rb.addEventListener('change', filterProducts));

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            typeFilters.forEach(cb => cb.checked = false);
            const defaultPrice = document.getElementById('price-all');
            if (defaultPrice) defaultPrice.checked = true;
            filterProducts();
        });

        // Initial render
        renderShopProducts(Object.values(productsDb));
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
