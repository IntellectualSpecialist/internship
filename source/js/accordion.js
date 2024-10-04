import {
  mobileWidthOnlyMediaQuery,
  tabletWidthOnlyMediaQuery,
  tabletWidthMediaQuery,
  desktopWidthMediaQuery
} from './const';

const accordionElements = document.querySelectorAll('.accordion');
const activeNoJsItems = document.querySelectorAll('.accordion-item--no-js');

const removeNoJsClass = () => {
  activeNoJsItems.forEach((item) => {
    item.classList.remove('accordion-item--no-js');
  });
};

const onAccordionItemClick = (evt) => {
  if (evt.target.closest('.accordion-item__button')) {
    const currentAccordionItemElement = evt.target.closest('.accordion-item');

    currentAccordionItemElement.querySelector('.accordion-item__content').classList.add('accordion-item__content--animation');
    currentAccordionItemElement.classList.toggle('accordion-item--active');

    if (!currentAccordionItemElement.classList.contains('accordion-item--active')) {
      currentAccordionItemElement.querySelector('.accordion-item__content').style.height = 0;
    } else {
      const contentHeight = currentAccordionItemElement.querySelector('.accordion-item__text-content').offsetHeight;
      currentAccordionItemElement.querySelector('.accordion-item__content').style.height = `${contentHeight}px`;
    }
  }
};

const registerAccordionEvents = () => {
  accordionElements.forEach((accordion) => {
    accordion.addEventListener('click', onAccordionItemClick);
  });
};

const initActiveAccordionItemHeight = () => {
  const activeItems = document.querySelectorAll('.accordion-item--active');

  activeItems.forEach((item) => {
    const contentActiveHeight = item.querySelector('.accordion-item__text-content').offsetHeight;
    item.querySelector('.accordion-item__content').style.height = `${contentActiveHeight}px`;
  });
};

const registerResizeWindowEvents = () => {
  mobileWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      initActiveAccordionItemHeight();
    }
  });

  tabletWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      initActiveAccordionItemHeight();
    }
  });

  tabletWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      initActiveAccordionItemHeight();
    }
  });

  desktopWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      initActiveAccordionItemHeight();
    }
  });
};

const initAccordion = () => {
  if (accordionElements.length >= 1) {
    removeNoJsClass();
    initActiveAccordionItemHeight();
    registerAccordionEvents();
    registerResizeWindowEvents();
  }
};

export { initAccordion };
