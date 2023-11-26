<template>
  <button
    type="button"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "blue",
  },
  task: {
    type: Object,
    required: false,
  },
});

const handleClick = () => {};
</script>

<style scoped>
/* Add any button-specific styles here */
button {
  padding: 8px 36px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  outline: none;
}
</style>
