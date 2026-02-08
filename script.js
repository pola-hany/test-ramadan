// بيانات التطبيق المحسنة
const appData = {
    // كلمة المرور الصحيحة
    correctPassword: "حبنا",
    
    // تاريخ بداية رمضان (يمكن تعديله)
    ramadanStartDate: new Date("March 23, 2025 00:00:00").getTime(),
    
    // رسالة الدعوة المحسنة
    invitationMessage: `رمضان كريم يا أغلى إنسان في حياتي! 🌙

أدعوك في هذا الشهر الكريم أن نكون أقرب إلى بعض، وأن نجعل من هذا الشهر فرصة لتعميق علاقتنا وتجديد مشاعرنا. 

لنبدأ هذا الشهر معًا بصلاة تراويح وقلوب عامرة بحب الله وبحب بعضنا، ولنكثر من الدعاء لنا ولأهلنا.

رمضان ليس فقط شهر الصيام، بل هو شهر الصبر والتقوى والتسامح والمحبة. فلنستغل هذه الفرصة لنكون أفضل مع بعضنا.

أعدك بأن أجعل هذا الشهر أجمل شهر في حياتنا، مليء بالذكريات الجميلة واللحظات التي لا تنسى.

أحبك في الله وأسأل الله أن يبارك فينا، وأن يحفظنا لبعض، وأن يجمعنا في جنات النعيم.

كل عام وأنت أغلى هدية في حياتي، وأنت نعمة من الله أشكر عليها كل يوم.

❤️🌙 حبيبي/حبيبتي ❤️🌙`,

    // ذكرياتنا مع صور رمضانية واقعية
    memories: [
        {
            id: 1,
            title: "أول رمضان معًا ❤️",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "سحورنا الأول ☕",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "صلاة التراويح معًا 🕌",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80"
        },
        {
            id: 4,
            title: "إفطار العائلة 🍽️",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "ليلة القدر المميزة 🌟",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "عيد الفطر الأول 🎉",
            date: "رمضان 2023",
            image: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ],
    
    // حالات العداد
    getCountdownInfo: function() {
        const now = new Date().getTime();
        const distance = this.ramadanStartDate - now;
        
        if (distance < 0) {
            // رمضان بدأ
            const daysSince = Math.floor(Math.abs(distance) / (1000 * 60 * 60 * 24));
            return {
                hasStarted: true,
                daysSinceStart: daysSince + 1,
                message: `اليوم ${daysSince + 1} من رمضان الكريم 🌙`,
                status: "رمضان بدأ! 🎉"
            };
        } else {
            // قبل رمضان
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // حساب النسبة المئوية للتقدم (نفترض أن العد التنازلي لمدة 30 يوم)
            const totalDays = 30;
            const progress = ((totalDays - days) / totalDays) * 100;
            
            return {
                hasStarted: false,
                days,
                hours,
                minutes,
                seconds,
                progress: Math.min(progress, 100),
                message: days === 0 ? 
                    `رمضان يبدأ اليوم! 🎉` : 
                    `باقي ${days} يوم ${hours} ساعة ${minutes} دقيقة`,
                status: "في انتظار رمضان الكريم"
            };
        }
    }
};

// متغيرات عامة
let swiperInstance = null;
let invitationTypingInterval = null;
let countdownInterval = null;
let confettiInterval = null;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة الدخول المحفوظة
    const isLoggedIn = localStorage.getItem('ramadanLoversLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // المستخدم مسجل الدخول بالفعل
        showMainPage();
        initMainPage();
    } else {
        // إظهار صفحة الدخول
        showLoginPage();
        initLoginPage();
    }
    
    // تهيئة الخلفية المتحركة
    initBackgroundAnimation();
});

// تهيئة صفحة الدخول
function initLoginPage() {
    const loginBox = document.getElementById('loginBox');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // إضافة مستمعي الأحداث
    submitBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    // تركيز على حقل كلمة المرور
    passwordInput.focus();
    
    function handleLogin() {
        const password = passwordInput.value.trim();
        
        if (password === appData.correctPassword) {
            // كلمة المرور صحيحة
            showMessage(successMessage, 'نورت عالمنا الرمضاني ❤️🌙');
            hideMessage(errorMessage);
            loginBox.classList.remove('shake');
            
            // حفظ حالة الدخول
            localStorage.setItem('ramadanLoversLoggedIn', 'true');
            
            // الانتقال للصفحة الرئيسية مع تأثير
            setTimeout(() => {
                loginBox.style.opacity = '0';
                loginBox.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    showMainPage();
                    initMainPage();
                }, 500);
            }, 1500);
        } else {
            // كلمة المرور خاطئة
            showMessage(errorMessage, 'لا لا… السر ده بينا بس 😌');
            hideMessage(successMessage);
            loginBox.classList.add('shake');
            
            // إزالة تأثير الاهتزاز
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    }
}

