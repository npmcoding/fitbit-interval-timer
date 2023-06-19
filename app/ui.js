import * as document from "document";

const $ = (selector) => document.getElementById(selector);

const bgContainer = $("bg-container");

export const startButton = $("start-button");
export const stopButton = $("stop-button");
export const alarmButton = $("silence-alarm-button");
export const countdown = $("countdown");

export const tumblerHour = $("tumbler-hour");
export const tumblerMins = $("tumbler-mins");

const tumblerContainer = $("tumbler-container");
const countdownContainer = $("countdown-container");
const alarmContainer = $("alarm-container");

const silenceAlarmButton = $("silence-alarm-button");

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

export const setBgColor = (color) => {
  if (color) {
    const textColor = color === "black" ? "white" : "black";
    tumblerContainer.style.fill = textColor;
    countdown.style.fill = textColor;
    bgContainer.style.fill = color;
  }
};

export const setAlarmText = (text) => {
  if (text && text.length > 0) {
    silenceAlarmButton.text = text;
  } else {
    silenceAlarmButton.text = "Alarm!";
  }
};
