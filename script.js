// ===== CONFIGURATION =====
const CONFIG = {
    PASSWORD: "12/8",
    TARGET_DATE: "February 18, 2026 00:00:00"
};

// ===== GLOBAL VARIABLES =====
let audio = null;
let isPlaying = false;

// ===== STARFIELD BACKGROUND =====
function initStarfield() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for(let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.y += star.speed;
            if(star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    drawStars();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield
    initStarfield();
    
    // Initialize audio player
    audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.7;
    }
    
    // Start countdown timer
    startCountdown();
    
    console.log('🚀 موقع رمضان كريم جاهز للتشغيل!');
});

// ===== PASSWORD CHECK =====
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const password = input.value.trim();
    
    if (password === CONFIG.PASSWORD) {
        // Success
        input.style.borderColor = '#2d9c8a';
        input.style.boxShadow = '0 0 15px rgba(45, 156, 138, 0.5)';
        
        // Switch to main page
        setTimeout(switchToMainPage, 500);
    } else {
        // Error
        input.style.borderColor = '#ff6b6b';
        input.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.5)';
        input.value = '';
        input.placeholder = 'حاولي مرة تانيه 😊';
        
        // Shake animation
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

function switchToMainPage() {
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    
    // Hide page 1
    page1.style.opacity = '0';
    page1.style.transform = 'scale(0.9)';
    page1.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        page1.style.display = 'none';
        page2.style.display = 'block';
        
        // Show page 2
        setTimeout(() => {
            page2.style.opacity = '1';
            page2.style.transform = 'scale(1)';
            page2.style.transition = 'all 0.6s ease';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }, 600);
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    const targetDate = new Date(CONFIG.TARGET_DATE).getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.querySelector('.section-title').textContent = 'رمضان كريم! 🌙✨';
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately and every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ===== MUSIC PLAYER =====
function toggleMusic() {
    if (!audio) {
        audio = document.getElementById('bgMusic');
        if (!audio) return;
        audio.volume = 0.7;
    }
    
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        }).catch(error => {
            console.log('خطأ في تشغيل الصوت:', error);
            alert('الرجاء السماح بتشغيل الصوت في الموقع 🔈');
        });
    } else {
        audio.pause();
        isPlaying = false;
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    }
}

function skipBackward() {
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function skipForward() {
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function changeVolume(value) {
    if (!audio) return;
    
    const volume = value / 100;
    audio.volume = volume;
    
    // Update volume icon
    const volIcon = document.getElementById('volIcon');
    if (volIcon) {
        if (volume === 0) {
            volIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            volIcon.className = 'fas fa-volume-down';
        } else {
            volIcon.className = 'fas fa-volume-up';
        }
    }
}

// ===== POPUP FUNCTIONS =====
function showFinal() {
    const popup = document.getElementById('finalPopup');
    popup.style.display = 'flex';
    
    setTimeout(() => {
        popup.style.opacity = '1';
        
        // Create confetti effect
        createConfetti();
    }, 10);
}

function closePopup() {
    const popup = document.getElementById('finalPopup');
    popup.style.opacity = '0';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 500);
}

function createConfetti() {
    const colors = ['#f7c744', '#4fc3f7', '#2d9c8a', '#ba68c8'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            top: -20px;
            left: ${Math.random() * 100}%;
            opacity: 0.8;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate
        const animation = confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// ===== EVENT LISTENERS =====
// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake { animation: shake 0.5s ease-in-out; }
`;
document.head.appendChild(style);

// Enter key for password input
document.getElementById('passwordInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Escape key closes popup
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }

});
