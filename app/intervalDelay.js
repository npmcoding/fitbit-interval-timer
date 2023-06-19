let _intervalDelay = null;

export const getIntervalDelay = () => {
  return _intervalDelay;
};

export const setIntervalDelay = (intervalDelay) => {
  _intervalDelay = intervalDelay;
};

export const clearIntervalDelay = () => {
  _intervalDelay = null;
};
