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
  saveSettings(newSettings);
};
