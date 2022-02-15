import isPrime from "./isPrime";

export default class {
  constructor(duration = 500) {
    this.duration = duration;
    this.number = 1;
    this.timer = null;
    this.onNumberCreated = null;
  }

  start() {
    if (this.timer) {
      return;
    }

    this.timer = setInterval(() => {
      this.onNumberCreated &&
        this.onNumberCreated(this.number, isPrime(this.number));
      this.number++;
    }, this.duration);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
