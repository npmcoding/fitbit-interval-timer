import * as messaging from "messaging";
import { me as companion } from "companion";
import { sendMessage } from "../common";

if (!companion.permissions.granted("run_background")) {
  console.warn("We're not allowed to access to run in the background!");
}

const handleClearInterval = () => {
  companion.wakeInterval = undefined;
};

const handleSetInterval = ({ hour, minute }) => {
  console.log("setInterval");
  console.log(hour, minute);

  const FIVEMINUTES = 1000 * 60 * 5;
  companion.wakeInterval = FIVEMINUTES;
};

function sendAlarm() {
  console.log("Wake interval happened!");
  sendMessage({ command: "alarm" });
}

companion.addEventListener("wakeinterval", sendAlarm);
if (companion.launchReasons.wokenUp) {
  console.log("Componanion woken!");
  sendAlarm();
}

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.command) {
    case "clearInterval": {
      handleClearInterval();
    }
    case "createInterval": {
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