// تهيئة الصفحة الرئيسية
function initMainPage() {
    // تهيئة العداد
    initCountdown();
    
    // تهيئة مشغل الصوت
    initAudioPlayer();
    
    // تهيئة دعوة ليك
    initInvitation();
    
    // تهيئة الذكريات
    initMemoriesSlider();
    
    // تهيئة الفيديو
    initVideoPlayer();
    
    // تهيئة زر المفاجأة
    initSurpriseButton();
    
    // تهيئة عناصر التحكم
    initControlButtons();
    
    // إظهار مشغل الصوت بعد التأخير
    setTimeout(() => {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.classList.add('active');
        
        // تشغيل الموسيقى
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play().catch(e => {
            console.log('يجب التفاعل مع الصفحة أولاً لتشغيل الموسيقى');
        });
    }, 1000);
}

// تهيئة العداد
function initCountdown() {
    const daysCount = document.getElementById('daysCount');
    const hoursCount = document.getElementById('hoursCount');
    const minutesCount = document.getElementById('minutesCount');
    const secondsCount = document.getElementById('secondsCount');
    const statusText = document.getElementById('statusText');
    const ramadanCounterTitle = document.getElementById('ramadanCounterTitle');
    const moonProgressCircle = document.querySelector('.moon-progress-circle');
    
    // تحديث العداد فورًا
    updateCountdown();
    
    // تحديث العداد كل ثانية
    countdownInterval = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
        const countdownInfo = appData.getCountdownInfo();
        
        if (!countdownInfo.hasStarted) {
            // قبل رمضان
            daysCount.textContent = padNumber(countdownInfo.days);
            hoursCount.textContent = padNumber(countdownInfo.hours);
            minutesCount.textContent = padNumber(countdownInfo.minutes);
            secondsCount.textContent = padNumber(countdownInfo.seconds);
            statusText.textContent = countdownInfo.status;
            ramadanCounterTitle.textContent = 'عدّاد رمضان';
            
            // تحديث تقدم الهلال
            const progress = 283 - (countdownInfo.progress / 100 * 283);
            moonProgressCircle.style.strokeDashoffset = progress;
        } else {
            // رمضان بدأ
            daysCount.textContent = padNumber(countdownInfo.daysSinceStart);
            hoursCount.textContent = '00';
            minutesCount.textContent = '00';
            secondsCount.textContent = '00';
            statusText.textContent = 'رمضان كريم! 🎉';
            ramadanCounterTitle.textContent = 'أيام رمضان';
            
            // الهلال مكتمل
            moonProgressCircle.style.strokeDashoffset = 0;
            
            // تحديث النص في الأعلى
            document.getElementById('counterStatus').querySelector('span').textContent = countdownInfo.message;
        }
    }
    
    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }
}

// تهيئة مشغل الصوت
function initAudioPlayer() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressSlider = document.getElementById('progressSlider');
    const currentTime = document.getElementById('currentTime');
    const durationTime = document.getElementById('durationTime');
    
    // تعيين مستوى الصوت الافتراضي
    backgroundMusic.volume = volumeSlider.value / 100;
    
    // تحديث وقت المدة عند تحميل الملف
    backgroundMusic.addEventListener('loadedmetadata', function() {
        durationTime.textContent = formatTime(backgroundMusic.duration);
    });
    
    // تحديث وقت التشغيل والتقدم
    backgroundMusic.addEventListener('timeupdate', function() {
        const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
        progressSlider.value = progress || 0;
        currentTime.textContent = formatTime(backgroundMusic.currentTime);
    });
    
    // تحديث زر التشغيل/الإيقاف
    backgroundMusic.addEventListener('play', function() {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    backgroundMusic.addEventListener('pause', function() {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // التحكم في التشغيل/الإيقاف
    playPauseBtn.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });
    
    // التحكم في مستوى الصوت
    volumeSlider.addEventListener('input', function() {
        backgroundMusic.volume = this.value / 100;
    });
    
    // التحكم في التقدم
    progressSlider.addEventListener('input', function() {
        const time = (this.value / 100) * backgroundMusic.duration;
        backgroundMusic.currentTime = time;
    });
    
    // تنسيق الوقت
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// تهيئة دعوة ليك
function initInvitation() {
    const invitationCard = document.getElementById('invitationCard');
    const invitationText = document.getElementById('invitationText');
    const closeInvitationBtn = document.getElementById('closeInvitationBtn');
    let isTyping = false;
    
    invitationCard.addEventListener('click', function(e) {
        if (isTyping || invitationText.textContent.length > 0) return;
        
        // بدء تأثير الكتابة
        isTyping = true;
        invitationText.textContent = '';
        
        // إظهار زر الإغلاق
        closeInvitationBtn.style.display = 'flex';
        
        // تأثير الكتابة
        const message = appData.invitationMessage;
        let index = 0;
        
        invitationTypingInterval = setInterval(() => {
            if (index < message.length) {
                invitationText.textContent += message.charAt(index);
                index++;
                
                // التمرير تلقائيًا
                invitationText.parentElement.scrollTop = invitationText.parentElement.scrollHeight;
            } else {
                clearInterval(invitationTypingInterval);
                isTyping = false;
            }
        }, 30);
    });
    
    // زر إغلاق الرسالة
    closeInvitationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // إعادة تعيين الرسالة
        clearInterval(invitationTypingInterval);
        invitationText.textContent = '';
        closeInvitationBtn.style.display = 'none';
        isTyping = false;
    });
}

