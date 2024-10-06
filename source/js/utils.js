const gridColumnItemsCount = 2;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isSpaceKey = (evt) => evt.key === ' ';

const isEnterKey = (evt) => evt.key === 'Enter';

const isArrowUpKey = (evt) => evt.key === 'ArrowUp';

const isArrowDownKey = (evt) => evt.key === 'ArrowDown';

const cleanFields = (formElement) => {
  const errorFields = formElement.querySelectorAll('.field--error, .checkbox--error');

  errorFields.forEach((field) => {
    field.classList.remove('field--error', 'checkbox--error');
  });

  formElement.reset();
};

const setTabIndexForSlideButtons = (slider, visibleSlides, currentActiveIndex, isGrid) => {
  const slides = slider.slides;
  let currentActiveSlide;

  slides.forEach((slide) => {
    const buttons = slide.querySelectorAll('a[href], button');
    buttons.forEach((button) => {
      button.setAttribute('tabindex', '-1');
    });
  });

  if (isGrid) {
    currentActiveSlide = currentActiveIndex * gridColumnItemsCount;
  } else {
    currentActiveSlide = currentActiveIndex;
  }

  for (let i = currentActiveSlide; i < (currentActiveSlide + visibleSlides); i++) {
    if (slider.slides[i]) {
      const buttons = slider.slides[i].querySelectorAll('a[href], button');

      buttons.forEach((button) => {
        button.setAttribute('tabindex', '0');
      });
    }
  }
};

const setTabIndexForLoopSlideButtons = (slider) => {
  const slides = slider.slides;

  slides.forEach((slide) => {
    const buttons = slide.querySelectorAll('a[href], button');
    if (slide.classList.contains('swiper-slide-active')) {
      buttons.forEach((button) => {
        button.setAttribute('tabindex', '0');
      });
    } else {
      buttons.forEach((button) => {
        button.setAttribute('tabindex', '-1');
      });
    }
  });
};

export {
  debounce,
  setTabIndexForSlideButtons,
  setTabIndexForLoopSlideButtons,
  isEscapeKey,
  cleanFields,
  isSpaceKey,
  isEnterKey,
  isArrowUpKey,
  isArrowDownKey
};
