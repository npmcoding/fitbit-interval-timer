import * as messaging from "messaging";
import { setAlarmText, setBgColor, setAlarmColor } from "./ui";
import { debug } from "../common";

const parseAlarmText = (evtData) => {
  const alarmText = JSON.parse(evtData);
  return alarmText?.name;
};

messaging.peerSocket.addEventListener("open", (evt) => {});

messaging.peerSocket.addEventListener("error", (err) => {
  debug && console.error(`Connection error: ${err.code} - ${err.message}`);
});

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.key) {
    case "init": {
      const bgColor = JSON.parse(evt.data.bgColor);
      const alarmColor = JSON.parse(evt.data.alarmColor);
      const alarmText = parseAlarmText(evt.data.alarmText);
      setBgColor(bgColor);
      setAlarmColor(alarmColor);
      setAlarmText(alarmText);
      break;
    }
    case "bgColor": {
      const bgColor = JSON.parse(evt.data.value);
      setBgColor(bgColor);
      break;
    }
    case "alarmColor": {
      const alarmColor = JSON.parse(evt.data.value);
      setAlarmColor(alarmColor);
      break;
    }
    case "alarmText": {
      const alarmText = parseAlarmText(evt.data.value);
      setAlarmText(alarmText);
      break;
    }
    default: {
      debug && console.log(JSON.stringify(evt.data));
      break;
    }
  }
});
