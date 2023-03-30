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
const emailField = document.querySelector('#email');
const creditCardNumberField = document.querySelector('#cc-num');
const zipCodeField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const activitiesBoxDiv = document.querySelector('#activities-box');

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

function updateCostOfAttendance(event) {
  const activitiesCostParagraph = document.querySelector('#activities-cost');
  const checkbox = event.target;
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

function validateForm(event) {
  if (nameIsValid(event)) {
    handleValidInput(nameField);
  } else {
    handleInvalidInput(nameField, event);
  }

  if (emailIsValid(event)) {
    handleValidInput(emailField);
  } else {
    handleInvalidInput(emailField, event);
  }

  if (registerForActivitiesIsChecked(event)) {
    handleValidInput(activitiesBoxDiv);
  } else {
    handleInvalidInput(activitiesBoxDiv, event);
  }

  if (!creditCardDiv.hidden) {
    if (creditCardNumberIsValid(event)) {
      handleValidInput(creditCardNumberField);
    } else {
      handleInvalidInput(creditCardNumberField, event);
    }

    if (zipCodeIsValid(event)) {
      handleValidInput(zipCodeField);
    } else {
      handleInvalidInput(zipCodeField, event);
    }

    if (cvvIsValid(event)) {
      handleValidInput(cvvField);
    } else {
      handleInvalidInput(cvvField, event);
    }
  }
}

nameField.addEventListener('keyup', nameIsValid);

function nameIsValid(event) {
  const name = nameField.value;

  const isValid = /\S/.test(name)

  if (isValid) {
    handleValidInput(nameField);
  } else {
    handleInvalidInput(nameField, event);
  }
  return isValid;
}

emailField.addEventListener('keyup', emailIsValid);

function emailIsValid(event) {
  const email = emailField.value;

  const isValid = /^\w+\.?\w+@\w+\.(com|net|org)$/i.test(email);

  if (isValid) {
    handleValidInput(emailField);
  } else if (email === '') {
    emailField.parentElement.lastElementChild.textContent = 'Please enter an email address';
    handleInvalidInput(emailField, event);
  } else {
    emailField.parentElement.lastElementChild.textContent = 'Email address must be formatted correctly';
    handleInvalidInput(emailField, event);
  }
  return isValid;
}

activitiesBoxDiv.addEventListener('change', registerForActivitiesIsChecked);

function registerForActivitiesIsChecked(event) {
  const checkboxes = document.querySelectorAll('#activities-box [type="checkbox"]');
  let isChecked = false;

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      isChecked = true;
    }
  }

  if (isChecked) {
    handleValidInput(activitiesBoxDiv);
  } else {
    handleInvalidInput(activitiesBoxDiv, event);
  }
  return isChecked;
}

creditCardNumberField.addEventListener('keyup', creditCardNumberIsValid);

function creditCardNumberIsValid(event) {
  const creditCardNumber = creditCardNumberField.value;

  const isValid = /^\d{13,16}$/.test(creditCardNumber)

  if (isValid) {
    handleValidInput(creditCardNumberField);
  } else {
    handleInvalidInput(creditCardNumberField, event);
  }
  return isValid;
}

zipCodeField.addEventListener('keyup', zipCodeIsValid);

function zipCodeIsValid(event) {
  const zipCode = zipCodeField.value;

  const isValid = /^\d{5}$/.test(zipCode);

  if (isValid) {
    handleValidInput(zipCodeField);
  } else {
    handleInvalidInput(zipCodeField, event);
  }
  return isValid;
}

cvvField.addEventListener('keyup', cvvIsValid);

function cvvIsValid(event) {
  const cvv = cvvField.value;

  const isValid = /^\d{3}$/.test(cvv);

  if (isValid) {
    handleValidInput(cvvField);
  } else {
    handleInvalidInput(cvvField, event);
  }
  return isValid;
}

function handleValidInput(element) {
  element.parentElement.classList.remove('not-valid');
  element.parentElement.classList.add('valid');
  element.parentElement.lastElementChild.style.display = 'none';
}

function handleInvalidInput(element, event) {
  event.preventDefault();
  element.parentElement.classList.remove('valid');
  element.parentElement.classList.add('not-valid');
  element.parentElement.lastElementChild.style.display = 'block';
}