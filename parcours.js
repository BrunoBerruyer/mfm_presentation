// Timeline interactions
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    // Popup functionality
    const mexicoCard = document.querySelector('.timeline-item[data-year="2009-2014"] .timeline-card');
    const brandingCard = document.querySelector('.timeline-item[data-year="2024-2025"] .timeline-card');
    const mexicoPopup = document.getElementById('mexico-popup');
    const brandingPopup = document.getElementById('branding-popup');
    const closeButtons = document.querySelectorAll('.close-popup');
    
    // Open Mexico popup
    if (mexicoCard) {
        mexicoCard.addEventListener('click', function(e) {
            e.stopPropagation();
            mexicoPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open Branding popup
    if (brandingCard) {
        brandingCard.addEventListener('click', function(e) {
            e.stopPropagation();
            brandingPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close popups
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            popup.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    // Close popup on overlay click
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Gallery navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.parentElement.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (prevBtn && nextBtn && galleryImages.length > 0) {
        // Initially show first image
        showImage(0);
        
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentImageIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(currentImageIndex);
        });
    }
    
    // Add hover effect with parallax
    timelineCards.forEach((card, index) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Click animation
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Create ripple effect at card level
            const card = this.querySelector('.timeline-card');
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add floating animation to current position
    const todayCard = document.querySelector('.timeline-card.special');
    if (todayCard) {
        todayCard.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Mouse trail effect on background
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const trail = {
            x: e.clientX,
            y: e.clientY,
            element: createTrailElement()
        };
        
        mouseTrail.push(trail);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldTrail = mouseTrail.shift();
            oldTrail.element.remove();
        }
        
        document.body.appendChild(trail.element);
        
        setTimeout(() => {
            trail.element.style.width = '20px';
            trail.element.style.height = '20px';
            trail.element.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            trail.element.remove();
        }, 500);
    });
    
    function createTrailElement() {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(245, 213, 71, 0.5)';
        trail.style.pointerEvents = 'none';
        trail.style.transition = 'all 0.5s ease-out';
        trail.style.transform = 'translate(-50%, -50%)';
        trail.style.left = event.clientX + 'px';
        trail.style.top = event.clientY + 'px';
        trail.style.zIndex = '1000';
        
        return trail;
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(245, 213, 71, 0.5);
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        animation: rippleEffect 1s ease-out;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes rippleEffect {
        0% {
            width: 50px;
            height: 50px;
            opacity: 0.5;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    /* Visual indicators for clickable cards */
    .timeline-item[data-year="2009-2014"] .timeline-card::after,
    .timeline-item[data-year="2024-2025"] .timeline-card::after {
        content: "👁️ Cliquez pour voir";
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 0.8rem;
        color: #f5d547;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .timeline-item[data-year="2009-2014"] .timeline-card:hover::after,
    .timeline-item[data-year="2024-2025"] .timeline-card:hover::after {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);