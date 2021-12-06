const gameElem = document.querySelector(".game");
const gameWidth = gameElem.clientWidth;

class Pipe extends Rectangle {
  constructor(height, top, speed, elem) {
    super(52, height, gameWidth, top, speed, 0, elem);
  }

  /* 柱子移动的边界判断 */
  onMove() {
    this.left < -this.width && this.elem.remove();
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* 成对柱子类 */
class PipePair {
  constructor(speed) {
    this.spaceHeight = 150; // 上下两柱子间空隙的高度
    this.minHeight = 80; // 柱子的最小高度
    this.maxHeight = landTop - this.minHeight - this.spaceHeight; // 柱子的最大高度
    this.upHeight = getRandom(this.minHeight, this.maxHeight); // 上柱子的高度
    this.downHeight = landTop - this.upHeight - this.spaceHeight; // 下柱子的高度

    const upElem = document.createElement("div");
    const downElem = document.createElement("div");

    upElem.className = "pipe up";
    downElem.className = "pipe down";
    this.upPipe = new Pipe(this.upHeight, 0, speed, upElem);
    this.downPipe = new Pipe(this.downHeight, landTop - this.downHeight, speed, downElem);
    gameElem.appendChild(upElem);
    gameElem.appendChild(downElem);
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }

  /* 用于判断该柱子是否已经移出了视野 */
  get useless() {
    return this.upPipe.left < -this.upPipe.width;
  }
}

/* 成对柱子产生类 */
class PipePairProducer {
  constructor(speed) {
    this.speed = speed;
    this.pairs = []; // 柱子对存储数组
    this.timer = null;
    this.tick = 1800;
  }

  startProduce() {
    if (this.timer) {
      return;
    } else {
      this.timer = setInterval(() => {
        this.pairs.push(new PipePair(this.speed));
        // 移除用不到的柱子
        for (let i = 0; i < this.pairs.length; i++) {
          if (this.pairs[i].useless) {
            this.pairs.splice(i, 1);
            i--;
          }
        }
      }, this.tick);
    }
  }

  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}