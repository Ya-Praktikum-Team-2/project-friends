import Carousel from './utils/carousel.js';
import ScreenSizeEvents from './utils/ScreenSizeEvents.js';
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

ScreenSizeEvents.addListener(768, (isBigger) => {
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
