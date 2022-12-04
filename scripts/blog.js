import Carousel from './utils/carousel.js';

const BLOG_CLASSES = {
  blog__content: 'carousel carousel_dots-placement_outer',
  blog__list: 'carousel__items',
  blog__item: 'carousel__item',
  blog__dots: 'carousel-dots carousel__dots carousel__dots_type_outer',
  blog__prev: 'arrow-button arrow-button_dir_left carousel__prev',
  blog__next: 'arrow-button arrow-button_dir_right carousel__next',
};

/** Blog section helper */
export default class Blog {
  /**
   * Create a blog section helper.
   * @param {HTMLElement} blogEl Blog section element
   */
  constructor(blogEl) {
    /** @private */
    this.blogEl = blogEl;
    /** @private */
    this.carousel = null;
    /** @private */
    this.classesData = null;
    /** @private */
    this.isCarousel = false;
  }

  /**
   * Change blog to normal non-carousel view
   */
  setNormal() {
    if (!this.isCarousel) {
      return;
    }
    this.isCarousel = false;
    if (this.carousel) {
      this.carousel.stop();
      this.carousel.ignoreEvents = true;
    }
    if (this.classesData) {
      this.classesData.forEach(([oldClass, el]) => {
        // eslint-disable-next-line no-param-reassign
        el.className = oldClass;
      });
      this.classesData = null;
    }
  }

  /**
   * Change blog to carousel view
   * @param {bool} startCarousel Start automatic carousel rotation
   */
  setCarousel(startCarousel = true) {
    if (this.isCarousel) {
      return;
    }
    this.isCarousel = true;
    this.classesData = Object.entries(BLOG_CLASSES).flatMap(([k, newClassName]) => {
      const els = [...this.blogEl.querySelectorAll(`.${k}`)];
      return els.map((el) => {
        const oldClasses = el.className;
        // eslint-disable-next-line no-param-reassign
        el.className = newClassName;
        return [oldClasses, el];
      });
    });
    this.blogEl.querySelector('.carousel__item').classList.add('carousel__item_active');
    if (this.carousel === null) {
      this.carousel = new Carousel(this.blogEl.querySelector('.carousel'));
    } else {
      this.carousel.reset();
    }
    this.carousel.ignoreEvents = false;
    if (startCarousel) {
      this.carousel.start();
    }
  }
}
