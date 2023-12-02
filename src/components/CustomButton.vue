<template>
  <button class="button"
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
.button {
  padding: 8px 36px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  outline: none;
  transition-duration: 0.4s;
  font-size: 15px;

}


.button:hover {
  box-shadow: 0 0 0 2px #d0d0d0,
                inset 0 0 0 1px #fff;
              font-weight: bold;
              
}
</style>
