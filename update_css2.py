
import os

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken CSS by appending the full correct CSS block
content += '''
/* ==========================================================================
   WhatsApp Float Widget (Repaired)
   ========================================================================== */
.whatsapp-float {
    position: fixed;
    bottom: 20px;
    right: 70px;
    background-color: var(--clr-bg-dark);
    color: #FFF;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 100;
    transition: transform var(--transition-base), box-shadow var(--transition-base), background-color var(--transition-base);
}
.whatsapp-float:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 14px rgba(0,0,0,0.2);
    background-color: var(--clr-accent-gold);
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
'''

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(content)

print('Repaired WhatsApp CSS')

