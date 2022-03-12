<template>
  <img
    class="avatar-container"
    v-bind:src="src"
    alt="头像未正常加载"
    v-bind:style="{
      width: `${size}px`,
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String, // 表明传递的src属性必须是一个字符串
      require: true, // 表明必须传递src属性
    },
    size: {
      type: Number,
      default: 100,
    },
  },
};
</script>

<style scoped>
/* 带有作用域的样式 */
.avatar-container {
  display: block;
  border-radius: 50%;
  object-fit: cover;
}
</style>