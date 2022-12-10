/**
 * @fileOverview Implementation of Header section helper
 * @author Vladislav Cherepita
 * @version 1.0.0
 */

/** Header section helper */
class Header {
  /**
   * Create a header section helper.
   * @param {HTMLElement} headerEl Header section element
   */
  constructor(headerEl) {
    /** @private */
    this.hamburderEl = headerEl.querySelector('.header__hamburger');
    /** @private */
    this.menuEl = headerEl.querySelector('.header__menu');
    /** @private */
    this.fundItemEl = headerEl.querySelector('.header__nav-item-fund');
    /** @private */
    this.fundMenuEl = headerEl.querySelector('.header__fund');
    /** @private */
    this.fundData = { to: null, hidden: true };

    /** @private */
    this.programsItemEl = headerEl.querySelector('.header__nav-item-programs');
    /** @private */
    this.programsMenuEl = headerEl.querySelector('.header__programs');
    /** @private */
    this.programsData = { to: null, hidden: true };
    /** @private */
    this.isMobile = true;

    this.hamburderEl.addEventListener('click', () => {
      this.toggleMenu(!this.hamburderEl.classList.contains('header__hamburger_active'));
    });

    this.menuEl.querySelector('.close-button').addEventListener('click', () => {
      this.toggleMenu(false);
    });

    this.addMenuEvents(this.fundItemEl, this.fundData, this.toggleFundMenu.bind(this));
    this.addMenuEvents(
      this.programsItemEl,
      this.programsData,
      this.toggleProgramsMenu.bind(this),
    );
  }

  /**
   * Add events for menu handling
   * @private
   */
  addMenuEvents(itemEl, itemData, toggleFunc) {
    const showMenu = () => {
      if (this.isMobile) {
        return;
      }
      Header.handleItemOver(itemData, () => toggleFunc(true));
    };
    itemEl.addEventListener('mouseover', showMenu, { passive: true });
    itemEl.addEventListener('focusin', showMenu, { passive: true });

    const hideMenu = () => {
      if (this.isMobile) {
        return;
      }
      Header.handleItemOut(itemData, () => toggleFunc(false));
    };
    itemEl.addEventListener('mouseout', hideMenu, { passive: true });
    itemEl.addEventListener('focusout', hideMenu, { passive: true });

    itemEl.firstElementChild.addEventListener('click', (e) => {
      if (!this.isMobile) {
        return;
      }
      e.preventDefault();
      toggleFunc(true);
    });

    itemEl.querySelector('.close-button').addEventListener('click', (e) => {
      if (!this.isMobile) {
        return;
      }
      e.preventDefault();
      toggleFunc(false);
    });
  }

  /**
   * Handle over and focus events with timeout
   * @private
   */
  /* eslint-disable no-param-reassign */
  static handleItemOver(data, toggleFn) {
    if (data.to) {
      clearTimeout(data.to);
      data.to = null;
    } else if (data.hidden) {
      data.to = setTimeout(() => {
        data.to = null;
        toggleFn();
      }, 100);
    }
  }

  /**
   * Handle out and blur events with timeout
   * @private
   */
  /* eslint-disable no-param-reassign */
  static handleItemOut(data, toggleFn) {
    if (data.to) {
      clearTimeout(data.to);
      data.to = null;
    } else if (!data.hidden) {
      data.to = setTimeout(() => {
        data.to = null;
        toggleFn();
      }, 250);
    }
  }

  /**
   * Show and hide page menu
   * @private
   */
  toggleMenu(show) {
    if (show) {
      this.hamburderEl.setAttribute('aria-pressed', 'true');
      this.menuEl.classList.add('header__menu_active');
      this.hamburderEl.classList.add('header__hamburger_active');
    } else {
      this.toggleFundMenu(false);
      this.toggleProgramsMenu(false);
      this.hamburderEl.setAttribute('aria-pressed', 'false');
      this.menuEl.classList.remove('header__menu_active');
      this.hamburderEl.classList.remove('header__hamburger_active');
    }
  }

  /**
   * Show and hide fund submenu
   * @private
   */
  toggleFundMenu(show) {
    this.fundData.hidden = !show;
    if (show) {
      this.fundMenuEl.classList.remove('header__fund_hidden');
    } else {
      this.fundMenuEl.classList.add('header__fund_hidden');
    }
  }

  /**
   * Show and hide programs submenu
   * @private
   */
  toggleProgramsMenu(show) {
    this.programsData.hidden = !show;
    if (show) {
      this.programsMenuEl.classList.remove('header__programs_hidden');
    } else {
      this.programsMenuEl.classList.add('header__programs_hidden');
    }
  }

  /**
   * Call on page width change
   */
  onWidthCnahge(isMobile) {
    if (isMobile === this.isMobile) {
      return;
    }
    this.isMobile = isMobile;
    const wraps = [...this.programsMenuEl.querySelectorAll('.header__programs-wrap')];
    if (isMobile) {
      wraps.forEach((wrap) => {
        const newWrap = document.createElement('div');
        newWrap.className = wrap.className;
        [...wrap.children].forEach((el) => {
          newWrap.appendChild(el);
        });
        const link = document.createElement('a');
        link.className = 'header__programs-button';
        link.setAttribute('href', wrap.getAttribute('href'));
        link.textContent = 'О программе';
        newWrap.appendChild(link);
        wrap.before(newWrap);
        wrap.remove();
      });
    } else {
      wraps.forEach((wrap) => {
        const newWrap = document.createElement('a');
        newWrap.className = wrap.className;
        const link = wrap.lastElementChild;
        newWrap.setAttribute('href', link.getAttribute('href'));
        link.remove();
        [...wrap.children].forEach((el) => {
          newWrap.appendChild(el);
        });
        wrap.before(newWrap);
        wrap.remove();
      });
    }
  }
}

export default Header;
