// Scroll to anchor
const anchors = document.querySelectorAll('a[href^="#"]:not(.is-static)');
anchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    const target = document.querySelector(anchor.hash);
    event.preventDefault();
    // target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    target.scrollIntoView();
  });
});

// Add object-fit fallback
if ('objectFit' in document.documentElement.style === false) {
  const elements = document.querySelectorAll('.js-object-fit');
  elements.forEach((element) => {
    const imgURL = element.querySelector('img');
    const imgSrc = imgURL.getAttribute('src');
    if (imgURL) {
      element.style.backgroundImage = `url('${imgSrc}')`;
      element.classList.add('is-object-fit-fallback');
    }
  });
}

const touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

// Settings for payment amounts
function paymentAmountSettings(paymentType) {
  // Set variables
  const amountDesc = document.querySelector(`.js-${paymentType}-desc`);
  const amountDescText = document.querySelector(`.js-${paymentType}-desc-text`);
  const amountDescPreview = document.querySelector(`.js-${paymentType}-desc-preview`);
  const amountPanel = document.querySelector(`.js-${paymentType}-panel`);
  const amountOther = document.querySelector(`.js-${paymentType}-other`);

  // Round input amount value
  function getRoundedAmount() {
    const elements = document.querySelectorAll('.js-amount-rounded');
    const amountChanged = document.querySelector(`.js-${paymentType}-amount-changed`);
    elements.forEach((element) => {
      element.addEventListener('blur', () => {
        const amount = element.value;
        element.value = Math.round(amount);
        amountChanged.value = element.value;
      });
    });
  }
  getRoundedAmount();

  // Display description for preset donation amount
  function setAmountDesc() {
    const presetAmount = document.querySelector(`.js-${paymentType}-amount input[checked]`);
    const presetDescription = presetAmount.parentElement.getAttribute('data-desc');
    amountDescText.innerHTML = presetDescription;
    // amountSelected.innerHTML = presetAmount.parentElement.getAttribute('data-amount');
  }
  setAmountDesc();

  // Duplicate other amount
  function otherAmountDuplicate() {
    const amountDuplicate = document.querySelector(`.js-${paymentType}-amount-duplicate`);
    const amountChanged = document.querySelector(`.js-${paymentType}-amount-changed`);
    amountDuplicate.addEventListener('keyup', () => {
      amountChanged.value = amountDuplicate.value;
    });
  }
  otherAmountDuplicate();

  // Scroll to donation amount anchor
  function setAmountScroll() {
    const target = document.querySelector('.js-payment-anchor');
    // target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    target.scrollIntoView();
  }
  // Show amount description
  function showAmount() {
    amountDesc.classList.remove('is-hidden');
    amountDescPreview.classList.add('is-hidden');
    amountDescText.classList.remove('is-hidden');
  }
  // Show other amount field
  function showOtherAmount() {
    amountOther.classList.remove('is-hidden');
  }
  // Show amount description preview
  function showpreviewAmount() {
    amountDesc.classList.remove('is-hidden');
    amountDescText.classList.add('is-hidden');
    amountDescPreview.classList.remove('is-hidden');
  }
  // Hide amount description
  function hideAmount() {
    amountDesc.classList.add('is-hidden');
  }
  // Hide other amount field
  function hideOtherAmount() {
    amountOther.classList.add('is-hidden');
  }
  // Hide amount description preview
  function hidePreviewAmount() {
    amountDescPreview.classList.add('is-hidden');
    amountDescPreview.innerHTML = null;
  }

  // Change amount state (click, mouseover, mouseout)
  function changeAmountState() {
    const amounts = document.querySelectorAll(`.js-${paymentType}-amount`);
    const amountTypeOther = document.querySelector(`.js-${paymentType}-amount[data-type=other] input`);
    const amountDuplicate = document.querySelector(`.js-${paymentType}-amount-duplicate`);
    const amountChanged = document.querySelector(`.js-${paymentType}-amount-changed`);
    amounts.forEach((amount, i) => {
      amount.classList.add(`js-${paymentType}-amount-${i + 1}`);
      amount.addEventListener('click', () => {
        setAmountScroll();
        amountPanel.setAttribute('data-click', `amount-${i + 1}`);
        if (amount.getAttribute('data-type') === 'other') {
          showOtherAmount();
          hideAmount();
          amount.classList.add('is-hidden');
          amountDuplicate.value = '';
          amountChanged.value = '';
          amountDuplicate.foucs();
        } else {
          showAmount();
          hideOtherAmount();
          amountDescText.innerHTML = amount.getAttribute('data-desc');
          document.querySelector(`.js-${paymentType}-amount[data-type=other]`).classList.remove('is-hidden');
        }
      });
      if (!touchsupport) {
        amount.addEventListener('mouseover', () => {
          amountPanel.setAttribute('data-hover', `amount-${i + 1}`);
          if (amount.getAttribute('data-type') === 'other') {
            showOtherAmount();
            hideAmount();
          } else {
            showpreviewAmount();
            hideOtherAmount();
            amountDescPreview.innerHTML = amount.getAttribute('data-desc');
          }
        });
        amount.addEventListener('mouseout', () => {
          amountPanel.setAttribute('data-hover', '');
          const amountType = amount.getAttribute('data-type');
          if (amountType === 'number' && amountTypeOther.checked) {
            // If leaving number amount and other amount is selected...
            showOtherAmount();
            hideAmount();
          } else if (amountType === 'other' && amountTypeOther.checked) {
            // If leaving other amount and other amount is selected...
            showOtherAmount();
            hideAmount();
          } else {
            showAmount();
            hideOtherAmount();
            hidePreviewAmount();
          }
        });
      }
    });
  }
  changeAmountState();
}

// Load functions for each payment type
const paymentExists = document.body.contains(document.querySelector('.js-payment'));
if (paymentExists) {
  paymentAmountSettings('oneoff');
}

// Form Validation
function formValidation() {
  const classExists = document.body.contains(document.querySelector('.js-form-validation'));
  if (classExists) {
    const inputRequired = document.querySelectorAll('input[required]');
    inputRequired.forEach((input) => {
      input.addEventListener('blur', () => {
        const inputInvalid = input.matches(':invalid');
        const errorMessage = input.getAttribute('data-error');
        const errorPath = input.closest('.o-input').querySelector('.o-error');
        const errorFormat = `<p><i class="fa fa-exclamation-circle" aria-label="Error Message"></i> ${errorMessage}</p>`;
        input.classList.add('is-complete');
        if (inputInvalid) {
          errorPath.innerHTML = errorFormat;
        } else {
          errorPath.innerHTML = '';
        }
      });
    });
  }
}
formValidation();
