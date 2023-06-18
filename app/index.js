import * as document from "document";
import * as messaging from "messaging";
import { sendMessage } from "../common";
import { vibration } from "haptics";
import clock from "clock";
import { alarmShouldSound, clearAlarm, getAlarm, setAlarm } from "./alarm";
import { getInterval } from "./interval";
import { display } from "display";
import { getIntervalFromTumbler, showTumbler } from "./tumbler";
import { me as appbit } from "appbit";

const debug = true;

const startButton = document.getElementById("start-button");
const tumblerContainer = document.getElementById("tumbler-container");
const countdownContainer = document.getElementById("countdown-container");
const alarmContainer = document.getElementById("alarm-container");

const stopButton = document.getElementById("stop-button");
const alarmButton = document.getElementById("silence-alarm-button");
const countdown = document.getElementById("countdown");

const showCountdown = () => {
  tumblerContainer.style.display = "none";
  countdownContainer.style.display = "inline";
  alarmContainer.style.display = "none";
};

const showAlarm = () => {
  tumblerContainer.style.display = "none";
  countdownContainer.style.display = "none";
  alarmContainer.style.display = "inline";
};

const stopTimer = () => {
  clearAlarm();

  // clear companion.wakeInterval
  sendMessage({ command: "clearInterval" });

  // stop clock callback
  clock.granularity = "off";
  showTumbler();
};

const startTimer = (interval) => {
  debug && console.log("start timer interval", interval);
  // const testInterval = 1000 * 60 * 5;
  setAlarm(interval);

  // set up companion.wakeInterval
  sendMessage({
    command: "createInterval",
    interval,
  });

  // Triggers clock callback
  clock.granularity = "seconds";
  showCountdown();
};

startButton.addEventListener("click", (evt) => {
  // start timer based on tumbler values
  const interval = getIntervalFromTumbler();
  startTimer(interval);
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

messaging.peerSocket.addEventListener("open", (evt) => {});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

const handleTriggerAlarm = () => {
  display.poke();
  showAlarm();
  vibration.start("alert");

  // Set next alarm
  const interval = getInterval();
  if (!interval) {
    stopTimer();
  } else {
    setAlarm(interval);
  }
};

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    case "alarm": {
      if (alarmShouldSound()) {
        handleTriggerAlarm();
      }
      break;
    }
    default: {
      debug && console.log(JSON.stringify(evt.data));
      break;
    }
  }
});

clock.addEventListener("tick", (evt) => {
  const nextAlarm = getAlarm();
  if (nextAlarm) {
    const dif = nextAlarm - evt.date.getTime();

    if (dif <= 0) {
      debug && console.log("device triggers alarm");
      handleTriggerAlarm();
    } else {
      const newTime = new Date(dif).toLocaleTimeString().slice(0, -4);
      countdown.text = newTime;
    }
  } else {
    stopTimer();
  }
});

appbit.onunload = () => console.log("app unloading");
appbit.appTimeoutEnabled = false;
