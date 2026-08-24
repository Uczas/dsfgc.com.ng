// ============================================================
// HAMBURGER MENU TOGGLE
// ============================================================
(function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

})();

(function() {
    // ============================================================
    // CONFIGURATION: all slider IDs and image base names
    // ============================================================
    const sliders = [
        { id: 'slider-installation', base: 'installation' },
        { id: 'slider-maintenance', base: 'maintenance' },
        { id: 'slider-kits', base: 'kits' },
        { id: 'slider-panels', base: 'panels' },
        { id: 'slider-batteries', base: 'batteries' },
        { id: 'slider-controllers', base: 'controllers' },
        { id: 'slider-electronics', base: 'electronics' },
        { id: 'slider-lumos', base: 'lumos' }
    ];

    // ============================================================
    // BUILD 7 IMAGES FOR EACH SLIDER
    // ============================================================
    sliders.forEach(s => {
        const track = document.getElementById(s.id);
        if (!track) return;
        track.innerHTML = '';
        for (let i = 1; i <= 7; i++) {
            const img = document.createElement('img');
            img.src = `/images/${s.base}${i}.jpg`;
            img.alt = `${s.base} ${i}`;
            img.loading = 'lazy';
            img.onerror = function() {
                this.style.background = '#b293c9';
                this.style.minHeight = '120px';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.alt = '📷';
                this.src = '';
            };
            track.appendChild(img);
        }
        const slides = track.querySelectorAll('img');
        if (slides.length) slides[0].classList.add('active');
    });

    // ============================================================
    // SLIDER CONTROLS: prev/next + indicator update
    // ============================================================
    document.querySelectorAll('.slider-controls').forEach(ctrl => {
        let target = ctrl.dataset.target;
        if (!target) {
            const btn = ctrl.querySelector('.slider-btn');
            if (btn) target = btn.dataset.target;
        }
        if (!target) return;

        const track = document.getElementById(`slider-${target}`);
        if (!track) return;
        const slides = track.querySelectorAll('img');
        if (slides.length === 0) return;

        let current = 0;
        slides.forEach((img, idx) => img.classList.toggle('active', idx === 0));
        const indicator = ctrl.querySelector('.slide-indicator');
        if (indicator) indicator.textContent = `1/${slides.length}`;

        const updateSlide = (index) => {
            current = (index + slides.length) % slides.length;
            slides.forEach((img, idx) => img.classList.toggle('active', idx === current));
            if (indicator) indicator.textContent = `${current+1}/${slides.length}`;
        };

        const prevBtn = ctrl.querySelector('.prev');
        const nextBtn = ctrl.querySelector('.next');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlide(current - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlide(current + 1);
            });
        }
    });

    // ============================================================
    // AUTO-PLAY (optional)
    // ============================================================
    setInterval(() => {
        document.querySelectorAll('.slider-controls').forEach(ctrl => {
            const nextBtn = ctrl.querySelector('.next');
            if (nextBtn) nextBtn.click();
        });
    }, 6000);

})();
