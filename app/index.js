import * as document from "document";
import * as messaging from "messaging";
import { sendMessage } from "../common";
import * as fs from "fs";

const debug = true;

const tumblerContainer = document.getElementById("tumbler-container");
const countdownContainer = document.getElementById("countdown-container");
const tumblerHour = document.getElementById("tumbler-hour");
const tumblerMins = document.getElementById("tumbler-mins");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");


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

tumblerHour.addEventListener("select", (evt) => {
  debug && console.log(`Hour: ${getHour()}`);
});

tumblerMins.addEventListener("select", (evt) => {
  debug && console.log(`Minute: ${getMinute()}`);
});

const handleTriggerAlarm = () => {
  // DODO: check if alarm needs to trigger
};

const clearInterval = () => {
  const settings = {
    isActive: false,
  };

  fs.writeFileSync("settings.txt", settings, "cbor");
  sendMessage({ command: "clearInterval" });

  // change screen
};

const createInterval = () => {
  const hour = getHour();
  const minute = getMinute();

  const settings = {
    isActive: true,
    hour,
    minute,
  };

  fs.writeFileSync("settings.txt", settings, "cbor");

  sendMessage({
    command: "createInterval",
    hour,
    minute,
  });
};

startButton.addEventListener("click", (evt) => {
  debug && console.log(`START: ${getHour()}:${getMinute()}`);
  createInterval();
  tumblerContainer.style.display = "none";
  countdownContainer.style.display = "inline";
});

stopButton.addEventListener("click", (evt) => {
  debug && console.log('STOP')
  clearInterval();
  tumblerContainer.style.display = "inline";
  countdownContainer.style.display = "none";

});

// 1
messaging.peerSocket.addEventListener("open", (evt) => {
  // Check for existing timer and show countdown
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
