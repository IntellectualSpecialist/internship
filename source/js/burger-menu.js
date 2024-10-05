import { debounce } from './utils';

const removeNavDelay = 250;
const renderDelay = 200;
const bodyElement = document.querySelector('.page__body');
const headerElement = bodyElement.querySelector('.main-header');
const mainNavElement = headerElement.querySelector('.main-header__nav');
const navBurgerElement = headerElement.querySelector('.js-toggle-button');
const siteListElement = mainNavElement.querySelector('.site-list');

const openMenu = () => {
  mainNavElement.classList.remove('main-header__nav--hidden');
  navBurgerElement.classList.add('main-header__burger--active');
  navBurgerElement.classList.add('burger--active');
  headerElement.classList.add('main-header--menu-open');
  siteListElement.addEventListener('click', onNavLinkClick);

  const siteListHeight = siteListElement.offsetHeight;
  mainNavElement.style.height = `${siteListHeight}px`;

  bodyElement.addEventListener('click', onBodyClick);
};

const closeMenu = () => {
  mainNavElement.style.height = 0;
  navBurgerElement.classList.remove('burger--active');
  headerElement.classList.remove('main-header--menu-open');
  siteListElement.removeEventListener('click', onNavLinkClick);
  bodyElement.removeEventListener('click', onBodyClick);

  setTimeout(() => {
    navBurgerElement.classList.remove('main-header__burger--active');
    mainNavElement.classList.add('main-header__nav--hidden');
  }, removeNavDelay);
};

const openSubMenu = (link, subMenu) => {
  subMenu.classList.remove('site-list__dropdown--hidden');
  link.classList.add('site-list__link--current');

  const subMenuHeight = subMenu.querySelector('.site-list__sub-menu').offsetHeight;
  subMenu.style.height = `${subMenuHeight}px`;

  mainNavElement.style.height = `${mainNavElement.offsetHeight + subMenuHeight}px`;
};

const closeSubMenu = (link, subMenu) => {
  const subMenuHeight = subMenu.querySelector('.site-list__sub-menu').offsetHeight;
  subMenu.style.height = 0;
  link.classList.remove('site-list__link--current');

  mainNavElement.style.height = `${mainNavElement.offsetHeight - subMenuHeight}px`;

  setTimeout(() => {
    subMenu.classList.add('site-list__dropdown--hidden');
  }, removeNavDelay);
};

const debounceOpenMenu = debounce(openMenu, renderDelay);
const debounceCloseMenu = debounce(closeMenu, renderDelay);
const debounceOpenSubMenu = debounce(openSubMenu, renderDelay);
const debounceCloseSubMenu = debounce(closeSubMenu, renderDelay);

function onNavLinkClick(evt) {

  if (evt.target.matches('.site-list__link--dropdown')) {
    const currentLinkElement = evt.target;
    const currentListItemElement = evt.target.closest('.site-list__item');
    const currentSubMenuElement = currentListItemElement.querySelector('.site-list__dropdown');

    if (currentSubMenuElement.classList.contains('site-list__dropdown--hidden')) {
      debounceOpenSubMenu(currentLinkElement, currentSubMenuElement);
    } else {
      debounceCloseSubMenu(currentLinkElement, currentSubMenuElement);
    }
  }
}

const onNavBurgerClick = (evt) => {
  evt.preventDefault();

  if (mainNavElement.classList.contains('main-header__nav--hidden')) {
    debounceOpenMenu();
  } else {
    debounceCloseMenu();
  }
};

function onBodyClick(evt) {
  if (evt.target.closest('.main-header__wrapper')) {
    evt.stopPropagation();
  } else {
    closeMenu();
  }
}

const initNavBurger = () => {
  if (navBurgerElement) {
    navBurgerElement.addEventListener('click', onNavBurgerClick);
  }
};

export { initNavBurger };
