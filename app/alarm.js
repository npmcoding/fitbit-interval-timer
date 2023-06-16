import * as fs from "fs";

export default class Alarm {
    constructor() {
        this._nextAlarm = null;
    }

  getAlarm() {
    // Return existing alarm
    if (this._nextAlarm !== null) {
      return this._nextAlarm;
    }

    if (fs.existsSync("/private/data/settings.txt")) {
      const settings = fs.readFileSync("settings.txt", "cbor");
      // Return last alarm from settings if it's in the future
      if (settings?.nextAlarm && new Date(settings.nextAlarm) > new Date()) {
        this._nextAlarm = settings.nextAlarm;
        return this._nextAlarm;
      }
    }
    // Nothing currently set
    this._nextAlarm = null;
    return this._nextAlarm;
  };

  clearAlarm() {
    this._nextAlarm = null;
  }

  setAlarm(interval) {
    if(!interval) {
        this.clearAlarm();
    }    
    if (this._nextAlarm === null) {
        this._nextAlarm = new Date(Date.now() + interval).getTime();
    }
    this._nextAlarm += interval;
  };


};
