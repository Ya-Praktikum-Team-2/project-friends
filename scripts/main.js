import Carousel from './utils/carousel.js';
import ScreenSizeTracker from './utils/ScreenSizeTracker.js';
import toggleSubmenu from './toggleSubmenu.js';
import Blog from './blog.js';

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

ScreenSizeTracker.addListener(768, (isBigger) => {
  if (isBigger) {
    blog.setNormal();
  } else {
    // TODO: enable carousel
    blog.setCarousel(false);
  }
});

const footerSubmenuButton = document.querySelector('.footer__menu-button');
const programSubmenu = document.querySelector('.submenu_type_program');

toggleSubmenu(footerSubmenuButton, programSubmenu);

const buttonSupport = document.querySelector('.donation__support-btn');
buttonSupport.addEventListener('click', () => {
  buttonSupport.classList.add('donation__support-btn_active');
});
