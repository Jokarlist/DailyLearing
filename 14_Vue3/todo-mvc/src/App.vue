<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="what needs to be none?"
          v-model="newTodoRef"
          @keyup.enter="addNewTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input
          type="checkbox"
          id="toggle-all"
          class="toggle-all"
          v-model="allCompletedRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo === editingRef,
            }"
            v-for="todo in filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input type="checkbox" class="toggle" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.content }}</label>
              <button class="destroy" @click="deleteTodo(todo)"></button>
            </div>
            <input
              type="text"
              class="edit"
              v-model="todo.content"
              @blur="editDone(todo)"
              @keyup.enter="editDone(todo)"
              @keyup.escape="editAbort(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ activeTodosRef.length }}</strong>
          <span>item{{ activeTodosRef.length > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          :style="{ display: completedTodosRef.length > 0 ? '' : 'none' }"
          @click="deleteCompletedTodo"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useDeleteTodo from "./composition/useDeleteTodo";

export default {
  setup() {
    const { todosRef } = useTodoList();

    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useDeleteTodo(todosRef),
    };
  },
};
</script>
