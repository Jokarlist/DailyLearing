const LOCAL_KEY = "todomvc";

/**
 * 生成一个随机id
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 获取当前所有todo组成的数据数组
 */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }

  return [];
}

/**
 * 保存当前的数据数组
 * @param {array} todos 数据数组
 */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 按照显示状态返回过滤后的数据数组
 * @param {array} todos 数据数组
 * @param {string} visibility 显示状态
 */
export function filter(todos, visibility = "all") {
  if (visibility === "all") {
    return todos;
  } else if (visibility === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (visibility === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  throw new Error("invalid visibility value");
}
