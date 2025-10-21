/**
 * Fungsi inisialisasi utama.
 * Dipanggil setelah seluruh konten HTML (DOM) selesai dimuat.
 */
function init() {
    console.log('DOM loaded - initializing features');
    
    // Inisialisasi semua fungsionalitas
    initAboutTabs();
    initProjectFilters();
    initMobileMenu();
    initTypingEffect();
    initScrollIndicator();
    initSmoothScrolling();
    
    // Navigasi: Atur link aktif berdasarkan URL saat ini
    setActiveNavigation(); 
    
    // Navigasi: Atur link aktif berdasarkan posisi scroll (Scroll Spy)
    initScrollSpy(); 
    
    // Inisialisasi ikon Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * [1] Inisialisasi Tab "About Me" (Experience & Education)
 */
function initAboutTabs() {
    const experienceBtn = document.getElementById('experience-btn');
    const educationBtn = document.getElementById('education-btn');
    const experienceContent = document.getElementById('experience-content');
    const educationContent = document.getElementById('education-content');

    if (experienceBtn && educationBtn && experienceContent && educationContent) {
        
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
}

/**
 * [2] Inisialisasi Filter Proyek
 * (Catatan: HTML untuk .filter-btn tidak ada di index.html, 
 * tapi logikanya disimpan di sini jika Anda menambahkannya nanti)
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Atur tombol aktif
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Tampilkan/sembunyikan kartu proyek
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
}

/**
 * [3] Inisialisasi Mobile Menu (Hamburger Menu)
 * (Catatan: HTML untuk tombol-tombol ini tidak ada di index.html, 
 * tapi logikanya disimpan di sini)
 */
function initMobileMenu() {
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
}

/**
 * [4] Inisialisasi Efek Mengetik (Typing Effect)
 */
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const typingCursor = document.getElementById('typing-cursor');
    
    if (!typingText || !typingCursor) {
        // console.log('Typing effect elements not found');
        return;
    }
    
    const texts = ['Data Analyst', 'Web Developer', 'UI/UX Desain'];
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
            typingSpeed = 1500; // Jeda lebih lama
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

/**
 * [5] Inisialisasi Custom Scroll Indicator (Scrollbar)
 */
/**
 * [5] Inisialisasi Custom Scroll Indicator (Scrollbar)
 * * VERSI PERBAIKAN:
 * Menggunakan perhitungan berbasis PIXEL (px) untuk tinggi dan posisi thumb
 * agar konsisten dan akurat.
 */
function initScrollIndicator() {
    const scrollIndicatorThumb = document.getElementById('scroll-indicator-thumb');
    const scrollIndicatorTrack = document.getElementById('scroll-indicator-track');
    
    if (!scrollIndicatorThumb || !scrollIndicatorTrack) {
        // console.log('Scroll indicator elements not found');
        return;
    }
    
    let isDragging = false;
    let lastY = 0;
    
    // --- FUNGSI UTAMA UNTUK UPDATE SCROLLBAR ---
    function updateScrollIndicator() {
        
        // [PERBAIKAN 1] Dapatkan tinggi dokumen yang lebih akurat
        const documentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        );
        
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Sembunyikan jika halaman tidak bisa di-scroll
        if (scrollableHeight <= 0) {
            scrollIndicatorTrack.style.opacity = '0';
            return;
        }
        scrollIndicatorTrack.style.opacity = '1';

        // [PERBAIKAN 2] Hitung tinggi thumb dalam PIXEL (px)
        const trackHeight = scrollIndicatorTrack.clientHeight;
        const thumbHeightPixels = (windowHeight / documentHeight) * trackHeight;
        const thumbHeightCapped = Math.max(40, thumbHeightPixels); // Minimal 40px
        
        // Set tinggi thumb dalam PX
        scrollIndicatorThumb.style.height = `${thumbHeightCapped}px`; 

        // [PERBAIKAN 3] Hitung posisi thumb dalam PIXEL (px)
        const scrollPercentage = scrollTop / scrollableHeight; // Nilai 0 sampai 1
        const maxTranslateY_Pixels = trackHeight - thumbHeightCapped;
        
        // Pastikan tidak scroll melebihi batas
        const translateY_Pixels = Math.max(0, Math.min(scrollPercentage * maxTranslateY_Pixels, maxTranslateY_Pixels));

        // Set posisi thumb dalam PX
        scrollIndicatorThumb.style.transform = `translateY(${translateY_Pixels}px)`;
    }
    
    // --- Fungsi Drag ---
    function startDrag(e) {
        isDragging = true;
        lastY = e.clientY || e.touches[0].clientY;
        scrollIndicatorThumb.style.cursor = 'grabbing';
        scrollIndicatorThumb.style.background = 'linear-gradient(to bottom, #1D4ED8, #0F766E)'; // Warna aktif
        e.preventDefault();
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!currentY) return;
        
        const deltaY = currentY - lastY;
        lastY = currentY;
        
        // Dapatkan tinggi dokumen yang akurat (sama seperti di updateScrollIndicator)
        const documentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        // Logika drag ini sudah benar (berbasis pixel)
        const trackHeight = scrollIndicatorTrack.clientHeight;
        const thumbHeight = scrollIndicatorThumb.offsetHeight; // Ambil tinggi pixel aktual
        
        // Hindari pembagian dengan nol jika thumb setinggi track
        const scrollableThumbRange = trackHeight - thumbHeight;
        if (scrollableThumbRange <= 0) return;

        const scrollAmount = (deltaY / scrollableThumbRange) * scrollableHeight;
        const newScrollTop = window.pageYOffset + scrollAmount;
        
        window.scrollTo(0, Math.max(0, Math.min(newScrollTop, scrollableHeight)));
    }
    
    function stopDrag() {
        isDragging = false;
        scrollIndicatorThumb.style.cursor = 'grab';
        scrollIndicatorThumb.style.background = 'linear-gradient(to bottom, #3B82F6, #14B8A6)'; // Kembali ke warna normal
    }
    
    // --- Klik Track untuk Scroll Cepat ---
    function trackClick(e) {
        if (e.target !== scrollIndicatorTrack) return;
        
        // Dapatkan tinggi dokumen yang akurat
        const documentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        const trackRect = scrollIndicatorTrack.getBoundingClientRect();
        const clickY = e.clientY - trackRect.top;
        const trackHeight = trackRect.height;
        const thumbHeight = scrollIndicatorThumb.offsetHeight;
        
        const thumbTop = clickY - (thumbHeight / 2);
        const maxThumbTop = trackHeight - thumbHeight;
        const normalizedThumbTop = Math.max(0, Math.min(thumbTop, maxThumbTop));
        
        // Hindari pembagian dengan nol
        const scrollableThumbRange = trackHeight - thumbHeight;
        if (scrollableThumbRange <= 0) return;

        const scrollPercentage = normalizedThumbTop / scrollableThumbRange;
        const newScrollTop = scrollPercentage * scrollableHeight;
        
        window.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
        });
    }
    
    // --- Event Listeners untuk Scrollbar ---
    scrollIndicatorThumb.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
    
    scrollIndicatorThumb.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);
    
    scrollIndicatorTrack.addEventListener('mousedown', trackClick);
    
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    
    // Inisialisasi pertama kali
    updateScrollIndicator();
    setTimeout(updateScrollIndicator, 100); // Panggil lagi untuk akurasi
}


