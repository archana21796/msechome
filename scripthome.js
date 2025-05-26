// Toggle Navigation Menu
function toggleMenu() {
  const nav = document.querySelector('nav');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  navLinks.classList.toggle('show');
  nav.classList.toggle('expanded');

  if (nav.classList.contains('expanded')) {
    body.classList.add('no-padding');
  } else {
    body.classList.remove('no-padding');
  }
}

// Rotate Words in Hero Section


// Animate Counters on Scroll
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const stepTime = 50;
        const increment = target / (duration / stepTime);
        let count = 0;

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.floor(count);
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

// Initialize Carousels
document.addEventListener('DOMContentLoaded', () => {
  const hrCarousel = document.getElementById('hrCarousel');
  const alumniCarousel = document.getElementById('alumniCarousel');
  const googleCarousel = document.getElementById('googleCarousel');

  if (hrCarousel) new bootstrap.Carousel(hrCarousel);
  if (alumniCarousel) new bootstrap.Carousel(alumniCarousel);
  if (googleCarousel) new bootstrap.Carousel(googleCarousel);

  function slideAll(direction) {
    if (direction === 'next') {
      if (hrCarousel) bootstrap.Carousel.getInstance(hrCarousel).next();
      if (alumniCarousel) bootstrap.Carousel.getInstance(alumniCarousel).next();
      if (googleCarousel) bootstrap.Carousel.getInstance(googleCarousel).next();
    } else if (direction === 'prev') {
      if (hrCarousel) bootstrap.Carousel.getInstance(hrCarousel).prev();
      if (alumniCarousel) bootstrap.Carousel.getInstance(alumniCarousel).prev();
      if (googleCarousel) bootstrap.Carousel.getInstance(googleCarousel).prev();
    }
  }

  document.querySelectorAll('.carousel-control-prev').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      slideAll('prev');
    });
  });

  document.querySelectorAll('.carousel-control-next').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      slideAll('next');
    });
  });
});

// Fetch and Display Google Reviews
document.addEventListener('DOMContentLoaded', () => {
  fetch('googlereview.php')
    .then(response => response.json())
    .then(reviews => {
      const carouselInner = document.getElementById('google-carousel-inner');
      if (!carouselInner) return;

      carouselInner.innerHTML = '';

      reviews.forEach((review, index) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const activeClass = index === 0 ? 'active' : '';

        const item = `
          <div class="carousel-item ${activeClass}">
            <div class="p-4 centertext testimonial-card bg-white text-center">
              <div class="text-warning mb-2 fs-5">${stars}</div>
              <div class="testimonial-content">
                <p>"${review.text}"</p>
              </div>
              <small class="fw-bold">– ${review.author_name}</small>
            </div>
          </div>
        `;

        carouselInner.insertAdjacentHTML('beforeend', item);
      });
    })
    .catch(error => {
      console.error('Failed to load Google reviews:', error);
    });
});
