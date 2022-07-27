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

// Form submit
// document.querySelector(".product__form").addEventListener("change", e => {
//   document.querySelector(".product__price").textContent = "$" + (document.querySelector("input:checked").getAttribute("price") / 100).toFixed(2);
//   document.querySelector("#product_size_master").value = document.querySelector("input:checked").value;
//   document.querySelector("#product_qty_master").value = 1;
// })
