// 播放列表控制模块
((root) => {
  function playlistControl(data) {
    const dl = document.querySelector(".playlist dl");
    const close = document.querySelector(".close");

    // 存储所有的歌曲对应的dd元素的dom对象
    const musicList = [];

    data.forEach((item, index) => {
      const dd = document.createElement("dd");

      // 每个dd元素注册触控事件
      dd.addEventListener("touchend", function () {
        // 触控时改变选中状态
        changeSelect(index);
      });

      dd.innerHTML = item.name;
      dl.appendChild(dd);
      musicList.push(dd);
    });

    // 默认让第一首歌为选中的状态
    changeSelect(0);
    
    const playlist = document.querySelector(".playlist");
    const disY = playlist.offsetHeight;

    playlist.style.transform = `translateY(${disY}px)`;

    // 关闭按钮触控事件
    close.addEventListener("touchend", slideDown);

    /**
     * 列表滑入
     */
    function slideUp() {
      playlist.style.transition = ".2s";
      playlist.style.transform = "translateY(0)";
    }

    /**
     * 列表滑出
     */
    function slideDown() {
      playlist.style.transition = ".2s";
      playlist.style.transform = `translateY(${disY}px)`;
    }

    /**
     * 按索引值切换当前选中状态
     * @param {number} index
     */
    function changeSelect(index) {
      for (let i = 0; i < musicList.length; i++) {
        musicList[i].className = "";
      }
      musicList[index].className = "active";
    }

    return {
      musicList,
      slideUp,
      slideDown,
      changeSelect,
    };
  }

  root.playlistControl = playlistControl;
})(window.player || (window.player = {}));
