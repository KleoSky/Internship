const initSelectArrow = () => {
  const select = document.querySelector('.modal-form__select');

  if (!select) {
    return;
  }

  // Скрываем первый пустой option при открытии
  select.addEventListener('mousedown', () => {
    if (select.options.length > 0 && select.options[0].value === '') {
      select.options[0].hidden = true;
    }
  });

  // Обработчик события focus (когда селект получает фокус)
  select.addEventListener('focus', () => {
    select.classList.remove('modal-form__select--closed');
    select.classList.add('modal-form__select--opened');
  });

  // Обработчик события blur (когда селект теряет фокус)
  select.addEventListener('blur', () => {
    select.classList.remove('modal-form__select--opened');
    select.classList.add('modal-form__select--closed');

    // Возвращаем скрытый option обратно
    if (select.options.length > 0 && select.options[0].value === '') {
      select.options[0].hidden = false;
    }
  });

  // Для мобильных устройств и после выбора значения
  select.addEventListener('change', () => {
    select.classList.remove('modal-form__select--opened');
    select.classList.add('modal-form__select--closed');

    // Возвращаем скрытый option обратно
    if (select.options.length > 0 && select.options[0].value === '') {
      select.options[0].hidden = false;
    }

    // Принудительно вызываем blur для гарантированного закрытия
    select.blur();
  });

  // Дополнительный обработчик для клика вне селекта
  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove('modal-form__select--opened');
      select.classList.add('modal-form__select--closed');

      if (select.options.length > 0 && select.options[0].value === '') {
        select.options[0].hidden = false;
      }
    }
  });
};

export { initSelectArrow };
