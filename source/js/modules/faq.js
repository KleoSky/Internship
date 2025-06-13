const initAccordion = () => {
  const accordionItems = document.querySelectorAll('.faq__item');

  const toggleItem = (item) => {
    const isOpen = item.classList.contains('faq__item--current');
    const content = item.querySelector('p');
    const button = item.querySelector('.faq__button');

    item.classList.toggle('faq__item--current', !isOpen);
    button.classList.toggle('faq__button--current', !isOpen);
    content.style.height = isOpen ? '0' : `${content.scrollHeight}px`;
  };

  const defaultItem = document.querySelector('.faq__item[rel="tab-8"]');
  if (defaultItem) {
    const content = defaultItem.querySelector('p');
    content.style.height = `${content.scrollHeight}px`;
    defaultItem.classList.add('faq__item--current');
    const button = defaultItem.querySelector('.faq__button');
    button.classList.add('faq__button--current');
  }

  // Обработчики событий
  accordionItems.forEach((item) => {
    const button = item.querySelector('.faq__button');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleItem(item);
    });

    item.addEventListener('click', () => {
      toggleItem(item);
    });
  });
};

export { initAccordion };
