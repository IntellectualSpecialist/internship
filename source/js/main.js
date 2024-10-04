import { initNavBurger } from './burger-menu';
import { initPromoSlider } from './slider-promo';
import { initModalFeedback } from './modal-feedback';
import { initSliderPrograms } from './slider-programs';
import { initTabsNews } from './tabs-news';
import { initNewsSlider } from './slider-news';
import { initAccordion } from './accordion';
import { initSliderReviews } from './slider-reviews';
import { initAllFormsValidate } from './form';
import { initAllSelects } from './select';
import { initSwap } from './swap-dom-elements';

window.addEventListener('load', () => {
  initNavBurger();
  initPromoSlider();
  initModalFeedback();
  initSliderPrograms();
  initTabsNews();
  initNewsSlider();
  initAccordion();
  initSliderReviews();
  initAllFormsValidate();
  initAllSelects();
  initSwap();
});
