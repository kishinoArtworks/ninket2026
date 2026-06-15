// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements to animate
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple particle generator for background
  createParticles();
});

function createParticles() {
  const container = document.getElementById('bg-particles');
  if (!container) return;
  
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Styling
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.left = `${x}vw`;
    particle.style.top = `${y}vh`;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    
    container.appendChild(particle);
  }
  
  // Add animation keyframes dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Lightbox logic
document.addEventListener('DOMContentLoaded', () => {
  const karmaImg = document.getElementById('karma-art-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (karmaImg && lightbox && lightboxImg) {
    karmaImg.addEventListener('click', () => {
      lightboxImg.src = karmaImg.src;
      lightbox.classList.add('active');
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
});
