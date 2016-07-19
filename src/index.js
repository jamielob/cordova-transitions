// Internal current _options object
let _options = {};

// Internal options cache (so we check the options of the page we just left)
let _lastPageOptions = {};

// Internal default options, can be set by user using setDefaultTransitionOptions
let _defaultOptions = {
  type: 'slide',
};

// Allow users to set the default options
export const setDefaultTransitionOptions = (options) => {
  _defaultOptions = Object.assign({}, options);
};

// Function to reset the options back to the defaults
export const resetTransitionOptions = () => {
  // Clone the defaults and reset the options
  _options = Object.assign({}, _defaultOptions);
};
// Call this once to set the initial options
resetTransitionOptions();

// Function to set the options for the next transition
export const setTransitionOptions = (options) => {
  Object.assign(_options, options);
};

// Make the transition happen
export const makeTransition = (options) => {
  setTransitionOptions(options);

  // Debug
  // console.log(_lastPageOptions);
  // console.log(options);
  // console.log(_options);

  // Only adjust for header/footer if both destination and origin agree
  if (_lastPageOptions.header && _options.header) {
    _options.fixedPixelsTop = _options.header;
  }

  // Clone and cache the current options
  _lastPageOptions = Object.assign({}, _options);

  // Transition if on cordova
  const nativepagetransitions = window.plugins && window.plugins.nativepagetransitions || false;
  if (nativepagetransitions && _options.type) {
    nativepagetransitions[_options.type](_options);
  }

  resetTransitionOptions();
};

