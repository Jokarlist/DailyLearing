import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 *
 * @param {object} options 选项对象，包括内容、类型、持续时间、外部容器、回
 * 掉函数
 */
export default function (options = {}) {
  const {
    content = "",
    type = "info",
    duration = 2000,
    container = document.body,
    callback,
  } = options;
  const div = document.createElement("div");
  const iconDom = getComponentRootDom(Icon, { type });

  div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
  div.className = `${styles.message} ${styles["message-" + type]}`;

  // 判断是否传参父容器，没有则让其相对body但最终会上溯到相对文档即视口定位
  if (options.container) {
    // 判断父容器定位是否为static，如果是则设置为相对定位
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }

  container.appendChild(div);

  // 强行渲染页面
  div.clientHeight;

  div.style.opacity = 1;
  div.style.transform = `translate(-50%, -50%)`;

  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        callback && callback();
      },
      { once: true }
    );
  }, duration);
}
