import { Swiper as SwiperNews } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';


const initSwiperNews = () => {
  const swiper = new SwiperNews('.news__wrapper-second', {
    loop: false,
    loopSlides: 4,
    modules: [Navigation],
    navigation: {
      nextEl: '.news__pagination-arrow--next',
      prevEl: '.news__pagination-arrow--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 0,
        slidesOffsetAfter: 1,
        direction: 'horizontal',
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        allowTouchMove: true,
        direction: 'vertical',
      },
      1440: {
        slidesPerView: 1.38,
        spaceBetween: 32,
        allowTouchMove: false,
        slidesOffsetAfter: 100,
        direction: 'horizontal',
      },
    },
    on: {
      init: function () {
        updateButtonStates(this);
        updateBigSlideClasses(this);
      },
      slideChange: function () {
        updateButtonStates(this);
        updateBigSlideClasses(this);
      },
    },
  });

  function updateButtonStates(swiperInstance) {
    const prevButton = document.querySelector('.news__pagination-arrow--prev');
    const nextButton = document.querySelector('.news__pagination-arrow--next');

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

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('news__pagination-button')) {
      const slideIndex = parseInt(e.target.dataset.index);
      swiper.slideTo(slideIndex);
    }
  });
};

function updateBigSlideClasses(swiperInstance) {
  document.querySelectorAll('.news_item-wrapper--big, .news_content--big').forEach(el => {
    el.classList.remove('news_item-wrapper--big', 'news_content--big');
  });
  
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  if (activeSlide) {
    const firstWrapper = activeSlide.querySelector('.news__item-wrapper:first-child');
    if (firstWrapper) {
      firstWrapper.classList.add('news__item-wrapper--big');
      const content = firstWrapper.querySelector('.news__content');
      if (content) content.classList.add('news__content--big');
    }
  }
}

export { initSwiperNews };


    // pagination: {
    //   el: '.news__pagination-list',
    //   type: 'custom',
    //   clickable: true,
    //   renderCustom: function(swiper, current, total) {
    //     let paginationHTML = '';
    //     let start = 1;
    //     let end = total;
        
    //     if (total > 4) {
    //       if (current <= 3) {
    //         end = 4;
    //       } else if (current >= total - 2) {
    //         start = total - 3;
    //       } else {
    //         start = current - 2;
    //         end = current + 1;
    //       }
    //       for (let i = start; i <= end; i++) {
    //         paginationHTML += `
    //           <button class="news__pagination-button ${i === current ? 'active' : ''}" 
    //             data-index="${i - 1}">
    //             ${i}
    //           </button>
    //         `;
    //       }
          
    //       return paginationHTML;
    //     }
    //   },
    // },