// import { Swiper as SwiperHero } from 'swiper';
// import { Pagination, EffectFade } from 'swiper/modules';
// import 'swiper/css';

// const initSwiperHero = () => {
//     const swiper = new SwiperHero('.hero__swiper', {
//         loop: true,
//         slidesPerView: 1,
//         spaceBetween: 0,
//         allowTouchMove: true,
//         effect: 'fade',
//         modules: [Pagination, EffectFade],
//         pagination: {
//             el: '.hero__bullets',
//             clickable: true,
//             renderBullet: (index, className) => {
//                 return `<button class="${className} hero__bullet" type="button" tabindex="0">
//                     <span class="visually-hidden">Слайд ${index + 1}</span>
//                 </button>`;
//             }
//             // renderBullet: function (index, className) {
//             //     return `<button class="${className} hero__bullet"></button>`;
//             // },
           
//         },
//         breakpoints: {
//             1440: {
//                 allowTouchMove: false,
//             },
//         },
//     });

//     const bullets = document.querySelectorAll('.hero__bullet');

//     swiper.on('slideChange', function () {
//         bullets.forEach((bullet) => {
//             bullet.classList.remove('hero__bullet--active');
//         });
//         bullets[swiper.realIndex].classList.add('hero__bullet--active');
//     });

//     bullets[swiper.realIndex].classList.add('hero__bullet--active');

//     const makeBulletsFocusable = () => {
//         bullets.forEach((bullet) => {
//         bullet.setAttribute('tabindex', '0');
//     });
//   }; 
//   makeBulletsFocusable();
//   swiper.on('init', makeBulletsFocusable);
//   swiper.on('slideChange', makeBulletsFocusable);
// };

// initSwiperHero();

// export { initSwiperHero };

import { Swiper as SwiperHero } from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';

const initSwiperHero = () => {
    const swiper = new SwiperHero('.hero__swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        effect: 'fade',
        modules: [Pagination, EffectFade],
        pagination: {
            el: '.hero__bullets',
            clickable: true,
            bulletClass: 'hero__bullet',
            bulletActiveClass: 'hero__bullet--active',
            renderBullet: (index, className) => {
                return `<button class="${className}" type="button" tabindex="-1">
                    <span class="visually-hidden">Слайд ${index + 1}</span>
                </button>`;
            },
        },
        keyboard: { enabled: true, onlyInViewport: false, },
        breakpoints: {
            1440: {
                allowTouchMove: false,
            },
        },
        on: {
            afterInit: (swiper) => {
                updateBullets(swiper);
                const firstBullet = document.querySelector('.hero__bullet');
                if (firstBullet) firstBullet.tabIndex = 0;
            },
            slideChange: (swiper) => updateBullets(swiper),
            transitionEnd: (swiper) => updateBullets(swiper),
        },
    });

    function updateBullets(swiperInstance) {
        const bullets = document.querySelectorAll('.hero__bullet');
        if (!bullets.length || !swiperInstance) return;

        bullets.forEach((bullet, index) => {
            bullet.tabIndex = 0;
            const isActive = index === swiperInstance.realIndex % bullets.length;
            bullet.classList.toggle('hero__bullet--active', isActive);
        });
    }
};

export { initSwiperHero };
