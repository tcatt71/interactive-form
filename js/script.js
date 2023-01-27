const nameField = document.querySelector('#name');
const otherJobRoleField = document.querySelector('#other-job-role');
const jobRoleDropDownMenu = document.querySelector('#title');
const colorDropDownMenu = document.querySelector('#color');
const designDropDownMenu = document.querySelector('#design');
const registerForActivitesFieldset = document.querySelector('#activities');
const paymentMethodDropDownMenu = document.querySelector('#payment');
const creditCArdOptionElement = paymentMethodDropDownMenu.querySelector('option[value="credit-card"]');
const creditCardDiv = document.querySelector('#credit-card');
const paypalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin');
const formElement = document.querySelector('form');

nameField.focus();
otherJobRoleField.hidden = true;
colorDropDownMenu.disabled = true;
creditCArdOptionElement.selected = true;
paypalDiv.hidden = true;
bitcoinDiv.hidden = true;


jobRoleDropDownMenu.addEventListener('change', toggleOtherJobRoleField);

function toggleOtherJobRoleField() {
  if (jobRoleDropDownMenu.value === 'other') {
    otherJobRoleField.hidden = false;
  } else {
    otherJobRoleField.hidden = true;
  }
}

designDropDownMenu.addEventListener('change', selectTShirtColorByTheme);

function selectTShirtColorByTheme() {
  colorDropDownMenu.disabled = false;

  const optionElements = colorDropDownMenu.options;

  if (designDropDownMenu.value === 'js puns') {
    displayTShirtsOptions('js puns', 'cornflowerblue');
  } else {
    displayTShirtsOptions('heart js', 'tomato');
  }

  function displayTShirtsOptions(theme, optionValue) {
    for (const option of optionElements) {
      if (option.dataset.theme === theme) {
        option.hidden = false;
        if (option.value === optionValue) option.selected = true;
      } else {
        option.hidden = true;
      }
    }
  }
}

registerForActivitesFieldset.addEventListener('change', updateCostOfAttendance);

function updateCostOfAttendance(e) {
  const activitiesCostParagraph = document.querySelector('#activities-cost');
  const activities = document.querySelectorAll('#activities [type="checkbox"]');
  const checkbox = e.target;
  const activityCost = parseInt(checkbox.dataset.cost);
  let totalCost = parseInt(activitiesCostParagraph.textContent.substring(8));

  if (checkbox.checked) {
    for (const activity of activities) {
      if ((activity.dataset.dayAndTime === checkbox.dataset.dayAndTime) && (activity.name !== checkbox.name)) {
        activity.disabled = true;
        activity.parentElement.classList.add('disabled');
      }
    }
    totalCost += activityCost;
    activitiesCostParagraph.textContent = `Total: $${totalCost}`;
  } else {
    for (const activity of activities) {
      if ((activity.dataset.dayAndTime === checkbox.dataset.dayAndTime) && (activity.name !== checkbox.name)) {
        activity.disabled = false;
        activity.parentElement.classList.remove('disabled');
      }
    }
    totalCost -= activityCost;
    activitiesCostParagraph.textContent = `Total: $${totalCost}`;
  }
}

paymentMethodDropDownMenu.addEventListener('change', dispalyPaymentOptionFields);

function dispalyPaymentOptionFields() {
  if (paymentMethodDropDownMenu.value === 'credit-card') {
    creditCardDiv.hidden = false;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
  } else if (paymentMethodDropDownMenu.value === 'paypal') {
    creditCardDiv.hidden = true;
    paypalDiv.hidden = false;
    bitcoinDiv.hidden = true;
  } else {
    creditCardDiv.hidden = true;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = false;
  }
}

formElement.addEventListener('submit', validateForm);

function validateForm(e) {
  if (!nameIsValid()) {
    e.preventDefault();
  } else if (!emailIsValid()) {
    e.preventDefault()
  } else if (!registerForActivitiesIsChecked()) {
    e.preventDefault();
  } else if (!creditCardDiv.hidden) {
    if (!creditCardIsValid()) {
      e.preventDefault();
    }
  }

  function nameIsValid() {
    const name = nameField.value;

    const isValid = /\S/.test(name)
    console.log('name', isValid);
    return isValid;
  }

  function emailIsValid() {
    const emailField = document.querySelector('#email');
    const email = emailField.value;

    const isValid = /^\w+\.?\w+@\w+\.com$/i.test(email);
    console.log('email', isValid);
    return isValid;
  }

  function registerForActivitiesIsChecked() {
    const checkboxes = document.querySelectorAll('#activities-box [type="checkbox"]');

    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        console.log('checkbox checked', true);
        return true;
      } else {
        console.log('checkbox checked', false);
      }
    }
    console.log('checkbox checked', false);
    return false;
  }

  function creditCardIsValid() {
    if (!creditCardDiv.hidden) {
      if (!creditCardNumberIsValid()) {
        return false;
      } else if (!zipCodeIsValid()) {
        return false;
      } else if (!cvvIsValid()) {
        return false;
      } else {
        console.log('Credit card', true);
        return true;
      }
    }

    function creditCardNumberIsValid() {
      const creditCardNumberfield = document.querySelector('#cc-num');
      const creditCardNumber = creditCardNumberfield.value;

      console.log(creditCardNumber);
      const isValid = /^\d{13,16}$/.test(creditCardNumber)
      console.log('credit card number', isValid);
      return isValid;
    }

    function zipCodeIsValid() {
      const zipCodeField = document.querySelector('#zip');
      const zipCode = zipCodeField.value;

      const isValid = /^\d{5}$/.test(zipCode);
      console.log('zip code', isValid);
      return isValid;
    }

    function cvvIsValid() {
      const cvvField = document.querySelector('#cvv');
      const cvv = cvvField.value;

      const isValid = /^\d{3}$/.test(cvv);
      console.log('cvv', isValid);
      return isValid;
    }
  }
}







