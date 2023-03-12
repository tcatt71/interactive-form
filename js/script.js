const nameField = document.querySelector('#name');
const otherJobRoleField = document.querySelector('#other-job-role');
const jobRoleDropDownMenu = document.querySelector('#title');
const colorDropDownMenu = document.querySelector('#color');
const designDropDownMenu = document.querySelector('#design');
const registerForActivitesFieldset = document.querySelector('#activities');
const activities = document.querySelectorAll('#activities-box [type="checkbox"]');
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
styleFocusStatesOfActivities();

function styleFocusStatesOfActivities() {
  for (const activity of activities) {
    activity.addEventListener('focus', () => activity.parentElement.classList.add('focus'));
    activity.addEventListener('blur', () => activity.parentElement.classList.remove('focus'));
  }
}

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
  const emailField = document.querySelector('#email');
  const activitiesBoxDiv = document.querySelector('#activities-box');

  function handleValidInput(element) {
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
  }

  function handleInvalidInput(element) {
    e.preventDefault();
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = 'block';
  }

  if (nameIsValid()) {
    handleValidInput(nameField);
  } else {
    handleInvalidInput(nameField);
  }

  if (emailIsValid()) {
    handleValidInput(emailField);
  } else {
    handleInvalidInput(emailField);
  }

  if (registerForActivitiesIsChecked()) {
    handleValidInput(activitiesBoxDiv);
  } else {
    handleInvalidInput(activitiesBoxDiv);
  }

  if (!creditCardDiv.hidden) {
    const creditCardNumberfield = document.querySelector('#cc-num');
    const zipCodeField = document.querySelector('#zip');
    const cvvField = document.querySelector('#cvv');

    if (creditCardNumberIsValid()) {
      handleValidInput(creditCardNumberfield);
    } else {
      handleInvalidInput(creditCardNumberfield);
    }

    if (zipCodeIsValid()) {
      handleValidInput(zipCodeField);
    } else {
      handleInvalidInput(zipCodeField);
    }

    if (cvvIsValid()) {
      handleValidInput(cvvField);
    } else {
      handleInvalidInput(cvvField);
    }

    function creditCardNumberIsValid() {
      const creditCardNumber = creditCardNumberfield.value;

      const isValid = /^\d{13,16}$/.test(creditCardNumber)
      return isValid;
    }

    function zipCodeIsValid() {
      const zipCode = zipCodeField.value;

      const isValid = /^\d{5}$/.test(zipCode);
      return isValid;
    }

    function cvvIsValid() {
      const cvv = cvvField.value;

      const isValid = /^\d{3}$/.test(cvv);
      return isValid;
    }
  }

  function nameIsValid() {
    const name = nameField.value;

    const isValid = /\S/.test(name)
    return isValid;
  }

  function emailIsValid() {
    const email = emailField.value;

    const isValid = /^\w+\.?\w+@\w+\.com$/i.test(email);
    return isValid;
  }

  function registerForActivitiesIsChecked() {
    const checkboxes = document.querySelectorAll('#activities-box [type="checkbox"]');

    for (const checkbox of checkboxes) {
      if (checkbox.checked) {
        return true;
      }
    }
    return false;
  }
}