setInterval(setClock, 1000);

const secondHand = document.querySelector("[data-hand-second]");
const minuteHand = document.querySelector("[data-hand-minute]");
const hourHand = document.querySelector("[data-hand-hour]");

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minuteRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hourRatio = (minuteRatio + currentDate.getHours()) / 12;
  setRation(secondHand, secondsRatio);
  setRation(minuteHand, minuteRatio);
  setRation(hourHand, hourRatio);
}
function setRation(element, rotationRate) {
  element.style.setProperty("--rotation", rotationRate * 360);
}
setClock();
