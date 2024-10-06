import Swiper from 'swiper';
import 'swiper/css';
import { desktopWidth, mobileWidthOnlyMediaQuery, tabletWidthOnlyMediaQuery, tabletWidthMediaQuery, desktopWidthMediaQuery } from './const';
import { setTabIndexForLoopSlideButtons } from './utils';

const slidesPerViewCount = 1;
const promoSliderElement = document.querySelector('.slider-promo');
let promoSlider;

const desktopSettings = {
  breakpoints: {
    1440: {
      allowTouchMove: false,
    },
  },
};

const createSlider = (settings) => {
  promoSlider = new Swiper(promoSliderElement, {
    ...settings,
    slidesPerView: slidesPerViewCount,
    loop: true,
    init: false,
    autoHeight: true,
  });

  promoSlider.init();
};

const destroySlider = () => {
  if (promoSlider !== undefined) {
    promoSlider.destroy(true, true);
  }
};

const removeNoJsClass = () => {
  promoSliderElement.classList.remove('slider-promo--no-js');
};

const onPaginationClick = (evt) => {
  if (evt.target.matches('.slider-promo__pagination-button')) {
    const buttonIndex = Number(evt.target.dataset.bulletId);

    promoSlider.slideToLoop(buttonIndex);
  }
};

const registerPaginationClickEvents = () => {
  promoSliderElement.addEventListener('click', onPaginationClick);
};

const initPagination = () => {
  const slidesCount = promoSlider.slides.length;

  promoSlider.slides.forEach((slide, index) => {
    const fragment = document.createDocumentFragment();
    const paginationElement = slide.querySelector('.swiper-pagination');

    paginationElement.innerHTML = '';

    for (let i = 0; i < slidesCount; i++) {
      const bulletDescription = document.createElement('span');
      bulletDescription.classList.add('visually-hidden');
      bulletDescription.textContent = `Слайд ${i + 1}`;

      const bullet = document.createElement('button');
      bullet.classList.add('slider-promo__pagination-button');
      bullet.setAttribute('type', 'button');
      bullet.dataset.bulletId = `${i}`;

      const listItem = document.createElement('li');
      listItem.classList.add('slider-promo__pagination-item');

      bullet.appendChild(bulletDescription);
      listItem.appendChild(bullet);

      if (i === index) {
        bullet.classList.add('slider-promo__pagination-button--active');
      }

      fragment.appendChild(listItem);
    }

    paginationElement.appendChild(fragment);
  });
};

const updatePagination = () => {
  const currentIndex = promoSlider.realIndex;

  promoSlider.slides.forEach((slide) => {
    const paginationElement = slide.querySelector('.swiper-pagination');
    const bullets = paginationElement.querySelectorAll('.slider-promo__pagination-button');

    bullets.forEach((bullet, bulletIndex) => {
      if (bulletIndex === currentIndex) {
        bullet.classList.add('slider-promo__pagination-button--active');
      } else {
        bullet.classList.remove('slider-promo__pagination-button--active');
      }
    });
  });
};

const registerSlideChangeEvents = () => {
  promoSlider.on('slideChangeTransitionEnd', () => {
    updatePagination();
    setTabIndexForLoopSlideButtons(promoSlider);
  });
};

const initSlider = (settings) => {
  createSlider(settings);
  initPagination();
  registerPaginationClickEvents();
  registerSlideChangeEvents();
  setTabIndexForLoopSlideButtons(promoSlider);
};

const registerResizeWindowEvents = () => {
  mobileWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      destroySlider();
      initSlider();
    }
  });

  tabletWidthOnlyMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      destroySlider();
      initSlider();
    }
  });

  tabletWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      destroySlider();
      initSlider();
    }
  });

  desktopWidthMediaQuery.addEventListener('change', (evt) => {
    if (evt.matches) {
      destroySlider();
      initSlider(desktopSettings);
    }
  });
};

const initPromoSlider = () => {
  if (promoSliderElement) {
    removeNoJsClass();
    if (window.innerWidth >= desktopWidth) {
      initSlider(desktopSettings);
    } else {
      initSlider();
    }
    registerResizeWindowEvents();
  }
};

export { initPromoSlider };
