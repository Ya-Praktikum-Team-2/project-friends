/**
 * @fileOverview Implementation of sreen size tracker
 * @author Vladislav Cherepita
 * @version 1.0.0
 */

/**
 * Callback for ScreenSizeTracker event handlers.
 *
 * @callback ScreenSizeTrackerCallback
 * @param {bool} isBigger - Is screen size become bigger
 * than size specified for this function.
 */

/** Sreen size tracker */
class ScreenSizeTracker {
  constructor() {
    this.data = [];
    this.eventInited = false;
    this.lastCheckedSize = 0;
  }

  /**
   * An event handler for window resize event
   * @private
   * */
  handleEvent() {
    const newSize = window.innerWidth;
    const minSize = Math.min(this.lastCheckedSize, newSize);
    const maxSize = Math.max(this.lastCheckedSize, newSize);
    this.data.forEach(([size, cbs]) => {
      if (size > minSize && size <= maxSize) {
        cbs.forEach((cb) => {
          cb(newSize > size);
        });
      }
    });
    this.lastCheckedSize = newSize;
  }

  /**
   *
   * @param {number} size Size of the window to track
   * @param {ScreenSizeTrackerCallback} cb Fucntion to call when
   * window size crosses become bigger or smaller than size
   * @param {bool} callNow Do the first call immideatly
   */
  addListener(size, cb, callNow = true) {
    const data = this.data.find((el) => el[0] === size);
    if (data) {
      data[1].push(cb);
    } else {
      this.data.push([size, [cb]]);
      this.data.sort((a, b) => a[0] - b[0]);
    }
    if (!this.eventInited) {
      this.eventInited = true;
      this.lastCheckedSize = window.innerWidth;
      window.addEventListener('resize', this, { passive: true });
    }
    if (callNow) {
      cb(window.innerWidth > size);
    }
  }
}

export default new ScreenSizeTracker();
