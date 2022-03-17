export default function (todosRef) {
  const deleteTodo = (todo) => {
    todosRef.value.splice(todosRef.value.indexOf(todo), 1);
  };

  const deleteCompletedTodo = () => {
    todosRef.value = todosRef.value.filter((todo) => !todo.completed);
  };

  return {
    deleteTodo,
    deleteCompletedTodo,
  };
}
