import { Swiper as SwiperNews } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const initSwiperNews = () => {
  new SwiperNews('.news__wrapper-second', {
    loop: false,
    modules: [Navigation],
    navigation: {
      nextEl: '.news__pagination-arrow--next',
      prevEl: '.news__pagination-arrow--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        direction: 'horizontal',
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        direction: 'vertical',
      },
      1440: {
        slidesPerView: 1.379,
        spaceBetween: 75,
        direction: 'horizontal',
        slidesOffsetAfter: 210,
      },
    },
    on: {
      init: function() {
        updateButtonStates(this);
        updateBigSlideClasses(this);
      },
      slideChange: function() {
        updateButtonStates(this);
        updateBigSlideClasses(this);
      }
    },
  });

  function updateButtonStates(swiperInstance) {
    const prevButton = document.querySelector('.news__pagination-arrow--prev');
    const nextButton = document.querySelector('.news__pagination-arrow--next');

    if (prevButton && nextButton) {
      prevButton.disabled = swiperInstance.isBeginning;
      nextButton.disabled = swiperInstance.isEnd;
      prevButton.setAttribute('aria-disabled', swiperInstance.isBeginning);
      nextButton.setAttribute('aria-disabled', swiperInstance.isEnd);
    }
  }

  function updateBigSlideClasses(swiperInstance) {
    document.querySelectorAll('.news__item-wrapper--big, .news__content--big').forEach((el) => {
      el.classList.remove('news__item-wrapper--big', 'news__content--big');
    });

    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    if (activeSlide) {
      const firstWrapper = activeSlide.querySelector('.news__item-wrapper:first-child');
      if (firstWrapper) {
        firstWrapper.classList.add('news__item-wrapper--big');
        const content = firstWrapper.querySelector('.news__content');
        if (content) {
          content.classList.add('news__content--big');
        }
      }
    }
  }
};

export { initSwiperNews };
