import { cleanFields } from './utils';

const alertMessages = {
  name: 'Только буквы и пробелы.',
  phone: 'Допустимы только цифры. Номер начинается с +7. 11 цифр.',
  lessLetters: 'Укажите минимум 2 буквы.'
};

const formContainerElements = document.querySelectorAll('.form');

const isValidName = (name) => {
  const pattern = /^[a-zA-Zа-яёА-ЯЁ\s]+$/;
  return pattern.test(name);
};

const isNameСontainsTwoLetters = (name) => {
  const pattern = /[a-zA-Zа-яёА-ЯЁ]{2,}/;
  return pattern.test(name);
};

const isValidPhone = (phone) => {
  const pattern = /^\+7[0-9]{10}$/;
  return pattern.test(phone);
};

const setNovalidateAttribute = (formElement) => {
  formElement.setAttribute('novalidate', 'true');
};

const onFormSubmit = (formElement, cb) => (evt) => {
  evt.preventDefault();

  const nameInputElement = formElement.querySelector('[name="name"]');
  const phoneInputElement = formElement.querySelector('[name="tel"]');
  const messageInputElement = formElement.querySelector('[name="message"]');
  const cityInputElement = formElement.querySelector('[name="city"]');
  const personalDataInputElement = formElement.querySelector('[name="personal-data"]');
  let nameFieldElement;
  let phoneFieldElement;
  let messageFieldElement;
  let cityFieldElement;
  let personalDataFieldElement;
  let name;
  let phone;
  let message;
  let city;
  let personalData;

  if (nameInputElement) {
    nameFieldElement = nameInputElement.closest('.field');
    name = nameInputElement.value;
  }

  if (phoneInputElement) {
    phoneFieldElement = phoneInputElement.closest('.field');
    phone = phoneInputElement.value;
  }

  if (messageInputElement) {
    messageFieldElement = messageInputElement.closest('.field');
    message = messageInputElement.value;
  }

  if (cityInputElement) {
    cityFieldElement = cityInputElement.closest('.field');
    city = cityInputElement.value;
  }

  if (personalDataInputElement) {
    personalDataFieldElement = personalDataInputElement.closest('.checkbox');
    personalData = personalDataInputElement.checked;
  }

  if (nameFieldElement && !name) {
    nameFieldElement.classList.add('field--error');
    nameInputElement.reportValidity();

    return;
  }

  if (!isValidName(name)) {
    nameInputElement.setCustomValidity(alertMessages.name);
    nameFieldElement.classList.add('field--error');
    nameInputElement.reportValidity();

    return;
  }

  if (!isNameСontainsTwoLetters(name)) {
    nameInputElement.setCustomValidity(alertMessages.lessLetters);
    nameFieldElement.classList.add('field--error');
    nameInputElement.reportValidity();

    return;
  }

  if (phoneFieldElement && !phone) {
    phoneFieldElement.classList.add('field--error');
    phoneInputElement.reportValidity();

    return;
  }

  if (!isValidPhone(phone)) {
    phoneInputElement.setCustomValidity(alertMessages.phone);
    phoneFieldElement.classList.add('field--error');
    phoneInputElement.reportValidity();

    return;
  }

  if (messageFieldElement && !message) {
    messageFieldElement.classList.add('field--error');
    messageInputElement.reportValidity();

    return;
  }

  if (cityFieldElement && !city) {
    cityFieldElement.classList.add('field--error');
    cityInputElement.reportValidity();

    return;
  }

  if (personalDataFieldElement && !personalData) {
    personalDataFieldElement.classList.add('checkbox--error');
    personalDataInputElement.reportValidity();

    return;
  }

  formElement.submit();
  cleanFields(formElement);
  if (cb) {
    cb();
  }
};

const onFieldInput = (evt) => {
  if ((evt.target.matches('input') || evt.target.matches('textarea')) && !evt.target.matches('[type="checkbox"]')) {

    const currentFieldElement = evt.target.closest('.field');

    if (currentFieldElement.classList.contains('field--error')) {
      currentFieldElement.classList.remove('field--error');
    }
  }
};

const onFieldChange = (evt) => {
  if (evt.target.matches('select')) {
    const currentFieldElement = evt.target.closest('.field');

    if (currentFieldElement.classList.contains('field--error')) {
      currentFieldElement.classList.remove('field--error');
    }
  }

  if (evt.target.matches('[type="checkbox"]')) {
    const currentFieldElement = evt.target.closest('.checkbox');
    if (currentFieldElement.classList.contains('checkbox--error')) {
      currentFieldElement.classList.remove('checkbox--error');
    }
  }
};

const onPhoneBlur = (phoneInputElement) => () => {
  if (phoneInputElement.value === '+7') {
    phoneInputElement.value = '';
  }
};

const onPhoneInput = (phoneInputElement) => () => {
  phoneInputElement.value = `+7${phoneInputElement.value.replace(/^\+7/, '').replace(/\D/g, '')}`;
};

const registerPhoneEvents = (phoneInputElement) => {
  phoneInputElement.addEventListener('blur', onPhoneBlur(phoneInputElement));
  phoneInputElement.addEventListener('input', onPhoneInput(phoneInputElement));
};

const registerFormEvents = (formElement) => {

  const phoneInputElement = formElement.querySelector('[name="tel"]');

  registerPhoneEvents(phoneInputElement);
  formElement.addEventListener('input', onFieldInput);
  formElement.addEventListener('change', onFieldChange);
  formElement.addEventListener('submit', onFormSubmit(formElement));
};

const initAllFormsValidate = () => {
  if (formContainerElements.length >= 1) {
    formContainerElements.forEach((formContainer) => {
      formContainer.classList.remove('form--no-js');
      const formElement = formContainer.querySelector('form');
      setNovalidateAttribute(formElement);

      if (!formContainer.closest('.modal--hidden')) {
        registerFormEvents(formElement);
      }
    });
  }
};

export { initAllFormsValidate, onFieldInput, onFieldChange, onFormSubmit, onPhoneBlur, onPhoneInput };
