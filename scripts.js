document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 254; 
    const intervalTime = 5000;
    
    // --- PART 1: HOMEPAGE SLIDESHOW ---
    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        let slides = [];
        let currentSlide = 0;
        let autoTimer;

        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            img.src = `images/photo-${String(i).padStart(3, '0')}.jpg`;
            img.classList.add('slideshow-image');
            if (i === 1) img.classList.add('active');
            slideshowContainer.appendChild(img);
            slides.push(img);
        }

        slideshowContainer.innerHTML += `
            <button class="ss-nav-btn ss-prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="ss-nav-btn ss-next" onclick="moveSlide(1)">&#10095;</button>
        `;

        window.moveSlide = function(n) {
            if (slides.length === 0) return;
            clearInterval(autoTimer);
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
            const padded = String(currentLightboxIndex).padStart(3, '0');
            lightboxImg.src = `images/photo-${padded}.jpg`;
        }
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => lightbox.style.display = "none";
    if (lightbox) lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = "none"; };

    // --- PART 3: GUEST BOOK LOGIC ---
    const guestForm = document.getElementById('guestbook-form');
    const entriesContainer = document.getElementById('guestbook-entries');

    if (guestForm && entriesContainer) {
        guestForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('guest-name').value;
            const message = document.getElementById('guest-message').value;
            const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });

            // 1. Create the visual entry on the page
            const newEntry = document.createElement('div');
            newEntry.classList.add('entry');
            newEntry.innerHTML = `
                <h4>${name}</h4>
                <p>${message}</p>
                <small>${date} (Pending Review)</small>
            `;

            // 2. Add it to the top of the list
            entriesContainer.prepend(newEntry);

            // 3. Clear the form
            guestForm.reset();

            // 4. Alert the user (Optional)
            alert("Thank you for your message! It has been added to the session view.");
        });
    }
});