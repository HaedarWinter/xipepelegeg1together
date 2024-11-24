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

// script.js
const questions = [
  {
      question: "Apa kepanjangan dari HTML?",
      options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Hybrid Text Modern Language"
      ],
      correct: 0
  },
  {
      question: "Manakah yang bukan merupakan bahasa pemrograman?",
      options: [
          "Python",
          "Java",
          "HTML",
          "Ruby"
      ],
      correct: 2
  },
  {
      question: "Apa fungsi utama CSS?",
      options: [
          "Membuat logika program",
          "Styling dan layout website",
          "Menyimpan data",
          "Mengatur server"
      ],
      correct: 1
  },
  {
      question: "Apa itu variabel?",
      options: [
          "Fungsi matematika",
          "Tag HTML",
          "Tempat menyimpan nilai/data",
          "Jenis website"
      ],
      correct: 2
  },
  {
      question: "Manakah yang merupakan loop dalam JavaScript?",
      options: [
          "if-else",
          "switch",
          "function",
          "for"
      ],
      correct: 3
  }
];

let currentQuestion = 0;
let score = 0;
let answerChecked = false;

function loadQuestion() {
  const question = questions[currentQuestion];
  document.getElementById('question-text').textContent = question.question;
  
  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
      option.textContent = question.options[index];
      option.className = 'option'; // Reset classes
  });
  
  document.getElementById('next-btn').disabled = !answerChecked;
}

function checkAnswer(selectedButton) {
  if (answerChecked) return;
  
  const correct = questions[currentQuestion].correct;
  const options = document.querySelectorAll('.option');
  
  options.forEach((option, index) => {
      if (index === correct) {
          option.classList.add('correct');
      }
      if (selectedButton === option && index !== correct) {
          option.classList.add('wrong');
      }
  });
  
  if (selectedButton === options[correct]) {
      score++;
      document.getElementById('score').textContent = score;
  }
  
  answerChecked = true;
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  answerChecked = false;
  
  if (currentQuestion < questions.length) {
      loadQuestion();
  } else {
      showResults();
  }
}

function showResults() {
  const container = document.querySelector('.quiz-content');
  container.innerHTML = `
      <div class="question-container">
          <h2>Kuis Selesai!</h2>
          <p>Skor akhir Anda: ${score} dari ${questions.length}</p>
          <p>Persentase: ${(score/questions.length * 100).toFixed(1)}%</p>
      </div>
  `;
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('restart-btn').style.display = 'block';
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answerChecked = false;
  document.getElementById('score').textContent = '0';
  document.getElementById('next-btn').style.display = 'block';
  document.getElementById('restart-btn').style.display = 'none';
  loadQuestion();
}

