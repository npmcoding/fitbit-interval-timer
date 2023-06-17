import * as fs from "fs";

const debug = true;

export const getSettings = () => {
  if (fs.existsSync("settings.txt")) {
    const settings = fs.readFileSync("settings.txt", "cbor");
    return settings;
  }
  const defaultSettings = {
    isActive: false,
  };
  return defaultSettings;
};

export const getAlarmSettings = () => {
  const settings = getSettings();
  // Return last alarm from settings if it's in the future
  if (settings?.nextAlarm && new Date(settings.nextAlarm) > new Date()) {
    return settings.nextAlarm;
  }
  return null;
};

export const getIntervalSettings = () => {
  const settings = getSettings();
  // Return last interval from settings
  return settings?.interval || null;
};

export const saveSettings = (settings) => {
  if (settings) {
    fs.writeFileSync("settings.txt", settings, "cbor");
  }
};

export const updateSettings = (settings) => {
  const currentSettings = getSettings();
  const newSettings = {
    ...currentSettings,
    ...settings,
  };
  debug && console.log(newSettings);
  saveSettings(newSettings);
};

export const initSettings = (startTimer) => {
  debug && console.log("init settings");
  const { isActive, alarm, interval } = getSettings();
  const isAlarmInFuture = alarm && new Date(alarm) > new Date();
  // Check for existing timer and show countdown
  // Make sure the timer isn't way in the past
  if (isActive && interval && isAlarmInFuture) {
    startTimer(interval);
  }
};
