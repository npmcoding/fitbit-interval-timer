import * as document from "document";

const tumblerHour = document.getElementById("tumbler-hour");
const tumblerMins = document.getElementById("tumbler-mins");

const getHour = () => {
    const selectedIndex = parseInt(tumblerHour.value);
    const selectedItem = tumblerHour.getElementById(`hour-item${selectedIndex}`);
    return selectedItem.getElementById("text").text;
}

const getMinute = () => {
    const selectedIndex = tumblerMins.value;
    const selectedItem = tumblerMins.getElementById(`min-item${selectedIndex}`);
    return selectedItem.getElementById("text").text;
}


tumblerHour.addEventListener("select", (evt) => {
    console.log(`Hour: ${getHour()}`);
  });
  
  tumblerMins.addEventListener("select", (evt) => {
    console.log(`Minute: ${getMinute()}`);
  });

  const startButton = document.getElementById("start-button");

startButton.addEventListener("click", (evt) => {
  console.log(`${getHour()}:${getMinute()}`);

  console.log("START");
})