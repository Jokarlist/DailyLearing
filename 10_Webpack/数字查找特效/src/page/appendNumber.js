import randomColor from "../util/randomColor";
import { getRandom } from "../util/randomColor";

const divContainer = document.getElementById("divContainer");
const divCenter = document.getElementById("divCenter");

export default function (num, isPrime) {
  const span = document.createElement("span");

  span.innerText = num;

  if (isPrime) {
    const color = randomColor();
    span.style.color = color;
    createCenterPrimeNumber(num, color);
  }

  divContainer.appendChild(span);
  divCenter.innerText = num;
}

function createCenterPrimeNumber(num, color) {
  const div = document.createElement("div");

  div.className = "center";
  div.innerText = num;
  div.style.color = color;
  document.body.appendChild(div);

  window.getComputedStyle(div).left;

  div.style.transform = `translate(${getRandom(-200, 200)}px, ${getRandom(-200, 200)}px)`;
  div.style.opacity = 0;
}

