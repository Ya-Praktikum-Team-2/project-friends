import Carousel from './utils/carousel.js';
import ScreenSizeTracker from './utils/ScreenSizeTracker.js';
import toggleSubmenu from './utils/toggleSubmenu.js';
import Blog from './blocks/blog.js';
import Header from './blocks/header.js';
import initPartners from './blocks/partners.js';

const heroEl = document.querySelector('.hero-banner');
// eslint-disable-next-line no-unused-vars
const heroCarousel = new Carousel(heroEl);
// TODO: enable carousel
// heroCarousel.start();

const friendsEl = document.querySelector('.our-friends > .carousel');
// eslint-disable-next-line no-unused-vars
const friendsCarousel = new Carousel(friendsEl);
// TODO: enable carousel
// friendsCarousel.start();

const blog = new Blog(document.querySelector('.blog'));

const header = new Header(document.querySelector('.header'));

ScreenSizeTracker.addListener(768, (isBigger) => {
  if (isBigger) {
    blog.setNormal();
  } else {
    // TODO: enable carousel
    blog.setCarousel(false);
  }
});

ScreenSizeTracker.addListener(576, (isBigger) => {
  header.onWidthCnahge(!isBigger);
});

const footerSubmenuButton = document.querySelector('.footer__menu-button');
const programSubmenu = document.querySelector('.submenu_type_program');

toggleSubmenu(footerSubmenuButton, programSubmenu);

const subscriptionForm = document.querySelector('.subscription__form');
const resetButton = document.querySelector('.subscription__reset');

resetButton.addEventListener('click', () => {
  subscriptionForm.reset();
});

initPartners();
