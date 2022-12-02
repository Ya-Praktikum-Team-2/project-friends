/**
 * @fileOverview Implementation of carousel helper
 * @author Vladislav Cherepita
 * @version 1.0.0
 */

/** Carousel helper */
export default class Carousel {
  /**
   * Create a carousel helper.
   * @param {HTMLElement} carouselEl - The carousel element.
   * @param {object} config - Carousel configuration.
   * @param {number} config.timeInterval - Time in ms between automatic slides rotations.
   * @param {bool} config.alwaysSlide - Change default fade animation into sliding one.
   * @param {bool} config.ignoreTouch - Change how touch and keyboard events are handled.
   * @param {number} config.touchMinDistance - Min distance in pixels of a swipe
   * to register it as a slide change.
   * @param {number} config.touchDebounce - Min time in ms between touch events to
   * register them as a slide change
   */
  constructor(
    carouselEl,
    {
      timeInterval = 10000,
      alwaysSlide = false,
      ignoreEvents = false,
      touchMinDistance = 50,
      touchDebounce = 250,
    } = {},
  ) {
    /** @private */
    this.isPlayingEnabled = false;
    /**
     * Changes time in ms between automatic slides rotations.
     * New value takes effect at the next rotation.
     * @type {number}
     */
    this.timeInterval = timeInterval;
    /** @private */
    this.currentIdx = 0;
    /** @private */
    this.slideTimeout = null;
    /** @private */
    this.paused = false;
    /** @private */
    this.touchMinDistance = touchMinDistance;
    /** @private */
    this.touchDebounce = touchDebounce;
    /**
     * Changes default fade animation into sliding.
     * @type {boolean}
     */
    this.alwaysSlide = alwaysSlide;
    /**
     * Ignores touch and keyboard events.
     * @type {boolean}
     */
    this.ignoreEvents = ignoreEvents;

    /** @private */
    this.itemEls = [...carouselEl.querySelectorAll('.carousel__item')];
    /** @private */
    this.dotEls = [...carouselEl.querySelectorAll('.carousel-dots__dot')];
    /** @private */
    this.carouselEl = carouselEl;
    /** @private */
    this.itemWrapEl = carouselEl.querySelector('.carousel__items');
    /** @private */
    this.dotsWrapEl = carouselEl.querySelector('.carousel-dots');

    this.initElementsEvents();
    this.initKeyboardMouseEvents();
    this.initTouchEvents();
  }

  /** @private */
  initElementsEvents() {
    const prevEl = this.carouselEl.querySelector('.carousel__prev');
    prevEl.addEventListener('click', () => this.showPrevSlider(), { passive: true });
    prevEl.addEventListener('focus', () => this.handlePause(), { passive: true });
    prevEl.addEventListener('blur', () => this.handleResume(), { passive: true });

    const nextEl = this.carouselEl.querySelector('.carousel__next');
    nextEl.addEventListener('click', () => this.showNextSlider(), { passive: true });
    nextEl.addEventListener('focus', () => this.handlePause(), { passive: true });
    nextEl.addEventListener('blur', () => this.handleResume(), { passive: true });

    this.itemWrapEl.addEventListener('focusin', () => this.handlePause(), { passive: true });
    this.itemWrapEl.addEventListener('focusout', () => this.handleResume(), { passive: true });
    this.itemWrapEl.addEventListener('animationend', ({ target }) => {
      Carousel.removeAnimationClasses(target);
    }, { passive: true });
  }

