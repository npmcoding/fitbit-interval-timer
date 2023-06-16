import * as messaging from "messaging";
import { me as companion } from "companion";
import { sendMessage } from "../common";

const debug = true;

if (!companion.permissions.granted("run_background")) {
  debug && console.warn("We're not allowed to access to run in the background!");
}

const handleClearInterval = () => {
  companion.wakeInterval = undefined;
};

const handleSetInterval = ({ hour, minute }) => {
  debug && console.log("setInterval");
  debug && console.log(hour, minute);

  const FIVEMINUTES = 1000 * 60 * 5;
  companion.wakeInterval = FIVEMINUTES;
};

function sendAlarm() {
  debug && console.log("Wake interval happened!");
  sendMessage({ command: "alarm" });
}

companion.addEventListener("wakeinterval", sendAlarm);
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
