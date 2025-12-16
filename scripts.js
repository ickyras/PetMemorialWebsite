document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    
    // --- PART 1: MAIN PAGE SLIDESHOW (4-Second Scroll) ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        let slides = [];
        let currentSlide = 0;

        // Creating the 3 images for the homepage
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            img.src = `images/photo-${String(i).padStart(3, '0')}.jpg`;
            img.classList.add('slideshow-image');
            if (i === 1) img.classList.add('active');
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        // Auto-scroll logic (every 4000ms = 4 seconds)
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); 
    }

    // --- PART 2: GALLERY LIGHTBOX ARROWS ---
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

    // This function is ONLY called by the buttons in the gallery lightbox
    window.changeImage = function(n) {
        currentLightboxIndex += n;
        if (currentLightboxIndex > totalImages) currentLightboxIndex = 1;
        if (currentLightboxIndex < 1) currentLightboxIndex = totalImages;
        updateLightbox();
    };

    function updateLightbox() {
        if (lightboxImg) {
            const padded = String(currentLightboxIndex).padStart(3, '0');
            lightboxImg.src = `images/photo-${padded}.jpg`;
        }
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => lightbox.style.display = "none";
});