// Inisialisasi kuis
loadQuestion();

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
  const difficultySelect = document.getElementById('difficulty');
  const progressBar = document.getElementById('progress-bar');
  const streakElement = document.getElementById('streak');
  const highScoreElement = document.getElementById('high-score');

  // Sound effects - Using optional chaining to prevent errors if audio fails to load
  const keySound = new Audio();
  const completeSound = new Audio();
  const gameOverSound = new Audio();

  // Game state
  let currentQuote = '';
  let timeLeft = 30;
  let timer = null;
  let isGameActive = false;
  let startTime = null;
  let totalCorrectChars = 0;
  let totalChars = 0;
  let completedQuotes = 0;
  let currentStreak = 0;
  let highScore = localStorage.getItem('typeTestHighScore') || 0;
  let mistakes = 0;
  let lastKeyPressTime = 0;
  let consistencyScores = [];

  // Quotes arrays based on difficulty
  const easyQuotes = [
    "pemrograman", "database", "algoritma", "frontend", "backend",
    "framework", "api", "javascript", "python", "html"
  ];

  const mediumQuotes = [
    "Belajar pemrograman itu menyenangkan",
    "JavaScript adalah bahasa yang powerful",
    "Python sangat mudah dipelajari",
    "Coding adalah masa depan teknologi",
    "Website development membutuhkan kreativitas"
  ];

  const hardQuotes = [
    "Pengembangan aplikasi web modern membutuhkan pemahaman yang mendalam tentang JavaScript.",
    "Framework React telah merevolusi cara kita membangun antarmuka pengguna yang interaktif.",
    "Keamanan sistem adalah aspek crucial dalam pengembangan aplikasi enterprise.",
    "Full-stack developer harus menguasai both frontend dan backend development.",
    "Cloud computing telah mengubah cara perusahaan mengelola infrastruktur IT mereka."
  ];

  // Added missing calculate accuracy function
  function calculateAccuracy() {
    if (totalChars === 0) return 0;
    return Math.round((totalCorrectChars / totalChars) * 100);
  }

  function getRandomQuote() {
    let quotes;
    switch(difficultySelect.value) {
      case 'easy':
        quotes = easyQuotes;
        break;
      case 'medium':
        quotes = mediumQuotes;
        break;
      case 'hard':
        quotes = hardQuotes;
        break;
      default:
        quotes = easyQuotes;
    }
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const progress = (timeLeft / getInitialTime()) * 100;
    progressBar.style.width = `${progress}%`;
    
    if (timeLeft <= 10) {
      progressBar.style.backgroundColor = '#ff4444';
    } else if (timeLeft <= 20) {
      progressBar.style.backgroundColor = '#ffbb33';
    }
  }

  function getInitialTime() {
    switch(difficultySelect.value) {
      case 'easy': return 30;
      case 'medium': return 45;
      case 'hard': return 60;
      default: return 30;
    }
  }

  function calculateWPM(correctChars, totalTimeInSeconds) {
    const minutes = totalTimeInSeconds / 60;
    const words = correctChars / 5;
    return Math.round(words / minutes);
  }

  function calculateConsistency() {
    if (consistencyScores.length < 2) return 100;
    
    const variations = consistencyScores.map((score, i, arr) => {
      if (i === 0) return 0;
      return Math.abs(score - arr[i-1]);
    }).slice(1);
    
    const avgVariation = variations.reduce((a, b) => a + b, 0) / variations.length;
    return Math.max(0, Math.round(100 - avgVariation));
  }

  function updateStats() {
    if (isGameActive && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      const wpm = calculateWPM(totalCorrectChars, timeElapsed);
      const accuracy = calculateAccuracy();
      
      wpmElement.textContent = wpm;
      accuracyElement.textContent = `${accuracy}%`;
      streakElement.textContent = `Streak: ${currentStreak}`;
      
      if (wpm > highScore) {
        highScore = wpm;
        localStorage.setItem('typeTestHighScore', highScore);
        highScoreElement.textContent = `High Score: ${highScore} WPM`;
        highScoreElement.classList.add('highlight');
        setTimeout(() => highScoreElement.classList.remove('highlight'), 1000);
      }

      if (Date.now() - lastKeyPressTime < 1000) {
        consistencyScores.push(wpm);
      }
    }
  }

  function highlightText(inputValue) {
    const quoteChars = currentQuote.split('');
    const inputChars = inputValue.split('');
    
    let highlightedHTML = '';
    let currentMistake = false;
    
    quoteChars.forEach((char, index) => {
      const isSpace = char === ' ';
      const notTypedYet = index >= inputChars.length;
      const isCorrect = char === inputChars[index];
      
      if (notTypedYet) {
        highlightedHTML += `<span class="remaining${isSpace ? ' space' : ''}">${char}</span>`;
      } else if (isCorrect) {
        highlightedHTML += `<span class="correct${isSpace ? ' space' : ''}">${char}</span>`;
        if (currentMistake) currentMistake = false;
      } else {
        highlightedHTML += `<span class="incorrect${isSpace ? ' space' : ''}">${char}</span>`;
        if (!currentMistake) {
          currentMistake = true;
          mistakes++;
        }
      }
    });
    
    quoteElement.innerHTML = highlightedHTML;
  }

  function startGame() {
    isGameActive = true;
    timeLeft = getInitialTime();
    startTime = Date.now();
    totalCorrectChars = 0;
    totalChars = 0;
    completedQuotes = 0;
    currentStreak = 0;
    mistakes = 0;
    consistencyScores = [];
    
    currentQuote = getRandomQuote();
    quoteElement.textContent = currentQuote;
    inputElement.value = '';
    inputElement.disabled = false;
    inputElement.focus();
    
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#4CAF50';
    difficultySelect.disabled = true;

    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      updateStats();
      
      if (timeLeft <= 0) {
        gameOverSound?.play?.();
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
    difficultySelect.disabled = false;

    const wpm = wpmElement.textContent;
    const accuracy = accuracyElement.textContent;
    const consistency = calculateConsistency();

    finalWpm.textContent = wpm;
    finalAccuracy.textContent = accuracy;
    completedQuotesElement.textContent = completedQuotes;

    // Clear previous additional stats if they exist
    const existingStats = resultsModal.querySelector('.additional-stats');
    if (existingStats) {
      existingStats.remove();
    }

    const additionalStats = document.createElement('div');
    additionalStats.classList.add('additional-stats');
    additionalStats.innerHTML = `
      <p>Kesalahan: ${mistakes}</p>
      <p>Konsisten: ${consistency}%</p>
      <p>Sreak Terbanyak: ${currentStreak}</p>
    `;
    resultsModal.querySelector('.stats').appendChild(additionalStats);

    resultsModal.style.display = 'flex';
  }

  function resetGame() {
    clearInterval(timer);
    isGameActive = false;
    timeLeft = getInitialTime();
    startTime = null;
    totalCorrectChars = 0;
    totalChars = 0;
    completedQuotes = 0;
    currentStreak = 0;
    mistakes = 0;
    consistencyScores = [];

    updateTimerDisplay();
    wpmElement.textContent = '0';
    accuracyElement.textContent = '0%';
    streakElement.textContent = 'Streak: 0';
    inputElement.value = '';
    inputElement.disabled = true;
    quoteElement.textContent = '';
    difficultySelect.disabled = false;
    startButton.disabled = false;
  }

  function handleInput(event) {
    if (!isGameActive) return;
    const inputValue = inputElement.value;
    const correctChars = currentQuote.slice(0, inputValue.length);
    
    totalCorrectChars = correctChars.split('').filter((char, index) => char === inputValue[index]).length;
    totalChars = inputValue.length;

    highlightText(inputValue);

    if (inputValue === currentQuote) {
      completedQuotes++;
      currentStreak++;
      currentQuote = getRandomQuote();
      quoteElement.textContent = currentQuote;
      inputElement.value = '';
      completedQuotesElement.textContent = completedQuotes;
      startTime = Date.now();
    }
  }

  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
  inputElement.addEventListener('input', handleInput);
  closeResults.addEventListener('click', () => {
    resultsModal.style.display = 'none';
  });
});
