document.addEventListener('DOMContentLoaded', () => {
  // Select all image elements inside gallery tiles
  const galleryImages = document.querySelectorAll('.gallery img, .tile img');
  if (galleryImages.length === 0) return;

  // Create the lightbox overlay container
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  
  // Create the zoomed image element
  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);

  // Create the close close button
  const closeBtn = document.createElement('span');
  closeBtn.id = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  // Add the lightbox to the document
  document.body.appendChild(lightbox);

  // Attach click listener to each gallery image
  galleryImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Zoomed project photo';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent body scrolling
    });
  });

  // Close lightbox when clicking the overlay or close button (but not the image)
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  // Close lightbox on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    if (lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore body scrolling
      // Clear image source after transition finishes to prevent visual flashes
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightboxImg.src = '';
        }
      }, 300);
    }
  }
});
