const mobileSize = 576;

// -1 - mobile, 1 - desktop, 0 - undefined
let lastState = 0;
export default function checkScreenSize() {
  if (window.innerHeight <= mobileSize) {
    if (lastState !== -1) {
      lastState = -1;
      // Мы в мобилке
    }
  } else if (lastState !== 1) {
    lastState = 1;
    // Мы в десктопе
  }
}
