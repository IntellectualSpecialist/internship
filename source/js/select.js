import { debounce, isEscapeKey, isSpaceKey, isEnterKey, isArrowUpKey, isArrowDownKey } from './utils';

const renderDelay = 200;
const bodyElement = document.querySelector('.page__body');
const selectWrapperElements = bodyElement.querySelectorAll('.field--select');

const initCustomSelect = (selectWrapperElement) => {
  const nativeSelectElement = selectWrapperElement.querySelector('select');
  const customSelectElement = selectWrapperElement.querySelector('.js-select-custom');
  const customSelectBoxElement = customSelectElement.querySelector('.field__select-custom-trigger');
  const customSelectOptionsElement = customSelectElement.querySelector('.field__select-custom-options');
  const optionsList = customSelectElement.querySelectorAll('.field__select-custom-option');
  let currenOptionId = -1;
  let currenOptionFocusedId = -1;
  let isFocusInsideSelect = false;

  const debounceOpenSelect = debounce(openSelect, renderDelay);
  const debounceCloseSelect = debounce(closeSelect, renderDelay);

  const onSelectClick = () => {
    if (!customSelectElement.classList.contains('field__select-custom--active')) {
      debounceOpenSelect();
    } else {
      debounceCloseSelect();
    }
  };

  const onBodyClick = (evt) => {
    if (evt.target.closest('.js-select-custom')) {
      evt.stopPropagation();
    } else {
      closeSelect();
    }
  };

  const updateOptions = () => {
    optionsList.forEach((option) => {
      const optionId = Number(option.dataset.optionId);

      if (optionId === currenOptionId) {
        option.classList.add('field__select-custom-option--active');
      } else {
        option.classList.remove('field__select-custom-option--active');
      }
    });
  };

  const updateCurrentSelectValue = (evt) => {
    if (evt.target.matches('.field__select-custom-option')) {
      const value = evt.target.dataset.value;
      const prevOption = customSelectOptionsElement.querySelector('[aria-selected="true"]');
      if (prevOption) {
        prevOption.setAttribute('aria-selected','false');
      }
      evt.target.setAttribute('aria-selected','true');

      nativeSelectElement.value = value;
      const event = new Event('change', { bubbles: true });
      nativeSelectElement.dispatchEvent(event);

      customSelectBoxElement.textContent = evt.target.textContent;
      currenOptionId = Number(evt.target.dataset.optionId);
      currenOptionFocusedId = Number(evt.target.dataset.optionId);
      updateOptions();
    }
  };

  const cleanSelect = () => {
    const prevOption = customSelectOptionsElement.querySelector('[aria-selected="true"]');
    if (prevOption) {
      prevOption.setAttribute('aria-selected','false');
    }

    customSelectBoxElement.textContent = '';
    currenOptionId = -1;
    currenOptionFocusedId = -1;
    updateOptions();
  };

  const updateFocusedOption = () => {
    isFocusInsideSelect = true;

    optionsList.forEach((option) => {
      const optionId = Number(option.dataset.optionId);

      if (optionId === currenOptionFocusedId) {
        option.focus();
      }
    });

    isFocusInsideSelect = false;
  };

  const onOptionClick = (evt) => {
    updateCurrentSelectValue(evt);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSelect();
    }
  };

  const onSelectKeydown = (evt) => {
    if (isSpaceKey(evt) || isEnterKey(evt)) {
      evt.preventDefault();
      if (!customSelectElement.classList.contains('field__select-custom--active')) {
        debounceOpenSelect();
      } else {
        debounceCloseSelect();
      }
    }
  };

  const onSelectKeydownArrows = (evt) => {
    if (isArrowUpKey(evt) && currenOptionFocusedId >= 1) {
      evt.preventDefault();

      currenOptionFocusedId -= 1;
      updateFocusedOption();
    }

    if (isArrowDownKey(evt) && currenOptionFocusedId < optionsList.length - 1) {
      evt.preventDefault();

      currenOptionFocusedId += 1;
      updateFocusedOption();

    }
  };

  const onOptionKeydown = (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      updateCurrentSelectValue(evt);
    }
  };

  const onSelectFocusOut = (evt) => {
    if (!evt.relatedTarget || !customSelectElement.contains(evt.relatedTarget)) {
      if (!isFocusInsideSelect) {
        closeSelect();
      }
    }
  };

  function openSelect() {
    customSelectElement.classList.add('field__select-custom--active');
    bodyElement.addEventListener('click', onBodyClick);
    customSelectOptionsElement.addEventListener('click', onOptionClick);
    customSelectOptionsElement.addEventListener('keydown', onOptionKeydown);
    customSelectElement.addEventListener('keydown', onSelectKeydownArrows);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function closeSelect() {
    customSelectElement.classList.remove('field__select-custom--active');
    bodyElement.removeEventListener('click', onBodyClick);
    customSelectOptionsElement.removeEventListener('click', onOptionClick);
    customSelectOptionsElement.removeEventListener('keydown', onOptionKeydown);
    customSelectElement.removeEventListener('keydown', onSelectKeydownArrows);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  const registerSelectEvents = () => {
    customSelectElement.addEventListener('click', onSelectClick);
    customSelectElement.addEventListener('keydown', onSelectKeydown);
    customSelectOptionsElement.addEventListener('focusout', onSelectFocusOut);
  };

  const removeSelectEvents = () => {
    customSelectElement.removeEventListener('click', onSelectClick);
    customSelectElement.removeEventListener('keydown', onSelectKeydown);
    customSelectElement.removeEventListener('focusout', onSelectFocusOut);
  };

  registerSelectEvents();

  return {
    registerSelectEvents,
    removeSelectEvents,
    cleanSelect
  };
};

const initAllSelects = () => {
  if (selectWrapperElements.length >= 1) {
    selectWrapperElements.forEach((selectWrapperElement) => {
      const nativeSelectElement = selectWrapperElement.querySelector('select');
      const customSelectElement = selectWrapperElement.querySelector('.js-select-custom');

      selectWrapperElement.classList.add('field--select-hidden');
      nativeSelectElement.setAttribute('tabindex', '-1');
      nativeSelectElement.setAttribute('aria-hidden', true);
      customSelectElement.classList.remove('field__select-custom--hidden');
      customSelectElement.setAttribute('aria-hidden', false);

      if (!selectWrapperElement.closest('.modal--hidden')) {
        initCustomSelect(selectWrapperElement);
      }
    });
  }
};

export { initAllSelects, initCustomSelect };
