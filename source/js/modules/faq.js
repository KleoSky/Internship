// const initAccordion = () => {
//   const accordionItems = document.querySelectorAll('.faq__item');

//   const toggleItem = (item) => {
//     const isOpen = item.classList.contains('faq__item--current');
//     const content = item.querySelector('p');
//     const button = item.querySelector('.faq__button');

//     item.classList.toggle('faq__item--current', !isOpen);
//     button.classList.toggle('faq__button--current', !isOpen);
//     content.style.height = isOpen ? '0' : `${content.scrollHeight}px`;
//   };

//   const defaultItem = document.querySelector('.faq__item[rel="tab-8"]');
//   if (defaultItem) {
//     const content = defaultItem.querySelector('p');
//     content.style.height = `${content.scrollHeight}px`;
//     defaultItem.classList.add('faq__item--current');
//     const button = defaultItem.querySelector('.faq__button');
//     button.classList.add('faq__button--current');
//   }

//   // Обработчики событий
//   accordionItems.forEach((item) => {
//     const button = item.querySelector('.faq__button');
//     button.addEventListener('click', (e) => {
//       e.stopPropagation();
//       toggleItem(item);
//     });

//     item.addEventListener('click', () => {
//       toggleItem(item);
//     });
//   });
// };

// export { initAccordion };

const initAccordion = () => {
  const accordionItems = document.querySelectorAll('.faq__item');

  // Функция для корректного открытия/закрытия
  const toggleItem = (item) => {
    const isOpen = item.classList.contains('faq__item--current');
    const content = item.querySelector('p');
    const button = item.querySelector('.faq__button');

    item.classList.toggle('faq__item--current', !isOpen);
    button.classList.toggle('faq__button--current', !isOpen);

    if (!isOpen) {
      // При открытии - рассчитываем актуальную высоту
      content.style.height = 'auto'; // Временно снимаем ограничения
      const fullHeight = `${content.scrollHeight}px`;
      content.style.height = '0'; // Сбрасываем перед анимацией

      // Запускаем анимацию после расчета
      requestAnimationFrame(() => {
        content.style.height = fullHeight;
      });
    } else {
      // При закрытии - просто схлопываем
      content.style.height = '0';
    }
  };

  // Инициализация дефолтного элемента
  const defaultItem = document.querySelector('.faq__item[rel="tab-8"]');
  if (defaultItem) {
    const content = defaultItem.querySelector('p');
    const button = defaultItem.querySelector('.faq__button');

    // Рассчитываем высоту для дефолтного элемента
    content.style.height = 'auto';
    const fullHeight = `${content.scrollHeight}px`;
    content.style.height = fullHeight;

    defaultItem.classList.add('faq__item--current');
    button.classList.add('faq__button--current');
  }

  // Закрываем все остальные элементы
  accordionItems.forEach((item) => {
    if (item !== defaultItem) {
      const content = item.querySelector('p');
      if (content) {
        content.style.height = '0';
      }
    }
  });

  // Обработчики событий
  accordionItems.forEach((item) => {
    const button = item.querySelector('.faq__button');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleItem(item);
    });
  });
};

export { initAccordion };
