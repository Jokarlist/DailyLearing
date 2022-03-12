import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif";

let imgs = [];

function setImage(img) {
  // 先给所有图片元素都赋上占位图
  img.dom.src = defaultGif;
  const rect = img.dom.getBoundingClientRect();
  const portHeight = document.documentElement.clientHeight;
  const imgHeight = rect.height || 150;

  if (rect.top >= -imgHeight && rect.top <= portHeight) {
    // 元素在视口范围内
    const tempImg = new Image();
    tempImg.onload = () => {
      // tempImg将源图片加载好之后，浏览器会有缓存，此时将src赋予原dom元素浏览器会直接显示出图片
      img.dom.src = img.src;
    };

    tempImg.src = img.src;
    imgs = imgs.filter((i) => i !== img);
  }
}

function setImages() {
  for (const img of imgs) {
    setImage(img);
  }
}

function hanldeScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(hanldeScroll, 50));

export default {
  inserted(el, binding) {
    const img = {
      dom: el,
      src: binding.value,
    };

    imgs.push(img);
    setImages();
  },
  unbind(el) {
    imgs = imgs.filter((img) => img !== el);
  },
};
