var swiper2 = new Swiper(".pdpSwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 0,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        direction: "horizontal",
      },
    },
    1001: {
      direction: "vertical",
    },
  },
});
