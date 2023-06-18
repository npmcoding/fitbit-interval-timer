import * as messaging from "messaging";
import { me as companion } from "companion";
import { sendMessage } from "../common";

const debug = true;

if (!companion.permissions.granted("run_background")) {
  debug &&
    console.warn("We're not allowed to access to run in the background!");
}

const handleClearInterval = () => {
  debug && console.log("handleClearInterval");
  companion.wakeInterval = undefined;

  companion.removeEventListener("wakeinterval", sendAlarm);
};

const handleSetInterval = ({ interval }) => {
  debug && console.log("handleSetInterval");
  debug && console.log(interval);

  const FIVEMINUTES = 1000 * 60 * 5;
  // use passed interval if more than 5 minutes
  const wakeInterval = interval >= FIVEMINUTES ? interval : FIVEMINUTES;
  companion.wakeInterval = wakeInterval;

  companion.addEventListener("wakeinterval", sendAlarm);
};

const sendAlarm = () => {
  debug && console.log("companion triggers alarm!");
  sendMessage({ command: "alarm" });
};

// companion.addEventListener("wakeinterval", sendAlarm);
if (companion.launchReasons.wokenUp) {
  debug && console.log("Componanion woken!");
  sendAlarm();
}

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    case "clearInterval": {
      handleClearInterval();
      break;
    }
    case "createInterval": {
      handleSetInterval(evt.data);
      break;
    }
    default: {
      debug && console.log(evt.data);
      break;
    }
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  debug && console.error(`Connection error: ${err.code} - ${err.message}`);
});
