import Carousel from './carousel.js';
import checkScreenSize from './utils/checkScreenSize.js';
import toggleSubmenu from './toggleSubmenu.js';

const heroEl = document.querySelector('.hero-banner');
// eslint-disable-next-line no-unused-vars
const heroCarousel = new Carousel(heroEl);
// heroCarousel.start();

const friendsEl = document.querySelector('.our-friends > .carousel');
// eslint-disable-next-line no-unused-vars
const friendsCarousel = new Carousel(friendsEl);
// friendsCarousel.start();

const footerSubmenuButton = document.querySelector('.footer__menu-button');
const programSubmenu = document.querySelector('.submenu_type_program');

window.addEventListener('resize', () => checkScreenSize(), { passive: true });

toggleSubmenu(footerSubmenuButton, programSubmenu);
