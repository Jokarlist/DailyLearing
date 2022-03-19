import { computed, ref, watch } from "vue";
import gsap from "gsap";

const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];

export default function (gdpRef, maxSize) {
  const maxValue = computed(() => {
    if (!gdpRef.value.length) {
      return 0;
    }

    return Math.max(...gdpRef.value.map((item) => item.value));
  });

  const bars = ref([]);
  const barsTarget = computed(() => {
    return gdpRef.value.map((item, i) => ({
      ...item,
      color: colors[i % colors.length],
      width: (item.value / maxValue.value) * maxSize,
    }));
  });

  watch(
    barsTarget,
    () => {
      // 将bars变化为barsTarget
      for (let i = 0; i < barsTarget.value.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = {
            ...barsTarget.value[i],
            width: 0,
            value: 0,
          };
        }

        // 将bars.value[i]中的属性值逐步变化到barsTarget.value[i]中的属性值
        gsap.to(bars.value[i], {
          ...barsTarget.value[i],
          duration: 1,
        });
      }
    },
    {
      deep: true,
    }
  );

  return {
    bars,
  };
}
