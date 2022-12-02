import Carousel from './carousel.js';

const heroEl = document.querySelector('.hero-banner');
const heroCarousel = new Carousel(heroEl);

const friendsEl = document.querySelector('.our-friends > .carousel');
const friendsCarousel = new Carousel(friendsEl);

// закомментируй строки ниже, чтобы отключить слайдеры
heroCarousel.start();
friendsCarousel.start();
