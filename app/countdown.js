import { getIntervalDelay } from "./intervalDelay";
import { display } from "display";
import { vibration } from "haptics";
import { countdown, showAlarm } from "./ui";

let _nextCountdownEndTime = null;

export const getNextCountdownEndTime = () => {
  return _nextCountdownEndTime;
};

export const clearCountdown = () => {
  _nextCountdownEndTime = null;
};

export const setNextCountdownEndTime = () => {
  const intervalDelay = getIntervalDelay();
  if (!intervalDelay) {
    clearCountdown();
  } else {
    // Set ui countdown start time
    const newTime = new Date(intervalDelay).toLocaleTimeString().slice(0, -4);
    countdown.text = newTime;

    _nextCountdownEndTime = new Date(Date.now() + intervalDelay).getTime();
  }
};

export const alarmShouldSound = () =>
  _nextCountdownEndTime ? new Date().getTime() >= _nextCountdownEndTime : false;

export const handleTriggerAlarm = () => {
  if (alarmShouldSound()) {
    display.poke();
    showAlarm();
    vibration.start("alert");
    setNextCountdownEndTime();
  } else {
    clearCountdown();
  }
};
