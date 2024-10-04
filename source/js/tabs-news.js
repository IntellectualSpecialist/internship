import { debounce } from './utils';

const renderDelay = 200;

let currentTab = 0;
const tabsListElement = document.querySelector('.news__tabs-list');
const tabButtons = document.querySelectorAll('.news__tabs-button');

const updateTabButtons = () => {
  tabButtons.forEach((button) => {
    const buttonId = Number(button.dataset.tabId);

    if (buttonId === currentTab) {
      button.classList.add('news__tabs-button--active');
    } else {
      button.classList.remove('news__tabs-button--active');
    }
  });
};

const debounceUpdateTabButtons = debounce(updateTabButtons, renderDelay);

const onTabButtonClick = (evt) => {
  if (evt.target.matches('.news__tabs-button')) {
    currentTab = Number(evt.target.dataset.tabId);
    debounceUpdateTabButtons();
  }
};

const registerTabButtonEvents = () => {
  tabsListElement.addEventListener('click', onTabButtonClick);
};

const initTabsNews = () => {
  if (tabsListElement) {
    updateTabButtons();
    registerTabButtonEvents();
  }
};

export { initTabsNews };
