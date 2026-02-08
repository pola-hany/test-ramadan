// بيانات التطبيق
const appData = {
    // كلمة المرور الصحيحة
    correctPassword: "حبنا",
    
    // رسالة الدعوة
    invitationMessage: "رمضان كريم يا أغلى إنسان في حياتي! 🌙\n\nأدعوك في هذا الشهر الكريم أن نكون أقرب إلى بعض، وأن نجعل من هذا الشهر فرصة لتعميق علاقتنا وتجديد مشاعرنا. \n\nلنبدأ هذا الشهر معًا بصلاة تراويح وقلوب عامرة بحب الله وبحب بعضنا. \n\nأحبك في الله وأسأل الله أن يبارك فينا وأن يجمعنا في جنات النعيم. \n\nكل عام وأنت أغلى هدية في حياتي يا حبيبي/حبيبتي ❤️",
    
    // ذكرياتنا
    memories: [
        {
            id: 1,
            title: "أول صورة معًا ❤️",
            image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 2,
            title: "أول خروجة معًا ☕",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        },
        {
            id: 3,
            title: "أجمل ذكرى 📸",
            image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        },
        {
            id: 4,
            title: "رحلة لا تنسى ✈️",
            image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    ],
    
    // حساب أيام رمضان
    getRamadanInfo: function() {
        const today = new Date();
        // نفترض أن رمضان يبدأ في 23 مارس 2025 (يمكن تغيير التاريخ)
        const ramadanStart = new Date(2025, 2, 23); // شهر 2 هو مارس (الشهور تبدأ من 0)
        
        // إذا كان التاريخ الحالي قبل رمضان
        if (today < ramadanStart) {
            const diffTime = ramadanStart - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return {
                hasStarted: false,
                daysLeft: diffDays,
                message: `فاض ${diffDays} أيام على أول يوم رمضان 🌙`,
                counterValue: `${diffDays} أيام`
            };
        } else {
            // إذا بدأ رمضان
            const daysSinceStart = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;
            
            return {
                hasStarted: true,
                daysSinceStart: daysSinceStart,
                message: `أول يوم رمضان مع أغلى حد ❤️`,
                counterValue: `اليوم ${daysSinceStart} من رمضان`
            };
        }
    }
};

// تهيئة DOM بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM الرئيسية
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    const loginBox = document.getElementById('loginBox');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    const themeToggle = document.getElementById('themeToggle');
    const ramadanCounterTitle = document.getElementById('ramadanCounterTitle');
    const ramadanCounterValue = document.getElementById('ramadanCounterValue');
    const moonCircle = document.querySelector('.moon-circle');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const invitationCard = document.getElementById('invitationCard');
    const invitationText = document.getElementById('invitationText');
    const timeline = document.getElementById('timeline');
    const videoContainer = document.getElementById('videoContainer');
    const memoryVideo = document.getElementById('memoryVideo');
    const playBtn = document.getElementById('playBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    // التحقق من حالة الدخول المحفوظة
    const isLoggedIn = localStorage.getItem('ramadanLoversLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // تخطي صفحة الدخول إذا كان المستخدم قد سجل الدخول مسبقًا
        loginPage.style.display = 'none';
        mainPage.classList.add('active');
        initMainPage();
    } else {
        // إظهار صفحة الدخول
        loginPage.style.display = 'flex';
        mainPage.classList.remove('active');
    }
    
    // إنشاء العناصر المتحركة في الخلفية
    createBackgroundElements();
    
    // زر الدخول
    submitBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    function handleLogin() {
        const password = passwordInput.value.trim();
        
        if (password === appData.correctPassword) {
            // كلمة المرور صحيحة
            successMessage.textContent = 'نورت عالمنا ❤️🌙';
            errorMessage.textContent = '';
            loginBox.classList.remove('shake');
            
            // حفظ حالة الدخول
            localStorage.setItem('ramadanLoversLoggedIn', 'true');
            
            // الانتقال إلى الصفحة الرئيسية مع تأثير
            setTimeout(() => {
                loginPage.style.opacity = '0';
                loginPage.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    loginPage.style.display = 'none';
                    mainPage.classList.add('active');
                    initMainPage();
                }, 1000);
            }, 1500);
        } else {
            // كلمة المرور خاطئة
            errorMessage.textContent = 'لا لا… السر ده بينا بس 😌';
            successMessage.textContent = '';
            loginBox.classList.add('shake');
            
            // إزالة تأثير الاهتزاز بعد انتهاءه
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    }
    
    // وظيفة تهيئة الصفحة الرئيسية
    function initMainPage() {
        // تحديث عدّاد رمضان
        updateRamadanCounter();
        
        // تشغيل الموسيقى تلقائيًا
        backgroundMusic.volume = volumeSlider.value / 100;
        backgroundMusic.play().catch(e => console.log('تعذر تشغيل الموسيقى تلقائيًا:', e));
        
        // تحديث زر التشغيل/الإيقاف
        updatePlayPauseButton();
        
        // إضافة الذكريات إلى تايم لاين
        loadMemories();
        
        // إعداد المستمعين للأحداث
        setupEventListeners();
        
        // إنشاء مؤثرات الخلفية للصفحة الرئيسية
        createMainPageBackground();
    }
    
    // تحديث عدّاد رمضان
    function updateRamadanCounter() {
        const ramadanInfo = appData.getRamadanInfo();
        ramadanCounterTitle.textContent = ramadanInfo.message;
        ramadanCounterValue.textContent = ramadanInfo.counterValue;
        
        // تحديث تقدم الهلال
        if (!ramadanInfo.hasStarted) {
            const daysLeft = ramadanInfo.daysLeft;
            // نفترض أن رمضان بعد 30 يوم كحد أقصى
            const maxDays = 30;
            const progress = ((maxDays - daysLeft) / maxDays) * 283;
            moonCircle.style.strokeDashoffset = 283 - progress;
        } else {
            // إذا بدأ رمضان، يظهر الهلال مكتملاً
            moonCircle.style.strokeDashoffset = 0;
        }
    }
    
    // إنشاء عناصر الخلفية المتحركة
    function createBackgroundElements() {
        // إنشاء 5 هلالات
        for (let i = 0; i < 5; i++) {
            const moon = document.createElement('div');
            moon.className = 'moon';
            moon.style.top = `${Math.random() * 80 + 10}%`;
            moon.style.left = `${Math.random() * 80 + 10}%`;
            moon.style.animationDelay = `${Math.random() * 10}s`;
            moon.style.width = `${Math.random() * 40 + 40}px`;
            moon.style.height = moon.style.width;
            backgroundAnimation.appendChild(moon);
        }
        
        // إنشاء 8 فوانيس
        for (let i = 0; i < 8; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'lantern';
            lantern.style.top = `${Math.random() * 80 + 10}%`;
            lantern.style.left = `${Math.random() * 80 + 10}%`;
            lantern.style.animationDelay = `${Math.random() * 15}s`;
            lantern.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            backgroundAnimation.appendChild(lantern);
        }
        
        // إنشاء 50 نجمة
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${Math.random() * 2 + 1}s`;
            backgroundAnimation.appendChild(star);
        }
    }
    
    // إنشاء خلفية إضافية للصفحة الرئيسية
    function createMainPageBackground() {
        // إضافة المزيد من النجوم في وضع الليل
        if (!document.body.classList.contains('lantern-mode')) {
            for (let i = 0; i < 30; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 3}s`;
                star.style.animationDuration = `${Math.random() * 2 + 1}s`;
                star.style.width = `${Math.random() * 3 + 2}px`;
                star.style.height = star.style.width;
                backgroundAnimation.appendChild(star);
            }
        }
    }
    
    // إعداد المستمعين للأحداث في الصفحة الرئيسية
    function setupEventListeners() {
        // زر التحكم في الإضاءة
        themeToggle.addEventListener('click', toggleTheme);
        
        // التحكم في الصوت
        playPauseBtn.addEventListener('click', toggleMusic);
        volumeSlider.addEventListener('input', updateVolume);
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        });
        
        // دعوة ليك
        invitationCard.addEventListener('click', showInvitation);
        
        // تشغيل الفيديو
        playBtn.addEventListener('click', playVideo);
        memoryVideo.addEventListener('click', toggleVideo);
        
        // زر المفاجأة
        surpriseBtn.addEventListener('click', showSurprise);
        
        // تأثيرات التمرير
        setupScrollAnimations();
    }
    
    // تبديل وضع الإضاءة
    function toggleTheme() {
        const body = document.body;
        const isLanternMode = body.classList.contains('lantern-mode');
        
        if (isLanternMode) {
            body.classList.remove('lantern-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>الوضع الليلي</span>';
            
            // إزالة الفوانيس الإضافية
            const extraLanterns = document.querySelectorAll('.extra-lantern');
            extraLanterns.forEach(lantern => lantern.remove());
        } else {
            body.classList.add('lantern-mode');
            themeToggle.innerHTML = '<i class="fas fa-lantern"></i><span>وضع الفوانيس</span>';
            
            // إضافة فوانيس إضافية
            for (let i = 0; i < 10; i++) {
                const lantern = document.createElement('div');
                lantern.className = 'lantern extra-lantern';
                lantern.style.top = `${Math.random() * 80 + 10}%`;
                lantern.style.left = `${Math.random() * 80 + 10}%`;
                lantern.style.animationDelay = `${Math.random() * 15}s`;
                lantern.style.transform = `scale(${Math.random() * 0.7 + 0.3})`;
                backgroundAnimation.appendChild(lantern);
            }
        }
    }
    
    // التحكم في الموسيقى
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
        updatePlayPauseButton();
    }
    
    function updatePlayPauseButton() {
        const icon = playPauseBtn.querySelector('i');
        if (backgroundMusic.paused) {
            icon.className = 'fas fa-play';
        } else {
            icon.className = 'fas fa-pause';
        }
    }
    
    function updateVolume() {
        backgroundMusic.volume = volumeSlider.value / 100;
    }
    
    // عرض دعوة ليك
    function showInvitation() {
        if (invitationText.classList.contains('typing-text')) {
            return; // الرسالة معروضة بالفعل
        }
        
        invitationText.textContent = '';
        invitationText.classList.add('typing-text');
        
        // محاكاة تأثير الكتابة
        const message = appData.invitationMessage;
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                invitationText.textContent += message.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                
                // إضافة زر الإغلاق
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-btn';
                closeBtn.textContent = 'أغلق الرسالة';
                closeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    invitationText.classList.remove('typing-text');
                    invitationText.textContent = 'اضغط هنا لقراءة الرسالة الخاصة';
                    closeBtn.remove();
                });
                
                invitationCard.appendChild(closeBtn);
            }
        }, 50);
    }
    
    // تحميل الذكريات في التايم لاين
    function loadMemories() {
        appData.memories.forEach((memory, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.id = `memory-${memory.id}`;
            
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <img src="${memory.image}" alt="${memory.title}" class="timeline-img">
                    <h3 class="timeline-title">${memory.title}</h3>
                </div>
            `;
            
            timeline.appendChild(timelineItem);
            
            // إظهار العنصر بعد تأخير
            setTimeout(() => {
                timelineItem.classList.add('show');
            }, 300 + (index * 300));
        });
    }
    
    // تشغيل الفيديو
    function playVideo() {
        if (memoryVideo.paused) {
            memoryVideo.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoContainer.style.transform = 'scale(1.05)';
            
            // إضافة إطار زخرفي
            videoContainer.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.4)';
            videoContainer.style.border = '5px solid var(--gold-color)';
        } else {
            memoryVideo.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoContainer.style.transform = 'scale(1)';
            
            // إزالة الإطار الزخرفي
            videoContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
            videoContainer.style.border = '3px solid var(--gold-color)';
        }
    }
    
    function toggleVideo() {
        if (memoryVideo.paused) {
            memoryVideo.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            memoryVideo.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // عرض المفاجأة
    function showSurprise() {
        // عرض الرسالة
        surpriseMessage.style.display = 'block';
        
        // إنشاء مؤثرات التفرق (confetti)
        createConfetti();
        
        // إضافة تأثير اهتزاز للزر
        surpriseBtn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            surpriseBtn.style.animation = '';
        }, 500);
        
        // إغلاق الرسالة عند النقر خارجها
        setTimeout(() => {
            document.addEventListener('click', closeSurpriseOnClick);
        }, 100);
    }
    
    function closeSurpriseOnClick(e) {
        if (!surpriseMessage.contains(e.target) && e.target !== surpriseBtn) {
            surpriseMessage.style.display = 'none';
            document.removeEventListener('click', closeSurpriseOnClick);
        }
    }
    
    // إنشاء مؤثرات التفرق
    function createConfetti() {
        const colors = [getCssVariable('--gold-color'), '#ff3333', '#ffffff', '#1a5d1a'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // حركة التفرق
            const animation = confetti.animate([
                { top: '0px', opacity: 1, transform: 'rotate(0deg)' },
                { top: '100vh', opacity: 0, transform: `rotate(${Math.random() * 720}deg)` }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
            });
            
            // إزالة العنصر بعد انتهاء الحركة
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // إعداد تأثيرات التمرير
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);
        
        // مراقبة عناصر التايم لاين
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));
    }
    
    // دالة لاسترداد متغيرات CSS
    function getCssVariable(variable) {
        return getComputedStyle(document.documentElement).getPropertyValue(variable);
    }
});