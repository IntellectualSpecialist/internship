const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const removeFocusOnButtons = (sliderLinks) => {
  sliderLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
};

const setFocusOnVisibleSlides = (slider, sliderLinks, slidesPerView, startSlide) => {
  removeFocusOnButtons(sliderLinks);

  for (let i = 0; i < slidesPerView; i++) {
    const slideLinks = slider.slides[startSlide + i].querySelectorAll('a[href], button');

    slideLinks.forEach((link) => {
      link.setAttribute('tabindex', '0');
    });
  }
};

const setFocusOnSlideChange = (slider, sliderLinks, slidesPerView) => {
  const activeSlideIndex = slider.realIndex;

  setFocusOnVisibleSlides(slider, sliderLinks, slidesPerView, activeSlideIndex);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isSpaceKey = (evt) => evt.key === ' ';

const isEnterKey = (evt) => evt.key === 'Enter';

const isArrowUpKey = (evt) => evt.key === 'ArrowUp';

const isArrowDownKey = (evt) => evt.key === 'ArrowDown';

const cleanFields = (formElement) => {
  const errorFields = formElement.querySelectorAll('.field--error, .checkbox-error');

  errorFields.forEach((field) => {
    field.classList.remove('field--error', 'checkbox-error');
  });

  formElement.reset();
};

export { debounce, setFocusOnVisibleSlides, setFocusOnSlideChange, isEscapeKey, cleanFields, isSpaceKey, isEnterKey, isArrowUpKey, isArrowDownKey };
