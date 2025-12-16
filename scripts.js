document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    const intervalTime = 5000;
    let currentLightboxIndex = 1;

    // --- 1. HOMEPAGE ROTATOR (Using existing photo-XXX files) ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        console.log("Building rotator using photos 001, 002, and 003...");
        
        let slides = [];
        let currentSlide = 0;

        // Automatically create 3 slides using your existing photos
        for (let i = 1; i <= 3; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            img.alt = `Slideshow Photo ${i}`;
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        if (slides.length > 0) {
            slides[0].classList.add('active');
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, intervalTime);
        }
    }

    // --- 2. GALLERY GRID ---
    const gridContainer = document.querySelector('.photo-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (gridContainer && lightbox) {
        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('gallery-thumb');
            
            img.addEventListener('click', function() {
                currentLightboxIndex = i;
                updateLightboxImage();
                lightbox.style.display = "flex"; 
            });
            gridContainer.appendChild(img);
        }

        window.changeImage = function(n) {
            currentLightboxIndex += n;
            if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
            if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
            updateLightboxImage();
        };

        function updateLightboxImage() {
            const padded = String(currentLightboxIndex).padStart(3, '0');
            if (lightboxImg) lightboxImg.src = `images/photo-${padded}.jpg`;
        }

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) closeBtn.onclick = () => lightbox.style.display = "none";
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };
    }
});