<template>
  <div class="container">
    <input
      type="text"
      @keypress.enter="addTodo"
      v-model="newTodoContent"
      class="todo-content"
      placeholder="write down your todo"
    />
    <button class="shuffle" @click="shuffle">随机排序</button>
    <transition-group tag="ul" name="todo" class="todo-container">
      <li v-for="todo in todos" :key="todo.id" class="todo">
        <span>{{ todo.content }}</span>
        <button @click="finishTodo(todo)">完成</button>
      </li>
    </transition-group>
  </div>
</template>

<script>
function randomId() {
  return Math.random().toString(16).substr(2, 5);
}

export default {
  name: "App",
  data() {
    return {
      todos: [
        { id: randomId(), content: "完成「vue过渡和动画的」的学习" },
        { id: randomId(), content: "看一部电影" },
        { id: randomId(), content: "学一首新歌" },
      ],
      newTodoContent: "",
    };
  },
  methods: {
    shuffle() {
      this.todos.sort(() => Math.random() - 0.5);
    },
    addTodo() {
      if (!this.newTodoContent) {
        return;
      }

      this.todos.unshift({
        id: randomId(),
        content: this.newTodoContent,
      });
      this.newTodoContent = "";
    },
    finishTodo(delTodo) {
      this.todos = this.todos.filter((todo) => todo !== delTodo);
    },
  },
};
</script>

<style lang="less">
.container {
  width: 600px;
  margin: 1em auto;
  padding: 1.5em;
  border-radius: 5px;

  .shuffle {
    margin: 1em 0;
  }

  .todo-content {
    width: 100%;
    height: 50px;
    padding: 0 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 1.3em;
    box-sizing: border-box;
  }

  .todo-container {
    padding: 0;
    margin: 1em 0;
    list-style: none;

    .todo {
      display: flex;
      padding: 0.5em 0;
      margin-bottom: 1em;
      border-bottom: 1px solid #ccc;
      justify-content: space-between;
    }

    .todo-enter {
      opacity: 0;
      transform: translateX(-100%);
    }

    .todo-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }

    .todo-enter-active,
    .todo-leave-active,
    .todo-move {
      transition: 0.5s;
    }

    .todo-leave-active {
      position: absolute;
    }
  }
}
</style>
