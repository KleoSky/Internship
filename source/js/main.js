// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

import { menuOpen, subMenuOpen } from './modules/header';
menuOpen();
subMenuOpen();

import { initSwiperHero } from './modules/hero';
initSwiperHero();

import { initFormValidation } from './modules/form-validate';
initFormValidation();

import { modalOpen } from './modules/modal';
modalOpen();

import { initSelectArrow } from './modules/select';
initSelectArrow();

import { initSwiperPrograms } from './modules/programs';
initSwiperPrograms();

import { initSwiperNews } from './modules/news';
initSwiperNews();

import { initAccordion } from './modules/faq';
initAccordion();
