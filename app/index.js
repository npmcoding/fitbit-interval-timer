import * as document from "document";
import * as messaging from "messaging";
import { sendMessage } from "../common";
import * as fs from "fs";

const tumblerHour = document.getElementById("tumbler-hour");
const tumblerMins = document.getElementById("tumbler-mins");

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
  console.log(`Hour: ${getHour()}`);
});

tumblerMins.addEventListener("select", (evt) => {
  console.log(`Minute: ${getMinute()}`);
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

const startButton = document.getElementById("start-button");

startButton.addEventListener("click", (evt) => {
  console.log(`START: ${getHour()}:${getMinute()}`);
  createInterval();
});

// 1
messaging.peerSocket.addEventListener("open", (evt) => {
  // Check for existing timer and show countdown
  const settings = fs.readFileSync("settings.txt", "cbor");
  console.log(JSON.stringify(settings));
});

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    case "alarm": {
      handleTriggerAlarm();
    }
    default: {
      console.log(JSON.stringify(evt.data));
      break;
    }
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});
