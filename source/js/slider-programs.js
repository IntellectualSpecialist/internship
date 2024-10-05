import Swiper from 'swiper';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

const slidesPerViewCount = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};
const spaceBetween = {
  mobile: 10,
  tablet: 30,
  desktop: 32,
};

const sliderProgramsElement = document.querySelector('.slider-scrollbar--programs');
let swiperProgramsElement;
let sliderProgramsNavigationPrevElement;
let sliderProgramsNavigationNextElement;
let scrollbarElement;

if (sliderProgramsElement) {
  swiperProgramsElement = sliderProgramsElement.querySelector('.swiper');
  sliderProgramsNavigationPrevElement = sliderProgramsElement.querySelector('.swiper-button-prev');
  sliderProgramsNavigationNextElement = sliderProgramsElement.querySelector('.swiper-button-next');
  scrollbarElement = sliderProgramsElement.querySelector('.swiper-scrollbar');
}

const sliderPrograms = new Swiper(swiperProgramsElement, {
  modules: [Navigation, Scrollbar, A11y],
  slidesPerView: slidesPerViewCount.mobile,
  init: false,
  spaceBetween: spaceBetween.mobile,
  navigation: {
    nextEl: sliderProgramsNavigationNextElement,
    prevEl: sliderProgramsNavigationPrevElement,
  },
  scrollbar: {
    el: scrollbarElement,
    draggable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: spaceBetween.tablet,
      scrollbar: {
        dragSize: 326,
      },
    },
    1440: {
      allowTouchMove: false,
      slidesPerView: slidesPerViewCount.desktop,
      spaceBetween: spaceBetween.desktop,
      scrollbar: {
        dragSize: 394,
      },
    },
  },
});

const removeNoJsClass = () => {
  sliderProgramsElement.classList.remove('slider-scrollbar--no-js');
};

const initSliderPrograms = () => {
  if (sliderProgramsElement) {
    removeNoJsClass();
    sliderPrograms.init();
  }
};

export { initSliderPrograms };
