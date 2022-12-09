import Header from './header.js';
import ScreenSizeTracker from './utils/ScreenSizeTracker.js';

const header = new Header(document.querySelector('.header'));

ScreenSizeTracker.addListener(576, (isBigger) => {
  header.onWidthCnahge(!isBigger);
});

const buttonSupport = document.querySelector('.donation__support-btn');

const buttons = [...document.querySelectorAll('.donation__button')];
const boxAgreement = document.querySelector('.agreement');
const cardEl = document.querySelector('.donation__card');

const onButtonClick = (e) => {
  const { target } = e;
  target.classList.add('donation__button_active');
  buttons.forEach((btn) => {
    if (btn !== target) {
      btn.classList.remove('donation__button_active');
    }
  });
  boxAgreement.classList.add('agreement_opened');
  buttonSupport.classList.add('support-btn_active');
  if (target.classList.contains('donation__button_type_card')) {
    cardEl.removeAttribute('disabled');
    cardEl.classList.remove('donation__card_hidden');
  } else {
    cardEl.setAttribute('disabled', null);
    cardEl.classList.add('donation__card_hidden');
  }
};

buttons.forEach((el) => el.addEventListener('click', onButtonClick));

const btnRadios = [
  document.querySelector('#radio-1_amount'),
  document.querySelector('#radio-2_amount'),
  document.querySelector('#radio-3_amount'),
];
const btnFourthAmount = document.querySelector('#radio-4_amount');
const amountTotal = document.querySelector('.card__total-amount');
const inputOtherAmount = document.querySelector('#other-amount');

const showTotalAmount = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.checked = true;
  amountTotal.textContent = el.nextElementSibling.getAttribute('data-amount');
  inputOtherAmount.value = '';
};

const updateTotalAmount = () => {
  btnRadios.some((el) => {
    if (el.checked) {
      showTotalAmount(el);
      return true;
    }
    return false;
  });
};

const clickHandler = (e) => showTotalAmount(e.target);
btnRadios.forEach((el) => el.addEventListener('change', clickHandler));

inputOtherAmount.addEventListener('input', () => {
  btnFourthAmount.checked = true;
  amountTotal.textContent = inputOtherAmount.value;
});

const labelFirstAmount = document.querySelector('label[for="radio-1_amount"]');
const labelSecondAmount = document.querySelector('label[for="radio-2_amount"]');
const labelThirdAmount = document.querySelector('label[for="radio-3_amount"]');

const splitThousands = (num) => {
  const str = num.toString();
  if (str.length <= 3) {
    return str;
  }
  const rv = [];
  for (let i = str.length - 1, j = 1; i >= 0; i -= 1, j += 1) {
    rv.push(str[i]);
    if (j % 3 === 0) {
      rv.push(' ');
    }
  }
  return rv.reverse().join('');
};

const setLabelsAmount = (amount1, amount2, amount3) => {
  labelFirstAmount.textContent = splitThousands(amount1);
  labelFirstAmount.setAttribute('data-amount', amount1);
  labelSecondAmount.textContent = splitThousands(amount2);
  labelSecondAmount.setAttribute('data-amount', amount2);
  labelThirdAmount.textContent = splitThousands(amount3);
  labelThirdAmount.setAttribute('data-amount', amount3);
  updateTotalAmount();
};

const textMonthlyDetails = document.querySelector('.donation__describe-monthlypay');
const buttonPayMonthly = document.querySelector('#radio-2_option');
const buttonPayOnce = document.querySelector('#radio-1_option');

const handlePayTypeChange = () => {
  if (buttonPayMonthly.checked) {
    textMonthlyDetails.classList.add('donation__describe-monthlypay_opened');
    buttonSupport.classList.add('donation__support-btn_active');
    setLabelsAmount(1000, 5000, 10000);
  } else if (buttonPayOnce.checked) {
    textMonthlyDetails.classList.remove('donation__describe-monthlypay_opened');
    buttonSupport.classList.remove('donation__support-btn_active');
    setLabelsAmount(5000, 10000, 50000);
  }
};

buttonPayMonthly.addEventListener('change', handlePayTypeChange);

buttonPayOnce.addEventListener('change', handlePayTypeChange);
