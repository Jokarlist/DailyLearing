import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../utils/todoStorage";

const visibilityArr = ["all", "active", "completed"];

export default function (todosRef) {
  const visibilityRef = ref("all");
  const onHashChange = () => {
    const hash = location.hash.replace(/^#\/*/, "");
    if (visibilityArr.includes(hash)) {
      visibilityRef.value = hash;
    } else {
      location.hash = "";
      visibilityRef.value = "all";
    }
  };

  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });

  onUnmounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });

  const filteredTodosRef = computed(() =>
    filter(todosRef.value, visibilityRef.value)
  );

  const activeTodosRef = computed(() => filter(todosRef.value, "active"));
  const completedTodosRef = computed(() => filter(todosRef.value, "completed"));

  return {
    visibilityRef,
    filteredTodosRef,
    activeTodosRef,
    completedTodosRef,
  };
}
