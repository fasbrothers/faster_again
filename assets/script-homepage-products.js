var swiper = new Swiper(".swiperProducts", {
  slidesPerView: 1,
  spaceBetween: 18,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragSize: 215,
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});
