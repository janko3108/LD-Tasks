let swiperInstance;
let currentSlideIndex = 0;

function initSwiper(startIndex = 0) {
  const swiperContainer = document.querySelector(".mySwiper");
  swiperContainer.classList.remove("no-swiper");

  swiperInstance = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 500,
    initialSlide: startIndex,
    watchOverflow: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      375: {
        slidesPerView: 1.1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      slideChange: function () {
        currentSlideIndex = this.realIndex;
        console.log("Active slide index:", currentSlideIndex);
        updateArrowVisibility(this);
      },
      afterInit: function () {
        updateArrowVisibility(this);
      },
    },
  });
}

function updateArrowVisibility(swiper) {
  const prevBtn = document.querySelector(".swiper-button-prev");
  const nextBtn = document.querySelector(".swiper-button-next");

  if (prevBtn) prevBtn.style.display = swiper.isBeginning ? "none" : "flex";
  if (nextBtn) nextBtn.style.display = swiper.isEnd ? "none" : "flex";
}

function destroySwiper() {
  if (swiperInstance) {
    currentSlideIndex = swiperInstance.realIndex;
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }

  const swiperEl = document.querySelector(".mySwiper");
  swiperEl.classList.add("no-swiper");
}

document.addEventListener("DOMContentLoaded", () => {
  initSwiper();

  document.getElementById("toggleSwiper").addEventListener("click", () => {
    if (swiperInstance) {
      destroySwiper();
    } else {
      initSwiper(currentSlideIndex);
    }
  });
});
