import * as messaging from "messaging";
import { setAlarmText, setBgColor } from "./ui";

const parseAlarmText = (evtData) => {
  const alarmText = JSON.parse(evtData);
  return alarmText?.name;
};

messaging.peerSocket.addEventListener("open", (evt) => {});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

messaging.peerSocket.addEventListener("message", (evt) => {
  switch (evt.data?.key) {
    case "init": {
      const bgColor = JSON.parse(evt.data.bgColor);
      const alarmText = parseAlarmText(evt.data.alarmText);
      setBgColor(bgColor);
      setAlarmText(alarmText);
      break;
    }
    case "bgColor": {
      const bgColor = JSON.parse(evt.data.value);
      setBgColor(bgColor);
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
