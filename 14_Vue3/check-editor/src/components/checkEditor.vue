<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <div
        class="checkbox"
        :class="{ checked: modelValue }"
        @click="handleChecked"
      ></div>
      <input type="text" class="editor" @input="handleEdit" :value="title" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    title: String,
    titleModifiers: {
      default: () => ({}),
    },
  },
  setup(props, context) {
    const handleChecked = () => {
      context.emit("update:modelValue", !props.modelValue);
    };

    const handleEdit = (e) => {
      let value = e.target.value;
      if (props.titleModifiers.trim) {
        value = value.trim();
      }

      context.emit("update:title", value);
    };

    return {
      handleChecked,
      handleEdit,
    };
  },
};
</script>

<style scoped>
.check-editor {
  cursor: pointer;
}

.check-editor-inner {
  display: flex;
  align-items: center;
}

.checkbox {
  display: flex;
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
}

.checkbox:hover,
.checkbox.checked {
  border-color: #409eff;
}

.checkbox.checked::after {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: #409eff;
  content: "";
}

.editor {
  margin-left: 5px;
  font-size: inherit;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  outline: none;
}
</style>
