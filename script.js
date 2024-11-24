document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.querySelector('.scroll-top');

  if (navbar && scrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('active');
      } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('active');
      }
    });
  }

  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Single implementation of smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: 'smooth'
        });

        // Close mobile menu if open and exists
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Scroll to top functionality
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animation for profile cards
  const observeElements = document.querySelectorAll('.profile-card');
  
  if (observeElements.length > 0) {
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
  }

  // Animation for achievement cards
  const achievementCards = document.querySelectorAll('.achievement-card');

  if (achievementCards.length > 0) {
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
  }

  // Google Maps initialization
  function initMap() {
    if (typeof google === 'undefined' || !document.getElementById("map")) {
      console.warn('Google Maps API or map container not found');
      return;
    }

    try {
      const smkYadika = { lat: -7.0245, lng: 107.5230 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: smkYadika,
      });
      const marker = new google.maps.Marker({
        position: smkYadika,
        map: map,
      });
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  }

  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah terkirim.');
      this.reset();
    });
  }

  // Reveal on scroll animation
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.info-item, .form-group, .social-icon');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const revealTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);

  // Add reveal class to elements
  document.querySelectorAll('.info-item, .form-group, .social-icon').forEach(item => {
    item.classList.add('reveal');
  });

  // Form animation
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      if (this.parentNode) {
        this.parentNode.classList.add('focus');
      }
    });
    
    input.addEventListener('blur', function() {
      if (this.parentNode && this.value === '') {
        this.parentNode.classList.remove('focus');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Game elements
  const quoteElement = document.getElementById('quote');
  const inputElement = document.getElementById('input');
  const timerElement = document.getElementById('timer');
  const wpmElement = document.getElementById('wpm');
  const accuracyElement = document.getElementById('accuracy');
  const startButton = document.getElementById('start-btn');
  const resetButton = document.getElementById('reset-btn');
  const resultsModal = document.getElementById('results-modal');
  const finalWpm = document.getElementById('final-wpm');
  const finalAccuracy = document.getElementById('final-accuracy');
  const completedQuotesElement = document.getElementById('completed-quotes');
  const closeResults = document.getElementById('close-results');

  // Game state
  let currentQuote = '';
  let timeLeft = 15;
  let timer = null;
  let isGameActive = false;
  let startTime = null;
  let totalCorrectChars = 0;
  let totalChars = 0;
  let completedQuotes = 0;

  // Quotes array
  const quotes = [
      "pemrograman",
      "database",
      "algoritma",
      "frontend",
      "backend",
      "framework",
      "api",
      "javascript",
      "python",
      "html",
      "css",
      "sql",
      "php",
      "java",
      "git",
      "komputer",
      "kotlin",
      "ruby",
      "swift",
      "flutter",
      "react",
      "angular",
      "vue",
      "nodejs",
      "expressjs",
      "django",
      "flask",
      "spring",
      "laravel",
      "mongodb",
      "mysql",
      "postgresql",
      "sqlite",
      "microsoft",
      "google",
      "apple",
      "amazon",
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "tiktok",
      "youtube",
      "whatsapp",
      "telegram",
      "discord",
      "slack",
      "zoom",
      "microsoft",
      "google",
      "apple",
      "amazon",
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "tiktok",
      "youtube",
      "whatsapp",
      "telegram",
      "discord",
      "slack",
      "zoom",
      "microsoft",
      "google",
      "apple",
      "amazon",
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
      "tiktok",
      "youtube",
      "whatsapp",
      "telegram",
      "discord",
      "slack",
      "zoom"

  ];

  // Functions
  function getRandomQuote() {
      return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function updateTimerDisplay() {
      timerElement.textContent = timeLeft + 's';
  }

  function calculateWPM(correctChars, totalTimeInMinutes) {
      // Standard WPM calculation (5 characters = 1 word)
      return Math.round((correctChars / 5) / totalTimeInMinutes);
  }

  function calculateAccuracy() {
      return totalChars === 0 ? 0 : Math.round((totalCorrectChars / totalChars) * 100);
  }

  function updateStats() {
      if (isGameActive && startTime) {
          const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
          const wpm = calculateWPM(totalCorrectChars, timeElapsed);
          const accuracy = calculateAccuracy();

          wpmElement.textContent = wpm;
          accuracyElement.textContent = accuracy + '%';
      }
  }

  function highlightText(inputValue) {
      const quoteChars = currentQuote.split('');
      const inputChars = inputValue.split('');
      
      let highlightedHTML = '';
      quoteChars.forEach((char, index) => {
          if (index >= inputChars.length) {
              // Not typed yet
              highlightedHTML += `<span class="remaining">${char}</span>`;
          } else if (char === inputChars[index]) {
              // Correct
              highlightedHTML += `<span class="correct">${char}</span>`;
          } else {
              // Incorrect
              highlightedHTML += `<span class="incorrect">${char}</span>`;
          }
      });
      
      quoteElement.innerHTML = highlightedHTML;
  }

  function startGame() {
      isGameActive = true;
      timeLeft = 15;
      startTime = Date.now();
      totalCorrectChars = 0;
      totalChars = 0;
      completedQuotes = 0;
      
      currentQuote = getRandomQuote();
      quoteElement.textContent = currentQuote;
      inputElement.value = '';
      inputElement.disabled = false;
      inputElement.focus();

      clearInterval(timer);
      timer = setInterval(() => {
          timeLeft--;
          updateTimerDisplay();
          updateStats();
          
          if (timeLeft <= 0) {
              endGame();
          }
      }, 1000);

      startButton.disabled = true;
  }

  function endGame() {
      isGameActive = false;
      clearInterval(timer);
      inputElement.disabled = true;
      startButton.disabled = false;

      const wpm = wpmElement.textContent;
      const accuracy = accuracyElement.textContent;

      finalWpm.textContent = wpm;
      finalAccuracy.textContent = accuracy;
      completedQuotesElement.textContent = completedQuotes;

      resultsModal.style.display = 'flex';
  }

  function resetGame() {
      clearInterval(timer);
      isGameActive = false;
      timeLeft = 15;
      startTime = null;
      totalCorrectChars = 0;
      totalChars = 0;
      completedQuotes = 0;

      updateTimerDisplay();
      wpmElement.textContent = '0';
      accuracyElement.textContent = '0%';
      inputElement.value = '';
      inputElement.disabled = false;
      quoteElement.textContent = 'Tekan "Mulai Tes" Untuk Memulai !';
      startButton.disabled = false;
      resultsModal.style.display = 'none';
  }

  // Event Listeners
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
  closeResults.addEventListener('click', () => {
      resultsModal.style.display = 'none';
      resetGame();
  });

  inputElement.addEventListener('input', (e) => {
      if (!isGameActive) return;

      const inputValue = e.target.value;
      highlightText(inputValue);

      // Update statistics
      totalChars = inputValue.length;
      totalCorrectChars = 0;
      for (let i = 0; i < inputValue.length; i++) {
          if (inputValue[i] === currentQuote[i]) {
              totalCorrectChars++;
          }
      }

      updateStats();

      // Check if quote is completed
      if (inputValue === currentQuote) {
          completedQuotes++;
          currentQuote = getRandomQuote();
          quoteElement.textContent = currentQuote;
          inputElement.value = '';
      }
  });

  // Initialize game
  resetGame();
});
