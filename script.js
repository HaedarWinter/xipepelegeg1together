document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      scrollTop.classList.add('active');
    } else {
      navbar.classList.remove('scrolled');
      scrollTop.classList.remove('active');
    }
  });

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50, // Offset untuk navbar jika navbar menutupi bagian atas
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      navLinks.classList.remove('active');
    });
  });

  // Scroll to top functionality
  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add animation to profile cards on scroll
  const observeElements = document.querySelectorAll('.profile-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
  });
});

// Animation for achievement cards on scroll
const achievementCards = document.querySelectorAll('.achievement-card');

const achievementsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

achievementCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  achievementsObserver.observe(card);
});

// Inisialisasi peta
// Inisialisasi peta
function initMap() {
  const smkYadika = { lat: -7.0245, lng: 107.5230 }; // Ganti dengan koordinat yang tepat
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: smkYadika,
  });
  const marker = new google.maps.Marker({
    position: smkYadika,
    map: map,
  });
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Di sini Anda bisa menambahkan logika untuk mengirim data formulir
  alert('Terima kasih! Pesan Anda telah terkirim.');
  this.reset();
});

// Animasi smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Tambahkan ini ke JavaScript yang sudah ada

// Animasi smooth reveal saat scroll
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  var reveals = document.querySelectorAll('.info-item, .form-group, .social-icon');
  
  for(var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 150;
    
    if(revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

// Tambahkan class untuk animasi
document.querySelectorAll('.info-item, .form-group, .social-icon').forEach(item => {
  item.classList.add('reveal');
});

// Animasi label form
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentNode.classList.add('focus');
  });
  input.addEventListener('blur', function() {
    if(this.value === '') {
      this.parentNode.classList.remove('focus');
    }
  });
});
