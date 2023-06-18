import * as document from "document";

const debug = true;

const tumblerContainer = document.getElementById("tumbler-container");
const countdownContainer = document.getElementById("countdown-container");
const alarmContainer = document.getElementById("alarm-container");

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
  debug && console.log(`Hour: ${getHour()}`);
});

tumblerMins.addEventListener("select", (evt) => {
  // Set a minimum time of 5 minutes
  if (getHour() === "0" && getMinute() === "00") {
    tumblerMins.value = 0;
  }
  debug && console.log(`Minute: ${getMinute()}`);
});

export const showTumbler = () => {
  tumblerContainer.style.display = "inline";
  countdownContainer.style.display = "none";
  alarmContainer.style.display = "none";
};

export const getIntervalFromTumbler = () => {
  const hour = getHour();
  const minute = getMinute();
  debug && console.log(`START: ${hour}:${minute}`);
  // 5 minute check due to companion.wakeInterval limitations
  if (hour === 0 && minute < 5) {
    console.warn("Can't set interval for less than 5 minutes!");
    // return a 5 minute interval
    return 1000 * 60 * 5;
  }

  const minuteMilliseconds = 1000 * 60 * minute;
  const hourMilliseconds = 1000 * 60 * 60 * hour;
  const interval = minuteMilliseconds + hourMilliseconds;

  return interval;
};
