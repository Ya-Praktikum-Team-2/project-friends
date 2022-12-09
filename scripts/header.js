class Header {
  constructor(headerEl) {
    this.hamburderEl = headerEl.querySelector('.header__hamburger');
    this.menuEl = headerEl.querySelector('.header__menu');
    this.fundItemEl = headerEl.querySelector('.header__nav-item-fund');
    this.fundMenuEl = headerEl.querySelector('.header__fund');
    this.fundData = { to: null, hidden: true };

    this.programsItemEl = headerEl.querySelector('.header__nav-item-programs');
    this.programsMenuEl = headerEl.querySelector('.header__programs');
    this.programsData = { to: null, hidden: true };
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

  addMenuEvents(itemEl, itemData, toggleFunc) {
    const showMenu = () => {
      if (this.isMobile) {
        return;
      }
      Header.onItemOver(itemData, () => toggleFunc(true));
    };
    itemEl.addEventListener('mouseover', showMenu, { passive: true });
    itemEl.addEventListener('focusin', showMenu, { passive: true });

    const hideMenu = () => {
      if (this.isMobile) {
        return;
      }
      Header.onItemOut(itemData, () => toggleFunc(false));
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

  /* eslint-disable no-param-reassign */
  static onItemOver(data, toggleFn) {
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

  /* eslint-disable no-param-reassign */
  static onItemOut(data, toggleFn) {
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

  toggleFundMenu(show) {
    this.fundData.hidden = !show;
    if (show) {
      this.fundMenuEl.classList.remove('header__fund_hidden');
    } else {
      this.fundMenuEl.classList.add('header__fund_hidden');
    }
  }

  toggleProgramsMenu(show) {
    this.programsData.hidden = !show;
    if (show) {
      this.programsMenuEl.classList.remove('header__programs_hidden');
    } else {
      this.programsMenuEl.classList.add('header__programs_hidden');
    }
  }

  onViewCnahge(isMobile) {
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
