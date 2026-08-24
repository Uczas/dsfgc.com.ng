// ============================================================
// HAMBURGER MENU TOGGLE
// ============================================================
(function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

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

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
})();

// ============================================================
// SLIDER ENGINE — auto-play, no controls, varied timing & effects
// ============================================================
(function() {
    const sliderIds = [
        'installation', 'maintenance', 'kits',
        'panels', 'batteries', 'controllers', 'electronics',
        'lumos'
    ];

    // Build 4 images for each slider
    sliderIds.forEach(id => {
        const track = document.getElementById(`slider-${id}`);
        if (!track) return;

        track.innerHTML = '';
        for (let i = 1; i <= 4; i++) {
            const img = document.createElement('img');
            img.src = `/images/${id}${i}.jpg`;
            img.alt = `${id} ${i}`;
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

        // Show first image
        const slides = track.querySelectorAll('img');
        if (slides.length) slides[0].classList.add('active');
    });

    // Auto-advance each slider with unique timing and transition effects
    const sliderConfigs = [
        { id: 'installation', min: 3500, max: 5500 },
        { id: 'maintenance', min: 2800, max: 4800 },
        { id: 'kits', min: 4000, max: 6500 },
        { id: 'panels', min: 3000, max: 5000 },
        { id: 'batteries', min: 4500, max: 7000 },
        { id: 'controllers', min: 2500, max: 4500 },
        { id: 'electronics', min: 3800, max: 5800 },
        { id: 'lumos', min: 3200, max: 5200 }
    ];

    sliderConfigs.forEach(config => {
        const track = document.getElementById(`slider-${config.id}`);
        if (!track) return;

        const slides = track.querySelectorAll('img');
        if (slides.length < 2) return;

        let current = 0;

        function advanceSlide() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }

        function scheduleNext() {
            const delay = config.min + Math.random() * (config.max - config.min);
            setTimeout(() => {
                advanceSlide();
                scheduleNext();
            }, delay);
        }

        // Start the cycle
        scheduleNext();
    });
})();