// تهيئة سلايدر الذكريات
function initMemoriesSlider() {
    const memoriesSlider = document.getElementById('memoriesSlider');
    
    // إضافة الصور إلى السلايدر
    appData.memories.forEach(memory => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <img src="${memory.image}" alt="${memory.title}" class="memory-image" loading="lazy">
            <div class="memory-overlay">
                <h3 class="memory-title">${memory.title}</h3>
                <p class="memory-date">${memory.date}</p>
            </div>
        `;
        
        memoriesSlider.appendChild(slide);
    });
    
    // تهيئة Swiper
    swiperInstance = new Swiper('.memories-slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

// تهيئة مشغل الفيديو
function initVideoPlayer() {
    const memoryVideo = document.getElementById('memoryVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoContainer = document.getElementById('videoContainer');
    const videoProgressSlider = document.getElementById('videoProgressSlider');
    const videoFrame = videoContainer.querySelector('.video-frame');
    
    // تحديث تقدم الفيديو
    memoryVideo.addEventListener('timeupdate', function() {
        const progress = (memoryVideo.currentTime / memoryVideo.duration) * 100;
        videoProgressSlider.value = progress || 0;
    });
    
    // زر تشغيل الفيديو
    videoPlayBtn.addEventListener('click', function() {
        if (memoryVideo.paused) {
            memoryVideo.play();
            videoFrame.classList.add('playing');
            videoPlayBtn.querySelector('.play-text').textContent = 'توقف مؤقت';
            videoPlayBtn.querySelector('i').className = 'fas fa-pause';
        } else {
            memoryVideo.pause();
            videoFrame.classList.remove('playing');
            videoPlayBtn.querySelector('.play-text').textContent = 'استمرار';
            videoPlayBtn.querySelector('i').className = 'fas fa-play';
        }
    });
    
    // التحكم في تقدم الفيديو
    videoProgressSlider.addEventListener('input', function() {
        const time = (this.value / 100) * memoryVideo.duration;
        memoryVideo.currentTime = time;
    });
    
    // إعادة الفيديو عند الانتهاء
    memoryVideo.addEventListener('ended', function() {
        videoFrame.classList.remove('playing');
        videoPlayBtn.querySelector('.play-text').textContent = 'شاهد مرة أخرى';
        videoPlayBtn.querySelector('i').className = 'fas fa-redo';
    });
    
    // إضافة مستمع للنقر المزدوج للتكبير
    videoFrame.addEventListener('dblclick', function() {
        if (!document.fullscreenElement) {
            videoFrame.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
}

// تهيئة زر المفاجأة
function initSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const closeSurpriseBtn = document.getElementById('closeSurpriseBtn');
    
    surpriseBtn.addEventListener('click', function() {
        // إظهار الرسالة
        surpriseMessage.style.display = 'block';
        
        // إنشاء مؤثرات التفرق
        createConfettiEffect();
        
        // تشغيل صوت الفرح
        playCelebrationSound();
        
        // إخفاء الزر
        surpriseBtn.style.display = 'none';
    });
    
    closeSurpriseBtn.addEventListener('click', function() {
        // إخفاء الرسالة
        surpriseMessage.style.display = 'none';
        
        // إعادة إظهار الزر
        surpriseBtn.style.display = 'inline-flex';
        
        // إيقاف المؤثرات
        clearInterval(confettiInterval);
    });
}

// تهيئة عناصر التحكم
function initControlButtons() {
    const themeToggle = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // تبديل السمة
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('lantern-mode');
        
        const icon = themeToggle.querySelector('.theme-icon i');
        const text = themeToggle.querySelector('.theme-text');
        
        if (document.body.classList.contains('lantern-mode')) {
            icon.className = 'fas fa-lantern';
            text.textContent = 'وضع الفوانيس';
            
            // إضافة فوانيس إضافية
            addLanternsToBackground();
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'الوضع الليلي';
            
            // إزالة الفوانيس الإضافية
            removeExtraLanterns();
        }
    });
    
    // زر الخروج
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('ramadanLoversLoggedIn');
        showLoginPage();
        initLoginPage();
        
        // إعادة تعيين الصفحة الرئيسية
        const mainPage = document.getElementById('mainPage');
        mainPage.classList.remove('active');
        mainPage.style.opacity = '0';
        
        // إيقاف الموسيقى
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    });
}

// تهيئة الخلفية المتحركة
function initBackgroundAnimation() {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    
    // إضافة نجمة
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // حجم عشوائي
        if (Math.random() > 0.7) star.classList.add('star-large');
        if (Math.random() > 0.9) star.classList.add('ramadan-star');
        
        // وضع عشوائي
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // تأخير وتوقيت عشوائي
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        backgroundAnimation.appendChild(star);
    }
    
    // إضافة هلال واقعي
    const moon = document.createElement('div');
    moon.className = 'real-crescent';
    moon.style.top = '15%';
    moon.style.left = '85%';
    backgroundAnimation.appendChild(moon);
    
    // إضافة فوانيس رمضانية
    for (let i = 0; i < 5; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'traditional-lantern';
        
        lantern.style.top = `${20 + i * 15}%`;
        lantern.style.left = `${10 + i * 5}%`;
        lantern.style.animationDelay = `${i * 3}s`;
        
        backgroundAnimation.appendChild(lantern);
    }
}

// إضافة فوانيس إضافية في وضع الفوانيس
function addLanternsToBackground() {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    
    for (let i = 0; i < 8; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'traditional-lantern extra-lantern';
        
        lantern.style.top = `${Math.random() * 80 + 10}%`;
        lantern.style.left = `${Math.random() * 80 + 10}%`;
        lantern.style.animationDelay = `${Math.random() * 10}s`;
        lantern.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        backgroundAnimation.appendChild(lantern);
    }
}

// إزالة الفوانيس الإضافية
function removeExtraLanterns() {
    const extraLanterns = document.querySelectorAll('.extra-lantern');
    extraLanterns.forEach(lantern => lantern.remove());
}

// إنشاء مؤثرات التفرق
function createConfettiEffect() {
    const colors = ['#d4af37', '#ff3333', '#ffffff', '#1a5d1a', '#0a3d62'];
    
    confettiInterval = setInterval(() => {
        for (let i = 0; i < 15; i++) {
            createConfettiPiece();
        }
    }, 300);
    
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // خصائص عشوائية
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        // حركة التفرق
        const animation = confetti.animate([
            { 
                top: '0px', 
                opacity: 1, 
                transform: `rotate(0deg) scale(1)`,
            },
            { 
                top: '100vh', 
                opacity: 0, 
                transform: `rotate(${Math.random() * 720}deg) scale(0.5)`,
            }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)',
        });
        
        // إزالة العنصر بعد انتهاء الحركة
        animation.onfinish = () => confetti.remove();
    }
}

// تشغيل صوت الاحتفال
function playCelebrationSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('تعذر تشغيل صوت الاحتفال'));
}

// وظائف مساعدة
function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    
    loginPage.style.display = 'flex';
    mainPage.style.display = 'none';
}

function showMainPage() {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    
    loginPage.style.display = 'none';
    mainPage.style.display = 'flex';
    
    // إظهار الصفحة الرئيسية بتأثير
    setTimeout(() => {
        mainPage.classList.add('active');
        mainPage.style.opacity = '1';
    }, 100);
}

function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideMessage(element) {
    element.style.display = 'none';
}

// التنظيف عند إغلاق الصفحة
window.addEventListener('beforeunload', function() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (invitationTypingInterval) clearInterval(invitationTypingInterval);
    if (confettiInterval) clearInterval(confettiInterval);
    
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
});

// إضافة تأثيرات GSAP للعناصر
document.addEventListener('DOMContentLoaded', function() {
    // تحميل GSAP إذا كان متاحًا
    if (typeof gsap !== 'undefined') {
        // تأثيرات عند دخول الصفحة الرئيسية
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target, 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                    );
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // مراقبة الأقسام الرئيسية
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
});