// ===== بيانات التطبيق =====
const appConfig = {
    password: "حبنا",
    
    // تاريخ رمضان 1447هـ - 2026 م
    ramadanStart: new Date("2026-02-18T18:00:00").getTime(),
    ramadanEnd: new Date("2026-03-19T23:59:59").getTime(),
    
    invitationMessage: `رمضان كريم يا أغلى إنسان في حياتي!

هذه دعوة خاصة من قلبي لقلبك، لأجعل من هذا الشهر الفضيل بداية جديدة لعلاقتنا الجميلة.

أدعوك في هذا الشهر الكريم أن:
• نكون أقرب إلى بعضنا
• نكثر من الصلاة والدعاء معًا
• نتصالح مع كل خلافاتنا السابقة
• نجعل من رمضان فرصة لتعميق علاقتنا

لنبدأ هذا الشهر معًا بصلاة التراويح، وقلوب عامرة بحب الله وحب بعضنا.

أعدك بأن أجعل كل يوم من هذا الشهر ذكرى جميلة تضيفها إلى سجل ذكرياتنا.

أحبك في الله، وأسأل الله أن يبارك فينا، وأن يحفظنا لبعض، وأن يجمعنا في جنات النعيم.

كل عام وأنت أغلى هدية في حياتي، وأنت نعمة أشكر الله عليها كل يوم.`,

    memories: [
        {
            id: 1,
            title: "أول رمضان معًا",
            date: "رمضان 1444",
            image: "images/memory1.jpg"
        },
        {
            id: 2,
            title: "سحورنا الأول",
            date: "رمضان 1444",
            image: "images/memory2.jpg"
        },
        {
            id: 3,
            title: "إفطار العائلة",
            date: "رمضان 1444",
            image: "images/memory3.jpg"
        },
        {
            id: 4,
            title: "ليلة القدر",
            date: "رمضان 1444",
            image: "images/memory4.jpg"
        }
    ]
};

// ===== متغيرات عامة =====
let swiperInstance = null;
let typingInterval = null;
let countdownInterval = null;
let confettiInterval = null;
let isMusicPlaying = false;
let currentMusicTime = 0;

// ===== تهيئة التطبيق =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('جاري تهيئة التطبيق...');
    
    if (localStorage.getItem('ramadanLoggedIn') === 'true') {
        showMainPage();
        setTimeout(initMainPage, 100);
    } else {
        showLoginPage();
        initLoginPage();
    }
});

// ===== صفحة الدخول =====
function initLoginPage() {
    const loginBox = document.getElementById('loginBox');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    submitBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    function handleLogin() {
        const password = passwordInput.value.trim();
        
        if (password === appConfig.password) {
            showMessage(successMessage, 'أهلاً وسهلاً بك في عالمنا الرمضاني');
            hideMessage(errorMessage);
            loginBox.classList.remove('shake');
            
            localStorage.setItem('ramadanLoggedIn', 'true');
            localStorage.setItem('lastLogin', Date.now());
            
            setTimeout(() => {
                loginBox.style.opacity = '0';
                loginBox.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    showMainPage();
                    initMainPage();
                }, 500);
            }, 1500);
            
        } else {
            const messages = [
                'لا لا… هذا السر بيننا فقط',
                'حاول مرة أخرى يا حبيبي/حبيبتي',
                'فكر في أجمل شعور بيننا',
                'كلمة تجمعنا في كل وقت'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            showMessage(errorMessage, randomMessage);
            hideMessage(successMessage);
            loginBox.classList.add('shake');
            
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    }
}

// ===== الصفحة الرئيسية =====
function initMainPage() {
    console.log('جاري تهيئة الصفحة الرئيسية...');
    
    // أولاً: إصلاح مشاكل الظهور
    fixVisibilityIssues();
    
    // ثانيًا: تهيئة المكونات
    initCountdown();
    initAudioPlayer();
    initInvitation();
    initMemoriesSlider();
    initVideoPlayer();
    initSurpriseButton();
    initControlButtons();
    
    // ثالثًا: تفعيل المشغل الصوتي
    setTimeout(() => {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.style.display = 'block';
            audioPlayer.classList.add('active');
        }
    }, 1000);
    
    console.log('تم تهيئة الصفحة الرئيسية بنجاح');
}

