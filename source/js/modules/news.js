import { Swiper as SwiperNews } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

const initNewsSlider = () => {
  const newsSlider = document.querySelector('.news__list');
  if (!newsSlider) return;

  // Инициализация слайдера
  const swiper = new SwiperNews(newsSlider, {
    modules: [Navigation, Pagination],
    speed: 500,
    loop: false,
    autoHeight: true,
    slidesPerView: 1,
    // spaceBetween: 20,
    navigation: {
      nextEl: '.news__button-next',
      prevEl: '.news__button-prev',
    },
    pagination: {
      el: '.news__pagination',
      type: 'custom',
      renderCustom: function(swiper, current, total) {
        let paginationHTML = '';
        let start = 1;
        let end = total;
        
        if (total > 4) {
          if (current <= 3) {
            end = 4;
          } else if (current >= total - 2) {
            start = total - 3;
          } else {
            start = current - 2;
            end = current + 1;
          }
        }
        
        for (let i = start; i <= end; i++) {
          paginationHTML += `
            <button class="news__pagination-button ${i === current ? 'active' : ''}" 
              data-index="${i - 1}">
              ${i}
            </button>
          `;
        }
        
        return paginationHTML;
      }
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        direction: 'vertical' // Вертикальная ориентация для планшета
      },
      1440: {
        slidesPerView: 2.5,
        spaceBetween: 30,
        direction: 'horizontal' // Горизонтальная для десктопа
      }
    },
    on: {
      init: function() {
        updateBigSlideClasses(this);
      },
      slideChange: function() {
        updateBigSlideClasses(this);
        this.pagination.render();
        this.pagination.update();
      }
    }
  });

  // Обновление классов для "большого" слайда
  function updateBigSlideClasses(swiperInstance) {
    // Удаляем классы у всех слайдов
    document.querySelectorAll('.news_item-wrapper--big, .news_content--big').forEach(el => {
      el.classList.remove('news_item-wrapper--big', 'news_content--big');
    });
    
    // Добавляем классы к первому элементу активного слайда
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

  // Обработчик для кастомной пагинации
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('news__pagination-button')) {
      const slideIndex = parseInt(e.target.dataset.index);
      swiper.slideTo(slideIndex);
    }
  });
};

document.addEventListener('DOMContentLoaded', initNewsSlider);
export { initNewsSlider };