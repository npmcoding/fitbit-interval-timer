import { getIntervalDelaySettings } from "./settings";

let _intervalDelay = null;

export const getIntervalDelay = () => {
  if (_intervalDelay === null) {
    // Return saved interval delay
    const intervalDelayFromSettings = getIntervalDelaySettings();
    _intervalDelay = intervalDelayFromSettings;
  }

  return _intervalDelay;
};

export const setIntervalDelay = (intervalDelay) => {
  _intervalDelay = intervalDelay;
};

export const clearIntervalDelay = () => {
  _intervalDelay = null;
};
