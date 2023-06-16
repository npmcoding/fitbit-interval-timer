import * as document from "document";
import * as messaging from "messaging";
import { sendMessage } from "../common";
import * as fs from "fs";
import { vibration } from "haptics";
import clock from 'clock';
import Alarm from "./alarm";
import Interval from "./interval";

const debug = true;

// TODO: extracts these to functions to maintain state
// on init, fetch from settings
const alarm = new Alarm();
const interval = new Interval();

const tumblerContainer = document.getElementById("tumbler-container");
const countdownContainer = document.getElementById("countdown-container");
const alarmContainer = document.getElementById("alarm-container");
const tumblerHour = document.getElementById("tumbler-hour");
const tumblerMins = document.getElementById("tumbler-mins");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const alarmButton = document.getElementById("silence-alarm-button");
const countdown = document.getElementById("countdown");

const getHour = () => {
  const selectedIndex = parseInt(tumblerHour.value);
  const selectedItem = tumblerHour.getElementById(`hour-item${selectedIndex}`);
  return selectedItem.getElementById("text").text;
};

const getMinute = () => {
  const selectedIndex = tumblerMins.value;
  const selectedItem = tumblerMins.getElementById(`min-item${selectedIndex}`);
  return selectedItem.getElementById("text").text;
};

const showTumbler = () => {
  tumblerContainer.style.display = "inline";
  countdownContainer.style.display = "none";
  alarmContainer.style.display = "none";
};

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

tumblerHour.addEventListener("select", (evt) => {
  debug && console.log(`Hour: ${getHour()}`);
});

tumblerMins.addEventListener("select", (evt) => {
  debug && console.log(`Minute: ${getMinute()}`);
});

const handleTriggerAlarm = () => {
  // TODO: check if alarm needs to trigger
  showAlarm();
  vibration.start("alert");
  // START HERE
  // TODO: check if interval is null
  // bail out if so
    alarm.setAlarm(interval.getInterval());
};

const clearInterval = () => {
  const settings = {
    isActive: false,
  };

  fs.writeFileSync("settings.txt", settings, "cbor");
  sendMessage({ command: "clearInterval" });
  clock.granularity = "off"
};

const createInterval = () => {
  const hour = getHour();
  const minute = getMinute();

  // TODO: calculate this
  // Make sure it's not less than 5 min
  interval = 1000 * 30;
  nextAlarm = new Date(Date.now() + interval).getTime();

  const settings = {
    isActive: true,
    interval,
    nextAlarm
  };
  fs.writeFileSync("settings.txt", settings, "cbor");

  sendMessage({
    command: "createInterval",
    interval
  });

  clock.granularity = "seconds"
};

startButton.addEventListener("click", (evt) => {
  debug && console.log(`START: ${getHour()}:${getMinute()}`);
  createInterval();
  showCountdown();
});

stopButton.addEventListener("click", (evt) => {
  debug && console.log("STOP");
  clearInterval();
  showTumbler();
});

alarmButton.addEventListener("click", (evt) => {
  debug && console.log("alarm silenced");
  vibration.stop();
  countdownContainer.style.display = "inline";
  alarmContainer.style.display = "none";
});

// 1
messaging.peerSocket.addEventListener("open", (evt) => {
  // Check for existing timer and show countdown
  // Make sure the timer isn't way in the past
  if (fs.existsSync("/private/data/settings.txt")) {
    const settings = fs.readFileSync("settings.txt", "cbor");
    debug && console.log(JSON.stringify(settings));
  }
});

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    case "alarm": {
      handleTriggerAlarm();
    }
    default: {
      debug && console.log(JSON.stringify(evt.data));
      break;
    }
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});


clock.addEventListener("tick", (evt) => {
  if(nextAlarm){
    console.log(evt.date.getTime());
    const dif = nextAlarm - evt.date.getTime();

    if(dif <= 0) {
      handleTriggerAlarm();
    }

    const newTime = new Date(dif).toLocaleTimeString().slice(0, -4)
    countdown.text = newTime;
  } else {
    clearInterval();
  }
})