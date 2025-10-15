const experienceBtn = document.getElementById('experience-btn');
const educationBtn = document.getElementById('education-btn');
const experienceContent = document.getElementById('experience-content');
const educationContent = document.getElementById('education-content');

if (experienceBtn && educationBtn) {
    function showExperience() {
        experienceContent.classList.remove('hidden');
        educationContent.classList.add('hidden');
        experienceBtn.classList.add('active');
        educationBtn.classList.remove('active');
    }

    function showEducation() {
        experienceContent.classList.add('hidden');
        educationContent.classList.remove('hidden');
        experienceBtn.classList.remove('active');
        educationBtn.classList.add('active');
    }

    experienceBtn.addEventListener('click', showExperience);
    educationBtn.addEventListener('click', showEducation);
}



document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

lucide.createIcons();

document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicatorThumb = document.getElementById('scroll-indicator-thumb');
    const scrollIndicatorTrack = document.getElementById('scroll-indicator-track');
    // === TAMBAHKAN INI: Mobile Menu Functionality ===
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileCloseButton = document.getElementById('mobile-close-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    

    if (mobileMenuButton && mobileMenu && mobileCloseButton) {
        // Buka mobile menu
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });

        // Tutup mobile menu
        mobileCloseButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        
        });

        // Tutup mobile menu ketika link diklik
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Tutup mobile menu ketika klik di luar konten
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Scroll Indicator Functionality yang diperbaiki
function initScrollIndicator() {
    const scrollIndicatorThumb = document.getElementById('scroll-indicator-thumb');
    const scrollIndicatorTrack = document.getElementById('scroll-indicator-track');
    
    if (!scrollIndicatorThumb || !scrollIndicatorTrack) {
        console.log('Scroll indicator elements not found');
        return;
    }
    
    let isDragging = false;
    let lastY = 0;
    
    function updateScrollIndicator() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Jika tidak ada konten yang bisa di-scroll, sembunyikan scroll bar
        if (scrollableHeight <= 0) {
            scrollIndicatorTrack.style.opacity = '0';
            return;
        }
        
        scrollIndicatorTrack.style.opacity = '1';
        
        // Hitung tinggi thumb (minimal 40px, maksimal 80% track)
        const thumbHeight = Math.max(40, Math.min((windowHeight / documentHeight) * 100, 80));
        scrollIndicatorThumb.style.height = `${thumbHeight}%`;
        
        // Hitung posisi thumb
        const scrollPercentage = (scrollTop / scrollableHeight) * 100;
        const maxTranslateY = 100 - thumbHeight;
        const translateY = (scrollPercentage * maxTranslateY) / 100;
        
        scrollIndicatorThumb.style.transform = `translateY(${translateY}%)`;
    }
    
    // Fungsi drag
    function startDrag(e) {
        isDragging = true;
        lastY = e.clientY || e.touches[0].clientY;
        scrollIndicatorThumb.style.cursor = 'grabbing';
        scrollIndicatorThumb.style.background = 'linear-gradient(to bottom, #1D4ED8, #0F766E)';
        e.preventDefault();
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!currentY) return;
        
        const deltaY = currentY - lastY;
        lastY = currentY;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        const scrollAmount = (deltaY / windowHeight) * scrollableHeight;
        const newScrollTop = window.pageYOffset + scrollAmount;
        
        window.scrollTo(0, Math.max(0, Math.min(newScrollTop, scrollableHeight)));
    }
    
    function stopDrag() {
        isDragging = false;
        scrollIndicatorThumb.style.cursor = 'grab';
        scrollIndicatorThumb.style.background = 'linear-gradient(to bottom, #3B82F6, #14B8A6)';
    }
    
    // Klik track untuk scroll cepat
    function trackClick(e) {
        const trackRect = scrollIndicatorTrack.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const trackHeight = trackRect.height;
        const thumbHeight = scrollIndicatorThumb.offsetHeight;
        
        const thumbTop = clickY - (thumbHeight / 2);
        const maxThumbTop = trackHeight - thumbHeight;
        const normalizedThumbTop = Math.max(0, Math.min(thumbTop, maxThumbTop));
        
        const scrollPercentage = normalizedThumbTop / (trackHeight - thumbHeight);
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const newScrollTop = scrollPercentage * scrollableHeight;
        
        window.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    scrollIndicatorThumb.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
    
    scrollIndicatorThumb.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('touchend', stopDrag);
    
    scrollIndicatorTrack.addEventListener('click', trackClick);
    
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    
    // Inisialisasi pertama kali
    updateScrollIndicator();
    
    // Force update setelah 100ms untuk memastikan
    setTimeout(updateScrollIndicator, 100);
}
    
    // === TAMBAHKAN INI: Update setActiveNavigation untuk mobile ===
    function setActiveNavigation() {
        // Desktop navigation
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Reset semua desktop links
        navLinks.forEach(link => {
            link.classList.remove('active', 'font-semibold', 'gradient-text');
            link.classList.add('text-gray-400');
        });
        
        // Set active desktop link
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active', 'font-semibold');
                link.classList.remove('text-gray-400');
            }
        });
        
        // Mobile navigation
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        // Reset semua mobile links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active', 'font-semibold');
            link.classList.add('text-gray-400');
        });
        
        // Set active mobile link
        mobileNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active', 'font-semibold');
                link.classList.remove('text-gray-400');
            }
        });
        
        // Handle home page
        if (currentPage === 'index.html' || currentPage === '') {
            const homeLink = document.querySelector('[data-page="home"]');
            const mobileHomeLink = document.querySelector('.mobile-nav-link[data-page="home"]');
            
            if (homeLink) {
                homeLink.classList.add('active', 'font-semibold');
                homeLink.classList.remove('text-gray-400');
            }
            if (mobileHomeLink) {
                mobileHomeLink.classList.add('active', 'font-semibold');
                mobileHomeLink.classList.remove('text-gray-400');
            }
        }
    }

    // Panggil fungsi
    setActiveNavigation();
});
    
    let isDragging = false;
    let lastY = 0;
    
    function updateScrollIndicator() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollableHeight <= 0) return;
        
        // Hitung persentase scroll
        const scrollPercentage = (scrollTop / scrollableHeight) * 100;
        
        // Hitung tinggi thumb berdasarkan rasio konten
        const thumbHeight = Math.max(30, (windowHeight / documentHeight) * 100);
        scrollIndicatorThumb.style.height = `${thumbHeight}%`;
        
        // Update posisi thumb
        const maxTranslateY = 100 - thumbHeight;
        const translateY = (scrollPercentage * maxTranslateY) / 100;
        scrollIndicatorThumb.style.transform = `translateY(${translateY}%)`;
    }
    
    // --- FUNGSI DRAG SCROLL BAR ---
    function startDrag(e) {
        isDragging = true;
        lastY = e.clientY || e.touches[0].clientY;
        scrollIndicatorThumb.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!currentY) return;
        
        const deltaY = currentY - lastY;
        lastY = currentY;
        
        // Hitung scroll amount berdasarkan pergerakan mouse
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        const scrollAmount = (deltaY / windowHeight) * documentHeight;
        const newScrollTop = window.pageYOffset + scrollAmount;
        
        window.scrollTo(0, newScrollTop);
    }
    
    function stopDrag() {
        isDragging = false;
        scrollIndicatorThumb.style.cursor = 'grab';
    }
    
    // --- FUNGSI KLIK TRACK UNTUK SCROLL ---
    function trackClick(e) {
        const trackRect = scrollIndicatorTrack.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const trackHeight = trackRect.height;
        const thumbHeight = scrollIndicatorThumb.offsetHeight;
        
        // Hitung posisi yang diinginkan (center thumb pada posisi klik)
        const thumbTop = clickY - (thumbHeight / 2);
        const maxThumbTop = trackHeight - thumbHeight;
        const normalizedThumbTop = Math.max(0, Math.min(thumbTop, maxThumbTop));
        
        // Konversi ke posisi scroll
        const scrollPercentage = normalizedThumbTop / (trackHeight - thumbHeight);
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const newScrollTop = scrollPercentage * scrollableHeight;
        
        window.scrollTo(0, newScrollTop);
    }
    
    // --- EVENT LISTENERS ---
    
    // Untuk mouse
    scrollIndicatorThumb.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
    
    // Untuk touch devices
    scrollIndicatorThumb.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('touchend', stopDrag);
    
    // Klik pada track untuk scroll cepat
    scrollIndicatorTrack.addEventListener('click', trackClick);
    
    // Mencegah drag pada track (hanya thumb yang bisa didrag)
    scrollIndicatorTrack.addEventListener('mousedown', function(e) {
        if (e.target === scrollIndicatorTrack) {
            trackClick(e);
        }
    });
    
    // Event listener untuk scroll dan resize
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    
    // Inisialisasi
    updateScrollIndicator();
    
    // Typing Effect (jika diperlukan)
    const typingText = document.getElementById('typing-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    if (typingText && typingCursor) {
        const texts = ['Data Analyst', 'Web Developer', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            typingCursor.style.animation = 'blink 1s infinite';
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }

    // Tambahkan di script.js untuk smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

    
    // Inisialisasi Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

// Fungsi untuk mengatur navigasi aktif
function setActiveNavigation() {
    // Dapatkan semua link navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Dapatkan halaman saat ini dari URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Hapus class active dari semua link
    navLinks.forEach(link => {
        link.classList.remove('active', 'font-semibold', 'gradient-text');
        link.classList.add('text-gray-400');
    });
    
    // Tambahkan class active ke link yang sesuai
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active', 'font-semibold');
            link.classList.remove('text-gray-400');
        }
    });
    
    // Handle case untuk home page (index.html)
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('[data-page="home"]');
        if (homeLink) {
            homeLink.classList.add('active', 'font-semibold');
            homeLink.classList.remove('text-gray-400');
        }
    }
}

