'use strict'


var html = document.querySelector('html');

// Add a `js` class for any JavaScript-dependent CSS
// See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
html.classList.add('js');


if (html.id === 'home-page') {
  var newAccountFieldset = document.querySelector('fieldset[name="new"]');
  var newAccountCheckbox = document.querySelector('#create');

  newAccountFieldset.setAttribute('disabled', 'disabled');
  newAccountFieldset.setAttribute('aria-hidden', 'true');

  newAccountCheckbox.addEventListener('change', function(event) {
  // Add logic to set values only on checked state
    if(event.target.checked) {
      newAccountFieldset.removeAttribute('disabled');
      newAccountFieldset.setAttribute('aria-hidden', 'false');
    } else {
      newAccountFieldset.setAttribute('disabled', 'disabled');
      newAccountFieldset.setAttribute('aria-hidden', 'true');
    }
  })};
if (html.id === 'shipping-page') {
  var sameInfoFieldset = document.querySelector('fieldset[name="billing-info"]');
  var sameInfocheckbox = document.querySelector('#same-info');


  sameInfoFieldset.setAttribute('disabled', 'disabled');
  sameInfoFieldset.setAttribute('aria-hidden', 'true');

  sameInfocheckbox.addEventListener('change', function(event) {
    // Add logic to set values only on checked state
    if(event.target.checked) {
      sameInfoFieldset.removeAttribute('disabled');
      sameInfoFieldset.setAttribute('aria-hidden', 'false');
    } else {
      sameInfoFieldset.setAttribute('disabled', 'disabled');
      sameInfoFieldset.setAttribute('aria-hidden', 'true');
    }
  })};

if (html.id === 'billing-page') {
    // Logic for billing form
    var form = document.querySelector('form[name="billing"]');
    restoreFormDataFromLocalStorage(form.name);
    form.addEventListener('click', fillBilling);
    form.addEventListener('submit', handleFormSubmission);
  }

if (html.id === 'shipping-page') {
  var form = document.querySelector('form[name=shipping-info]');
  form.addEventListener('submit',handleFormSubmission);
  }

if (html.id === 'home-page') {
  var form = document.querySelector('form[name=login]');
  form.addEventListener('submit',handleFormSubmission);

}

function fillBilling() {
  var jsObject = readJsonFromLocalStorage('shipping');
  console.log(jsObject);
  // grab the user input
  var x = jsObject.shipname;
  console.log(x);
  var shipisbill = document.querySelector('#shipisbill').checked;

  if (shipisbill == true) {
    // set input fields the same as ship
    document.querySelector("#bfirst-name").value = jsObject.firstname;
    document.querySelector("#blast-name").value = jsObject.lastname;
    document.querySelector("#baddress").value = jsObject.address;
    document.querySelector("#bapartment").value = jsObject.appartment;
    document.querySelector("#bcity").value = jsObject.city;
    document.querySelector("#bstate").value = jsObject.state;
    shipisbill.setAttribute('aria-checked', 'true');
  } else if (shipisbill == false) {
    // allow user to enter info
    document.querySelector("#bfirst-name").value = "";
    document.querySelector("##blast-name").value = "";
    document.querySelector("#baddress").value = "";
    document.querySelector("#bapartment").value = "";
    document.querySelector("#bcity").value = "";
    document.querySelector("#bstate").value = "";
    shipisbill.setAttribute('aria-checked', 'false');
  }
}

  function handleFormSubmission(event) {
    var targetElement = event.target;
    event.preventDefault(); // STOP the default browser behavior
    writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
    window.location.href = targetElement.action; // PROCEED to the URL referenced by the form action
  }

  function writeFormDataToLocalStorage(formName, inputElement) {
    var formData = findOrCreateLocalStorageObject(formName);

    // Set just a single input value
    if (inputElement) {
      formData[inputElement.name] = inputElement.value;
    } else {
      // Set all form input values, e.g., on a submit event
      var formElements = document.forms[formName].elements;
      for (var i = 0; i < formElements.length; i++) {
        // Don't store empty elements, like the submit button
        if (formElements[i].value !== "") {
          formData[formElements[i].name] = formElements[i].value;
        }
      }
    }
    // Write the formData JS object to localStorage as JSON
 writeJsonToLocalStorage(formName, formData);
}

function findOrCreateLocalStorageObject(keyName) {
  var jsObject = readJsonFromLocalStorage(keyName);

  if (Object.keys(jsObject).length === 0) {
    writeJsonToLocalStorage(keyName, jsObject);
  }

  return jsObject;
}

function readJsonFromLocalStorage(keyName) {
  var jsonObject = localStorage.getItem(keyName);
  var jsObject = {};

  if (jsonObject) {
    try {
      jsObject = JSON.parse(jsonObject);
    } catch(e) {
      console.error(e);
      jsObject = {};
    }
  }

  return jsObject;
}

function writeJsonToLocalStorage(keyName, jsObject) {
  localStorage.setItem(keyName, JSON.stringify(jsObject));
}

function destroyFormDataInLocalStorage(formName) {
  localStorage.removeItem(formName);
}

function restoreFormDataFromLocalStorage(formName) {
  var jsObject = readJsonFromLocalStorage(formName);
  var formValues = Object.entries(jsObject);
  if (formValues.length === 0) {
    return; // nothing to restore
  }
  var formElements = document.forms[formName].elements;
  for (var i = 0; i < formValues.length; i++) {
    console.log('Form input key:', formValues[i][0], 'Form input value:', formValues[i][1]);
    formElements[formValues[i][0]].value = formValues[i][1];
  }
}

function renderFormDataFromLocalStorage(storageKey) {
  var jsObject = readJsonFromLocalStorage(storageKey);
  var formValues = Object.entries(jsObject);
  if (formValues.length === 0) {
    return; // nothing to restore
  }
  var previewElement = document.querySelector('#post');
  for (var i = 0; i < formValues.length; i++) {
    var el = previewElement.querySelector('#'+formValues[i][0]);
    el.innerText = formValues[i][1];
  }
}

/**
  * UTILITY FUNCTIONS
  */

// debounce to not execute until after an action has stopped (delay)
function debounce(callback, delay) {
  var timer; // function-scope timer to debounce()
  return function() {
    var context = this; // track function-calling context
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    var args = arguments; // hold onto arguments object
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    // Reset the timer
    clearTimeout(timer);

    // Set the new timer
    timer = setTimeout(function() {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
      callback.apply(context, args);
    }, delay);
  };
}

// throttle to slow execution to a certain amount of elapsed time (limit)
function throttle(callback, limit) {
  var throttling; // function-scope boolean for testing throttle state
  return function() {
    var context = this; // track function-calling context
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    var args = arguments; // hold onto arguments object
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    // Run the function if not currently throttling
    if (!throttling) {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
      callback.apply(context, args);
      throttling = true;
      setTimeout(function() {
        throttling = false;
      }, limit);
    }
  };
}
