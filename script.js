// Carrossel principal
const initMainCarousel = () => {
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  const slideCount = carouselSlides.length;
  const slideWidth = carouselSlides[0].clientWidth;
  let interval;

  // Criar dots de navegação
  const createDots = () => {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };

  // Atualizar dots ativos
  const updateDots = () => {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  // Ir para slide específico
  const goToSlide = (index) => {
    currentIndex = index;
    carouselTrack.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
    updateDots();
    resetInterval();
  };

  // Slide anterior
  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    carouselTrack.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
    updateDots();
    resetInterval();
  };

  // Próximo slide
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slideCount;
    carouselTrack.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
    updateDots();
    resetInterval();
  };

  // Reiniciar intervalo do carrossel automático
  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  };

  // Iniciar carrossel automático
  const startAutoPlay = () => {
    interval = setInterval(nextSlide, 5000);
  };

  // Event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Pausar carrossel quando o mouse estiver sobre ele
  const carousel = document.querySelector(".image-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(interval));
  carousel.addEventListener("mouseleave", startAutoPlay);

  // Inicialização
  createDots();
  startAutoPlay();
};

// Carrossel de jogos
const initGamesCarousel = () => {
  const gamesCarousel = document.querySelector(".games-carousel");
  const gameCards = document.querySelectorAll(".game-card");
  const gamePrevBtn = document.querySelector(".prev-btn");
  const gameNextBtn = document.querySelector(".next-btn");

  let gameIndex = 0;
  const cardWidth = gameCards[0].clientWidth + 32; // Largura do card + gap

  gamePrevBtn.addEventListener("click", () => {
    gameIndex = Math.max(gameIndex - 1, 0);
    gamesCarousel.scrollTo({
      left: gameIndex * cardWidth,
      behavior: "smooth",
    });
  });

  gameNextBtn.addEventListener("click", () => {
    gameIndex = Math.min(gameIndex + 1, gameCards.length - 1);
    gamesCarousel.scrollTo({
      left: gameIndex * cardWidth,
      behavior: "smooth",
    });
  });
};

// Menu mobile
const initMobileMenu = () => {
  const menuToggle = document.createElement("button");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
  menuToggle.setAttribute("aria-label", "Menu mobile");

  const headerContent = document.querySelector(".header-content");
  headerContent.prepend(menuToggle);

  const headerNav = document.querySelector(".header-navigation");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    headerNav.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".header-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      headerNav.classList.remove("active");
    });
  });
};

// Newsletter form
const initNewsletter = () => {
  const newsletterForm = document.querySelector(".footer-newsletter-form");
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input").value;

    // Validação simples de e-mail
    if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, insira um e-mail válido");
      return;
    }

    // Simulação de envio
    alert(`Obrigado por se inscrever com o e-mail: ${email}`);
    this.reset();
  });
};

// Efeito Ripple nos botões
const initRippleEffect = () => {
  const actionButtons = document.querySelectorAll(".action-btn, .cta-button");

  const createRipple = (e, button) => {
    const x = e.clientX - button.getBoundingClientRect().left;
    const y = e.clientY - button.getBoundingClientRect().top;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRipple(e, this);
    });
  });
};

// Inicialização de todos os componentes
document.addEventListener("DOMContentLoaded", () => {
  initMainCarousel();
  initGamesCarousel();
  initMobileMenu();
  initNewsletter();
  initRippleEffect();

  // Adiciona classe de carregamento para transições suaves após o load
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
