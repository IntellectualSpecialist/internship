import Swiper from 'swiper';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

const slidesPerViewCount = {
  mobile: 1,
  desktop: 2,
};
const spaceBetween = {
  mobile: 10,
  tablet: 30,
  desktop: 32,
};

const sliderReviewsElement = document.querySelector('.slider-scrollbar--reviews');
let swiperReviewsElement;
let sliderReviewsNavigationPrevElement;
let sliderReviewsNavigationNextElement;
let scrollbarElement;

if (sliderReviewsElement) {
  swiperReviewsElement = sliderReviewsElement.querySelector('.swiper');
  sliderReviewsNavigationPrevElement = sliderReviewsElement.querySelector('.swiper-button-prev');
  sliderReviewsNavigationNextElement = sliderReviewsElement.querySelector('.swiper-button-next');
  scrollbarElement = sliderReviewsElement.querySelector('.swiper-scrollbar');
}

const sliderReviews = new Swiper(swiperReviewsElement, {
  modules: [Navigation, Scrollbar, A11y],
  slidesPerView: slidesPerViewCount.mobile,
  init: false,
  spaceBetween: spaceBetween.mobile,
  navigation: {
    nextEl: sliderReviewsNavigationNextElement,
    prevEl: sliderReviewsNavigationPrevElement,
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
  sliderReviewsElement.classList.remove('slider-scrollbar--no-js');
};

const initSliderReviews = () => {
  if (sliderReviewsElement) {
    removeNoJsClass();
    sliderReviews.init();
  }
};

export { initSliderReviews };
