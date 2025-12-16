document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    const intervalTime = 5000;
    let currentLightboxIndex = 1;

    // --- 1. HOMEPAGE ROTATOR ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        const slides = slideshowContainer.querySelectorAll('.slideshow-image');
        let currentSlide = 0;
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
        console.log("Gallery container found. Loading images...");

        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            
            // Adjust the path below if your filenames are different
            const imagePath = `images/photo-${paddedIndex}.jpg`; 
            
            img.src = imagePath; 
            img.classList.add('gallery-thumb');
            img.alt = `Gallery Photo ${i}`;

            img.onerror = function() {
                // If it fails, we see exactly why in the console (F12)
                console.error("Failed to load: " + this.src);
            };

            img.addEventListener('click', function() {
                currentLightboxIndex = i;
                updateLightboxImage();
                lightbox.style.display = "flex"; 
            });

            gridContainer.appendChild(img);
        }

        // Arrow Navigation Function
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

        // Close logic
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => lightbox.style.display = "none";
        }
        
        lightbox.onclick = (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        };
    }
});