// ===== إصلاح مشاكل الظهور =====
function fixVisibilityIssues() {
    console.log('جاري إصلاح مشاكل الظهور...');
    
    // 1. إظهار المشغل الصوتي
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.style.display = 'block';
    }
    
    // 2. إظهار جميع الأقسام فورًا
    const sections = document.querySelectorAll('.animated-section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.visibility = 'visible';
        section.style.display = 'block';
    });
    
    // 3. إظهار الذكريات
    const memoriesSlider = document.querySelector('.memories-slider-container');
    if (memoriesSlider) {
        memoriesSlider.style.display = 'block';
        memoriesSlider.style.opacity = '1';
    }
    
    // 4. إظهار الفيديو
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        videoSection.style.display = 'block';
        videoSection.style.opacity = '1';
    }
    
    // 5. إظهار دعوة ليك
    const invitationSection = document.querySelector('.invitation-section');
    if (invitationSection) {
        invitationSection.style.display = 'block';
        invitationSection.style.opacity = '1';
    }
    
    // 6. إظهار المفاجأة
    const surpriseSection = document.querySelector('.surprise-section');
    if (surpriseSection) {
        surpriseSection.style.display = 'block';
        surpriseSection.style.opacity = '1';
    }
    
    console.log('تم إصلاح مشاكل الظهور بنجاح');
}

// ===== عدّاد رمضان =====
function initCountdown() {
    console.log('جاري تشغيل العداد...');
    
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');
    
    const daysProgress = document.getElementById('daysProgress');
    const hoursProgress = document.getElementById('hoursProgress');
    const minutesProgress = document.getElementById('minutesProgress');
    const secondsProgress = document.getElementById('secondsProgress');
    
    const moonFill = document.getElementById('moonFill');
    const moonPhaseFill = document.getElementById('moonPhaseFill');
    const moonText = document.getElementById('moonText');
    
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const countdownSubtitle = document.getElementById('countdownSubtitle');
    
    const countdownSection = document.getElementById('countdownSection');
    
    const ramadanStart = appConfig.ramadanStart;
    const ramadanEnd = appConfig.ramadanEnd;
    
    function updateCountdown() {
        const now = Date.now();
        
        if (now >= ramadanStart && now <= ramadanEnd) {
            handleRamadanStarted(now);
        } else if (now < ramadanStart) {
            handleBeforeRamadan(now);
        } else {
            handleAfterRamadan(now);
        }
    }
    
    function handleRamadanStarted(now) {
        const elapsed = now - ramadanStart;
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;
        const totalDays = 30;
        
        const nextDay = ramadanStart + (days * 24 * 60 * 60 * 1000);
        const timeToNextDay = nextDay - now;
        
        const hours = Math.floor((timeToNextDay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeToNextDay % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeToNextDay % (1000 * 60)) / 1000);
        
        updateDisplay(days, hours, minutes, seconds);
        
        const moonPhase = (days / totalDays) * 100;
        updateMoonPhase(moonPhase, true);
        
        statusTitle.textContent = "رمضان كريم!";
        statusMessage.textContent = `اليوم ${days} من رمضان المبارك`;
        countdownSubtitle.textContent = "رمضان الكريم";
        
        countdownSection.classList.add('ramadan-started');
        
        updateProgressBars(24 - hours, 60 - minutes, 60 - seconds, moonPhase);
    }
    
    function handleBeforeRamadan(now) {
        const timeLeft = ramadanStart - now;
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        updateDisplay(days, hours, minutes, seconds);
        
        const totalDays = 30;
        const daysPassed = totalDays - days;
        const moonPhase = (daysPassed / totalDays) * 100;
        updateMoonPhase(moonPhase, false);
        
        if (days === 0) {
            statusTitle.textContent = "رمضان يبدأ اليوم!";
            statusMessage.textContent = "استعد لاستقبال الشهر الكريم";
            countdownSubtitle.textContent = "اليوم الكبير";
        } else {
            statusTitle.textContent = "في انتظار رمضان الكريم";
            statusMessage.textContent = `باقي ${days} يوم${days > 10 ? '' : ' و'} ${hours} ساعة`;
            countdownSubtitle.textContent = "العد التنازلي لرمضان";
        }
        
        countdownSection.classList.remove('ramadan-started');
        
        updateProgressBars(days, hours, minutes, moonPhase);
    }
    
    function handleAfterRamadan(now) {
        const sinceEnd = now - ramadanEnd;
        const days = Math.floor(sinceEnd / (1000 * 60 * 60 * 24));
        
        updateDisplay(0, 0, 0, 0);
        
        moonFill.style.width = '100%';
        moonPhaseFill.style.width = '100%';
        moonText.textContent = 'رمضان انتهى';
        
        statusTitle.textContent = "شهر مبارك علينا";
        statusMessage.textContent = `انتهى رمضان منذ ${days} يوم`;
        countdownSubtitle.textContent = "رمضان 1447";
        
        countdownSection.classList.remove('ramadan-started');
        
        updateProgressBars(100, 100, 100, 100);
    }
    
    function updateDisplay(days, hours, minutes, seconds) {
        daysEl.textContent = padNumber(days);
        hoursEl.textContent = padNumber(hours);
        minutesEl.textContent = padNumber(minutes);
        secondsEl.textContent = padNumber(seconds);
        
        animateNumbers(daysEl, hoursEl, minutesEl, secondsEl);
    }
    
    function updateMoonPhase(phase, isRamadan) {
        const percent = Math.min(phase, 100);
        moonFill.style.width = `${percent}%`;
        moonPhaseFill.style.width = `${percent}%`;
        
        if (isRamadan) {
            if (percent < 25) moonText.textContent = 'الهلال يبدأ';
            else if (percent < 50) moonText.textContent = 'الهلال يكبر';
            else if (percent < 75) moonText.textContent = 'نصف القمر';
            else if (percent < 100) moonText.textContent = 'يكتمل القمر';
            else moonText.textContent = 'بدر كامل';
        } else {
            if (percent < 25) moonText.textContent = 'الهلال يتكون';
            else if (percent < 50) moonText.textContent = 'الهلال يكبر';
            else if (percent < 75) moonText.textContent = 'يكتمل القمر';
            else moonText.textContent = 'استعداد نهائي';
        }
    }
    
    function updateProgressBars(days, hours, minutes, moonPhase) {
        const daysPercent = days <= 30 ? (30 - days) / 30 * 100 : 100;
        const hoursPercent = hours <= 24 ? (24 - hours) / 24 * 100 : 100;
        const minutesPercent = minutes <= 60 ? (60 - minutes) / 60 * 100 : 100;
        
        daysProgress.style.width = `${daysPercent}%`;
        hoursProgress.style.width = `${hoursPercent}%`;
        minutesProgress.style.width = `${minutesPercent}%`;
        secondsProgress.style.width = `100%`;
        
        setTimeout(() => {
            const nowSeconds = new Date().getSeconds();
            const secondsPercent = (60 - nowSeconds) / 60 * 100;
            secondsProgress.style.width = `${secondsPercent}%`;
        }, 100);
    }
    
    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    function animateNumbers(...elements) {
        elements.forEach(el => {
            el.style.transform = 'scale(1.2)';
            el.style.color = '#ffd700';
            
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.color = '';
            }, 300);
        });
    }
    
    updateCountdown();
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(updateCountdown, 1000);
    
    console.log('تم تشغيل العداد بنجاح!');
}

