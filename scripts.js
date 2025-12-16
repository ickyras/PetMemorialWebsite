document.addEventListener('DOMContentLoaded', (event) => {

    // --- CONFIGURATION ---
    // This MUST match the total number of images (photo-001.jpg up to photo-255.jpg)
    const totalImages = 254; 
    const intervalTime = 5000; // 5 seconds for rotation

    // --- FUNCTION 1: HOMEPAGE SLIDESHOW ROTATOR LOGIC ---
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
        // CRUCIAL: Makes the first image visible
        slides[currentSlide].classList.add('active'); 
        
        // CRUCIAL: Starts the timer
        setInterval(nextSlide, intervalTime);
    }
        
        // ... (rest of rotator logic)
    }

    // --- FUNCTION 2: GALLERY GRID & LIGHTBOX LOGIC ---
 document.addEventListener('DOMContentLoaded', (event) => {
    const totalImages = 254; 
    const intervalTime = 5000;
    let currentLightboxIndex = 1; // Tracks which photo is open

    // --- HOME PAGE ROTATOR ---
    function initializeRotator() {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (!slideshowContainer) return; 
        // ... (your existing rotator code here)
    }

    // --- GALLERY & LIGHTBOX ---
    function initializeGallery() {
        const gridContainer = document.querySelector('.photo-grid-container');
        if (!gridContainer) return; 

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('gallery-thumb');
            
            img.addEventListener('click', function() {
                currentLightboxIndex = i;
                updateLightboxImage();
                lightbox.style.display = "block";
            });
            gridContainer.appendChild(img);
        }

        // Global function to change images (needed for the arrows)
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
        document.querySelector('.close-btn').onclick = () => lightbox.style.display = "none";
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };
    }

    initializeRotator();
    initializeGallery();
});