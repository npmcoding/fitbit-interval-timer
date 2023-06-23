import * as messaging from "messaging";
import { me as companion } from "companion";
import { debug, sendMessage } from "../common";
import { settingsStorage } from "settings";

if (!companion.permissions.granted("run_background")) {
  debug &&
    console.warn("We're not allowed to access to run in the background!");
}

if (companion.launchReasons.settingsChanged) {
  // Settings were changed while the companion was not running
  console.log("settings have changed!");
}

messaging.peerSocket.addEventListener("open", () => {
  // init settings
  const bgColor = settingsStorage.getItem("bgColor");
  const alarmColor = settingsStorage.getItem("alarmColor");
  const alarmText = settingsStorage.getItem("alarmText");
  sendMessage({ key: "init", bgColor, alarmColor, alarmText });
});

messaging.peerSocket.addEventListener("error", (err) => {
  debug && console.error(`Connection error: ${err.code} - ${err.message}`);
});

settingsStorage.addEventListener("change", ({ key, newValue }) => {
  sendMessage({ key, value: newValue });
});