/**
 * [6] Inisialisasi Smooth Scrolling untuk link internal (hash links)
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Pastikan itu bukan hanya hash kosong
            if (href === '#') return; 

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * [7] Atur Navigasi Aktif berdasarkan URL Halaman (Multi-Page App logic)
 */
function setActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Fungsi untuk mereset link
    const resetLink = (link) => {
        link.classList.remove('active', 'font-semibold', 'gradient-text');
        link.classList.add('text-gray-400');
    };

    // Fungsi untuk mengaktifkan link
    const activateLink = (link) => {
        link.classList.add('active', 'font-semibold');
        link.classList.remove('text-gray-400');
    };

    // Reset semua links
    navLinks.forEach(resetLink);
    mobileNavLinks.forEach(resetLink);
    
    // Set active links berdasarkan href
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            activateLink(link);
        }
    });
    
    mobileNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            activateLink(link);
        }
    });
    
    // Handle khusus untuk home page (index.html atau root)
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('.nav-link[data-page="home"]');
        const mobileHomeLink = document.querySelector('.mobile-nav-link[data-page="home"]');
        
        if (homeLink) activateLink(homeLink);
        if (mobileHomeLink) activateLink(mobileHomeLink);
    }
}

/**
 * [8] Inisialisasi Scroll Spy (Single-Page App logic)
 * Memperbarui link navigasi aktif saat scrolling
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Memicu di tengah layar
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
                    
                    // Cocokkan link (href="#about") dengan section (id="about")
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


// === TITIK MASUK UTAMA ===
// Menjalankan fungsi init() setelah DOM siap
document.addEventListener('DOMContentLoaded', init);

// Menjalankan fungsi tertentu setelah semua aset (gambar, dll) dimuat
// Ini penting untuk scroll spy dan scrollbar agar perhitungan tingginya akurat
window.addEventListener('load', function() {
    setTimeout(initScrollIndicator, 100); // Beri jeda sedikit untuk render
    initScrollSpy(); // Perbarui scroll spy setelah semua dimuat
});