document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    
    // --- PART 1: HOMEPAGE AUTOMATIC SLIDESHOW ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        let slides = [];
        let currentSlide = 0;

        // Create exactly 3 images for the homepage rotator
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            
            // Make the first image visible immediately
            if (i === 1) img.classList.add('active');
            
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        // Automatic transition every 4 seconds
        if (slides.length > 0) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }
    }

    // --- PART 2: GALLERY GRID & LIGHTBOX ---
    const gridContainer = document.querySelector('.photo-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentLightboxIndex = 1;

    if (gridContainer) {
        for (let i = 1; i <= totalImages; i++) {
            const img = document.createElement('img');
            const paddedIndex = String(i).padStart(3, '0');
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

    // This function handles the manual arrows in the Gallery Lightbox
    window.changeImage = function(n) {
        currentLightboxIndex += n;
        if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
        if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
        updateLightboxImage();
    };

    function updateLightboxImage() {
        if (lightboxImg) {
            const padded = String(currentLightboxIndex).padStart(3, '0');
            lightboxImg.src = `images/photo-${padded}.jpg`;
        }
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn && lightbox) {
        closeBtn.onclick = () => lightbox.style.display = "none";
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };
    }
});