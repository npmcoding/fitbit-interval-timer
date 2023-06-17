import { getIntervalSettings } from "./settings";
let _interval = null;

export const getInterval = () => {
  if (_interval === null) {
    // Return saved interval
    const intervalFromSettings = getIntervalSettings();
    _interval = intervalFromSettings;
  }

  return _interval;
};

export const setInterval = (interval) => {
  _interval = interval;
};

export const clearInterval = () => {
  _interval = null;
};
