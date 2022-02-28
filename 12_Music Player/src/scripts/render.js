// 渲染模块，负责渲染专辑图、曲目信息、是否喜欢标志
((root) => {
  /**
   * 渲染专辑图
   * @param {object} data 
   */
  function renderImg(data) {
    const { image: src } = data;
    
    // 给body添加高斯模糊效果的背景图
    root.blurImg(src);

    const img = document.querySelector(".cover img");

    img.src = src;
  }

  /**
   * 渲染曲目信息
   * @param {object} param0 
   */
  function renderInfo({ name, album, singer }) {
    const infos = document.querySelector(".info").children;

    infos[0].innerHTML = name;
    infos[1].innerHTML = album;
    infos[2].innerHTML = singer;
  }

  /**
   * 渲染是否喜欢标志
   * @param {object} param0 
   */
  function renderIsLike({ isLike }) {
    const li = document.querySelectorAll(".control li")[0];

    li.className = isLike ? "like" : "";
  }

  root.render = (data) => {
    renderImg(data);
    renderInfo(data);
    renderIsLike(data);
  };
})(window.player || (window.player = {}));
