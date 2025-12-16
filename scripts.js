document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    const intervalTime = 5000;

    // --- 1. HOMEPAGE ROTATOR ---
    const slideshowContainer = document.getElementById('slideshow-container');
    
    if (slideshowContainer) {
        console.log("Building rotator...");
        
        let slides = [];
        let currentSlide = 0;

        // Create 3 slides (photo-001, 002, 003)
        for (let i = 1; i <= 3; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            img.alt = `Slideshow Photo ${i}`;
            
            // If it's the first image, make it visible immediately
            if (i === 1) img.classList.add('active');
            
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        // Only start the timer if we actually have images
        if (slides.length > 0) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, intervalTime);
        }
    }

    // --- 2. GALLERY GRID (Only runs if the grid exists) ---
    const gridContainer = document.querySelector('.photo-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // We check for gridContainer first so this doesn't break the Homepage
    if (gridContainer) {
        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('gallery-thumb');
            
            img.addEventListener('click', function() {
                if (lightbox && lightboxImg) {
                    currentLightboxIndex = i;
                    updateLightboxImage();
                    lightbox.style.display = "flex"; 
                }
            });
            gridContainer.appendChild(img);
        }
    }

    // --- 3. LIGHTBOX UTILITIES ---
    let currentLightboxIndex = 1;

    window.changeImage = function(n) {
        currentLightboxIndex += n;
        if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
        if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
        updateLightboxImage();
    };

    function updateLightboxImage() {
        const padded = String(currentLightboxIndex).padStart(3, '0');
        if (lightboxImg) {
            lightboxImg.src = `images/photo-${padded}.jpg`;
        }
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn && lightbox) {
        closeBtn.onclick = () => lightbox.style.display = "none";
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };
    }
});