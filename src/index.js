// Internal current _options object
let _options = {};

// Internal options cache (so we check the options of the page we just left)
let _lastPageOptions = {};

// Internal default options, can be set by user using setDefaultTransitionOptions
const _defaultOptions = {
  type: 'slide',
};

// Reset the options back to defaults
export const resetTransitionOptions = () => {
  // Clone the defaults and reset the options
  const resetOptions = {};
  Object.assign(resetOptions, _defaultOptions);
  _options = resetOptions;
};
// Call this once to set the initial options
resetTransitionOptions();

// Set the default options
export const setDefaultTransitionOptions = (options) => {
  Object.assign(_defaultOptions, options);
};

// Set the options for the next transition
export const setTransitionOptions = (options) => {
  _options = Object.assign({}, options, _options);
};

// Make the transition happen
export const makeTransition = (options) => {
  setTransitionOptions(options);

  // Check if we should make a header/footer adjustment
  if (_lastPageOptions.header && _options.header) {
    _options.fixedPixelsTop = _options.header;
  }

  // Clone and cache the current options
  // We use the page options that are passed in as opposed to _options
  // so that we can check for headers and footers
  // As opposed to _options which may be set by another page
  const currentOptions = {};
  Object.assign(currentOptions, options);
  _lastPageOptions = currentOptions;

  // Make sure we have access to the cordova plugin
  const nativepagetransitions = window.plugins && window.plugins.nativepagetransitions || false;
  if (!nativepagetransitions || !_options.type) {
    resetTransitionOptions();
    return;
  }
  nativepagetransitions[_options.type](_options);
  resetTransitionOptions();
};

