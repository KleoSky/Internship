const initSelectArrow = () => {
  const select = document.querySelector('.modal-form__select');

  if (!select) return;

  // Обработчик события focus (когда селект получает фокус)
  select.addEventListener('focus', () => {
    select.classList.remove('modal-form__select--closed');
    select.classList.add('modal-form__select--opened');
  });

  // Обработчик события blur (когда селект теряет фокус)
  select.addEventListener('blur', () => {
    select.classList.remove('modal-form__select--opened');
    select.classList.add('modal-form__select--closed');
  });

  // Для мобильных устройств (где может не быть событий focus/blur)
  select.addEventListener('change', () => {
    select.classList.remove('modal-form__select--closed');
    select.classList.add('modal-form__select--opened');
  });
};

export { initSelectArrow };
