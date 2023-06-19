import { vibration } from "haptics";
import clock from "clock";
import {
  clearCountdown,
  getNextCountdownEndTime,
  setNextCountdownEndTime,
  handleTriggerAlarm,
} from "./countdown";
import { getIntervalDelay } from "./intervalDelay";
import { setIntervalDelayFromTumbler } from "./tumbler";
import { me as appbit } from "appbit";
import {
  startButton,
  stopButton,
  alarmButton,
  countdown,
  showTumbler,
  showCountdown,
} from "./ui";
import { debug } from "../common";
import { clearIntervalDelay } from "./intervalDelay";

let _intervalID = null;

const stopTimer = () => {
  clearInterval(_intervalID);
  _intervalID = null;
  clearIntervalDelay();
  clearCountdown();

  // stop clock callback
  clock.granularity = "off";
  showTumbler();
};

const startTimer = () => {
  const intervalDelay = getIntervalDelay();
  debug && console.log("start timer interval", _intervalID, intervalDelay);

  if (!_intervalID && intervalDelay) {
    setNextCountdownEndTime();
    // start countdown to trigger alarm
    _intervalID = setInterval(handleTriggerAlarm, intervalDelay);

    // Triggers clock callback
    clock.granularity = "seconds";
    showCountdown();
  }
};

startButton.addEventListener("click", (evt) => {
  // start timer based on tumbler values
  setIntervalDelayFromTumbler();
  startTimer();
});

stopButton.addEventListener("click", (evt) => {
  debug && console.log("STOP");
  stopTimer();
});

alarmButton.addEventListener("click", (evt) => {
  debug && console.log("alarm silenced");
  vibration.stop();
  showCountdown();
});

clock.addEventListener("tick", (evt) => {
  const nextCountdownEndTime = getNextCountdownEndTime();
  if (nextCountdownEndTime) {
    const dif = nextCountdownEndTime - evt.date.getTime();

    if (dif >= 0) {
      const newTime = new Date(dif).toLocaleTimeString().slice(0, -4);
      countdown.text = newTime;
    }
  } else {
    stopTimer();
  }
});

appbit.onunload = () => {
  debug && console.log("app unloading");
  clearInterval(_intervalID);
  _intervalID = null;
};

appbit.appTimeoutEnabled = false;
