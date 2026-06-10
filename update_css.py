
import os

with open('styles.css', 'a', encoding='utf-8') as f:
    f.write('''
/* ==========================================================================
   Newsletter Section
   ========================================================================== */
.newsletter-section {
    background-color: var(--clr-bg-primary);
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--clr-border);
}
.newsletter-section .container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}
.newsletter-section h2 {
    color: var(--clr-accent-gold);
    margin-bottom: var(--space-sm);
}
.newsletter-section p {
    margin-bottom: var(--space-lg);
    color: var(--clr-text-secondary);
}
.newsletter-form {
    display: flex;
    gap: 10px;
}
.newsletter-form input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: 1px solid var(--clr-border);
    border-radius: 4px;
    font-family: inherit;
}
.newsletter-form button {
    flex-shrink: 0;
}
@media (max-width: 600px) {
    .newsletter-form {
        flex-direction: column;
    }
}

/* ==========================================================================
   WhatsApp Float Widget
   ========================================================================== */
.whatsapp-float {
    position: fixed;
    bottom: 20px;
    right: 70px;
    background-color: #25d366;
    color: #FFF;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 100;
    transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.whatsapp-float:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 14px rgba(0,0,0,0.2);
    color: #FFF;
}
.whatsapp-float svg {
    width: 28px;
    height: 28px;
}
@media (max-width: 768px) {
    .whatsapp-float {
        bottom: 70px; /* Above mobile scroll-to-top */
    }
}

/* ==========================================================================
   Product Rating
   ========================================================================== */
.product-rating {
    margin-bottom: var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
.product-rating .stars {
    color: #FFD700;
    font-size: 1.1rem;
    letter-spacing: 2px;
}
.product-rating .count {
    font-size: 0.8rem;
    color: var(--clr-text-muted);
}
''')
print('Appended CSS.')

