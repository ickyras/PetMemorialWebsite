document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    const intervalTime = 5000;
    
    // --- PART 1: HOMEPAGE SLIDESHOW ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        let slides = [];
        let currentSlide = 0;
        let autoTimer;

        // Create images 1, 2, and 3
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            img.src = `images/photo-${String(i).padStart(3, '0')}.jpg`;
            img.classList.add('slideshow-image');
            if (i === 1) img.classList.add('active');
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        // Add Arrows to Homepage if they don't exist
        slideshowContainer.innerHTML += `
            <button class="ss-nav-btn ss-prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="ss-nav-btn ss-next" onclick="moveSlide(1)">&#10095;</button>
        `;

        window.moveSlide = function(n) {
            clearInterval(autoTimer); // Reset timer on click
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            startAuto();
        };

        function startAuto() {
            autoTimer = setInterval(() => moveSlide(1), intervalTime);
        }
        startAuto();
    }

    // --- PART 2: GALLERY GRID & LIGHTBOX ---
    const gridContainer = document.querySelector('.photo-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentLightboxIndex = 1;

    if (gridContainer) {
        for (let i = 1; i <= totalImages; i++) {
            const img = document.createElement('img');
            img.src = `images/photo-${String(i).padStart(3, '0')}.jpg`;
            img.classList.add('gallery-thumb');
            img.addEventListener('click', () => {
                currentLightboxIndex = i;
                updateLightbox();
                lightbox.style.display = "flex";
            });
            gridContainer.appendChild(img);
        }
    }

    window.changeImage = function(n) {
        currentLightboxIndex += n;
        if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
        if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
        updateLightbox();
    };

    function updateLightbox() {
        if (lightboxImg) {
            lightboxImg.src = `images/photo-${String(currentLightboxIndex).padStart(3, '0')}.jpg`;
        }
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => lightbox.style.display = "none";
    if (lightbox) lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };
});