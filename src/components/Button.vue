<template>
  <button :style="{ backgroundColor: color }" @click="handleClick">
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
    required: true,
  },
});

const handleClick = () => {
  // Emit a custom event if needed
};
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
