import Header from './blocks/header.js';
import ScreenSizeTracker from './utils/ScreenSizeTracker.js';
import initDonationSection from './blocks/donation-section.js';
import initEriteUs from './blocks/write-us.js';

const header = new Header(document.querySelector('.header'));

ScreenSizeTracker.addListener(576, (isBigger) => {
  header.onWidthCnahge(!isBigger);
});

initDonationSection(true);
initEriteUs();
