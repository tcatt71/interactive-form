const nameField = document.querySelector('#name');
const otherJobRoleField = document.querySelector('#other-job-role');
const jobRoleDropDownMenu = document.querySelector('#title');
const colorDropDownMenu = document.querySelector('#color');
const designDropDownMenu = document.querySelector('#design');
const registerForActivitesFieldset = document.querySelector('#activities');
const activities = document.querySelectorAll('#activities-box [type="checkbox"]');
const paymentMethodDropDownMenu = document.querySelector('#payment');
const creditCardDiv = document.querySelector('#credit-card');
const paypalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin');
const formElement = document.querySelector('form');
const emailField = document.querySelector('#email');
const creditCardNumberField = document.querySelector('#cc-num');
const zipCodeField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const activitiesBoxDiv = document.querySelector('#activities-box');

initialSetting();

/** Sets the initial setting when the page loads. */
function initialSetting() {
  const creditCArdOptionElement = paymentMethodDropDownMenu.querySelector('option[value="credit-card"]');

  nameField.focus();
  otherJobRoleField.hidden = true;
  colorDropDownMenu.disabled = true;
  creditCArdOptionElement.selected = true;
  paypalDiv.hidden = true;
  bitcoinDiv.hidden = true;
}

styleFocusStatesOfActivities();

/** Makes focus states for each activity more apparent. */
function styleFocusStatesOfActivities() {
  for (const activity of activities) {
    activity.addEventListener('focus', () => activity.parentElement.classList.add('focus'));
    activity.addEventListener('blur', () => activity.parentElement.classList.remove('focus'));
  }
}

jobRoleDropDownMenu.addEventListener('change', toggleOtherJobRoleField);

/** Display the 'other job role' input field if the 'other' option element is selected and hides it if another option element is selected. */
function toggleOtherJobRoleField() {
  if (jobRoleDropDownMenu.value === 'other') {
    otherJobRoleField.hidden = false;
  } else {
    otherJobRoleField.hidden = true;
  }
}

designDropDownMenu.addEventListener('change', selectTShirtColorByTheme);

/** Reveals the t-shirt color options available of selected theme. */
function selectTShirtColorByTheme() {
  colorDropDownMenu.disabled = false;

  const optionElements = colorDropDownMenu.options;

  if (designDropDownMenu.value === 'js puns') {
    displayTShirtsOptions('js puns', 'cornflowerblue');
  } else {
    displayTShirtsOptions('heart js', 'tomato');
  }

  /**
   * Displays the selected theme's available t-shirt colors and sets a given color to be selected in the select element.
   * @param {string} theme - The theme of the t-shirt.
   * @param {string} optionValue - The color of the t-shirt to be selected in the select element.
   */
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

/**
 * Calculates the cost of attendance by adding or subtracting the cost of activities checked or unchecked.
 * @param {Object} event - The event object passed to the function.
 */
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

/** Displays appropriate payment method section based on the users choice of options from the user payment drop down menu. */
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

/** Validates the data entered into the form when the user submits the form */
function validateForm(event) {
  handleElementValidation(nameField, nameIsValid);
  handleElementValidation(emailField, emailIsValid);
  handleElementValidation(activitiesBoxDiv, registerForActivitiesIsChecked);

  if (!creditCardDiv.hidden) {
    handleElementValidation(creditCardNumberField, creditCardNumberIsValid);
    handleElementValidation(zipCodeField, zipCodeIsValid);
    handleElementValidation(cvvField, cvvIsValid);
  }

  /**
   * Checks element to be validated and displays visual pass or fail notifications and help text.
   * @param {Element} elementToBeValidated
   * @param {callback} validationFunc - Function for validating the element.
   */
  function handleElementValidation(elementToBeValidated, validationFunc) {
    const isValid = validationFunc(event);
    if (isValid) {
      handleValidInput(elementToBeValidated);
    } else {
      handleInvalidInput(elementToBeValidated, event);
    }
  }
}

nameField.addEventListener('keyup', nameIsValid);

/**
 * Checks validation for the name field and displays visual conformation if it passed or failed. A validation fail will display a reason for its failure.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if the name is valid.
 */
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

/**
 * Checks validation for the email field and displays visual conformation if it passed or failed. A validation fail will display a reason for its failure.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if the email is valid.
 */
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

/**
 * Checks if at least one activity has been checked by the user and will display a visual indicator. If no activity is checked a message will display requiring one.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if an activity has been checked.
 */
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

/**
 * Checks validation for the credit card number field and displays visual conformation if it passed or failed. A validation fail will display a reason for its failure.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if the credit card number is valid.
 */
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

/**
 * Checks validation for the zip code field and displays visual conformation if it passed or failed. A validation fail will display a reason for its failure.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if the zip code is valid.
 */
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

/**
 * Checks validation for the cvv field and displays visual conformation if it passed or failed. A validation fail will display a reason for its failure.
 * @param {Object} event - The event object passed to the function.
 * @returns {boolean} True or false if the cvv is valid.
 */
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

/**
 * Displays a visual notification indicating valid input.
 * @param {Object} element - The input who's parent element is used to remove the invalid data notification, add the valid data notification, and hide the hint message.
 */
function handleValidInput(element) {
  element.parentElement.classList.remove('not-valid');
  element.parentElement.classList.add('valid');
  element.parentElement.lastElementChild.style.display = 'none';
}

/**
 * Displays a visual notification indicating invalid input.
 * @param {Object} element - The input who's parent element is used to remove the valid data notification, add the invalid data notification, and display the hint message.
 * @param {Object} event - The event object passed to the function.
 */
function handleInvalidInput(element, event) {
  event.preventDefault();
  element.parentElement.classList.remove('valid');
  element.parentElement.classList.add('not-valid');
  element.parentElement.lastElementChild.style.display = 'block';
}