// ===== مشغل الصوت =====
function initAudioPlayer() {
    const music = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const volumeBar = document.getElementById('volumeBar');
    const volumeIcon = document.getElementById('volumeIcon');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    if (!music || !playBtn) return;
    
    music.volume = volumeBar.value / 100;
    
    music.addEventListener('loadedmetadata', function() {
        totalTimeEl.textContent = formatTime(music.duration);
    });
    
    music.addEventListener('timeupdate', function() {
        const progress = (music.currentTime / music.duration) * 100 || 0;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(music.currentTime);
        currentMusicTime = music.currentTime;
    });
    
    playBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(e => {
                console.log('يجب التفاعل مع الصفحة أولاً لتشغيل الموسيقى');
            });
        } else {
            music.pause();
        }
    });
    
    progressBar.addEventListener('input', function() {
        const time = (this.value / 100) * music.duration;
        music.currentTime = time;
    });
    
    volumeBar.addEventListener('input', function() {
        music.volume = this.value / 100;
    });
    
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    setTimeout(() => {
        try {
            music.play().then(() => {
                isMusicPlaying = true;
            }).catch(() => {
                isMusicPlaying = false;
            });
        } catch (e) {
            console.log('خطأ في تشغيل الموسيقى:', e);
        }
    }, 2000);
}

