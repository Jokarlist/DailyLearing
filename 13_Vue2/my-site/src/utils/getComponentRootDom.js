import Vue from "vue";

/**
 * 获得某个组件渲染的DOM根元素
 * @param {object} comp
 * @param {object} props
 */
export default function (comp, props) {
  const vm = new Vue({
    render: (h) => h(comp, { props }),
  });

  vm.$mount();

  return vm.$el;
}
