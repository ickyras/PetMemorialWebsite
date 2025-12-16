document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; // Total images for the Gallery
    const slideshowCount = 7; // Number of images for the Homepage Rotator
    
    // --- PART 1: HOMEPAGE AUTOMATIC SLIDESHOW (First 7 Photos) ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        let slides = [];
        let currentSlide = 0;

        // Loop through only the first 7 photos for the homepage
        for (let i = 1; i <= slideshowCount; i++) {
            const img = document.createElement('img');
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            
            // Make the very first image visible immediately
            if (i === 1) img.classList.add('active');
            
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        // Automatic transition every 4 seconds
        if (slides.length > 0) {
            setInterval(() => {
                // Hide current photo
                slides[currentSlide].classList.remove('active');
                
                // Move to next photo (loops back to 1 after 7)
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Show next photo
                slides[currentSlide].classList.add('active');
            }, 4000);
        }
    }

    // --- PART 2: GALLERY GRID & LIGHTBOX (All 254 Photos) ---
    const gridContainer = document.querySelector('.photo-grid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentLightboxIndex = 1;

    if (gridContainer) {
        // This loop still goes all the way to 254
        for (let i = 1; i <= totalImages; i++) {
            const img = document.createElement('img');
            const paddedIndex = String(i).padStart(3, '0');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('gallery-thumb');
            img.loading = "lazy";
            
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

    // Navigation arrows in the Gallery Lightbox
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