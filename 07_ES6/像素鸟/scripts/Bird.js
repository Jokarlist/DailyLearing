const birdElem = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdElem, null);
const birdHeight = parseFloat(birdStyles.height);
const birdWidth = parseFloat(birdStyles.width);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdElem);
    this.g = 1500;
    this.maxY = landTop - birdHeight; // 下落的最大高度（即最大纵坐标）
    this.swingStatus = 1; // 翅膀的扇动状态
    this.timer = null; // 翅膀扇动的定时器
    this.render();
  }

  render() {
    super.render();
    birdElem.className = `bird swing${this.swingStatus}`;
  }

  move(duration) {
    super.move(duration);
    this.ySpeed += this.g * duration;
  }

  /* 上升和下落的边界判断 */
  onMove() {
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }

  /* 跳跃 */
  jump() {
    this.ySpeed = -450;
  }

  /* 开始扇动翅膀 */
  startSwing() {
    if (this.timer) {
      return;
    } else {
      this.timer = setInterval(() => {
        this.swingStatus = this.swingStatus % 3 + 1;
      }, 250);
    }
  }

  /* 停止扇动翅膀 */
  stopSwing() {
    clearInterval(this.timer);
    this.time = null;
  }
}
