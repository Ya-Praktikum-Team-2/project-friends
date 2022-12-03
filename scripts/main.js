import Carousel from './carousel.js';

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

function toggleSubmenu(element, submenu) {
  element.addEventListener('click', () => {
    submenu.classList.toggle('submenu_active');
  });
}

toggleSubmenu(footerSubmenuButton, programSubmenu);