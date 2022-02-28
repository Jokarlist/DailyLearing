((root) => {
  class Progress {
    constructor() {
      // 歌曲总时长，单位为秒
      this.duration = 0;

      // 移动定时器标号
      this.frameId = null;

      // 歌曲每一次开始播放的记录时间
      this.startTime = 0;

      // 每一次暂停后记录的前一次进度条已移动的百分比长度
      this.lastPercent = 0;

      this.init();
    }

    init() {
      this.getElem();
    }

    /**
     * 获取必需的dom元素
     */
    getElem() {
      this.curTime = document.querySelector(".curTime");
      this.totalTime = document.querySelector(".totalTime");
      this.curDot = document.querySelector(".curDot");
      this.frontBg = document.querySelector(".frontBg");
    }

    /**
     * 渲染歌曲总时长
     * @param {object} param0
     */
    renderTotalTime({ duration }) {
      this.duration = duration;
      duration = this.formatTime(duration);
      this.totalTime.innerText = duration;
    }

    /**
     * 格式化时间
     * @param {number} time
     */
    formatTime(time) {
      time = Math.round(time);

      let min = Math.floor(time / 60);
      let sec = time % 60;

      min = min < 10 ? `0${min}` : min;
      sec = sec < 10 ? `0${sec}` : sec;

      return `${min}:${sec}`;
    }

    /**
     * 进度条开始移动，可以按传入的百分比调整开始移动的起始位置
     * @param {boolean} percent
     */
    move(percent) {
      this.startTime = new Date().getTime();

      const _this = this;

      _this.lastPercent = percent === undefined ? _this.lastPercent : percent;

      // 配置用于移动的定时器，首先做处理防止多个定时器冲突
      cancelAnimationFrame(this.frameId);
      (function frame() {
        const curTime = new Date().getTime();
        const percent =
          _this.lastPercent +
          (curTime - _this.startTime) / (_this.duration * 1000);

        if (percent <= 1) {
          _this.update(percent);
        } else {
          cancelAnimationFrame(_this.frameId);
        }

        _this.frameId = requestAnimationFrame(frame);
      })();
    }

    /**
     * 进度条的长度更新
     * @param {number} percent 歌曲播放百分比
     */
    update(percent) {
      const time = this.formatTime(percent * this.duration);

      // 调整已播放时间
      this.curTime.innerText = time;

      // 移动frontBg
      this.frontBg.style.width = `${percent * 100}%`;

      const dis = `${this.curDot.parentElement.offsetWidth * percent}`;

      // 移动小圆点
      this.curDot.style.transform = `translateX(${dis}px)`;
    }

    /**
     * 进度条暂停移动
     */
    stop() {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;

      const stopTime = new Date().getTime();

      // 累加每一次暂停后前一次播放进度条所移动的百分比长度
      this.lastPercent += (stopTime - this.startTime) / (this.duration * 1000);
    }
  }

  class Drag {
    constructor(elem) {
      // 要拖拽的元素
      this.elem = elem;

      // 拖拽时落点的位置（x方向）
      this.destX = 0;

      // 拖拽前的起点位置（x方向）
      this.srcX = 0;

      // 拖拽的距离（落点与抬起点之间的距离）
      this.disX = 0;

      // 拖拽的百分比长度
      this.percent = 0;
    }

    init() {
      this.elem.style.transform = "translateX(0)";

      /* 拖拽开始 */
      this.elem.addEventListener("touchstart", (e) => {
        // 记录一开始落点的位置
        this.destX = e.changedTouches[0].pageX;

        // 起始点的位置
        this.srcX = +this.elem.style.transform.match(/\d+/)[0];

        this.start && this.start();
      });

      /* 拖拽中 */
      this.elem.addEventListener("touchmove", (e) => {
        // 拖拽的距离
        this.disX = e.changedTouches[0].pageX - this.destX;

        // 小圆点应移动的距离
        const d = this.srcX + this.disX;

        if (d < 0) {
          d = 0;
        } else if (d >= this.elem.offsetParent.offsetWidth) {
          d = this.elem.offsetParent.offsetWidth;
        }

        // 小圆点移动
        this.elem.style.transform = `translateX(${d}px)`;

        // 移动的百分比长度
        this.percent = d / this.elem.offsetParent.offsetWidth;
        this.move && this.move(this.percent);

        e.preventDefault();
      });

      /* 拖拽结束 */
      this.elem.addEventListener("touchend", (e) => {
        this.end && this.end(this.percent);
      });
    }
  }

  root.progress = {
    prog() {
      return new Progress();
    },
    drag(elem) {
      return new Drag(elem);
    },
  };
})(window.player || (window.player = {}));
