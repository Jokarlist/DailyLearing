import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";

function getLoadingImage(el) {
  return el.querySelector("img[data-role=loading]");
}

function createLoadingImage() {
  const img = document.createElement("img");

  img.dataset.role = "loading";
  img.src = loadingUrl;
  img.className = styles.loading;

  return img;
}

export default function (el, binding) {
  const curImg = getLoadingImage(el);

  // 根据自定义指令中js表达式的值来判断是否需要 指示加载中img 的存在
  if (binding.value) {
    if (!curImg) {
      el.appendChild(createLoadingImage());
    }
  } else {
    if (curImg) {
      curImg.remove();
    }
  }
}
