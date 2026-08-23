(function() {
    // ===== CONFIGURATION: all slider IDs and image base names =====
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

    // ===== BUILD 7 IMAGES FOR EACH SLIDER =====
    sliders.forEach(s => {
        const track = document.getElementById(s.id);
        if (!track) return;
        track.innerHTML = '';
        for (let i = 1; i <= 7; i++) {
            const img = document.createElement('img');
            img.src = `/images/${s.base}${i}.jpg`;
            img.alt = `${s.base} ${i}`;
            img.loading = 'lazy';
            // fallback if image missing
            img.onerror = function() {
                this.style.background = '#b293c9';
                this.style.minHeight = '120px';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.alt = '🖼️';
                this.src = ''; // prevent loop
            };
            track.appendChild(img);
        }
        // set first slide active
        const slides = track.querySelectorAll('img');
        if (slides.length) slides[0].classList.add('active');
    });

    // ===== SLIDER CONTROLS: prev/next + indicator update =====
    document.querySelectorAll('.slider-controls').forEach(ctrl => {
        // find target from data-target attribute on buttons or the control itself
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
        // show first
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

    // ===== AUTO-PLAY (optional, subtle) =====
    setInterval(() => {
        document.querySelectorAll('.slider-controls').forEach(ctrl => {
            const nextBtn = ctrl.querySelector('.next');
            if (nextBtn) nextBtn.click();
        });
    }, 7000);

})();
