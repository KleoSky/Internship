import { Swiper as SwiperReviews } from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';

const initSwiperRewiews = () => {
  new SwiperReviews('.reviews__swiper', {
    loop: false,
    modules: [Navigation, Scrollbar],
    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev',
    },
    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
      hide: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        slidesOffsetAfter: 1,
      },
      768: {
        slidesPerView: 1.278,
        spaceBetween: 30,
        allowTouchMove: true,
        slidesOffsetAfter: 48,
        scrollbar: {
          snapOnRelease: true,
          dragSize: 326,
        }
      },
      1440: {
        slidesPerView: 2,
        allowTouchMove: false,
        slidesOffsetAfter: 2,
        scrollbar: {
          snapOnRelease: true,
          dragSize: 394,
        }
      },
    },
    on: {
      init: function () {
        updateButtonStates(this);
        updateScrollbar(this);
      },
      slideChange: function () {
        updateButtonStates(this);
        updateScrollbar(this);
      },
    },
  });

  function updateButtonStates(swiperInstance) {
    const prevButton = document.querySelector('.reviews__button--prev');
    const nextButton = document.querySelector('.reviews__button--next');

    prevButton.disabled = false;
    nextButton.disabled = false;

    if (swiperInstance.isBeginning) {
      prevButton.disabled = true;
      prevButton.setAttribute('aria-disabled', 'true');
    } else {
      prevButton.disabled = false;
      prevButton.setAttribute('aria-disabled', 'false');
    }

    if (swiperInstance.isEnd) {
      nextButton.disabled = true;
      nextButton.setAttribute('aria-disabled', 'true');
    } else {
      nextButton.disabled = false;
      nextButton.setAttribute('aria-disabled', 'false');
    }
  }

  function updateScrollbar (swiperInstance) {
    const scrollbar = swiperInstance.scrollbar;
    if (scrollbar && scrollbar.drag) {
      const progress = swiperInstance.peogress;
      scrollbar.drag.style.transform = `translate3d(${progress * 100}%, 0, 0)`;
    }
  }
};

export { initSwiperRewiews };
