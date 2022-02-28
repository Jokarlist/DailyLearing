// 音乐模块，控制音乐的加载、播放、暂停等
((root) => {
  class AudioManage {
    constructor() {
      this.audio = new Audio();
      this.status = "paused";
    }

    /**
     * 加载音乐资源
     * @param {object} param0 
     */
    load({audioSrc: src}) {
      this.audio.src = src;
      this.audio.load();
    }

    /**
     * 播放音乐
     */
    play() {
      this.audio.play();
      this.status = "played";
    }

    /**
     * 暂停音乐
     */
    pause() {
      this.audio.pause();
      this.status = "paused";
    }

    /**
     * 配置音乐结束时触发的事件
     * @param {function} handler 
     */
    end(handler) {
      this.audio.addEventListener("ended", handler);
    }

    /**
     * 跳转至固定播放时间点
     * @param {number} timing 
     */
    playTo(timing) {
      this.audio.currentTime = timing;
    }
  }

  root.audio = new AudioManage();
})(window.player || (window.player = {}));
