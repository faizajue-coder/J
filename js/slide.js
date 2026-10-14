const swiper = new Swiper(".mySwiper", {
  // Loop back to the first slide infinitely
  loop: true,

  // Autoplay configuration
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Pagination (Dots)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}