  /** @private */
  initKeyboardMouseEvents() {
    this.carouselEl.addEventListener('mouseover', () => this.handlePause(), { passive: true });
    this.carouselEl.addEventListener('mouseout', () => this.handleResume(), { passive: true });

    this.carouselEl.addEventListener('keydown', (e) => {
      if (this.ignoreEvents || e.repeat || document.activeElement !== this.carouselEl) {
        return;
      }
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          this.showPrevSlider();
          break;
        case 'Right':
        case 'ArrowRight':
          this.showNextSlider();
          break;
        default:
          break;
      }
    }, { passive: true });
  }

  /** @private */
  initTouchEvents() {
    let touchStartX = 0;
    let slideFinished = false;
    let lastTouchEnded = performance.now();

    this.itemWrapEl.addEventListener('touchstart', (e) => {
      if (this.ignoreEvents) {
        return;
      }
      this.paused = true;
      slideFinished = false;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.itemWrapEl.addEventListener('touchend', () => {
      if (this.ignoreEvents) {
        return;
      }
      if (slideFinished) {
        lastTouchEnded = performance.now();
      }
      this.paused = false;
    }, { passive: true });

    this.itemWrapEl.addEventListener('touchmove', (e) => {
      if (this.ignoreEvents
        || slideFinished
        || (performance.now() - lastTouchEnded) < this.touchDebounce) {
        return;
      }
      const touchPosition = e.changedTouches[0].screenX;
      if (Math.abs(touchPosition - touchStartX) > this.touchMinDistance) {
        if (touchPosition < touchStartX) {
          this.showNextSlider(true);
        } else {
          this.showPrevSlider(true);
        }
        slideFinished = true;
      }
    }, { passive: true });
  }

  /**
   * Pause automatic slides rotation.
   * @private
   */
  handlePause() {
    this.paused = true;
  }

  /**
   * Resume automatic slides rotation.
   * @private
   */
  handleResume() {
    this.paused = false;
  }

  /**
   * Remove all animation classes from element.
   * @private
   * @param {HTMLElement} el - Element for classes to remove.
   */
  static removeAnimationClasses(el) {
    el.classList.remove(
      'carousel__item_animation_hide',
      'carousel__item_animation_slide-left',
      'carousel__item_animation_slide-right',
    );
  }

  /**
   * Show slider at specified index and switch dots.
   * @private
   * @param {number} idx - Index of slider to show.
   * @param {number} slideMovement - Chooses slide animation.
   *   0 - no animation, 1 - left slide, -1 = right slide.
   */
  showSliderAt(setIdx, slideMovement) {
    if (this.currentIdx === setIdx) {
      return;
    }
    const lastIdx = this.currentIdx;
    this.currentIdx = setIdx;

    this.itemEls.forEach((item, idx) => {
      Carousel.removeAnimationClasses(item);
      if (idx === setIdx) {
        item.classList.add('carousel__item_active');
      } else {
        item.classList.remove('carousel__item_active');
      }
    });

    this.dotEls[lastIdx].classList.remove('carousel-dots__dot_active');
    this.dotEls[setIdx].classList.add('carousel-dots__dot_active');

    let className;
    if (slideMovement === 0) {
      className = 'carousel__item_animation_hide';
    } else if (slideMovement > 0) {
      className = 'carousel__item_animation_slide-left';
    } else {
      className = 'carousel__item_animation_slide-right';
    }
    const lastItem = this.itemEls[lastIdx];
    lastItem.classList.add(className);

    if (this.isPlayingEnabled) {
      this.restartTimer();
    }
  }

  /**
   * Restart timer of sliders rotation.
   * @private
   */
  restartTimer() {
    clearTimeout(this.slideTimeout);
    this.slideTimeout = setTimeout(() => this.rotateSlide(), this.timeInterval);
  }

  /**
   * Show next slider and start a new timer if carousel is enabled.
   * @private
   */
  rotateSlide() {
    if (!this.isPlayingEnabled) {
      this.slideTimeout = null;
      return;
    }
    if (!this.paused) {
      this.showNextSlider();
    } else {
      this.restartTimer();
    }
  }

  /**
   * Show previous slider.
   * @param {boolean} doSliding - Perform sliding of previously active slide.
   */
  showPrevSlider(doSliding = this.alwaysSlide) {
    let nextIdx = this.currentIdx - 1;
    if (nextIdx < 0) {
      nextIdx = this.itemEls.length - 1;
    }
    this.showSliderAt(nextIdx, doSliding ? -1 : 0);
  }

  /**
   * Show next slider.
   * @param {boolean} doSliding - Perform sliding of previously active slide.
   */
  showNextSlider(doSliding = this.alwaysSlide) {
    let nextIdx = this.currentIdx + 1;
    if (nextIdx >= this.itemEls.length) {
      nextIdx = 0;
    }
    this.showSliderAt(nextIdx, doSliding ? 1 : 0);
  }

  /**
   * Start automatic sliders rotation.
   */
  start() {
    // A prefers-reduced-motion user setting must always override autoplay
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (hasReducedMotion.matches) {
      this.isPlayingEnabled = false;
      return;
    }

    this.isPlayingEnabled = true;
    this.restartTimer();
  }

  /**
   * Stop automatic sliders rotation.
   */
  stop() {
    this.isPlayingEnabled = false;
  }
}