// ===== رسالة الدعوة =====
function initInvitation() {
    const invitationCard = document.getElementById('invitationCard');
    const invitationMessage = document.getElementById('invitationMessage');
    const closeMessageBtn = document.getElementById('closeMessageBtn');
    let isTyping = false;
    
    if (!invitationCard || !invitationMessage) return;
    
    invitationCard.addEventListener('click', function() {
        if (isTyping || invitationMessage.textContent.length > 0) return;
        
        isTyping = true;
        invitationMessage.textContent = '';
        
        let index = 0;
        const message = appConfig.invitationMessage;
        
        typingInterval = setInterval(() => {
            if (index < message.length) {
                invitationMessage.textContent += message.charAt(index);
                index++;
                
                const container = invitationMessage.parentElement;
                container.scrollTop = container.scrollHeight;
                
                invitationMessage.style.opacity = Math.min(1, index / 50);
            } else {
                clearInterval(typingInterval);
                isTyping = false;
                
                if (closeMessageBtn) {
                    closeMessageBtn.style.display = 'flex';
                }
            }
        }, 30);
    });
    
    if (closeMessageBtn) {
        closeMessageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            clearInterval(typingInterval);
            invitationMessage.textContent = '';
            invitationMessage.style.opacity = '0';
            this.style.display = 'none';
            isTyping = false;
        });
    }
}

// ===== سلايدر الذكريات =====
function initMemoriesSlider() {
    const sliderWrapper = document.getElementById('memoriesSlider');
    
    if (!sliderWrapper) return;
    
    // إضافة الصور إلى السلايدر
    appConfig.memories.forEach(memory => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <img src="${memory.image}" alt="${memory.title}" loading="lazy" 
                 onerror="this.src='https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
            <div class="slide-overlay">
                <h3>${memory.title}</h3>
                <p>${memory.date}</p>
            </div>
        `;
        
        sliderWrapper.appendChild(slide);
    });
    
    // تهيئة Swiper
    try {
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
    } catch (e) {
        console.log('خطأ في تهيئة السلايدر:', e);
    }
}

// ===== مشغل الفيديو =====
function initVideoPlayer() {
    const video = document.getElementById('memoryVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoControlBtn = document.getElementById('videoControlBtn');
    const videoProgress = document.getElementById('videoProgress');
    const videoTime = document.getElementById('videoTime');
    
    if (!video) return;
    
    video.addEventListener('loadedmetadata', function() {
        if (videoTime) {
            videoTime.textContent = `0:00 / ${formatTime(video.duration)}`;
        }
    });
    
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100 || 0;
        if (videoProgress) videoProgress.value = progress;
        if (videoTime) {
            videoTime.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    });
    
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            video.play();
        });
    }
    
    if (videoControlBtn) {
        videoControlBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
    
    if (videoProgress) {
        videoProgress.addEventListener('input', function() {
            const time = (this.value / 100) * video.duration;
            video.currentTime = time;
        });
    }
    
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// ===== زر المفاجأة =====
function initSurpriseButton() {
    const surpriseButton = document.getElementById('surpriseButton');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const closeSurpriseBtn = document.getElementById('closeSurpriseBtn');
    
    if (!surpriseButton || !surpriseMessage) return;
    
    surpriseButton.addEventListener('click', function() {
        surpriseMessage.style.display = 'block';
        surpriseButton.style.display = 'none';
    });
    
    if (closeSurpriseBtn) {
        closeSurpriseBtn.addEventListener('click', function() {
            surpriseMessage.style.display = 'none';
            surpriseButton.style.display = 'block';
        });
    }
}

// ===== عناصر التحكم =====
function initControlButtons() {
    const themeToggle = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('night-mode');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('هل تريد الخروج من صفحتنا الخاصة؟')) {
                localStorage.removeItem('ramadanLoggedIn');
                
                const music = document.getElementById('backgroundMusic');
                if (music) {
                    music.pause();
                    music.currentTime = 0;
                }
                
                document.getElementById('mainPage').classList.remove('active');
                showLoginPage();
                initLoginPage();
            }
        });
    }
}

// ===== وظائف مساعدة =====
function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    
    if (loginPage) loginPage.classList.remove('hidden');
    if (mainPage) mainPage.classList.remove('active');
}

function showMainPage() {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    
    if (loginPage) loginPage.classList.add('hidden');
    if (mainPage) {
        mainPage.classList.add('active');
        mainPage.style.display = 'flex';
    }
}

function showMessage(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function hideMessage(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// ===== التنظيف عند الخروج =====
window.addEventListener('beforeunload', function() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (typingInterval) clearInterval(typingInterval);
    if (confettiInterval) clearInterval(confettiInterval);
    
    if (swiperInstance) {
        try {
            swiperInstance.destroy(true, true);
        } catch (e) {}
    }
});