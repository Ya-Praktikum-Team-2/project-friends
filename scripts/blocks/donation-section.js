const initDonationSection = (initShowTotal) => {
  const buttons = [...document.querySelectorAll('.donation__button')];
  const boxAgreement = document.querySelector('.donation__agreement');
  const cardEl = document.querySelector('.donation__card');

  const onButtonClick = (e) => {
    const { target } = e;
    const lastEl = target.parentNode.querySelector('.donation__button_active');
    if (lastEl) {
      lastEl.setAttribute('aria-pressed', 'false');
      lastEl.classList.remove('donation__button_active');
    }
    target.classList.add('donation__button_active');
    target.setAttribute('aria-pressed', 'true');
    boxAgreement.classList.add('donation__agreement_opened');
    if (target.classList.contains('donation__button_type_card')) {
      cardEl.removeAttribute('disabled');
      cardEl.classList.remove('donation__card_hidden');
    } else {
      cardEl.setAttribute('disabled', '');
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
  const inputOtherAmount = document.querySelector('#other-amount');

  if (!initShowTotal) {
    inputOtherAmount.addEventListener('input', () => {
      btnFourthAmount.checked = true;
    });
    const simpleClickHandler = () => {
      inputOtherAmount.value = '';
    };
    btnRadios.forEach((el) => el.addEventListener('change', simpleClickHandler));
    return;
  }

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

  const amountTotal = document.querySelector('.card__total-amount');

  const showTotalAmount = (el) => {
    // eslint-disable-next-line no-param-reassign
    el.checked = true;
    amountTotal.textContent = `${el.nextElementSibling.getAttribute('data-amount')} ₽`;
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
    amountTotal.textContent = `${splitThousands(inputOtherAmount.value)} ₽`;
  });

  const labelFirstAmount = document.querySelector('label[for="radio-1_amount"]');
  const labelSecondAmount = document.querySelector('label[for="radio-2_amount"]');
  const labelThirdAmount = document.querySelector('label[for="radio-3_amount"]');

  const setLabelsAmount = (amount1, amount2, amount3) => {
    const setLabel = (label, amount) => {
      const splAmount = splitThousands(amount);
      // eslint-disable-next-line no-param-reassign
      label.textContent = splAmount;
      label.setAttribute('data-amount', splAmount);
    };
    setLabel(labelFirstAmount, amount1);
    setLabel(labelSecondAmount, amount2);
    setLabel(labelThirdAmount, amount3);
    updateTotalAmount();
  };

  const textMonthlyDetails = document.querySelector('.donation__describe-monthlypay');
  const buttonPayMonthly = document.querySelector('#radio-2_option');
  const buttonPayOnce = document.querySelector('#radio-1_option');

  const handlePayTypeChange = () => {
    if (buttonPayMonthly.checked) {
      textMonthlyDetails.classList.add('donation__describe-monthlypay_opened');
      setLabelsAmount(1000, 5000, 10000);
    } else if (buttonPayOnce.checked) {
      textMonthlyDetails.classList.remove('donation__describe-monthlypay_opened');
      setLabelsAmount(5000, 10000, 50000);
    }
  };

  buttonPayMonthly.addEventListener('change', handlePayTypeChange);

  buttonPayOnce.addEventListener('change', handlePayTypeChange);

  buttons[0].click();
};

export default initDonationSection;
