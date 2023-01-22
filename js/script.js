const nameField = document.querySelector('#name');
const otherJobRoleField = document.querySelector('#other-job-role');
const jobRoleDropDownMenu = document.querySelector('#title');
const colorDropDownMenu = document.querySelector('#color');
const designDropDownMenu = document.querySelector('#design');

nameField.focus();
otherJobRoleField.hidden = true;
colorDropDownMenu.disabled = true;

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
    displayTShirtsOfSelectedTheme('js puns', 'cornflowerblue');
  } else {
    displayTShirtsOfSelectedTheme('heart js', 'tomato');
  }

  function displayTShirtsOfSelectedTheme(theme, optionValue) {
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