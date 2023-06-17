import { getAlarmSettings, updateSettings } from "./settings";
import { clearInterval, setInterval } from "./interval";

let _nextAlarm = null;

export const getAlarm = () => {
  if (_nextAlarm === null) {
    // Return saved alarm
    const alarmFromSettings = getAlarmSettings();
    _nextAlarm = alarmFromSettings;
  }

  return _nextAlarm;
};

export const clearAlarm = () => {
  clearInterval();

  _nextAlarm = null;
  const settings = {
    isActive: false,
    nextAlarm: _nextAlarm,
    interval: null,
  };

  updateSettings(settings);
};

export const setAlarm = (interval) => {
  if (!interval) {
    clearAlarm();
  }
  setInterval(interval);
  _nextAlarm = new Date(Date.now() + interval).getTime();

  const settings = {
    isActive: true,
    nextAlarm: _nextAlarm,
    interval,
  };
  updateSettings(settings);
};

export const alarmShouldSound = _nextAlarm
  ? new Date().getTime() > _nextAlarm
  : false;
