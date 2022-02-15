import NumberTimer from "../util/NumberTimer";
import appendNumber from "../page/appendNumber";

const n = new NumberTimer(100);

n.onNumberCreated = function (num, isPrime) {
  appendNumber(num, isPrime);
};

let isStart = false;

window.onclick = () => {
  if (isStart) {
    n.stop();
    isStart = false;
  } else {
    n.start();
    isStart = true;
  }
}
