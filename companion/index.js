import * as messaging from "messaging";
import { me as companion } from "companion";
import { sendMessage } from "../common";

if (!companion.permissions.granted("run_background")) {
  console.warn("We're not allowed to access to run in the background!");
}

const handleSetInterval = ({ hour, minute }) => {
  console.log("setInterval");
  console.log(hour, minute);
  // TODO: Get time from fs storage
  const FIVEMINUTES = 1000 * 60 * 5;
  companion.wakeInterval = FIVEMINUTES;
};

function sendAlarm() {
  // DODO: check if alarm needs to trigger
  console.log("Wake interval happened!");
  sendMessage({ command: "alarm" });
}

companion.addEventListener("wakeinterval", sendAlarm);
if (companion.launchReasons.wokenUp) {
  console.log("Componanion woken!");
  sendAlarm();
}

function returnCurrentTimer(data) {
  // 4
  sendMessage({ command: "setTimer", hour: "1", minute: "23" });
}

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    // 3
    case "fetchTimer": {
      returnCurrentTimer();
      break;
    }
    case "createTimer": {
      handleSetInterval(evt.data);
      break;
    }
    default: {
      console.log(evt.data);
      break;
    }
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});
