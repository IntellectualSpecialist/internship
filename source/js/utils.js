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

export { debounce, isEscapeKey, cleanFields, isSpaceKey, isEnterKey, isArrowUpKey, isArrowDownKey };
