import { getAlarmSettings, updateSettings, saveSettings } from "./settings";
import { clearIntervalDelay, getIntervalDelay } from "./intervalDelay";
import { display } from "display";
import { vibration } from "haptics";
import { showAlarm } from "./ui";

let _nextAlarm = null;

export const getNextAlarm = () => {
  if (_nextAlarm === null) {
    // Return saved alarm
    const alarmFromSettings = getAlarmSettings();
    _nextAlarm = alarmFromSettings;
  }

  return _nextAlarm;
};

export const clearNextAlarm = () => {
  clearIntervalDelay();

  _nextAlarm = null;
  const settings = {
    isActive: false,
    nextAlarm: _nextAlarm,
    interval: null,
  };

  saveSettings(settings);
};

export const setNextAlarm = () => {
  const intervalDelay = getIntervalDelay();
  if (!intervalDelay) {
    clearNextAlarm();
  } else {
    // Set start time
    const newTime = new Date(intervalDelay).toLocaleTimeString().slice(0, -4);
    countdown.text = newTime;

    _nextAlarm = new Date(Date.now() + intervalDelay).getTime();

    const settings = {
      isActive: true,
      nextAlarm: _nextAlarm,
      intervalDelay,
    };
    updateSettings(settings);
  }
};

export const alarmShouldSound = () =>
  _nextAlarm ? new Date().getTime() > _nextAlarm : false;

export const handleTriggerAlarm = () => {
  if (alarmShouldSound()) {
    display.poke();
    showAlarm();
    vibration.start("alert");
    setNextAlarm();
  }
};
