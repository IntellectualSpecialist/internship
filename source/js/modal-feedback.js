import { isEscapeKey, cleanFields } from './utils';
import { onFieldInput, onFieldChange, onFormSubmit, onPhoneBlur, onPhoneInput } from './form';
import { initCustomSelect } from './select';

const mainElement = document.querySelector('main');
const footerElement = document.querySelector('.main-footer');
const openButtonElement = document.querySelector('.js-modal-button');
const modalElement = document.querySelector('.modal');
const closeButtonElement = modalElement.querySelector('.modal__close-button');
const formElement = modalElement.querySelector('form');
const nameInputElement = formElement.querySelector('[name="name"]');
const phoneInputElement = formElement.querySelector('[name="tel"]');
const selectWrapperElement = formElement.querySelector('.field--select');

const loopFocusOnModal = () => {
  mainElement.setAttribute('inert', true);
  footerElement.setAttribute('inert', true);
};

const removeLoopFocusOnModal = () => {
  mainElement.removeAttribute('inert');
  footerElement.removeAttribute('inert');
};

const onButtonClick = (evt) => {
  evt.preventDefault();
  openModal();
};

const onCloseButtonClick = () => {
  closeModal();
};

const onOverlayClick = (evt) => {
  if (evt.target.closest('.modal__feedback')) {
    evt.stopPropagation();
  } else {
    closeModal();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const registerButtonClickEvents = () => {
  openButtonElement.addEventListener('click', onButtonClick);
};

const formSubmitHandler = onFormSubmit(formElement, closeModal);
const phoneBlurHandler = onPhoneBlur(phoneInputElement);
const phoneInputHandler = onPhoneInput(phoneInputElement);
const modalSelectHandler = initCustomSelect(selectWrapperElement);

const registerPhoneEvents = () => {
  phoneInputElement.addEventListener('blur', phoneBlurHandler);
  phoneInputElement.addEventListener('input', phoneInputHandler);
};

const removePhoneEvents = () => {
  phoneInputElement.removeEventListener('blur', phoneBlurHandler);
  phoneInputElement.removeEventListener('input', phoneInputHandler);
};

const registerFormEvents = () => {
  registerPhoneEvents();
  formElement.addEventListener('input', onFieldInput);
  formElement.addEventListener('change', onFieldChange);
  formElement.addEventListener('submit', formSubmitHandler);
};

const removeFormEvents = () => {
  removePhoneEvents();
  formElement.removeEventListener('input', onFieldInput);
  formElement.removeEventListener('change', onFieldChange);
  formElement.removeEventListener('submit', formSubmitHandler);
};

function openModal() {
  modalElement.classList.remove('modal--hidden');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  setTimeout(() => {
    document.addEventListener('click', onOverlayClick);
  }, 0);
  document.addEventListener('keydown', onDocumentKeydown);
  registerFormEvents();
  modalSelectHandler.registerSelectEvents();
  nameInputElement.focus();
  loopFocusOnModal();
}

function closeModal() {
  modalElement.classList.add('modal--hidden');
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  cleanFields(formElement);
  removeFormEvents();
  modalSelectHandler.removeSelectEvents();
  removeLoopFocusOnModal();
}

const initModalFeedback = () => {
  if (openButtonElement) {
    registerButtonClickEvents();
  }
};

export { initModalFeedback, closeModal };
