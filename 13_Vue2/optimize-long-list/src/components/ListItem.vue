<template>
  <div class="list-item-container">
    <span>id{{ item.id }}</span>
    <span>name{{ item.count }}</span>
    <span>age{{ item.count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.list-item-container {
  display: grid;
  height: 54px;
  padding: 1em;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>