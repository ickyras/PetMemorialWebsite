document.addEventListener('DOMContentLoaded', (event) => {

    // --- CONFIGURATION ---
    const totalImages = 254; 
    const intervalTime = 5000; 
    let currentLightboxIndex = 1; 

    // --- FUNCTION 1: HOMEPAGE SLIDESHOW ROTATOR ---
    function initializeRotator() {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (!slideshowContainer) return; 

        let slides = []; 
        let currentSlide = 0;

        function nextSlide() {
            if (slides.length === 0) return;
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0'); 
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            img.alt = `Pet Photo ${i}`;
            slideshowContainer.appendChild(img);
            slides.push(img); 
        }

        if (slides.length > 0) {
            slides[currentSlide].classList.add('active'); 
            setInterval(nextSlide, intervalTime);
        }
    }

    // --- FUNCTION 2: GALLERY GRID & LIGHTBOX ---
    function initializeGallery() {
        const gridContainer = document.querySelector('.photo-grid-container');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-btn');

        // Stop if elements aren't found on the current page
        if (!gridContainer || !lightbox || !lightboxImg) return; 

        // Create the grid
        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('gallery-thumb');
            img.alt = `Gallery Photo ${i}`;
            
            img.addEventListener('click', function() {
                currentLightboxIndex = i;
                updateLightboxImage();
                lightbox.style.display = "block";
            });
            gridContainer.appendChild(img);
        }

        // Global function for arrows
        window.changeImage = function(n) {
            currentLightboxIndex += n;
            if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
            if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
            updateLightboxImage();
        };

        function updateLightboxImage() {
            const padded = String(currentLightboxIndex).padStart(3, '0');
            lightboxImg.src = `images/photo-${padded}.jpg`;
        }

        // Close logic
        if (closeBtn) {
            closeBtn.onclick = () => lightbox.style.display = "none";
        }
        
        lightbox.onclick = (e) => { 
            if (e.target === lightbox) lightbox.style.display = "none"; 
        };
    }

    // --- EXECUTION ---
    initializeRotator();
    initializeGallery();
});