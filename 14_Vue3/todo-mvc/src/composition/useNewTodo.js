import { ref } from "vue";
import { generateId } from "../utils/todoStorage";

export default function (todosRef) {
  const newTodoRef = ref("");
  const addNewTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }

    todosRef.value.push({
      id: generateId(),
      content: value,
      completed: false,
    });
    newTodoRef.value = "";
  };

  return {
    newTodoRef,
    addNewTodo,
  };
}
