// const initAccordion = () => {
//   const state = new Map();

//   const saveState = () => {
//     const toSave = Array.from(state.entries());
//     localStorage.setItem('accordionState', JSON.stringify(toSave));
//   };

//   const setDefaultState = () => {
//     const defaultItem = document.querySelector('.faq__item[rel="tab8"]');

//     if (defaultItem) {
//       defaultItem.classList.add('faq__item--current');
//       defaultItem.querySelector('.faq__button').classList.add('faq__button--current');

//       const content = defaultItem.querySelector('p');
//       content.style.height = `${content.scrollHeight}px`;

//       state.set('tab8');
//       saveState();
//     }
//   };

//   setDefaultState();

//   const loadState = () => {
//     try {
//       const saved = localStorage.getItem('accordionState');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed)) {
//           const loadedState = new Map();
//           parsed.forEach(([tabId, items]) => {
//             if (tabId && Array.isArray(items)) {
//               loadedState.set(tabId, new Set(items));
//             }
//           });
//           return loadedState;
//         }
//       }
//     } catch {
//       return null;
//     }
//     return null;
//   };

//   const initialize = () => {
//     const loadedState = loadState();

//     if (loadedState) {
//       loadedState.forEach((items, tabId) => {
//         state.set(tabId, new Set(items));
//       });
//     } else {
//       setDefaultState();
//     }

//     document.addEventListener('click', (e) => {
//       const button = e.target.closest('.faq__button');
//       if (button) {
//         handleAccordionClick(button.closest('.faq__item'));
//       }
//     });
//     applyStateToDOM();
//   };

//   function applyStateToDOM () {
//     document.querySelectorAll('.faq__item').forEach((item) => {
//       const tabId = item.closest('.faq__list').getAttribute('rel');
//       const itemId = item.getAttribute('rel');
//       const isOpen = state.get(tabId)?.has(itemId) || false;

//       const content = item.querySelector('p');
//       const button = item.querySelector('.faq__button');

//       button.classList.toggle('faq__button--current', isOpen);
//       item.classList.toggle('faq__item--current', isOpen);

//       if (isOpen) {
//         content.style.height = `${content.scrollHeight}px`;
//       } else {
//         content.style.height = '0';
//       }
//     });
//   }

//   function handleAccordionClick (item) {
//     const tabId = item.closest('.faq__list').getAttribute('rel');
//     const itemId = item.getAttribute('rel');

//     if (!state.has(tabId)) {
//       state.set(tabId, new Set());
//     }

//     const tabState = state.get(tabId);

//     if (tabState.has(itemId)) {
//       tabState.delete(itemId);
//     } else {
//       tabState.add(itemId);
//     }

//     saveState();
//     applyStateToDOM();
//   }

//   initialize();
// };

// export { initAccordion };

const initAccordion = () => {
  // Находим все элементы аккордеона
  const accordionItems = document.querySelectorAll('.faq__item');
  
  // Функция для открытия/закрытия элемента
  const toggleItem = (item) => {
    const isOpen = item.classList.contains('faq__item--current');
    
    // Закрываем все элементы
    accordionItems.forEach((item) => {
      item.classList.remove('faq__item--current');
      item.querySelector('p').style.height = '0';
      const button = item.querySelector('.faq__button');
      button.classList.remove('faq__button--current');
    });
    
    // Если элемент не был открыт - открываем его
    if (!isOpen) {
      item.classList.add('faq__item--current');
      const content = item.querySelector('p');
      content.style.height = `${content.scrollHeight}px`;
      item.querySelector('.faq__button').classList.add('faq__button--current');
    }
  };

  // Инициализация - открываем третий элемент по умолчанию
  const defaultItem = document.querySelector('.faq__item[rel="tab-8"]');
  if (defaultItem) {
    toggleItem(defaultItem);
  }

  // Обработчики событий
  accordionItems.forEach(item => {
    // Клик по кнопке
    const button = item.querySelector('.faq__button');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleItem(item);
    });
    
    // Клик по всему элементу
    item.addEventListener('click', () => {
      toggleItem(item);
    });
  });
};

export { initAccordion };