// Fungsi untuk smooth scrolling (jika menggunakan anchor links)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing features');
    // Set navigasi aktif
    setActiveNavigation();
    initScrollIndicator();
    initTypingEffect();
    initSmoothScrolling();
    initMobileMenu();
    initAboutTabs();
    initSections();
    initScrollSpy();
    
    
    // Scroll Indicator Functionality
    const scrollIndicatorThumb = document.getElementById('scroll-indicator-thumb');
    const scrollIndicatorTrack = document.getElementById('scroll-indicator-track');
    
    let isDragging = false;
    let lastY = 0;
    
    function updateScrollIndicator() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollableHeight <= 0) return;
        
        const scrollPercentage = (scrollTop / scrollableHeight) * 100;
        const thumbHeight = Math.max(30, (windowHeight / documentHeight) * 100);
        scrollIndicatorThumb.style.height = `${thumbHeight}%`;
        
        const maxTranslateY = 100 - thumbHeight;
        const translateY = (scrollPercentage * maxTranslateY) / 100;
        scrollIndicatorThumb.style.transform = `translateY(${translateY}%)`;
    }
    
    // Fungsi drag scroll bar

   // Typing Effect yang diperbaiki
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    if (!typingText || !typingCursor) {
        console.log('Typing effect elements not found');
        return;
    }
    
    const texts = ['Web Developer', 'Data Analyst', 'UI/UX Designer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Menghapus teks
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Mengetik teks
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Animasi kursor berkedip
        typingCursor.style.animation = 'blink 1s infinite';
        
        // Logika pergantian teks
        if (!isDeleting && charIndex === currentText.length) {
            // Jeda setelah selesai mengetik
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Pindah ke teks berikutnya
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Mulai efek typing
    type();
}
    function startDrag(e) {
        isDragging = true;
        lastY = e.clientY || e.touches[0].clientY;
        scrollIndicatorThumb.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!currentY) return;
        
        const deltaY = currentY - lastY;
        lastY = currentY;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        const scrollAmount = (deltaY / windowHeight) * documentHeight;
        const newScrollTop = window.pageYOffset + scrollAmount;
        
        window.scrollTo(0, newScrollTop);
    }
    
    function stopDrag() {
        isDragging = false;
        scrollIndicatorThumb.style.cursor = 'grab';
    }
    
    function trackClick(e) {
        const trackRect = scrollIndicatorTrack.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const trackHeight = trackRect.height;
        const thumbHeight = scrollIndicatorThumb.offsetHeight;
        
        const thumbTop = clickY - (thumbHeight / 2);
        const maxThumbTop = trackHeight - thumbHeight;
        const normalizedThumbTop = Math.max(0, Math.min(thumbTop, maxThumbTop));
        
        const scrollPercentage = normalizedThumbTop / (trackHeight - thumbHeight);
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const newScrollTop = scrollPercentage * scrollableHeight;
        
        window.scrollTo(0, newScrollTop);
    }

    // Fungsi untuk highlight navigasi berdasarkan scroll position
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (sections.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active', 'font-semibold');
                    link.classList.add('text-gray-400');
                    
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active', 'font-semibold');
                        link.classList.remove('text-gray-400');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Fungsi untuk menambahkan ID ke section utama
function initSections() {
    // Tambahkan ID ke section utama di setiap halaman
    const mainSections = {
        'index.html': 'home',
        'about.html': 'about',
        'projects.html': 'projects', 
        'certificates.html': 'certificates',
        'contact.html': 'contact'
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const mainId = mainSections[currentPage];
    
    if (mainId) {
        const mainElement = document.querySelector('main');
        if (mainElement && !mainElement.id) {
            mainElement.id = mainId;
        }
    }
}
    
    // Event listeners untuk scroll bar
    if (scrollIndicatorThumb && scrollIndicatorTrack) {
        scrollIndicatorThumb.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
        
        scrollIndicatorThumb.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', doDrag);
        document.addEventListener('touchend', stopDrag);
        
        scrollIndicatorTrack.addEventListener('click', trackClick);
        
        scrollIndicatorTrack.addEventListener('mousedown', function(e) {
            if (e.target === scrollIndicatorTrack) {
                trackClick(e);
            }
        });
        
        window.addEventListener('scroll', updateScrollIndicator);
        window.addEventListener('resize', updateScrollIndicator);
        
        
        updateScrollIndicator();
    }
    
    // === MOBILE MENU (SUDAH DIPERBAIKI) ===
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileCloseButton = document.getElementById('mobile-close-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu && mobileCloseButton) {
        // Buka mobile menu
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
        });

        // Tutup mobile menu
        mobileCloseButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });

        // Tutup mobile menu ketika link diklik
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Tutup mobile menu ketika klik di luar konten
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    if (typingText && typingCursor) {
        const texts = ['Data Analyst', 'Web Developer', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            typingCursor.style.animation = 'blink 1s infinite';
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
    
    // Inisialisasi Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Fungsi untuk mengatur navigasi aktif
function setActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Reset semua links
    navLinks.forEach(link => {
        link.classList.remove('active', 'font-semibold');
        link.classList.add('text-gray-400');
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('active', 'font-semibold');
        link.classList.add('text-gray-400');
    });
    
    // Set active links
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active', 'font-semibold');
            link.classList.remove('text-gray-400');
        }
    });
    
    mobileNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active', 'font-semibold');
            link.classList.remove('text-gray-400');
        }
    });
    
    // Handle home page
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('[data-page="home"]');
        const mobileHomeLink = document.querySelector('.mobile-nav-link[data-page="home"]');
        
        if (homeLink) {
            homeLink.classList.add('active', 'font-semibold');
            homeLink.classList.remove('text-gray-400');
        }
        if (mobileHomeLink) {
            mobileHomeLink.classList.add('active', 'font-semibold');
            mobileHomeLink.classList.remove('text-gray-400');
        }
    }
}

// Fungsi untuk smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Juga panggil saat halaman selesai load
window.addEventListener('load', function() {
    setTimeout(initScrollIndicator, 100);
    initScrollSpy();
});
