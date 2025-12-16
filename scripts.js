document.addEventListener('DOMContentLoaded', (event) => {

    // --- CONFIGURATION ---
    // This MUST match the total number of images (photo-001.jpg up to photo-255.jpg)
    const totalImages = 255; 
    const intervalTime = 5000; // 5 seconds for rotation

    // --- FUNCTION 1: HOMEPAGE SLIDESHOW ROTATOR LOGIC ---
    function initializeRotator() {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (!slideshowContainer) return; 

        let slides = []; 
        let currentSlide = 0;

        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0'); 
            const img = document.createElement('img');
            img.src = `images/photo-${paddedIndex}.jpg`; 
            img.classList.add('slideshow-image');
            img.alt = `Pet Photo ${i}`;
            slideshowContainer.appendChild(img);
            slides.push(img); 
        }
        
        // ... (rest of rotator logic)
    }

    // --- FUNCTION 2: GALLERY GRID & LIGHTBOX LOGIC ---
    function initializeGallery() {
        const gridContainer = document.querySelector('.photo-grid-container');
        if (!gridContainer) return; 

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-btn');

        // Loop to create all 255 thumbnails
        for (let i = 1; i <= totalImages; i++) {
            const paddedIndex = String(i).padStart(3, '0');
            const img = document.createElement('img');
            
            img.src = `images/photo-${paddedIndex}.jpg`; 
            
            img.classList.add('gallery-thumb');
            img.alt = `Gallery Photo ${i}`;
            
            // Attaches the click-to-enlarge function
            img.addEventListener('click', function() {
                lightbox.style.display = "block"; 
                lightboxImg.src = this.src; // Set the large image source
            });
            
            gridContainer.appendChild(img);
        }

        closeBtn.onclick = function() {
            lightbox.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == lightbox) {
                lightbox.style.display = "none";
            }
        }
    }

    // --- EXECUTION ---
    initializeRotator();
    initializeGallery();
});