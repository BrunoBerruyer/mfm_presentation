// Page Merci animations
document.addEventListener('DOMContentLoaded', function() {
    // Create trail effect on mouse move
    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) { // 10% chance to create a trail
            createTrail(e.clientX, e.clientY);
        }
    });
    
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'sparkle-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Random star or sparkle
        trail.textContent = Math.random() > 0.5 ? '✨' : '⭐';
        
        document.body.appendChild(trail);
        
        // Animate and remove
        setTimeout(() => {
            trail.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-100}px) scale(0)`;
            trail.style.opacity = '0';
        }, 10);
        
        setTimeout(() => trail.remove(), 1000);
    }
    
    // Click anywhere to launch a rocket
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') { // Don't launch on link clicks
            launchRocketAt(e.clientX, e.clientY);
        }
    });
    
    function launchRocketAt(x, y) {
        const rocket = document.createElement('div');
        rocket.className = 'click-rocket';
        rocket.textContent = '🚀';
        rocket.style.left = x + 'px';
        rocket.style.top = y + 'px';
        
        document.body.appendChild(rocket);
        
        // Launch animation
        setTimeout(() => {
            rocket.style.transform = 'translateY(-200vh) rotate(-45deg) scale(0.5)';
            rocket.style.opacity = '0';
        }, 10);
        
        setTimeout(() => rocket.remove(), 3000);
    }
    
    // Add fireworks effect periodically
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            createFirework();
        }
    }, 3000);
    
    function createFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5; // Upper half only
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }
    
    // Confetti on hover over "Let's talk!"
    const talkTitle = document.querySelector('.talk-title');
    if (talkTitle) {
        talkTitle.addEventListener('mouseenter', () => {
            createConfetti();
        });
    }
    
    function createConfetti() {
        const colors = ['#f5d547', '#4dd0e1', '#ffffff', '#ff6b6b', '#4ecdc4'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = '50%';
                confetti.style.top = '50%';
                
                const destinationX = (Math.random() - 0.5) * 300;
                const destinationY = (Math.random() - 0.5) * 300;
                
                confetti.style.setProperty('--destination-x', destinationX + 'px');
                confetti.style.setProperty('--destination-y', destinationY + 'px');
                
                document.querySelector('.lets-talk').appendChild(confetti);
                setTimeout(() => confetti.remove(), 1000);
            }, i * 50);
        }
    }
});

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    .sparkle-trail {
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 100;
        transition: all 1s ease-out;
        transform: translate(-50%, -50%);
    }
    
    .click-rocket {
        position: fixed;
        font-size: 2.5rem;
        pointer-events: none;
        z-index: 100;
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: all 3s ease-out;
    }
    
    .firework-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: #f5d547;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        animation: explode 1.5s ease-out forwards;
    }
    
    @keyframes explode {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--dx), var(--dy));
            opacity: 0;
        }
    }
    
    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        pointer-events: none;
        z-index: 100;
        animation: confetti-fall 1s ease-out forwards;
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--destination-x), var(--destination-y)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);