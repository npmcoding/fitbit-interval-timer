import * as document from "document";
import * as messaging from "messaging";

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


const fetchTimer = () => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // 2
    messaging.peerSocket.send({
      command: "fetchTimer",
    });
  }
};

const createTimer = () => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: "createTimer",
      hour: getHour(),
      minute: getMinute(),
    });
  }
};

const startButton = document.getElementById("start-button");

startButton.addEventListener("click", (evt) => {
  console.log(`${getHour()}:${getMinute()}`);

  console.log("START");
  createTimer();

});

const setTimer = (timer) => {
  // 6
  console.log(`start timer at ${timer}`);
};

// 1
messaging.peerSocket.addEventListener("open", (evt) => {
  fetchTimer();
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    // 5
    setTimer(JSON.stringify(evt.data));
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});