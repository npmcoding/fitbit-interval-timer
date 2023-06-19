import { setIntervalDelay } from "./intervalDelay";
import { tumblerHour, tumblerMins } from "./ui";
import { debug } from "../common";

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

const setMinimumTime = () => {
  if (getHour() === "0" && getMinute() === "00") {
    // Set tumbler to 5 minutes
    tumblerMins.value = 0;
  }
}

tumblerHour.addEventListener("select", (evt) => {
  setMinimumTime();
  debug && console.log(`Hour: ${getHour()}`);
});

tumblerMins.addEventListener("select", (evt) => {
  setMinimumTime();
  debug && console.log(`Minute: ${getMinute()}`);
});

export const setIntervalDelayFromTumbler = () => {
  const hour = getHour();
  const minute = getMinute();
  debug && console.log(`START: ${hour}:${minute}`);

  const minuteMilliseconds = 1000 * 60 * minute;
  const hourMilliseconds = 1000 * 60 * 60 * hour;
  const intervalDelay = minuteMilliseconds + hourMilliseconds;

  // setIntervalDelay(intervalDelay);
  const testInterval = 1000 * 15;
  setIntervalDelay(testInterval);
};
