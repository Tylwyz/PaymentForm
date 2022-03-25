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
