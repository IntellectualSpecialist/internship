import {
  mobileWidthOnly,
  desktopWidth,
  mobileWidthOnlyMediaQuery,
  tabletWidthOnlyMediaQuery,
  tabletWidthMediaQuery,
  desktopWidthMediaQuery
} from './const';

let programsHeader;
let programsMoreButton;
let programsSlider;
let sliderSwiper;
let sliderNavigation;

const programsWrapper = document.querySelector('.programs__wrapper');
const footerSocial = document.querySelector('.main-footer__social');
const footerInfo = document.querySelector('.main-footer__inner-container');

if (programsWrapper) {
  programsHeader = programsWrapper.querySelector('.programs__header');
  programsMoreButton = programsWrapper.querySelector('.programs__more');
  programsSlider = programsWrapper.querySelector('.programs__slider');
  sliderSwiper = programsSlider.querySelector('.slider-scrollbar__swiper');
  sliderNavigation = programsSlider.querySelector('.slider-scrollbar__navigation');
}

const swapSliderElements = () => {
  if (window.innerWidth <= mobileWidthOnly) {
    programsWrapper.append(programsMoreButton);
    sliderNavigation.after(sliderSwiper);
  }
};

const swapFooterElements = () => {
  if (window.innerWidth < desktopWidth) {
    footerInfo.after(footerSocial);
  }
};

const registerResizeWIndowEventsForSlider = () => {
  mobileWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      programsWrapper.append(programsMoreButton);
      sliderNavigation.after(sliderSwiper);
    }
  });

  tabletWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      programsHeader.append(programsMoreButton);
      sliderSwiper.after(sliderNavigation);
    }
  });
};

const registerResizeWIndowEventsForFooter = () => {
  tabletWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      footerInfo.after(footerSocial);
    }
  });

  desktopWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      footerSocial.after(footerInfo);
    }
  });
};

const initSwap = () => {
  if (programsWrapper) {
    swapSliderElements();
    registerResizeWIndowEventsForSlider();
  }

  if (footerSocial && footerInfo) {
    swapFooterElements();
    registerResizeWIndowEventsForFooter();
  }
};

export { initSwap };
