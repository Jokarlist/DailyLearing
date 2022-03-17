import { ref, watchEffect } from "vue";
import { fetch, save } from "../utils/todoStorage";

export default function () {
  const todosRef = ref(fetch());
  watchEffect(() => {
    save(todosRef.value);
  });
  
  return {
    todosRef,
  };
}
