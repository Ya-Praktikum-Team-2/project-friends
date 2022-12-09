import Carousel from './utils/carousel.js';
import ScreenSizeTracker from './utils/ScreenSizeTracker.js';
import toggleSubmenu from './toggleSubmenu.js';
import Blog from './blog.js';
import Header from './header.js';

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

// eslint-disable-next-line no-unused-vars
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
