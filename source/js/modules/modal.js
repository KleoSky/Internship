const aboutButton = document.querySelector('.about__button');
const closeButton = document.querySelector('.modal__button-close');
const modal = document.querySelector('.body__modal-wrapper');

// Закрытие модального окна
const modalClose = () => {
  modal.classList.remove('body__modal-wrapper--opened');
  modal.classList.add('body__modal-wrapper--closed');

  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleOutsideClick);
};

// Обработчик нажатия ESC
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    modalClose();
  }
}

// Обработчик клика вне модального окна
function handleOutsideClick(event) {
  if (modal.classList.contains('body__modal-wrapper--opened') &&
      !event.target.closest('.body__modal') &&
      !event.target.closest('.about__button')) {
    modalClose();
  }
}

// Открытие модального окна
const modalOpen = () => {
  modal.classList.remove('body__modal-wrapper--opened');
  modal.classList.add('body__modal-wrapper--closed');

  aboutButton.addEventListener('click', () => {
    if (modal.classList.contains('body__modal-wrapper--opened')) {
      modalClose();
    } else {
      modal.classList.remove('body__modal-wrapper--closed');
      modal.classList.add('body__modal-wrapper--opened');

      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleOutsideClick);
    }
  });
};

closeButton.addEventListener('click', () => {
  modalClose();
});

export {modalOpen};
