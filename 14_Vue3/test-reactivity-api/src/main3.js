import { reactive, readonly } from "vue";

function useDebounce(obj, duration = 1000) {
  // 在这里补全函数
  const valueOrigin = reactive(obj);
  const value = readonly(valueOrigin);
  let timer = null;
  const setValue = (newObj) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("对象混入了");
      Object.entries(newObj).forEach(([k, v]) => {
        valueOrigin[k] = v;
      });
    }, duration);
  };

  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}

const { value, setValue } = useDebounce({ a: 1, b: 2 }, 3000);
window.value = value;
window.setValue = setValue;
