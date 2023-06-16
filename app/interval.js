import * as fs from "fs";

export default class Interval {
    constructor() {
        this._interval = null;
    }

  getInterval() {
    // Return existing interval
    if (this._interval !== null) {
      return this._interval;
    }

    if (fs.existsSync("/private/data/settings.txt")) {
      const settings = fs.readFileSync("settings.txt", "cbor");
      // Return last interval from settings
        this._interval = settings?.interval || null;
        return this._interval;
    }
    // Nothing currently set
    this._interval = null;
    return this._interval;
  };

  setInterval(interval) {
    this._interval = interval;
  };

  clearInterval() {
    this._interval = null;
  }
};
