class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird();
    this.pipePairProducer = new PipePairProducer(-100);
    this.timer = null;
    this.tick = 16; // 移动时间间隔（毫秒）
    this.gameOver = false;
  }

  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
      return;
    }
    this.pipePairProducer.startProduce();
    this.bird.startSwing();
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;

      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipePairProducer.pairs.forEach(pair => {
        pair.move(duration);
      });

      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
      }
    }, this.tick);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.pipePairProducer.stopProduce();
    this.bird.stopSwing();
  }

  isGameOver() {
    if (this.bird.top >= this.bird.maxY) {
      return true;
    }
    for (let i = 0; i < this.pipePairProducer.pairs.length; i++) {
      const pair = this.pipePairProducer.pairs[i];

      if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
        return true;
      }
    }

    return false;
  }

  /* 检测碰撞：规则是两矩形的中心点间距中，若横间距小于两矩形宽度之和的一半或者纵间距小于两矩形高度之和的一半，就认为发生碰撞 */
  isHit(rec1, rec2) {
    const centerX1 = rec1.left + rec1.width / 2;
    const centerY1 = rec1.top + rec1.height / 2;
    const centerX2 = rec2.left + rec2.width / 2;
    const centerY2 = rec2.top + rec2.height / 2;
    const disX = Math.abs(centerX1 - centerX2);
    const disY = Math.abs(centerY1 - centerY2);

    if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
      return true;
    } else {
      return false;
    }
  }

  /* 关联键盘事件 */
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === " ") {
        this.bird.jump();
      }
    }
  }
}

const game = new Game();

game.regEvent();