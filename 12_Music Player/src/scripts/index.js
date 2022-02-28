((player) => {
  class MusicPlayer {
    constructor() {
      // 请求数据存储数组
      this.dataList = null;

      // 索引值对象，用于管理切歌
      this.indexObj = null;

      // 播放列表对象
      this.list = null;

      // 当前播放歌曲的索引
      this.curIndex = 0;

      this.rotateTimer = null;

      // 创建进度条对象
      this.progress = player.progress.prog();
    }

    /**
     * 播放器实例初始化
     */
    init() {
      MusicPlayer.getElem(this);
      MusicPlayer.getData(this, "../mock/data.json");
    }

    /**
     * 获得必需的dom元素
     * @param {object} thisArg 指向实例对象
     */
    static getElem(thisArg) {
      thisArg.cover = document.querySelector(".cover img");
      thisArg.controlBtns = document.querySelectorAll(".control li");
    }

    /**
     * 获取歌曲数据
     * @param {object} thisArg
     * @param {string} url
     */
    static async getData(thisArg, url) {
      thisArg.dataList = await fetch(url).then(
        (data) => data.json(),
        (error) => console.log(error)
      );

      // 创建本地的索引值控制对象
      thisArg.indexObj = new player.indexControler(thisArg.dataList.length);

      // 切歌列表初始化
      this.playlistInit(thisArg);

      // 加载歌曲
      this.loadMusic(thisArg, thisArg.indexObj.index);

      // 初始化音乐操作功能
      this.controlMusic(thisArg);

      // 初始化拖拽进度条功能
      this.dragProgress(thisArg);
    }

    /**
     * 根据索引值加载单首歌曲
     * @param {object} thisArg
     * @param {number} index
     */
    static loadMusic(thisArg, index) {
      // 渲染专辑图、曲目信息、是否喜欢标志
      player.render(thisArg.dataList[index]);

      // 加载歌曲资源
      player.audio.load(thisArg.dataList[index]);

      // 渲染歌曲总时长
      thisArg.progress.renderTotalTime(thisArg.dataList[index]);

      // 判断audio对象的状态是否为played，是即处于播放状态，需要播放音乐以符合状态
      if (player.audio.status === "played") {
        player.audio.play();

        // 按钮状态变成播放状态
        thisArg.controlBtns[2].className = "play";

        // 专辑图从0度开始旋转
        this.coverStartRotate(thisArg, 0);

        // 播放进度条开始移动，传参0是为了切歌时总是让进度条长度从0开始
        thisArg.progress.move(0);
      }

      // 根据索引值改变播放列表里歌曲的选中状态
      thisArg.list.changeSelect(index);

      // 存储当前歌曲对应的索引值
      thisArg.curIndex = index;

      // 播放完毕切换到下一首歌
      player.audio.end(() => {
        this.loadMusic(thisArg, thisArg.indexObj.next());
      });
    }

    /**
     * 配置控制音乐的操作
     * @param {object} thisArg
     */
    static controlMusic(thisArg) {
      // 切换上一首歌按钮的触控事件
      thisArg.controlBtns[1].addEventListener("touchend", () => {
        player.audio.status = "played";
        this.loadMusic(thisArg, thisArg.indexObj.prev());
      });

      // 切换下一首歌按钮的触控事件
      thisArg.controlBtns[3].addEventListener("touchend", () => {
        player.audio.status = "played";
        this.loadMusic(thisArg, thisArg.indexObj.next());
      });

      const _this = this;
      // 播放暂停按钮的触控事件
      thisArg.controlBtns[2].addEventListener("touchend", function () {
        // 判断歌曲当前处于播放状态还是暂停状态，并进行处理
        if (player.audio.status === "played") {
          player.audio.pause();
          this.className = "";
          thisArg.progress.stop();
          _this.coverStopRotate(thisArg);
        } else {
          player.audio.play();
          this.className = "play";
          thisArg.progress.move();

          // 每一次再次播放需要加上上一次旋转的角度，同时第一次没有这个角度所以要做容错处理
          const deg = thisArg.cover.dataset.rotate || 0;

          _this.coverStartRotate(thisArg, deg);
        }
      });
    }

    /**
     * 以某个角度开始旋转专辑图片
     * @param {object} thisArg
     * @param {number} deg
     */
    static coverStartRotate(thisArg, deg) {
      clearInterval(thisArg.rotateTimer);

      thisArg.rotateTimer = setInterval(() => {
        deg = +deg + 0.2;
        thisArg.cover.style.transform = `rotate(${deg}deg)`;

        // 把旋转的角度记录在cover的标签上，为了暂停后再播放能取到值
        thisArg.cover.dataset.rotate = deg;
      }, 1000 / 240);
    }

    /**
     * 停止旋转专辑图片
     * @param {object} thisArg
     */
    static coverStopRotate(thisArg) {
      clearInterval(thisArg.rotateTimer);
      thisArg.rotateTimer = null;
    }

    /**
     * 播放列表初始化，包括一些配置
     * @param {object} thisArg
     */
    static playlistInit(thisArg) {
      // 创建playlistControl对象
      thisArg.list = player.playlistControl(thisArg.dataList);

      // 列表按钮触控事件
      thisArg.controlBtns[4].addEventListener("touchend", () => {
        thisArg.list.slideUp();
      });

      // 列表每项触控事件
      thisArg.list.musicList.forEach((item, index) => {
        item.addEventListener("touchend", () => {
          // 判断是否当前点击的为同一首歌
          if (thisArg.curIndex === index) {
            return;
          }

          player.audio.status = "played";

          // 更新索引值对象的当前索引值
          thisArg.indexObj.index = index;

          // 加载对应索引值的歌曲
          this.loadMusic(thisArg, index);

          // 播放列表隐藏
          thisArg.list.slideDown();
        });
      });
    }

    /**
     * 初始化拖拽进度条的功能
     * @param {object} thisArg 
     */
    static dragProgress(thisArg) {
      const dot = player.progress.drag(document.querySelector(".curDot"));

      dot.init();

      /**
       * 开始拖拽的处理函数
       */
      dot.start = () => {
        // 开始拖拽时进度条应暂停移动
        thisArg.progress.stop();
      };

      /**
       * 拖拽过程中的处理函数
       */
      dot.move = (percent) => {
        thisArg.progress.update(percent);
      };

      /**
       * 拖拽结束的处理函数
       */
      dot.end = (percent) => {
        // 拖拽结束时处在的时间点
        const curTime =
          percent * thisArg.dataList[thisArg.indexObj.index].duration;

        // 歌曲从当前百分比位置开始播放
        player.audio.playTo(curTime);
        player.audio.play();

        // 进度条从当前百分比位置开始移动
        thisArg.progress.move(percent);

        const deg = thisArg.cover.dataset.rotate || 0;
        // 专辑图片开始旋转
        this.coverStartRotate(thisArg, deg);

        // 播放暂停按钮样式变成播放状态
        thisArg.controlBtns[2].className = "play";
      };
    }
  }

  const musicPlayer = new MusicPlayer();
  musicPlayer.init();
})(window.player);
