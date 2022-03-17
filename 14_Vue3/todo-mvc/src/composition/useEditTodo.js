import { ref, computed } from "vue";

export default function (todosRef, deleteTodo) {
  // 记录当前正在编辑的todo
  const editingRef = ref(null);
  let originContent = "";
  const editTodo = (todo) => {
    // 缓存正在编辑的todo的原始值
    originContent = todo.content;
    editingRef.value = todo;
  };

  const editDone = (todo) => {
    editingRef.value = null;
    const content = todo.content.trim();
    if (content) {
      todo.content = content;
    } else {
      const index = todosRef.value.indexOf(todo);
      if (index >= 0) {
        todosRef.value.splice(index, 1);
      }
    }
  };

  const allCompletedRef = computed({
    get() {
      return todosRef.value.every((todo) => todo.completed);
    },
    set(checked) {
      todosRef.value.map((todo) => (todo.completed = checked));
    },
  });

  const editAbort = (todo) => {
    todo.content = originContent;
    editingRef.value = null;
  };

  return {
    editingRef,
    editTodo,
    editDone,
    allCompletedRef,
    editAbort,
  };
}
