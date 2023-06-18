import * as document from "document";

const $ = (selector) => document.getElementById(selector);

export const startButton = $("start-button");
export const stopButton = $("stop-button");
export const alarmButton = $("silence-alarm-button");
export const countdown = $("countdown");

export const tumblerHour = $("tumbler-hour");
export const tumblerMins = $("tumbler-mins");

const tumblerContainer = $("tumbler-container");
const countdownContainer = $("countdown-container");
const alarmContainer = $("alarm-container");

export const showTumbler = () => {
  tumblerContainer.style.display = "inline";
  countdownContainer.style.display = "none";
  alarmContainer.style.display = "none";
};

export const showCountdown = () => {
  tumblerContainer.style.display = "none";
  countdownContainer.style.display = "inline";
  alarmContainer.style.display = "none";
};

export const showAlarm = () => {
  tumblerContainer.style.display = "none";
  countdownContainer.style.display = "none";
  alarmContainer.style.display = "inline";
};
