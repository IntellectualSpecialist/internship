import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/a11y';
import {
  desktopWidth,
  tabletWidth,
  mobileWidthOnlyMediaQuery,
  tabletWidthOnlyMediaQuery,
  tabletWidthMediaQuery,
  desktopWidthMediaQuery
} from './const';

const spaceBetween = {
  mobile: 20,
  tablet: 30,
  desktop: 32,
};
const gridRows = {
  mobile: 2,
  desktop: 1,
};
const slidesPerView = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};
const slidesPerGroup = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};
const realVisibleSlides = {
  mobile: 2,
  tablet: 4,
  desktop: 3,
};
const startPaginationButtonIndex = 0;
const endPaginationButtonIndex = 3;
const prevPaginationButtonsCount = 2;
const nextPaginationButtonsCount = 1;

const newsSliderElement = document.querySelector('.slider-news');
let secondSlideElement;
let thirdSlideElement;
let news;
let newsSlider;
let newsSwiperElement;
let newsProgramsNavigationPrevElement;
let newsProgramsNavigationNextElement;
let newsSliderPaginatonElement;

if (newsSliderElement) {
  secondSlideElement = newsSliderElement.querySelector('#second-slide-news');
  thirdSlideElement = newsSliderElement.querySelector('#third-slide-news');
  news = newsSliderElement.querySelectorAll('.news-card');
  newsSwiperElement = newsSliderElement.querySelector('.swiper');
  newsProgramsNavigationPrevElement = newsSliderElement.querySelector('.swiper-button-prev');
  newsProgramsNavigationNextElement = newsSliderElement.querySelector('.swiper-button-next');
  newsSliderPaginatonElement = newsSliderElement.querySelector('.swiper-pagination');
}

const createSlider = () => {
  newsSlider = new Swiper(newsSwiperElement, {
    modules: [ Navigation, Pagination, Grid ],
    init: false,
    spaceBetween: spaceBetween.mobile,
    navigation: {
      nextEl: newsProgramsNavigationNextElement,
      prevEl: newsProgramsNavigationPrevElement,
    },
    grid: {
      rows: gridRows.mobile,
    },
    slidesPerView: slidesPerView.mobile,
    slidesPerGroup: slidesPerGroup.mobile,
    pagination: {
      el: newsSliderPaginatonElement,
      clickable: true,
      bulletClass: 'slider-news__pagination-button',
      bulletActiveClass: 'slider-news__pagination-button--active',
      renderBullet: function (index, className) {
        return `<button class="${className}" type="button">${index + 1}</button>`;
      },
    },
    breakpoints: {
      768: {
        spaceBetween: spaceBetween.tablet,
        slidesPerView: slidesPerView.tablet,
        slidesPerGroup: slidesPerGroup.tablet,
      },
      1440: {
        grid: {
          rows: gridRows.desktop,
          fill: 'row',
        },
        spaceBetween: spaceBetween.desktop,
        slidesPerView: 'auto',
        slidesPerGroup: slidesPerGroup.desktop,
        allowTouchMove: false,
      },
    },
  });

  newsSlider.init();
};

const destroySlider = () => {
  if (newsSlider !== undefined) {
    newsSlider.destroy(true, true);
  }
};

const updatePagination = () => {
  let slidesPerViewCount;
  let startPaginationIndex = startPaginationButtonIndex;
  let endPaginationIndex = endPaginationButtonIndex;
  let activeIndex;

  if (window.innerWidth < tabletWidth) {
    slidesPerViewCount = realVisibleSlides.mobile;
    activeIndex = newsSlider.activeIndex;
  }

  if (window.innerWidth >= tabletWidth && window.innerWidth < desktopWidth) {
    slidesPerViewCount = realVisibleSlides.tablet;
    activeIndex = Math.ceil(newsSlider.activeIndex / slidesPerView.tablet);
  }

  if (window.innerWidth >= desktopWidth) {
    slidesPerViewCount = realVisibleSlides.desktop;
    activeIndex = Math.ceil(newsSlider.activeIndex / slidesPerView.desktop);
  }

  const lastSlideIndex = Math.ceil(newsSlider.slides.length / slidesPerViewCount) - 1;
  const paginationBullets = newsSlider.pagination.bullets;

  if (activeIndex >= endPaginationIndex && activeIndex < lastSlideIndex) {
    startPaginationIndex = activeIndex - prevPaginationButtonsCount;
    endPaginationIndex = activeIndex + nextPaginationButtonsCount;
  } else if (activeIndex === lastSlideIndex) {
    endPaginationIndex = lastSlideIndex;
    startPaginationIndex = endPaginationIndex - endPaginationButtonIndex;
  }

  paginationBullets.forEach((bullet, index) => {
    if (startPaginationIndex > index || index > endPaginationIndex) {
      bullet.classList.add('slider-news__pagination-button--hidden');
    } else {
      bullet.classList.remove('slider-news__pagination-button--hidden');
    }
  });
};

const swapSlides = () => {
  thirdSlideElement.after(secondSlideElement);
};

const swapSlidesBack = () => {
  secondSlideElement.after(thirdSlideElement);
};

const swapSlidesOnDifferentScreen = () => {
  if (window.innerWidth < desktopWidth && window.innerWidth >= tabletWidth) {
    swapSlides();
  } else {
    swapSlidesBack();
  }
};

const setBigSlide = (visibleSlides) => {
  news.forEach((newsItem, index) => {
    if (index % visibleSlides === 0) {
      newsItem.classList.add('news-card--big');
    } else {
      newsItem.classList.remove('news-card--big');
    }
  });
};

const setBigSlideOnDifferentScreen = () => {
  if (window.innerWidth < tabletWidth) {
    setBigSlide(realVisibleSlides.mobile);
  }

  if (window.innerWidth >= tabletWidth && window.innerWidth < desktopWidth) {
    setBigSlide(realVisibleSlides.tablet);
  }

  if (window.innerWidth >= desktopWidth) {
    setBigSlide(realVisibleSlides.desktop);
  }
};

const registerSlideChangeEvents = () => {
  newsSlider.on('slideChange', () => {
    updatePagination();
  });
};

const updateSlider = () => {
  destroySlider();
  setBigSlideOnDifferentScreen();
  swapSlidesOnDifferentScreen();
  createSlider();
  updatePagination();
  registerSlideChangeEvents();
};

const registerResizeWindowEvents = () => {
  mobileWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      updateSlider();
    }
  });

  tabletWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      updateSlider();
    }
  });

  tabletWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      updateSlider();
    }
  });

  desktopWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      updateSlider();
    }
  });
};

const initNewsSlider = () => {
  if (newsSliderElement) {
    newsSliderElement.classList.remove('slider-news--no-js');
    updateSlider();
    registerResizeWindowEvents();
  }
};

export { initNewsSlider };
