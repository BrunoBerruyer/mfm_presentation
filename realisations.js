// Realisations page interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectImages = document.querySelectorAll('.project-image-wrapper');
    
    // Add parallax effect on hover
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Click on image to open project
    projectImages.forEach((wrapper, index) => {
        wrapper.addEventListener('click', function() {
            const projectLink = this.parentElement.querySelector('.project-link');
            if (projectLink) {
                window.open(projectLink.href, '_blank');
            }
        });
    });
    
    // Add ripple effect on link clicks
    const links = document.querySelectorAll('.project-link, .download-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'link-ripple';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Animate numbers or statistics if present
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Background particle effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create occasional particles
        if (Math.random() < 0.02) {
            createParticle(mouseX, mouseY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const destinationX = x + (Math.random() - 0.5) * 100;
        const destinationY = y + (Math.random() - 0.5) * 100;
        
        particle.style.setProperty('--destination-x', destinationX + 'px');
        particle.style.setProperty('--destination-y', destinationY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
});

// Add styles for ripple and particles
const style = document.createElement('style');
style.textContent = `
    .link-ripple {
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: rippleLink 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleLink {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    .mouse-particle {
        position: fixed;
        border-radius: 50%;
        background: rgba(245, 213, 71, 0.6);
        pointer-events: none;
        z-index: 1;
        animation: floatParticle 1.5s ease-out forwards;
    }
    
    @keyframes floatParticle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(var(--destination-x) - 100vw / 2),
                calc(var(--destination-y) - 100vh / 2)
            ) scale(0);
        }
    }
    
    .project-link, .download-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);