// При выборе типа пожертвования "Ежемесячное"
// 1 - выпадает блок сописанием donation__describe-monthlypay_opened

// const btnOtherAmount = document.querySelector('#other-amount');
const buttonPayMonthly = document.querySelector('#radio-2_option');
const textMonthlyDetails = document.querySelector('.donation__describe-monthlypay');
const buttonSupport = document.querySelector('.donation__support-btn');
const buttonGooglepay = document.querySelector('.donation__button.donation__button_googlepay_default');
const buttonApplepay = document.querySelector('.donation__button.donation__button_applepay_default');

buttonPayMonthly.addEventListener('click', () => {
  textMonthlyDetails.classList.add('donation__describe-monthlypay_opened');
  buttonSupport.classList.add('donation__support-btn_active');
});

const buttonPayOnce = document.querySelector('#radio-1_option');
buttonPayOnce.addEventListener('click', () => {
  textMonthlyDetails.classList.remove('donation__describe-monthlypay_opened');
  buttonSupport.classList.remove('donation__support-btn_active');
});

// При клике на кнопку с Visa
// 1-появляется форма с картами для оплаты
// 2-под формой также одновременно появляется чекбоксы с офертой
// 3-кнопка support-btn меняется на active

const buttonCards = document.querySelector('.donation__button.donation__button_visa-maestro-mir_default');
const cardBox = document.querySelector('.card-box');
const boxAgreement = document.querySelector('.agreement');

buttonCards.addEventListener('click', () => {
  cardBox.classList.add('card-box_opened');
  boxAgreement.classList.add('agreement_opened');
  buttonCards.classList.add('button_active');
  buttonCards.classList.remove('donation__button_visa-maestro-mir_default');
  buttonCards.classList.add('donation__button_visa-maestro-mir_active');
  buttonSupport.classList.add('support-btn_active');
  buttonApplepay.classList.remove('donation__button_applepay_active');
  buttonApplepay.classList.remove('button_active');
  buttonApplepay.classList.add('donation__button_applepay_default');
  buttonGooglepay.classList.remove('donation__button_googlepay_active');
  buttonGooglepay.classList.remove('button_active');
  buttonGooglepay.classList.add('donation__button_googlepay_default');
});

// При клике на кнопки GooglePay и ApplePay:
// 1 - если блок с картами открыт - он должен закрыться,
// 2 - также по кнопке должен быть переход на оплату по выбранной системе.
function closeCard(cards) {
  cards.classList.remove('card-box_opened');
}

buttonGooglepay.addEventListener('click', () => {
  closeCard(cardBox);
  buttonGooglepay.classList.add('button_active');
  buttonGooglepay.classList.remove('donation__button_googlepay_default');
  buttonGooglepay.classList.add('donation__button_googlepay_active');
  buttonApplepay.classList.remove('donation__button_applepay_active');
  buttonApplepay.classList.remove('button_active');
  buttonApplepay.classList.add('donation__button_applepay_default');
  buttonCards.classList.remove('donation__button_visa-maestro-mir_active');
  buttonCards.classList.remove('button_active');
  buttonCards.classList.add('donation__button_visa-maestro-mir_default');
  buttonSupport.classList.add('donation__support-btn_active');
  boxAgreement.classList.add('agreement_opened');
});

buttonApplepay.addEventListener('click', () => {
  closeCard(cardBox);
  buttonApplepay.classList.add('button_active');
  buttonApplepay.classList.remove('donation__button_applepay_default');
  buttonApplepay.classList.add('donation__button_applepay_active');
  buttonGooglepay.classList.remove('donation__button_googlepay_active');
  buttonGooglepay.classList.remove('button_active');
  buttonGooglepay.classList.add('donation__button_googlepay_default');
  buttonCards.classList.remove('donation__button_visa-maestro-mir_active');
  buttonCards.classList.remove('button_active');
  buttonCards.classList.add('donation__button_visa-maestro-mir_default');
  buttonSupport.classList.add('donation__support-btn_active');
  boxAgreement.classList.add('agreement_opened');
});

// Отображение суммы  в "Итого к оплате"
const btnFirstAmount = document.querySelector('#radio-1_amount');
const btnSecondAmount = document.querySelector('#radio-2_amount');
const btnThirdAmount = document.querySelector('#radio-3_amount');
const amountTotal = document.querySelector('.card__total-amount');
const labelFirstAmount = document.querySelector('label[for="radio-1_amount"]');
const labelSecondAmount = document.querySelector('label[for="radio-2_amount"]');
const labelThirdAmount = document.querySelector('label[for="radio-3_amount"]');

function showTotalAmount(label) {
  amountTotal.textContent = label.getAttribute('data-amount');
}

btnFirstAmount.addEventListener('click', () => showTotalAmount(labelFirstAmount));
btnSecondAmount.addEventListener('click', () => showTotalAmount(labelSecondAmount));
btnThirdAmount.addEventListener('click', () => showTotalAmount(labelThirdAmount));

// Отражение в "Итого к оплате"  суммы, напечатанной в поле "Другая сумма"
const inputOtherAmount = document.querySelector('input[id="other-amount"]');

inputOtherAmount.addEventListener('input', () => {
  amountTotal.textContent = inputOtherAmount.value;
});

// Снять флажок cheked у всех кнопок (5 тыс/ 10 тыс/ 50 тыс) когда активно поле "Другая сумма"
/* const allRadios = document.getElementsByName('radio_type_amount');
let booRadio;
let x = 0;
for (x = 0; x < allRadios.length; x++) {
    allRadios[x].onclick = function () {
    if (booRadio == this) {
      this.checked = false;
      booRadio = null;
    } else {
      booRadio = this;
    }
  };
} */
