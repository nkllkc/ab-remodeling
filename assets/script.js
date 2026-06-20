document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = Array.from(document.querySelectorAll('.gallery img, .tile img'));
  if (galleryImages.length === 0) return;

  let currentIndex = 0;

  // Create the lightbox overlay container
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  
  // Create the zoomed image element
  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);

  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.id = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  // Create Prev button
  const prevBtn = document.createElement('span');
  prevBtn.id = 'lightbox-prev';
  prevBtn.innerHTML = '&#10094;'; // Left angle bracket
  lightbox.appendChild(prevBtn);

  // Create Next button
  const nextBtn = document.createElement('span');
  nextBtn.id = 'lightbox-next';
  nextBtn.innerHTML = '&#10095;'; // Right angle bracket
  lightbox.appendChild(nextBtn);

  // Add the lightbox to the document
  document.body.appendChild(lightbox);

  // Attach click listener to each gallery image
  galleryImages.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent body scrolling
    });
  });

  // Render index photo in lightbox
  function showImage(index) {
    if (index < 0) {
      currentIndex = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    const targetImg = galleryImages[currentIndex];
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt || 'Zoomed project photo';

    // Hide navigation if there is only 1 photo
    if (galleryImages.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  // Navigation handlers
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Clicking the image itself advances to the next photo
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    if (galleryImages.length > 1) {
      showImage(currentIndex + 1);
    }
  });

  // Close lightbox when clicking the overlay background or close button
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
      closeLightbox();
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft' && galleryImages.length > 1) {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && galleryImages.length > 1) {
      showImage(currentIndex + 1);
    }
  });

  function closeLightbox() {
    if (lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore page scroll
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightboxImg.src = '';
        }
      }, 300);
    }
  }
});
