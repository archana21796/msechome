function toggleMenu() {
  const nav = document.querySelector('nav');       // target the <nav> element
  const navLinks = document.getElementById('navLinks'); // your nav links container
  const body = document.body; 
  
  navLinks.classList.toggle('show');
  nav.classList.toggle('expanded'); 
 body.classList.toggle('no-padding');
}
    const words = ["nationwide", "worldwide", "statewide"];
  let index = 0;
const wordElement = document.querySelector(".changing-word");

  setInterval(() => {
    wordElement.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % words.length;
      wordElement.textContent = words[index];
      wordElement.style.opacity = 1;
    }, 500); 
  }, 3000);


document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const duration = 2000;
    const stepTime = 50;
    const increment = target / (duration / stepTime);

    function updateCounter() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        setTimeout(updateCounter, stepTime);
      } else {
        counter.textContent = target;
      }
    }

    updateCounter(); 
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const scrollGallery = document.querySelector('.scroll-gallery');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scrollGallery.classList.add('zoomed');
            // Optional: Unobserve after first animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Triggers when 30% of the element is visible
      }
    );

    if (scrollGallery) {
      observer.observe(scrollGallery);
    }
  });

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.placement-container');
  let hasAnimated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        startCounting();
        hasAnimated = true; // ensures it runs only once
      }
    });
  }, {
    threshold: 0.5
  });

  if (section) {
    observer.observe(section);
  }
});



function startCounting() {
  const targetValues = {
  recruiters: { value: 368, suffix: '+' },
  companies: { value: 18, suffix: '+' },
  placements: { value: 90.58, suffix: '%' }
  };

  const duration = 2000;
  const intervalTime = 50;
  const steps = duration / intervalTime;

  let recruiterCount = 0, companyCount = 0, placementCount = 0;

  const interval = setInterval(() => {
    recruiterCount += targetValues.recruiters.value / steps;
    companyCount += targetValues.companies.value / steps;
    placementCount += targetValues.placements.value / steps;

    document.getElementById('recruiters').textContent =
      Math.min(Math.round(recruiterCount), targetValues.recruiters.value) + targetValues.recruiters.suffix;

    document.getElementById('companies').textContent =
      Math.min(Math.round(companyCount), targetValues.companies.value) + targetValues.companies.suffix;

    document.getElementById('placements').textContent =
      Math.min(Math.round(placementCount), targetValues.placements.value) + targetValues.placements.suffix;

    if (
      recruiterCount >= targetValues.recruiters.value &&
      companyCount >= targetValues.companies.value &&
      placementCount >= targetValues.placements.value
    ) {
      clearInterval(interval);
    }
  }, intervalTime);
}
  

fetch('googlereview.php')
  .then(response => response.json())
  .then(reviews => {
    const carouselInner = document.getElementById('google-carousel-inner');
    carouselInner.innerHTML = '';

    reviews.forEach((review, index) => {
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      const activeClass = index === 0 ? 'active' : '';

      const item = `
        <div class="carousel-item  ${activeClass}">
          <div class=" p-4 centertext testimonial-card  bg-white text-center">
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
const hrCarousel = new bootstrap.Carousel(document.getElementById('hrCarousel'));
const alumniCarousel = new bootstrap.Carousel(document.getElementById('alumniCarousel'));
const googleCarousel = new bootstrap.Carousel(document.getElementById('googleCarousel'));

function slideAll(direction) {
  if (direction === 'next') {
    hrCarousel.next();
    alumniCarousel.next();
    googleCarousel.next();
  } else if (direction === 'prev') {
    hrCarousel.prev();
    alumniCarousel.prev();
    googleCarousel.prev();
  }
}

// Select all prev buttons on page and bind event
document.querySelectorAll('.carousel-control-prev').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    slideAll('prev');
  });
});

// Select all next buttons on page and bind event
document.querySelectorAll('.carousel-control-next').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    slideAll('next');
  });
});
